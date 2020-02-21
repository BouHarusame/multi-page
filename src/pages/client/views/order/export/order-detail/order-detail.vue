<template>
  <div class="detail-info-wrapper">
    <div class="steps-wrapper">
      <stepInfo :pStepList="stepsList" :pActiveStep="activeStep" :pDefaultNode="defaultNode" @on-click-node="handleClickStep"/>
    </div>
    <div class="progress-operation-wrapper">
      <div class="progress-wrapper">
        <progress-info :pTransportType="transportType" :pStepName="stepName" :pViewMode="viewMode" :pNodeObj="nodeObj" @on-save-success="handleSaveSuccess" @on-save-truck-success="handleSaveTruckSuccess"/>
      </div>
      <div style="width: 10px"></div>
      <div class="operation-wrapper">
        <message-info :pJobNo="jobNo"/>
      </div>
    </div>
    <div class="upload-wrapper">
      <upload-info :pAttachmentList="attachmentList" :pJobNo="jobNo" :pNodeSeq="activeStep" @on-upload-success="handleUploadSuccess" @on-delete-success="handleDeleteSuccess" @on-analysis-success="handleAnalysisSuccess"/>
    </div>
    <div class="booking-info-wrapper">
      <booking-detail :pOrderDetailInfo="orderDetailInfo" :jobNo="jobNo"/>
    </div>
    <div class="expense-detail-wrapper">
      <expense-detail-shark v-if="isAC" :pFeeList="feeList" @on-select-change="handleSharkSelectChange" @on-send-success="handleSharkSendSuccess"/>
      <expense-detail-customer v-if="isDC" :pCustomerFeeList="customerFeeList" @on-select-change="handleCustomerSelectChange" @on-send-success="handleCustomerSendSuccess"/>
    </div>
    <el-dialog title="查看解析结果" :visible.sync="analysisVisible" fullscreen  v-dialogDrag:close-on-click-modal="false">
      <!-- <div class="dialog-body">
        <div class="line" v-dialogDragWidth> -->
      <div class="analysis-left">
        <embed :src="pdfUrl" type="application/pdf" width="100%" height="100%">
      </div>
      <div class="analysis-right">
        <el-form :data="analysisForm">
          <template v-for="(item, i) in analysisForm">
            <el-form-item :key="i" :label="item.keyDescription" label-width="80px">
              <el-input v-model="item.propertyValue" autocomplete="off"></el-input>
            </el-form-item>
          </template>
        </el-form>
      </div>
        <!-- </div>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import { getNodeInfo, getOrderDetail, getOrderAttachs } from 'api/order'
