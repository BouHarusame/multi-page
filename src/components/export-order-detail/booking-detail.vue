<template>
  <div class="booking-detail-wrapper">
    <div class="bd-title">
      <span class="bd-title-left">订单详情-{{orderDetailInfo.ywdm}}</span>
      <div class="bd-title-right" v-if="showAC">
        <!-- <span class="bd-label">业务编号：</span>
        <span v-if="!edit" class="bd-key">{{jobNo}}</span>
        <el-input v-else v-model="jobNoKt" class="bd-input"></el-input>
        <el-button v-if="!edit" class="bd-btn btn-edit" @click="handleEdit">编辑</el-button>
        <div class="btn-box" v-else><el-button class="bd-btn btn-com" @click="handleComfirm">确认</el-button><el-button class="bd-btn btn-cal" @click="handleCancle">取消</el-button></div> -->
        <el-button class="bd-btn btn-edit" @click="handleEdit">关联业务编号</el-button><span class="tips">({{orderDetailInfo.bindedFlag ? '已关联' : '未关联'}})</span>
      </div>
    </div>
    <div class="top-wrapper">
      <div class="clearfix">
        <div class="di-item fl">
          <p class="dii-title">Shipper发货人：</p>
          <p class="dii-text" v-html="formatTab(orderDetailInfo.shipper)"></p>
        </div>
        <div class="di-item di-item-2 fl">
          <p class="dii-title">Consignee收货人：</p>
          <p class="dii-text" v-html="formatTab(orderDetailInfo.consignee)"></p>
        </div>
        <div class="di-item di-item-3 fl">
          <p class="dii-title dii-title-no">
            <span>B/L NO:</span>
            <span>{{orderDetailInfo.billNo}}</span>
          </p>
        </div>
      </div>
      <div class="clearfix">
        <div class="di-item fl">
          <p class="dii-title">Notify通知人：</p>
          <p class="dii-text" v-html="formatTab(orderDetailInfo.notify)"></p>
        </div>
        <div class="di-item fl">
          <div class="fl">
            <p class="dii-title">Vessel/Voy.No船名航次：</p>
            <p class="dii-text">{{orderDetailInfo.shipNameVesselNo}}</p>
          </div>
          <div class="fl">
            <img src="./img/world-ship.png" @click="handleShowWorldShip" v-if="orderDetailInfo.freightMethod === 'OCEAN'">
            <img src="./img/world-plane.png" @click="handleShowWorldPlane" v-if="orderDetailInfo.freightMethod === 'AIR'">
          </div>
        </div>
        <div class="di-item-3 fl">
          <p class="dii-title">客服：</p>
          <p class="dii-text">{{orderDetailInfo.kefu}}</p>
        </div>
      </div>
      <div class="clearfix">
        <div class="di-item fl">
          <p class="dii-title">Port of loading起运港：</p>
          <p class="dii-text">{{orderDetailInfo.startPort}}</p>
        </div>
        <div class="di-item fl">
          <p class="dii-title">Place of destionation目的港：</p>
          <p class="dii-text">{{orderDetailInfo.targetPort}}</p>
        </div>
        <div class="di-item di-item-3 fl">
          <p class="dii-title">Port of discharge卸货港：</p>
          <p class="dii-text">{{orderDetailInfo.unloadPort}}</p>
        </div>
      </div>
    </div>
    <div class="bottom-wrapper">
      <div class="bw-item-1 clearfix">
        <div class="fl" style="width: 21%">
          <p class="bw-title">Marks＆numbers唛头和编号</p>
          <p class="bw-text">{{orderDetailInfo.marks}}</p>
        </div>
        <div class="fl" style="width: 14%">
          <p class="bw-title">Pkgs件数包装</p>
          <p class="bw-text">{{orderDetailInfo.pkgs}}</p>
        </div>
        <div class="fl" style="width: 25%">
          <p class="bw-title">Description of goods货物英文品名</p>
          <p class="bw-text">{{orderDetailInfo.cargoDesc}}</p>
        </div>
        <div class="fl" style="width: 20%">
          <p class="bw-title">Gross weight毛重（KGS）</p>
          <p class="bw-text">{{orderDetailInfo.cargoWeight}}</p>
        </div>
        <div class="fl" >
          <p class="bw-title">Measurement体积（CBM）</p>
          <p class="bw-text">{{orderDetailInfo.cargoVolumn}}</p>
        </div>
      </div>
      <div class="bw-item-2 clearfix">
        <div class="fl bi2-xh" style="width: 20%;">
          <span v-html="formatTab(orderDetailInfo.containerSealNo)"></span>
        </div>
        <div class="fl" style="width: 15%">
          <p class="bw-title">运输条款：</p>
          <p class="bw-text">{{orderDetailInfo.shipmentType}}</p>
        </div>
        <div class="fl" style="width: 25%">
          <p class="bw-title bw-title-yf">运费 P/C：</p>
          <p class="bw-text bw-text-yf">{{orderDetailInfo.paymentType}}</p>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="jobNoDialogVisible"
      :close-on-click-modal="false"
      title="关联业务编号"
      width="800px"
    >
      <div>
         <div class="search-box">
           <div class="search-box-item">
             <span class="item-label">业务编号:</span>
             <el-input class="item-input" v-model="jobNoQuery" clearable></el-input>
           </div>
           <div class="search-box-item">
             <span class="item-label">类型:</span>
             <el-select v-model="yw"
                         clearable
                         placeholder="请选择"
                         size="small">
                <el-option v-for="item in ywTypes"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
           </div>
           <div class="search-box-item">
             <el-button class="search-btn" @click="fetchsourceJobNo">搜索</el-button>
           </div>
         </div>
         <el-table
          :data="sourceJobNo"
          border
          style="width: 100%">
          <el-table-column
            prop="jobNo"
            label="业务编号"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="yw"
            label="类型"
            min-width="80">
          </el-table-column>
          <el-table-column
            prop="target"
            label="目的地"
            min-width="120">
          </el-table-column>
          <el-table-column
            label="录单/下单时间"
            min-width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="scope.row.orderTimeAll" placement="top-start">
                <div>{{scope.row.orderTime}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="录单/下单人"
            min-width="100">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleComfirm(scope.row)" type="text" size="small">关联</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      title="船舶查询"
      width="90%"
    >
      <world-ship :pShipName="shipName" v-if="orderDetailInfo.freightMethod === 'OCEAN'"></world-ship>
      <world-plane :pPlaneName="planeName" v-if="orderDetailInfo.freightMethod === 'AIR'"></world-plane>
    </el-dialog>
  </div>
</template>

<script>
import { connectJobNo, changeJobNo } from 'api/order'
import { mapGetters } from 'vuex'
import { deepCopy, formatKangTaiTab, roleType, getLocalStorage } from 'utils/utils'
import WorldShip from 'components/detail-map/world-ship'
import WorldPlane from 'components/detail-map/world-plane'
export default {
  name: 'booking-detail',
  props: {
    pOrderDetailInfo: Object,
    jobNo: String
  },
  data () {
    return {
      ywTypes: [{
        label: '整箱',
        value: 'A'
      },
      {
        label: '拼箱',
        value: 'B'
      },
      {
        label: '空出',
        value: 'K'
      },
      {
        label: '外拼',
        value: 'C'
      },
      {
        label: '出散',
        value: 'E'
      }],
      jobNoQuery: '',
      yw: '',
      jobNoDialogVisible: false,
      orderDetailInfo: {},
      sourceJobNo: [],
      dialogVisible: false,
      shipName: '',
      planeName: '',
      // edit: false,
      // jobNoKt: '',
      showAC: false
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  mounted () {
    if (roleType(this.userRoles, 'AC') || (getLocalStorage('user_roles') && roleType(JSON.parse(getLocalStorage('user_roles')), 'AC'))) {
      this.showAC = true
    }
  },
  inject: ['reload'],
  methods: {
    fetchsourceJobNo () {
      console.log(this.jobNo)
      let params = {
        jobNoQuery: this.jobNoQuery,
        yw: this.yw
      }
      connectJobNo(this.jobNo, params)
        .then(res => {
          if (res.msg === 'success') {
            let sourceJobNo = res.data && (res.data.records || [])
            this.sourceJobNo = sourceJobNo.map(item => {
              if (item.orderTime) {
                let time = new Date(item.orderTime)
                item.orderTime = time.toLocaleDateString()
                item.orderTimeAll = time.toLocaleDateString() + ' ' + time.toLocaleTimeString()
              }
              return item
            })
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleComfirm (row) {
      console.log(row)
      const params = {
        jobNoSource: this.jobNo,
        jobNoTarget: row.jobNo
      }
      changeJobNo(params)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('关联成功')
            let change = res.data.change
            if (change) {
              this.$router.push({ name: 'detailInfo', params: { jobNo: row.jobNo } })
            }
            this.reload()
            this.jobNoDialogVisible = false
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCancle () {
      this.jobNoDialogVisible = false
      this.jobNoQuery = ''
      this.yw = ''
    },
    handleEdit () {
      // this.jobNoKt = this.jobNo
      this.jobNoDialogVisible = true
      this.fetchsourceJobNo()
    },
    formatTab (v) {
      return formatKangTaiTab(v)
    },
    handleShowWorldShip () {
      this.dialogVisible = true
    },
    handleShowWorldPlane () {
      this.$message.info('飞机查询功能暂未开放')
      // this.dialogVisible = true
    }
  },
  components: {
    WorldShip,
    WorldPlane
  },
  watch: {
    pOrderDetailInfo: {
      handler (nv) {
        let orderDetailInfo = deepCopy(nv)
        this.ywTypes.forEach(item => {
          if (item.value === orderDetailInfo.ywdm) {
            orderDetailInfo.ywdm = item.label
          }
        })
        this.orderDetailInfo = orderDetailInfo
        if (this.orderDetailInfo.shipNameVesselNo) {
          let seprate = this.orderDetailInfo.shipNameVesselNo.indexOf('V.') - 1
          if (seprate > 0) {
            this.shipName = this.orderDetailInfo.shipNameVesselNo.slice(0, seprate).trim()
          }
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="stylus">
@import "~styles/variable"
.booking-detail-wrapper
  .bd-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    padding-left: 10px
    padding-right: 10px
    display flex
    justify-content space-between
    align-item center
    .bd-title-left
      display: block
      color: $font-color-black
      font-weight: bold
    .bd-title-right
      display: block
      display flex
      align-items center
      .bd-label
        color: $font-color-black
      .bd-key
        margin-right 10px
      .bd-input
        width 180px
        font-size 14px
      .bd-btn
        width 140px
        height 32px
        color #ffffff
        font-size 14px
      .tips
        color: #fbb03b
        font-size 14px
        height 32px
        line-height 32px
        padding 0 6px
      .btn-edit
        background #409EFF
      .btn-com
        background #67c23a
      .btn-cal
        background #f6ab39
      .btn-box
        display flex
        justify-content space-between
        margin-left 10px
  .top-wrapper
    .di-item
      width: 35%
      padding: 10px 0
      display: inline-block
      vertical-align: top
    .di-item-3
      width: 29%
    .dii-title
      padding: 10px
      // font-family: 'PingFang-SC-Heavy'
      font-weight: 700
    .dii-text
      padding: 10px
      line-height: 24px
    .dii-title-no
      // font-family: 'PingFang-SC-Medium'
      color: #414141
      font-size: 16px
  .bottom-wrapper
    border-top: 1px solid #EEEEEE
    padding-bottom: 10px
    .bw-item-1
      margin-top: 10px
      .bw-title
        padding: 10px
        // font-family: 'PingFang-SC-Heavy'
        font-weight: 700
      .bw-text
        padding: 0px 10px
    .bw-item-2
      margin-top: 20px
      margin-bottom: 20px
      .bi2-xh
        padding-left: 10px
        box-sizing: border-box
      .bw-title
        padding-left: 20px
        // font-family: 'PingFang-SC-Heavy'
        font-weight: 700
      .bw-title-yf
        padding-left: 10px
      .bw-text
        padding-left: 20px
        padding-top: 10px
      .bw-text-yf
        padding-left: 10px
  .el-dialog__body
    padding-top: 0px
  .search-box
    display flex
    margin-bottom 20px
    .search-box-item
      diplay flex
      align-items center
      margin-right 10px
      .item-label
        font-size 14px
      .item-input
        width 180px
        font-size 14px
      .search-btn
        color #ffffff
        &:hover
          color #ffffff
</style>
