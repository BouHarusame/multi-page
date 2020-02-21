<template>
<div class="import-order-detail">
  <div class="section">
    <div class="title">

      <div class="title-content wrap">
        <h4 class="title-h4">业务操作动态</h4>
        <div class="title-btn"><span class="btn-icon"></span><p class="btn-p" @click="handleChangeRoute">询价信息</p></div>
      </div>

      <div class="title wrap" v-if="!showAC">
        <span class="title-name">业务编号：</span>
        <span class="title-value">{{quoteNoAc}}</span>
      </div>

      <div class="title wrap" v-if="showAC">
        <span class="title-name">公司名称：</span>
        <span class="title-value">{{compInfo}}</span>
      </div>

      <div class="title-right wrap" v-if="showAC">
        <p class="title-p"><span class="key">业务编号(AC):</span><span class="val">{{quoteNoAc}}</span></p>
        <p class="title-p tl" v-if="!edit"><span class="key">康泰编号:</span><span class="val">{{quoteNoKt}}</span></p>
        <div class="bd-title-right" >
          <div class="bd-edit" v-show="edit">
            <span class="key">康泰编号：</span>
            <el-input v-model="targetJobNo" class="bd-input"></el-input>
            <div class="btn-box" ><el-button class="bd-btn btn-com" type="text" @click="handleComfirm">确认</el-button><el-button class="bd-btn btn-cal" type="text" @click="handleCancle">取消</el-button></div>
          </div>
          <div v-show="!edit"><el-button class="bd-btn" type="text" @click="handleEdit">关联业务编号</el-button><span class="tips">({{orderDetail.bindedFlag ? '已关联' : '未关联'}})</span></div>
        </div>
      </div>
    </div>
    <stepInfo :pStepList="stepsList" :pActiveStep="activeStep"/>
  </div>
  <div class="section">
    <import-upload :roles="rolesCopy" :quoteNo="quoteNo" :received="received" :DZSDfid="DZSDfid" :DZSDname="DZSDname" :BGname="BGname" :BGfid="BGfid" :needed="needed" :pNodeSeq="activeStep" @click-show="handleClickCheckList"></import-upload>
  </div>
  <div class="section">
    <importDetail :orderDetail="orderDetail" />
  </div>
  <div class="section">

    <expense-detail-shark v-if="rolesCopy.indexOf('AC_GLY') > -1 || rolesCopy.indexOf('AC_IMPORT_GLY') > -1 || rolesCopy.indexOf('AC_IMPORT_CW') > -1" :pFeeList="feeList" @on-select-change="handleSharkSelectChange" @on-send-success="handleSharkSendSuccess"/>
    <import-order-fee v-if="isDC" :pCustomerFeeList="customerFeeList" @on-select-change="handleCustomerSelectChange" @on-save-success="handleCustomerSendSuccess"></import-order-fee>
  </div>
    <el-dialog
      :visible.sync="checkListDialog"
      @close="handleCancleDialog"
      :close-on-click-modal="false"
      width="1000px"
      class="hs-code-table"
      center>
      <div class="dialog-header" slot="title">
        <h4 class="header-title">文件参考及核对</h4>
        <p class="header-p">品类：</p><p class="header-text">{{cateTitle}}</p>
      </div>
      <div class="dialog-content" v-if="!isEdit">
        <div class="content-section" v-for="(item, index) in checkList" :key="index">
          <div class="section-title">{{item.title}}</div>
          <el-table
            :data="item.tableData"
            border
            class="table-check-list"
            style="width: 100%">
            <el-table-column
              prop="seq"
              :render-header="customFieldColumn">
            </el-table-column>
            <el-table-column
              prop="item"
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-name">
                  <p>{{scope.row.item}}</p>
                  <p>{{scope.row.itemEn}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div>{{scope.row.originalNum ? scope.row.originalNum : '不需要'}}</div>
                  <div class="checked" v-if="scope.row.originalNum && scope.row.originalFinished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
             <el-table-column
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div>{{scope.row.electronicDocNum ? scope.row.electronicDocNum : '不需要'}}</div>
                  <div class="checked" v-if="scope.row.electronicDocNum && scope.row.electronicFinished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="seal"
              :render-header="customFieldColumn">
            </el-table-column>
            <el-table-column
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div class="checked" v-if="scope.row.finished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              :render-header="customFieldColumn">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="dialog-content" v-else>
        <div class="content-section" v-for="(item, index) in checkList" :key="index">
          <div class="section-title">{{item.title}}</div>
          <el-table
            :data="item.tableData"
            border
            class="table-check-list"
            @cell-click="handleCheckList"
            style="width: 100%">
            <el-table-column
              prop="seq"
              width="80px"
              :render-header="customFieldColumn">
            </el-table-column>
            <el-table-column
              prop="item"
              width="159px"
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-name">
                  <p>{{scope.row.item}}</p>
                  <p>{{scope.row.itemEn}}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              :index=2
              width="120px"
              option="originalFinished"
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div>{{scope.row.originalNum ? scope.row.originalNum : '不需要'}}</div>
                  <div class="checked" v-if="scope.row.originalNum && scope.row.originalFinished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
             <el-table-column
              type="index"
              :index=3
              width="120px"
              option="electronicFinished"
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div>{{scope.row.electronicDocNum ? scope.row.electronicDocNum : '不需要'}}</div>
                  <div class="checked" v-if="scope.row.electronicDocNum && scope.row.electronicFinished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="seal"
              width="140px"
              :render-header="customFieldColumn">
            </el-table-column>
            <el-table-column
              option="finished"
              type="index"
              :index=5
              width="120px"
              :render-header="customFieldColumn">
              <template slot-scope="scope">
                <div class="check-list-value">
                  <div class="checked" v-if="scope.row.finished === 'Y'"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              width="160px"
              :render-header="customFieldColumn">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="询价信息"
      :visible.sync="dialogXJVisible"
      @close="handleCancle"
      :close-on-click-modal="false"
      width="1000px"
      center>
      <inquire-message :inquiryMessage="inquiryMessage"></inquire-message>
    </el-dialog>
</div>
</template>

<script>
import { getQuoteNo, getImportOrderDetail, connectImportJobNo, getImportOrderNode, checkChangeQuoteNo } from 'api/order'
import { getAttachCheckList, putAttachCheck } from 'api/import'
import { getDcImportOrderFee, getAcImportOrderFee } from 'api/finance'
import stepInfo from './import-step'
import { mapGetters } from 'vuex'
import importDetail from './import-detail'
import importUpload from './import-upload'
import expenseDetailShark from './import-order-fee-ac'
import importOrderFee from './import-order-fee'
import inquireMessage from 'components/inquire-message/inquire-message'
import { roleType, getLocalStorage } from 'utils/utils'
export default {
  name: 'importOrderDetail',
  data () {
    return {
      search: '',
      dialogXJVisible: false,
      tableData: [],
      cateTitle: '',
      tableLable: [
        {
          label: '序号',
          labelEn: 'Serial No'
        },
        {
          label: '项目',
          labelEn: 'ITEM'
        },
        {
          label: '原件',
          labelEn: 'Original'
        },
        {
          label: '电子文档',
          labelEn: 'Electronic doc'
        },
        {
          label: '经营单位盖章',
          labelEn: 'Importer Stamp'
        },
        {
          label: '审核',
          labelEn: 'check'
        },
        {
          label: '备注',
          labelEn: 'Remarks'
        }
      ],
      inquiryMessage: {},
      quoteNo: '',
      quoteNoAc: '',
      quoteNoKt: '',
      targetJobNo: '',
      orderType: '进口清关',
      quoteNum: 'JKQG20190213',
      stepsList: [
        {
          nodeDescp: '已接单'
        },
        {
          nodeDescp: '已订舱'
        },
        {
          nodeDescp: '已离港'
        },
        {
          nodeDescp: '已收报关资料'
        },
        {
          nodeDescp: '已到港'
        },
        {
          nodeDescp: '已申报'
        },
        {
          nodeDescp: '已放行'
        },
        {
          nodeDescp: '已换单'
        },
        {
          nodeDescp: '已提柜'
        },
        {
          nodeDescp: '已直送'
        },
        {
          nodeDescp: '已到货'
        },
        {
          nodeDescp: '已离场'
        }
      ],
      checkListDialog: false,
      received: '',
      needed: '',
      checkList: [],
      compInfo: '',
      orderDetail: {},
      activeStep: null,
      DZSDname: '',
      BGname: '',
      DZSDfid: '',
      BGfid: '',
      showAC: false,
      isEdit: false,
      isDC: false,
      showAdmin: false,
      edit: false,
      customerFeeList: [],
      feeList: [],
      rolesCopy: []
    }
  },
  computed: {

    ...mapGetters(['userRoles'])
  },
  inject: ['reload'],
  methods: {
    handleChangeRoute () {
      this.dialogXJVisible = true
      this.fetchQuoteMessage()
    },
    fetchQuoteMessage () {
      getQuoteNo(this.quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            this.inquiryMessage = res.data || {}
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
    handleCheckList (row, column, cell, event) {
      const option = {
        2: 'originalFinished',
        3: 'electronicFinished',
        5: 'finished'
      }
      row.electronicFinished = row.electronicFinished ? row.electronicFinished : 'N'
      row[option[column.index]] = row[option[column.index]] === 'Y' ? 'N' : 'Y'
      this.checkFinished(row, option[column.index])
      const checkParam = {
        electronicFinished: row.electronicFinished,
        finished: row.finished,
        originalFinished: row.originalFinished,
        id: row.id
      }
      putAttachCheck(checkParam)
        .then(res => {
          if (res.msg === 'success') {
            this.fetchCheckList()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchSharkFeeList (jobNo, params) {
      getAcImportOrderFee({ jobNo, ...params })
        .then(res => {
          if (res.msg === 'success') {
            // console.log(res)
            this.feeList = (res.data && res.data.records) || []
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSharkSelectChange (feeStatus) {
      this.fetchSharkFeeList(this.quoteNo, feeStatus)
    },
    handleSharkSendSuccess (feeStatus) {
      this.fetchSharkFeeList(this.quoteNo, feeStatus)
    },
    fetchCustomerFeeList (jobNo, feeStatus = '') {
      getDcImportOrderFee({ jobNo, feeStatus })
        .then(res => {
          if (res.msg === 'success') {
            this.customerFeeList = (res.data && res.data.records) || []
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCustomerSelectChange (feeStatus) {
      this.fetchCustomerFeeList(this.quoteNo, feeStatus)
    },
    handleCustomerSendSuccess (feeStatus) {
      this.fetchCustomerFeeList(this.quoteNo, feeStatus)
    },
    checkFinished (row, option) {
      if (option === 'finished') {
        if (row.finished === 'Y') {
          row.originalFinished = 'Y'
          row.electronicFinished = 'Y'
        } else {
          row.originalFinished = 'N'
          row.electronicFinished = 'N'
        }
      } else {
        if (row.originalFinished === 'Y' && row.electronicFinished === 'Y') {
          row.finished = 'Y'
        } else if ((row.originalFinished === 'Y' && !row.electronicDocNum) || (row.electronicFinished === 'Y' && !row.originalNum)) {
          row.finished = 'Y'
        } else {
          row.finished = 'N'
        }
      }
    },
    customFieldColumn (h, { column, $index }) {
      return (
        h('div', {
          class: 'table-list-head'
        }, [
          h('p', {
            domProps: {
              innerHTML: this.tableLable[$index].label
            },
            class: 'p1'
          }),
          h('p', {
            domProps: {
              innerHTML: this.tableLable[$index].labelEn
            },
            class: 'p1'
          })
        ])
      )
    },
    getImportOrder (quoteNo) {
      getImportOrderDetail(quoteNo)
        .then(res => {
          if (res.msg === 'success') {
            // console.log(res)
            this.orderDetail = res.data || {}
            this.compInfo = res.data && res.data.compInfo
            this.quoteNoKt = res.data && res.data.quoteNoKt
            this.quoteNoAc = res.data && res.data.quoteNoAc
            this.quoteNo = res.data && res.data.quoteNo
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleClickCheckList () {
      this.checkListDialog = true
      this.fetchCheckList()
    },
    handleCancleDialog () {

    },
    handleEdit () {
      this.edit = true
    },
    handleCancle () {
      this.edit = false
    },
    handleComfirm () {
      const params = {
        sourcejobNo: this.quoteNo,
        targetJobNo: this.targetJobNo
      }
      connectImportJobNo(params)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('关联成功')
            this.$router.push({ name: 'importOrderDetail', params: { quoteNo: this.targetJobNo } })
            this.reload()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchCheckList () {
      getAttachCheckList(this.quoteNo)
        .then(res => {
          if (res.msg === 'success') {
            this.needed = res.data && res.data.needed
            this.received = res.data && res.data.received
            let checkList = res.data ? res.data && (res.data.list || []) : []
            if (checkList.length === 0) return
            const typeArr = this.uniqute(checkList)
            this.checkList = this.formmatData(checkList, typeArr)
            this.checkList.forEach(item => {
              item.tableData.forEach(e => {
                if (e.seal === 'Y') {
                  e.seal = '需要'
                } else {
                  e.seal = '不需要'
                }
                if (!e.electronicDocNum) {
                  e.finished = e.originalFinished === 'Y' ? 'Y' : 'N'
                }
                if (!e.originalNum) {
                  e.finished = e.electronicFinished === 'Y' ? 'Y' : 'N'
                }
              })
              item.tableData.sort(function (a, b) {
                return a.seq - b.seq
              })
            })
            this.cateTitle = checkList[0].cate
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    uniqute (arr) {
      let typeArr = []
      for (var i = 0; i < arr.length; i++) {
        arr[i].edit = false
        arr[i].add = false
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].itemType === arr[j].itemType) {
            ++i
            j = i
          }
        }
        typeArr.push({ title: arr[i].itemType })
      }
      return typeArr
    },
    formmatData (data, type) {
      type.map(item => {
        item.tableData = []
        return item
      })
      data.forEach(item => {
        type.forEach(f => {
          if (item.itemType === f.title) {
            f.tableData.push(item)
          }
        })
      })
      return type
    },
    getOrederNode (quoteNo) {
      getImportOrderNode(quoteNo)
        .then(res => {
          if (res.msg === 'success') {
            console.log(res)
            this.stepsList = res.data && (res.data.records || [])
            this.stepsList.forEach((item, index) => {
              if (item.flag) {
                this.activeStep = index
                item.status = 'finish'
                if (item.nodeDescp.indexOf('已申报') !== -1) {
                  item.attachList.forEach(a => {
                    if (a.name.indexOf('报关单') !== -1) {
                      this.BGfid = a.fid
                      this.BGname = a.name
                    } else if (a.name.indexOf('电子税单') !== -1) {
                      this.DZSDfid = a.fid
                      this.DZSDname = a.name
                    }
                  })
                }
              }
            })
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleCheckQuoteNo (quoteNo) {
      checkChangeQuoteNo(quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            const quoteNo = res.data
            if (this.quoteNo !== quoteNo) {
              this.quoteNo = quoteNo
              this.$router.push({ name: 'importOrderDetail', params: { quoteNo: this.quoteNo } })
              this.reload()
            }
            this.getImportOrder(this.quoteNo)
            this.getOrederNode(this.quoteNo)
            this.fetchCheckList()
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  mounted () {
    this.quoteNo = this.$route.params.quoteNo
    console.log(this.userRoles)
    this.rolesCopy = this.userRoles || getLocalStorage('user_roles') ? JSON.parse(getLocalStorage('user_roles')) : []
    // console.log(this.quoteNo)
    this.handleCheckQuoteNo(this.quoteNo)
    if (roleType(this.rolesCopy, 'AC')) {
      const showACList = ['AC_IMPORT_GLY', 'AC_GLY', 'AC_IMPORT_KF', 'AC_IMPORT_CZ']
      const editList = ['AC_IMPORT_GLY', 'AC_IMPORT_DOC', 'AC_IMPORT_DZ', 'AC_GLY']
      this.showAC = showACList.some(item => {
        return this.rolesCopy.indexOf(item) > -1
      })
      this.isEdit = editList.some(item => {
        return this.rolesCopy.indexOf(item) > -1
      })
      this.fetchSharkFeeList(this.quoteNo)
    }

    if (this.rolesCopy.indexOf('AC_KF') > -1 || this.rolesCopy.indexOf('AC_GLY') > -1 || this.rolesCopy.indexOf('AC_IMPORT_GLY') > -1) {
      this.showAdmin = true
    }

    this.isDC = roleType(this.rolesCopy, 'DC')
    if (this.isDC) {
      this.fetchCustomerFeeList(this.quoteNo)
    }
  },
  components: {
    stepInfo,
    importDetail,
    importUpload,
    expenseDetailShark,
    importOrderFee,
    inquireMessage
  }
}
</script>

<style lang='stylus' scoped>
@import "~styles/variable"
.import-order-detail
  width 100%
  background #F0F2F5
  overflow hidden
  padding 0px
  min-width 1100px
  box-sizing border-box
  .section
    width 100%
    position relative
    background #ffffff
    margin-bottom 14px
    overflow hidden
    .title
      padding 20px
      font-size 14px
      // border-bottom  1px solid #F0F2F5
      display flex
      align-items center
      justify-content space-between
      .wrap
        width 28%
        margin-left 4%
        &:first-child
          margin-left 0
          min-width 400px
        &:last-child
          margin-left 0
          width 40%
          justify-content flex-end
          min-width 500px
        &:nth-child(2)
          width 16%
          min-width 164px
      .title-name
        min-width 70px
        color #7a7e85
        font-size 12px
      .title-value
        font-size 12px
        color #353535
        flex 1
      .title-content
        display flex
        align-items center
      .title-h4
        color #353535
        font-weight bold
        min-width 98px
      .title-btn
        width 98px
        height 30px

        margin-left 10px
        border-radius 15px
        background #F0F2F5
        display flex
        align-items center
        justify-content center
        cursor pointer
        min-width 100px
        .btn-icon
          width 12px
          height 14px
          background url('./img/xunjia.png')no-repeat center/100%
          margin-right 10px
        .btn-icon1
          min-width 12px
          height 14px
          background url('./img/download-grey.png')no-repeat center/100%
          margin-right 10px
        .btn-icon-active
          background url('./img/download-active.png')no-repeat center/100%
        .btn-p
          font-size 12px
          color #353535
          font-weight 500
          line-height 16px
          border-bottom 1px solid #353535
      .title-p
        .key
          color #7A7E85
          font-size 12px
          font-weight 500
        .val
          font-size 12px
          margin-left 14px
    .tl
      margin-left 14px
    .title-right
      display flex
      align-items center
    .bd-title-right
      display flex
      align-items center
      margin-left 20px
      .key
        color #7a7e85
      .bd-edit
        width 100%
        display flex
        align-items center
      .bd-label
        color: $font-color-black
      .bd-key
        margin-right 10px
      .bd-input
        width 126px
        height 30px
        font-size 12px
      .bd-btn
        color #FBB03B
        font-size 12px
        font-weight 500
        text-decoration underline
      .tips
        color: #353535
        font-size 12px
        margin-left 14px
      .btn-edit
        background #409EFF
      .btn-com
        color #FBB03B
      .btn-cal
        color #353535
      .btn-box
        display flex
        justify-content space-between
        margin-left 10px
    .content
      margin 10px 0
      span
        font-size 14px
      .key
        margin-right 10px
  >>>.el-dialog__header
     border-bottom 1px solid #F1F1F1
  .dialog-header
    display flex
    align-items center
    .header-title
      font-size 14px
      color #353535
      font-weight bold
    .header-p
      font-size 12px
      color #7A7E85
      font-weight 500
      margin-left 20px
    .header-text
      font-size 12px
      color #353535
      font-weight 500
  >>>.table-check-list
    .table-list-head
      padding-left 0
      .p1
        line-height 16px
        font-size 12px
        color #B0B5BD
        font-weight bold
    .check-list-name
      p
        line-height 24px
  .dialog-content
    max-height 500px
    padding-top 30px
    box-sizing border-box
    overflow-y scroll
    .content-section
      margin 0 20px 30px
      &:last-child
        margin-bottom 0
      .section-title
        display inline-block
        background:rgba(226,231,238,1)
        border-radius:4px 4px 0px 0px
        padding 3px 35px
        color #353535
        font-size 12px
        font-weight bold
      .check-list-value
        display flex
        align-items center
        width 100%
        height 40px
        .checked
          width 10px
          height 14px
          margin-left 14px
          background url('./img/gou.png')no-repeat center/100%
</style>