import { getAcOrderFee, getDcOrderFee } from 'api/finance'
import { mapGetters } from 'vuex'
// import {DETAIL_INFO_STEPS} from 'common/js/constant'
import stepInfo from 'components/export-order-detail/step-info'
import progressInfo from 'components/export-order-detail/progress-info'
import messageInfo from 'components/export-order-detail/message-info'
import uploadInfo from 'components/export-order-detail/upload-info'
import bookingDetail from 'components/export-order-detail/booking-detail'
import expenseDetailShark from 'components/export-order-detail/expense-detail-ac'
import expenseDetailCustomer from 'components/export-order-detail/expense-detail-customer'
import { roleType } from 'utils/utils'
import '@/directives/dialog-drag'
export default {
  data () {
    return {
      jobNo: '',
      activeStep: -1,
      maxNode: -1, // 0, 1, 2, 3...
      defaultNode: -1, // nodeSeq: 10, 20, 30 ...
      stepsList: [],
      orderList: [],
      feeList: [],
      customerFeeList: [],
      transportType: 'ocean', // ocean, air
      stepName: '',
      viewMode: '', // view, edit
      nodeObj: {},
      orderDetailInfo: {},
      attachmentList: [],
      isAC: false,
      isDC: false,
      analysisVisible: false,
      analysisForm: [],
      pdfUrl: ''
    }
  },
  mounted () {
    this.jobNo = this.$route.params.jobNo
    this.fetchNodeInfo(this.jobNo) // 'SKYM18101006'
    this.fetchOrderDetailInfo(this.jobNo)
    this.isAC = roleType(this.userRoles, 'AC')
    this.isDC = roleType(this.userRoles, 'DC')
    if (this.isAC) {
      this.fetchSharkFeeList(this.jobNo)
    }
    if (this.isDC) {
      this.fetchCustomerFeeList(this.jobNo)
    }
  },
  methods: {
    fetchNodeInfo (jobNo) {
      getNodeInfo(jobNo)
        .then(res => {
          if (res.msg === 'success') {
            this.orderList = res.data.records
            this.stepsList = []
            this.nodeObj = {}
            this.orderList.forEach((item, index) => {
              // 初始化status， 如果flag = true， 显示finish
              if (item && item.nodeDescp) {
                item.status = 'wait'
                if (item.flag) {
                  item.status = 'finish'
                }
                this.stepsList.push(item)
                // 寻找第一个未完成节点 -> defaultNode
                if (item && !item.flag && this.activeStep === -1) {
                  this.activeStep = item.nodeSeq
                  this.maxNode = index
                  this.defaultNode = item.nodeSeq
                  this.stepName = item.nodeDescp
                  // item.status = 'current-' + item.status
                  // 选中default node
                  item.status = 'current-default'
                }
                if (item.jsonData) {
                  item.jsonData = JSON.parse(item.jsonData)
                }
              }
              // 赋值当前展示的节点信息
              if (this.activeStep !== -1 && this.activeStep === item.nodeSeq) {
                this.nodeObj = item
                this.fetchAttachment(item.nodeSeq)
              }
            })
            // 如果全部完成，默认选中最后一个节点
            if (this.activeStep === -1) {
              let lastNodeSeq = this.orderList[this.orderList.length - 1].nodeSeq
              if (lastNodeSeq) {
                this.handleClickStep(lastNodeSeq)
              }
            }
            this.transportType = 'ocean'
            if (roleType(this.userRoles, 'AC')) {
              this.viewMode = 'edit'
            } else {
              this.viewMode = 'view'
            }
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchOrderDetailInfo (jobNo) {
      getOrderDetail(jobNo)
        .then(res => {
          if (res.msg === 'success') {
            this.orderDetailInfo = res.data
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
      getAcOrderFee({
        jobNo,
        params
      })
        .then(res => {
          if (res.msg === 'success') {
            console.log(res)
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
    fetchCustomerFeeList (jobNo, feeStatus = '') {
      getDcOrderFee({
        jobNo,
        feeStatus
      })
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
    handleSharkSelectChange (feeStatus) {
      this.fetchSharkFeeList(this.jobNo, feeStatus)
    },
    handleCustomerSelectChange (feeStatus) {
      this.fetchCustomerFeeList(this.jobNo, feeStatus)
    },
    handleSharkSendSuccess (feeStatus) {
      this.fetchSharkFeeList(this.jobNo, feeStatus)
    },
    handleCustomerSendSuccess (feeStatus) {
      this.fetchCustomerFeeList(this.jobNo, feeStatus)
    },
    handleSaveSuccess (nodeSeq) {
      this.activeStep = -1
      this.fetchNodeInfo(this.jobNo)
    },
    handleSaveTruckSuccess (chepaiArray) {
      this.orderList.forEach((item, vindex) => {
        if (item.nodeSeq === 30) {
          item.jsonData = chepaiArray
        }
      })
    },
    handleClickStep (vNodeSeq) {
      // if (index > this.maxNode) {
      //   return
      // }
      // 当前点击的节点nodeSeq: 10, 20, 30....
      this.activeStep = vNodeSeq
      this.orderList.forEach((item, vindex) => {
        // 初始化非默认节点状态
        item.status = 'wait'
        if (item.flag) {
          item.status = 'finish'
        }
        // 初始化默认节点状态
        if (item.nodeSeq === this.defaultNode) {
          item.status = 'default'
        }
        if (vNodeSeq === item.nodeSeq) { // 当前节点为点击节点
          if (item.nodeSeq === this.defaultNode) { // 当前节点为默认节点
            item.status = 'current-default'
          } else { // 当前节点为非默认节点，更改为对应 的选中状态
            item.status = 'current-' + item.status
          }
          this.nodeObj = item
          this.stepName = item.nodeDescp
        }
      })
      this.fetchAttachment(vNodeSeq)
    },
    fetchAttachment (vNodeSeq) {
      getOrderAttachs(this.jobNo)
        .then(res => {
          if (res.msg === 'success') {
            this.attachmentList = (res.data && res.data.records) || []
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleUploadSuccess () {
      this.fetchAttachment(this.activeStep)
    },
    handleDeleteSuccess () {
      this.fetchAttachment(this.activeStep)
    },
    handleAnalysisSuccess () {
      this.fetchAttachment()
      let that = this
      setTimeout(function () {
        that.fetchAttachment()
      }, 5000)
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  components: {
    stepInfo,
    progressInfo,
    messageInfo,
    uploadInfo,
    bookingDetail,
    expenseDetailShark,
    expenseDetailCustomer
  }
}
</script>

<style lang="stylus">
.detail-info-wrapper
  background-color: #f0f0f0!important
  padding: 0px !important
  box-sizing: border-box
  .steps-wrapper
    margin: 10px auto
    height: 95px
    text-align: center
    padding: 10px
    background-color: #FFFFFF
    border: 1px solid #E1E1E1
    box-sizing: border-box
    border-radius:5px
  .progress-operation-wrapper
    display: flex
    margin: 10px auto
    min-height: 230px
    // justify-content: space-between
    .progress-wrapper
      flex: 1
      border: 1px solid #E1E1E1
      border-radius:5px
      // border-right: none
      // width: 49%
      background-color: #fff
      height: 230px
      // overflow-y: scroll
    .operation-wrapper
      flex: 1
      border: 1px solid #E1E1E1
      border-radius:5px
      // width: 49%
      background-color: #fff
      height: 230px
      // overflow-y: scroll
  .upload-wrapper
    border: 1px solid #E1E1E1
    border-radius:5px
    margin: 10px auto
    background-color: #fff
  .booking-info-wrapper
    border: 1px solid #E1E1E1
    border-radius:5px
    margin: 10px auto
    background-color: #fff
  .expense-detail-wrapper
    border: 1px solid #E1E1E1
    border-radius:5px
    margin: 10px auto
    background-color: #fff
  .el-dialog
    width 80%
    .el-dialog__body
      display flex
      justify-content space-between
      height 86%
      .analysis-left, .analysis-right
        width 50%
</style>
