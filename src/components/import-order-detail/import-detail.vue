<template>
<div class="import-detail">
  <div class="section">
    <div class="title">
      <h4 class="title-h4">订单明细</h4>
      <p class="title-p"><span class="key">客服:</span><span class="val">{{orderDetail.keFu}}</span></p>
    </div>
    <div class="table">
      <div class="table-row-title">国际运输信息</div>
      <div class="table-row">
        <div class="table-row-cell">
          <p class="table-title">起运港：</p>
          <p class="table-con">{{orderDetail.startPort}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">目的港：</p>
          <p class="table-con">{{orderDetail.targetPort}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">提单号：</p>
          <p class="table-con">{{orderDetail.billNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">运输方式：</p>
          <p class="table-con">{{orderDetail.transferWay}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">船名航次：</p>
          <p class="table-con">{{orderDetail.shipInfo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">集装箱号：</p>
          <p class="table-con">{{orderDetail.boxNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">运量：</p>
          <p class="table-con">{{orderDetail.transferCapacity}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">提单品名：</p>
          <p class="table-con">{{orderDetail.billGoodsName}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">提单件数：</p>
          <p class="table-con">{{orderDetail.billUnits}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">提单毛重（KGS）：</p>
          <p class="table-con">{{orderDetail.billGrossWeight}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">提单体积（CBM）：</p>
          <p class="table-con">{{orderDetail.billVolume}}</p>
        </div>
      </div>
      <div class="table-row-title">海关申报信息</div>
      <div class="table-row">
        <div class="table-row-cell">
          <p class="table-title">境内收货人：</p>
          <p class="table-con" v-if="orderDetail.receiver && orderDetail.receiver.length < 20">{{orderDetail.receiver}}</p>
          <el-popover
              v-else
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{orderDetail.receiver}}</div>
              <p class="table-con" slot="reference">{{orderDetail.receiver}}</p>
            </el-popover>
        </div>
        <div class="table-row-cell">
          <p class="table-title">消费使用单位：</p>
          <p class="table-con" v-if="orderDetail.consumer && orderDetail.consumer.length < 20">{{orderDetail.consumer}}</p>
          <el-popover
              v-else
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{orderDetail.consumer}}</div>
              <p class="table-con" slot="reference">{{orderDetail.consumer}}</p>
            </el-popover>
        </div>
        <div class="table-row-cell">
          <p class="table-title">合同号：</p>
          <p class="table-con">{{orderDetail.contractNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">监管方式：</p>
          <p class="table-con">{{orderDetail.regulationPattern}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">成交方式：</p>
          <p class="table-con">{{orderDetail.dealPattern}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">原产国：</p>
          <p class="table-con">{{orderDetail.originCountry}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">申报件数：</p>
          <p class="table-con">{{orderDetail.declareUnits}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">申报毛重：</p>
          <p class="table-con">{{orderDetail.declareGrossWeight}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">申报净重：</p>
          <p class="table-con">{{orderDetail.declareWeight}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">申报总货值：</p>
          <p class="table-con">{{orderDetail.declareValue}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">运费：</p>
          <p class="table-con">{{orderDetail.transferFee}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">保费：</p>
          <p class="table-con">{{orderDetail.premium}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">杂费：</p>
          <p class="table-con">{{orderDetail.incidentalFee}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">报关单号：</p>
          <p class="table-con">{{orderDetail.bgdNo}}</p>
        </div>
        <!-- <div class="table-row-cell">
          <p class="table-title">报关单明细：</p>
          <p class="table-con">{{orderDetail.custDeclareInfo}}</p>
        </div> -->
      </div>
      <div class="table-row-title">拆箱派送信息</div>
      <div class="table-row">
        <div class="table-row-cell">
          <p class="table-title">拆箱/存放仓库：</p>
          <p class="table-con">{{orderDetail.warehouse}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">仓库地址：</p>
          <p class="table-con">{{orderDetail.warehouseAddr}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">入库情况：</p>
          <p class="table-con">{{orderDetail.warehouseArriveTag}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">离库情况：</p>
          <p class="table-con">{{orderDetail.warehouseLeftTag}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">送货地址：</p>
          <p class="table-con" v-if="orderDetail.sendAddr && orderDetail.sendAddr.length < 20">{{orderDetail.sendAddr}}</p>
          <el-popover
              v-else
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{orderDetail.sendAddr}}</div>
              <p class="table-con" slot="reference">{{orderDetail.sendAddr}}</p>
            </el-popover>
        </div>
        <div class="table-row-cell">
          <p class="table-title">联系人：</p>
          <p class="table-con">{{orderDetail.contact}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">联系方式：</p>
          <p class="table-con">{{orderDetail.mobile}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">送达情况：</p>
          <p class="table-con">{{orderDetail.sendStatus}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'importDetail',
  props: {
    orderDetail: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style lang='stylus' scoped>
.import-detail
  width 100%
  .section
    width 100%
    position relative
    background #ffffff
    margin-bottom 14px
    overflow hidden
    .title
      padding 20px
      font-size 14px
      border-bottom  1px solid #F0F2F5
      display flex
      align-items center
      justify-content space-between
      .title-h4
        color #353535
        font-weight bold
      .title-p
        .key
          color #7A7E85
          font-size 12px
          font-weight 500
        .val
          font-size 12px
          margin-left 14px
  .table
    width 100%
    box-sizing border-box
    padding 20px
    .table-row-title
      font-size 12px
      color #353535
      font-weight bold
    .table-row
      width 100%
      display flex
      align-items center
      flex-wrap wrap
      border-bottom 1px solid #f0f3f5
      margin-bottom 20px
      padding-bottom 30px
      &:last-child
        margin-bottom 10px
        padding-bottom 0
        border 0
      .table-row-cell
        margin 20px 0 0
        width 28%
        margin-left 8%
        background #F0F2F5
        border-radius 12px
        height 24px
        display flex
        align-items center
        &:nth-child(3n+1)
          margin-left 0
        .table-title
          font-size 12px
          font-weight 500
          color #7A7E85
          margin-left 14px
          min-width 64px
        .table-con
          font-size 12px
          margin-right 8px
          color #353535
          font-weight 500
        span
          &:last-child
            display: block;
            width: 62%;
            .table-con
              text-overflow ellipsis
              overflow hidden
              white-space nowrap
              width 100%
              display block
</style>
