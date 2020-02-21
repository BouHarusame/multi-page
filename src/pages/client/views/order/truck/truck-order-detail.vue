<template>
  <div class="details">
    <div class="section">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane v-for="(item,index) in Boxshape" :key="index">
      <span slot="label" style="width:300px;" v-if="item.containerNo"><small class="ring">箱</small>{{item.containerNo}}</span>
      <span slot="label" style="width:300px;" v-else><small class="ring">箱</small>暂无箱号</span>
      <div class="annotation">
            <div><small class="ring">提</small>{{item.subBillNo}}</div>
            <div><i class="el-icon-location-outline map" v-if="item.driverPlate"></i></div>
            <div><p class="grey">{{item.boxType}}</p></div>
      </div>
      <truckOrderStep :pStepList="stepsList" :pActiveStep="activeStep"/>
      <shipBoxTable :orderDetail="orderDetail"/>
      </el-tab-pane>
    </el-tabs>
    </div>
    <div class="section">
      <requestInfoDetail :orderDetail="orderDetail" />
    </div>
    <div class="section">
      <truckFee />
    </div>
  </div>
</template>

<script>
import { getTruckOrderDetail } from 'api/truck'
import truckOrderStep from './componentpage/truck-order-step'
import requestInfoDetail from './componentpage/request-info-detail'
import truckFee from './componentpage/truck-fee'
import shipBoxTable from './componentpage/ship-box-table'
export default {
  name: 'truckOrderDetail',
  components: {
    truckOrderStep,
    requestInfoDetail,
    truckFee,
    shipBoxTable
  },
  props: {},
  data () {
    return {
      Boxshape: [],
      tabPosition: 'left',
      activeStep: null,
      orderDetail: {},
      stepsList: []
    }
  },
  methods: {
    // 客户(同行)拖车订单详情
    fetchpeerOrderDetails (jobNo) {
      getTruckOrderDetail(jobNo)
        .then(res => {
          this.orderDetail = res.data
          this.Boxshape = res.data.boxList
          this.Boxshape.forEach(item => {
            let stepsList = item.statusList
            this.stepsList = stepsList.map(item => {
              item.stepStatus = item.completedFlag === 'Y' ? 'finish' : ''
              return item
            })
          })
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    }
  },
  mounted () {
    if (this.$route.params.jobNo) {
      let jobNo = this.$route.params.jobNo
      this.fetchpeerOrderDetails(jobNo)
    }
  }
}
</script>
<style lang="stylus" scoped>
.details
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
    border-radius 10px
    .step-info
      margin-top 50px
    .title
      width 90%
      margin 0 auto
      padding 20px
      font-size 14px
      display flex
      align-items center
      justify-content space-between
      .title-h4
        color #000
        font-size 20px
        font-weight bold
  .table-top,.table-bottom
    width 90%
    margin 0 auto
  >>>.el-tabs__header
    margin 0
.ring
  width 20px
  height 20px
  border 1px solid black
  border-radius 50%
  display inline-block
  line-height 20px
  text-align center
  margin-right 12px
>>>.is-active
  background #E5E5E5
.is-active
  .ring
    border-color #f6ab39
.annotation
  width 90%
  height 50px
  margin 0 auto
  margin-top 30px
  display flex
  div
    width 33.3333%
    height 50px
    .map
      margin-left 150px
      font-size 20px
      color #E2695F
  .grey
    width 90px
    height 40px
    background #D9D9D9
    border-radius 10px
    margin-left calc(100% - 90px)
    text-align center
    line-height 2.5
>>>.el-tabs__nav
  width 200px
>>>.el-tabs--left .el-tabs__item.is-left
  text-align left
  height 55px
  line-height 4
</style>
