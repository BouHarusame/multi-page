<template>
  <div class="hscode">
    <div class="section-search-line">
      <div class="hsinput">
        <el-input placeholder="请输入品名/HS Code（支持模糊查询）" clearable v-model="hscode" @keyup.enter.native="verifyValidCode" class="search-item-input"></el-input>
        <el-button class="search-btn" @click="verifyValidCode">新增</el-button>
      </div>
      <div class="dangerous" v-if="this.$route.name === 'import'">
        <el-checkbox v-model="check" @change="checkdangerous">我的货物是危险品</el-checkbox>
        <p class="remark">( 若您确定是危险品请勾选，或通过右侧工具判定 )</p>
      </div>
      <div class="tool" @click="dangertool" v-if="this.$route.name === 'import'">
        <img src="./img/tool.png" alt="" srcset="">
        <span>危险品判定工具</span>
      </div>
    </div>

    <!-- 验证码弹框 -->
    <el-dialog
      title=""
      :close-on-click-modal="false"
      :visible.sync="identifyCodeVisible"
      @close="handleCancle"
      width="300px"
      height="400px">
      <div class="identifyCodeBox">
        <div class="tips">为了您的账户安全请输入验证码</div>
        <img :src="validCodeUrl" alt="">
        <el-input placeholder="请输入验证码）" v-model="validCode"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="!cost" @click="fetchGoodsName">确 定</el-button>
        <el-button type="primary" v-else @click="fetchValidCode">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 品名列表弹框 -->
    <el-dialog
      title="HS列表"
      :visible.sync="dialogVisible"
      @close="handleClose"
      :close-on-click-modal="false"
      width="1000px"
      class="hs-code-table"
      center>
      <el-table
        :data="goodsInfoData"
        :header-cell-style="{ background: '#f6f7f8'}"
        style="width: 100%">
        <el-table-column fixed prop="hsCode" label="HS Code" width="150"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" min-width="120"></el-table-column>
        <el-table-column label="通关参数" width="80" >
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.hsCode)" type="text" class="btn-text" size="small">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button @click="handleClickAdd(scope.row)" type="text" v-if="scope.row.text === '添加'" size="small">{{scope.row.text}}</el-button>
            <el-button type="text" class="grey" @click="handleClickCancle(scope.row)" v-else size="small">{{scope.row.text}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="el-dialog-footer">
        <div class="btn-box sty1" @click="handleClickDialog">确定</div>
        <div class="btn-box sty2" @click="handleDialogReset">重置</div>
        <el-pagination
          background
          class="pagination"
          @current-change="paginationChange"
          :current-page="orderParams.currentPage"
          :pager-count="5"
          layout="prev, pager, next"
          :page-size="orderParams.size"
          :total="total">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog
      title="HS列表"
      :close-on-click-modal="false"
      :visible.sync="goodsItemDialogVisible"
      @close="handleCancle"
      width="1000px"
      center>
       <el-table
        :data="goodsInfoItem"
        :header-cell-style="{ background: '#f6f7f8'}"
        style="width: 100%">
        <el-table-column fixed prop="hsCode" label="HS Code" width="150"></el-table-column>
        <el-table-column prop="goodsName" label="商品名称" min-width="120"></el-table-column>
        <el-table-column label="通关参数" width="80">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row.hsCode)" type="text" class="btn-text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 品名详情 -->
    <el-dialog
      title="通关参数"
      :visible.sync="dialogTGVisible"
      @close="handleCancle"
      :close-on-click-modal="false"
      width="1000px"
      center>
      <div class="tg-section">
        <div class="line">
          <div class="tg-section-item">
            <span class="label">HS Code</span>
            <span class="value">{{rateTaxParams.hsCode ? rateTaxParams.hsCode : '无'}}</span>
          </div>
          <div class="tg-section-item">
            <span class="label">计量单位</span>
            <span class="value">{{rateTaxParams.measureUnit ? rateTaxParams.measureUnit : '无'}}</span>
          </div>
          <div class="tg-section-item">
            <span class="label">海关监管条件</span>
            <span class="value yellow" v-if="!rateTaxParams.superviseCondition">无</span>
            <el-popover
              v-else
              placement="bottom-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips"
              @show="fetchSuperviseCondition"
              >
              <div v-for="(item, index) in superviseCondition" :key="index" class="tips">{{item}}</div>
              <span class="value yellow" slot="reference">{{rateTaxParams.superviseCondition}}</span>
            </el-popover>
          </div>
          <div class="tg-section-item">
            <span class="label">检验检疫类别</span>
            <span class="value yellow" v-if="!rateTaxParams.quarantineType">无</span>
            <el-popover
              v-else
              placement="bottom-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips"
              @show="fetchQuarantineType">
              <div v-for="(item, index) in quarantineType" :key="index" class="tips">{{item}}</div>
              <span class="value yellow" slot="reference">{{rateTaxParams.quarantineType}}</span>
            </el-popover>
          </div>
        </div>
        <div class="line">
          <span class="label">品名</span>
          <span class="value">{{rateTaxParams.goodsName ? rateTaxParams.goodsName : '无'}}</span>
        </div>
        <div class="line">
          <span class="label">申报要素</span>
          <span class="value">{{rateTaxParams.declareElements ? rateTaxParams.declareElements : '无'}}</span>
        </div>
        <div class="line">
          <span class="label">申报要素范例</span>
          <span class="value">{{rateTaxParams.declareExample ? rateTaxParams.declareExample : '无'}}</span>
        </div>
        <div class="line" v-if="rateTaxParams.specialBill">
          <span class="label">报检特殊单证</span>
          <el-popover
            placement="top-start"
            width="400"
            trigger="hover"
            popper-class="tg-tips"
            @show="fetchSpecialBill">
            <div v-for="(item, index) in specialBill" :key="index" class="tips">{{item}}</div>
            <span class="value yellow" slot="reference">{{rateTaxParams.specialBill ? rateTaxParams.specialBill : '无'}}</span>
          </el-popover>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="以下查询参考2015年第5号公告公布的《危险化学品目录（2015版）》"
      :visible.sync="dangerVisible"
      :close-on-click-modal="false"
      width="1000px"
      class="danger-table"
      center>
      <div class="danger-titleline">
        <div class="danger-search">
          <div class="search-box">
            <el-input placeholder="请输入化学品CAS编号或品名（支持模糊查询）" v-model="casno" class="search-item-input" clearable @keyup.enter.native="searchDanger(casno)"></el-input>
            <el-button class="search-btn" @click="searchDanger(casno)">查询</el-button>
          </div>
          <el-button class="nocas-search-btn" @click="searchDanger(casno = '')">无CAS编号查询</el-button>
        </div>
      </div>
      <div class="section-table">
        <el-table :data="dangerInfo" height="520" highlight-current-row :header-cell-style="{ background: '#f6f7f8'}" v-loading="dangerLoading">
          <template slot="empty">
            <div class="normal">
              <img src="components/import-inquiry/img/normal.png" alt />
              <p>暂无数据，请输入化学品CAS编号查询</p>
            </div>
          </template>
          <el-table-column prop="casGoodsName" label="化学品CAS编号/品名" min-width="160">
            <template slot-scope="scope">
              <div class="danger-goods" v-if="scope.row.danger === '是'">
                <p class="goodsCas">{{scope.row.casNo}}</p>
                <p class="goodsNane">{{scope.row.casGoodsName}}</p>
              </div>
              <div v-else>{{scope.row.casGoodsName}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="danger" label="是否危险品" min-width="100"></el-table-column>
          <el-table-column prop="hsCodes" label="建议 HS 归类" min-width="100">
            <template slot-scope="scope" v-if="scope.row.danger === '是'">
              <div v-for="(item, i) in scope.row.hsCodes" :key="i">
                <p>{{item}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope" v-if="scope.row.danger === '是'">
              <div v-for="(item, i) in scope.row.hsCodes" :key="i">
                <p class="operation" @click="queryhscode(scope.row, i)">
                  查询10位精准编码
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="el-dialog-footer">
        <el-pagination
          background
          class="pagination"
          :pager-count="5"
          @current-change="dangerPaginationChange"
          :current-page="goodsParams.currentPage"
          layout="prev, pager, next, total"
          :page-size="goodsParams.size"
          :total="dangertotal">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuoteDanger, validCode, postValidCode, getHsName, getSuperviseSpecial, getSuperviseQuarantine, getSuperviseConditione, getHsCode } from 'api/import'
export default {
  name: 'hscode',
  props: {
    goodsInfo: Array,
    goodsInfoItem: {
      type: Array,
      default: () => []
    },
    checked: Boolean
  },
  data () {
    return {
      hscode: '',
      identifyCodeVisible: false,
      dialogVisible: false,
      changeCurrentPageFlag: true,
      dialogTGVisible: false,
      goodsItemDialogVisible: false,
      validCodeFlag: true,
      cost: false,
      validCodeUrl: '',
      validCode: '',
      goodsInfoData: [],
      superviseCondition: [],
      quarantineType: [],
      specialBill: [],
      rateTaxParams: {},
      total: 0,
      orderParams: {
        currentPage: 1,
        size: 15
      },
      dangerVisible: false,
      check: null,
      dangerLoading: false,
      casno: '',
      dangerInfo: [],
      dangertotal: 0,
      goodsParams: {
        page: 1,
        size: 12
      },
      casNo: '',
      casGoodsName: '',
      determine: ''
    }
  },
  methods: {
    searchDanger (casno) {
      this.dangerLoading = true
      this.goodsParams.param = casno
      getQuoteDanger({ ...this.goodsParams })
        .then(res => {
          if (res.msg === 'success') {
            this.dangerInfo = []
            if (res.data.total) {
              let info = res.data.records
              this.dangerInfo = info.map(item => {
                item.casGoodsName = item.goodsName
                if (item.danger) {
                  item.danger = '是'
                } else {
                  item.danger = '否'
                }
                return item
              })
              this.dangertotal = res.data.total
              this.dangerLoading = false
            } else {
              let info = {
                casGoodsName: '查无匹配',
                danger: '否'
              }
              this.dangerInfo.push(info)
              this.dangertotal = res.data.total
              this.dangerLoading = false
            }
          }
        })
    },
    queryhscode (msg, i) {
      this.determine = '危险品'
      this.casNo = msg.casNo
      this.casGoodsName = msg.casGoodsName
      this.hscode = msg.hsCodes[i]
      this.verifyValidCode()
    },
    dangerPaginationChange (page) {
      this.goodsParams.page = page
    },
    dangertool () {
      this.casNo = ''
      this.casGoodsName = ''
      this.dangerVisible = true
    },
    checkdangerous () {
      this.$emit('check-danger', this.check)
    },
    verifyValidCode () {
      validCode()
        .then(res => {
          if (res && res.msg === 'success') {
            if (res.data && res.data.flag) {
              this.validCodeUrl = res.data.validCodeUrl
              this.identifyCodeVisible = true
            } else if (res.data && !res.data.flag) {
              this.fetchGoodsName()
            }
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchValidCode () {
      if (!this.validCodeFlag) {
        this.$message.warning('正在拼命加载中...')
        return
      }
      this.validCodeFlag = false
      postValidCode({ validCode: this.validCode })
        .then(res => {
          if (res && res.msg === 'success') {
            this.validCodeFlag = true
            this.$emit('fetch-quote-cost')
            this.identifyCodeVisible = false
          }
          if (res && res.msg === 'fail') {
            this.validCodeFlag = true
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchGoodsName () {
      this.orderParams.name = this.hscode
      this.orderParams.validCode = this.validCode
      if (!this.validCodeFlag) {
        this.$message.warning('正在拼命加载中...')
        return
      }
      this.validCodeFlag = false
      getHsName({ ...this.orderParams })
        .then(res => {
          if (res && res.msg === 'success') {
            this.goodsInfoData = res.data && (res.data.records || [])
            this.validCodeFlag = true
            this.goodsInfoData = this.goodsInfoData.map(item => {
              this.$set(item, 'text', '添加')
              this.goodsInfo.forEach(ele => {
                if (ele.hsCode === item.hsCode) {
                  this.$set(item, 'text', '取消')
                }
              })
              return item
            })
            this.total = res.data.total * this.orderParams.size
            this.dialogVisible = true
            this.changeCurrentPageFlag = true
            this.dangerVisible = false
            this.identifyCodeVisible = false
            this.validCodeUrl = ''
            this.validCode = ''
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchSpecialBill () {
      getSuperviseSpecial({ param: this.rateTaxParams.specialBill })
        .then(res => {
          if (res && res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            this.specialBill = []
            data.map(item => {
              this.specialBill.push(item.superviseCode + ':' + item.fullName)
            })
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchQuarantineType () {
      getSuperviseQuarantine({ param: this.rateTaxParams.quarantineType })
        .then(res => {
          if (res && res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            this.quarantineType = []
            data.map(item => {
              this.quarantineType.push(item.superviseCode + ':' + item.fullName)
            })
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchSuperviseCondition () {
      getSuperviseConditione({ param: this.rateTaxParams.superviseCondition })
        .then(res => {
          if (res && res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            this.superviseCondition = []
            data.map(item => {
              this.superviseCondition.push(item.superviseCode + ':' + item.fullName)
            })
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleDetail (code) {
      getHsCode({ code })
        .then(res => {
          if (res && res.msg === 'success') {
            this.rateTaxParams = res.data || {}
            this.dialogTGVisible = true
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleClickAdd (row) {
      let goodsName = ''
      let hsCode = ''
      if (row.goodsName.indexOf('此税号') > -1 && row.goodsName.indexOf('已过期') > -1) {
        this.$message.warning('此信息已过期')
        return
      }
      goodsName = row.goodsName.split('(')[0].split('（')[0]
      hsCode = row.hsCode.split('(')[0].split('（')[0]
      this.$emit('add-hscode', { goodsName, hsCode, casNo: this.casNo, casGoodsName: this.casGoodsName, determine: this.determine })
      this.determine = ''
      row.text = '取消'
    },
    handleClickCancle (row) {
      this.$emit('cancle-hscode', row)
      row.text = '添加'
    },
    paginationChange (page) {
      this.orderParams.currentPage = page
    },
    handleClickDialog () {
      this.dialogVisible = false
    },
    handleDialogReset () {
      this.goodsInfoData.forEach(item => {
        item.text = '添加'
      })
      this.$emit('handle-reset')
    },
    handleClose () {
      this.orderParams.currentPage = 1
      this.changeCurrentPageFlag = false
      this.casNo = ''
      this.casGoodsName = ''
    },
    handleReset () {
      this.hscode = ''
    },
    handleShowDialog () {
      this.goodsItemDialogVisible = true
    },
    handleShowValidDialog (validCodeUrl) {
      this.validCodeUrl = validCodeUrl
      this.identifyCodeVisible = true
      this.cost = true
    },
    handleCancle () {
      this.validCodeUrl = ''
      this.validCode = ''
      this.superviseCondition = []
      this.quarantineType = []
    }
  },
  watch: {
    orderParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          // 第一次进入页面显示空记录
        } else {
          if (this.changeCurrentPageFlag) {
            this.verifyValidCode()
          }
        }
      },
      immediate: true,
      deep: true
    },
    goodsParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
        } else {
          this.searchDanger()
        }
      },
      immediate: true,
      deep: true
    },
    checked: {
      handler (nv, ov) {
        this.check = nv
      },
      immediate: true
    }
  }
}
</script>

<style lang='stylus' scoped>
.section-search-line
  margin 30px auto
  display flex
  align-items center
  div
    margin-right 30px
  .search-item-input
    width 400px
    height 30px
    margin-right 10px
  .search-btn
    width 60px
    height 30px
    border 1px solid #FBB03B
    background #FFF7EB!important
    color #FBB03B
    font-size 14px
    font-weight 500
    text-align center
  .dangerous
    >>>.el-checkbox__label
      color #353535
      font-weight 500
    .remark
      font-size 12px
      margin-top 2px
      color #f56c6c
  .tool
    padding 4px 10px
    border-radius 15px
    background #f0f2f5
    display flex
    align-items center
    justify-content center
    cursor pointer
    span
      font-size 12px
      color #353535
      font-weight 500
      line-height 16px
      border-bottom 1px solid #353535
      margin-left 10px
.identifyCodeBox
  .tips
    font-size 14px
    font-weight bold
    color #353535
    margin-bottom 20px
  img
    display block
    margin 0 auto 20px
.tg-section
  .line
    display flex
    align-items center
    padding 30px 20px
    border-bottom 1px solid #f0f2f5
    .tg-section-item
      width 22%
      marign-left 4%
      display flex
      align-items center
      &:nth-child(4n+1)
        margin-left 0
    .label
      // width 100px
      display inline-block
      padding 0 10px
      white-space nowrap
      height 24px
      border-radius 12px
      background #FFF7EB
      border 1px solid #fedfb0
      font-size 12px
      color #888888
      font-weight 500
      text-align center
      line-height 24px
      margin-right 14px
    .value
      font-size 12px
      color #353535
      font-weight 50
      line-height 20px
    .yellow
      color #FBB03B
>>>.el-dialog--center .el-dialog__body
  padding 0 20px 20px
>>>.el-dialog__header
  text-align: left;
  padding 20px
  border-bottom: 1px solid #f0f2f5;
.hs-code-table
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    >>>.el-table__fixed-right::before, >>>.el-table__fixed::before
      height 0
    >>>.el-table::before
      height 0
    .el-table
      height: 500px;
      overflow: scroll;
    .el-dialog-footer
      display flex
      align-items center
      position relative
      justify-content center
      margin-top 10px
    .pagination
      position absolute
      bottom 0px
      right 0px
>>> .el-dialog
  min-height 300px
  max-height 700px
  overflow scroll
  border-radius: 10px;
  overflow: hidden;
  .btn-text
    text-align center
    display block
    padding 0 16px
  .el-button--text
    color #FBB03B
  .grey
    color #888888
.danger-table
  .danger-search
    display flex
    justify-content space-between
    margin 10px 0 20px
    .search-box
      display flex
    >>>.el-input--small
      width 400px
      margin-right 20px
    .nocas-search-btn
      margin-left 50px
      border-color #fbb03b
      background-color #fbb03b
      color #fff
  .section-table
    .normal
      margin: 20px auto 30px;
      img
        display: block;
        margin: 0 auto 20px;
      p
        font-size: 12px;
        font-weight: 500;
        color: #D3D3D3;
        text-align: center;
    .danger-goods
      .goodsCas
        color #353535
      .goodsNane
        color #aaa
    .operation
      text-decoration underline
      cursor pointer
  >>>.el-pagination
    text-align right
    margin-top 10px
</style>
