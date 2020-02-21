<template>
<div class="import-detail">
  <div class="section">
    <div class="title">
      <h4 class="title-h4">委托信息</h4>
    </div>
    <div class="table">
      <div class="table-row">
         <div class="table-row-cell">
          <p class="table-title">自有业务编号：</p>
          <p class="table-con" v-if="orderDetail.customerNo">{{orderDetail.customerNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">港口：</p>
          <p class="table-con" v-if="orderDetail.startPort">{{orderDetail.startPort}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">主提单号：</p>
          <p class="table-con" v-if="orderDetail.billNo">{{orderDetail.billNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">分单号：</p>
          <p class="table-con" v-if="orderDetail.subBillNo">{{orderDetail.subBillNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">船公司：</p>
          <p class="table-con" v-if="orderDetail.shipCompany">{{orderDetail.shipCompany}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">船名航次：</p>
          <p class="table-con" v-if="orderDetail.shipNameVesselNo">{{orderDetail.shipNameVesselNo}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">中转港：</p>
          <p class="table-con" v-if="orderDetail.transitPort">{{orderDetail.transitPort}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">目的港：</p>
          <p class="table-con" v-if="orderDetail.targetPort">{{orderDetail.targetPort}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">箱型箱量：</p>
          <p class="table-con" v-if="orderDetail.totalXxxl">{{orderDetail.totalXxxl}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">总件数：</p>
          <p class="table-con" v-if="orderDetail.totalCount || orderDetail.totalCount === 0">{{orderDetail.totalCount}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">总毛重：</p>
          <p class="table-con" v-if="orderDetail.totalWeight || orderDetail.totalWeight === 0">{{orderDetail.totalWeight}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">总体积：</p>
          <p class="table-con" v-if="orderDetail.totalVolumn || orderDetail.totalVolumn === 0">{{orderDetail.totalVolumn}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">委托：</p>
          <p class="table-con" v-if="orderDetail.wt">{{ orderDetail.wt.replace(/null/g, '')}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">做箱要求：</p>
          <p class="table-con" v-if="orderDetail.orderRemark && orderDetail.orderRemark.length < 20">{{orderDetail.orderRemark}}</p>
          <el-popover
              v-else
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{orderDetail.orderRemark}}</div>
              <p class="table-con" slot="reference">{{orderDetail.orderRemark}}</p>
            </el-popover>
        </div>
        <div class="table-row-cell">
          <p class="table-title">等待通知放设备单：</p>
          <p class="table-con">{{transitionType(orderDetail.sbdFlag)}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">截关时间：</p>
          <p class="table-con">{{formateTime(orderDetail.jgTime)}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">船公司内部截关时间：</p>
          <p class="table-con">{{formateTime(orderDetail.jgTime)}}</p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">SOC箱：</p>
          <p class="table-con">{{socFlagTypes(orderDetail.socFlag)}}  <small v-if="orderDetail.socFlag==='Y'">{{orderDetail.socDescp}}</small> </p>
        </div>
        <div class="table-row-cell">
          <p class="table-title">是否需要过磅：</p>
          <p class="table-con">{{transitionType(orderDetail.gbFlag)}}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="section" style="width:98%;margin:0 auto">
    <orderTable
    :data="orderDetail.boxPlanList"
    :columns="boxPlanColumns"
    :loading="loading"
    />
  </div>
</div>
</template>

<script>
import orderTable from 'components/order-table/order-table'
import { timeFomatter } from 'utils/utils'
export default {
  name: 'importDetail',
  components: {
    orderTable
  },
  props: {
    orderDetail: Object
  },
  data () {
    return {
      loading: false,
      boxPlanColumns: [
        {
          label: '箱型',
          prop: 'boxType'
        },
        {
          label: '箱量',
          prop: 'boxCount'
        },
        {
          label: '做箱地址',
          prop: 'zxmdAddr'
        },
        {
          label: '做箱时间',
          prop: 'boxDate'
        },
        {
          label: '提单号',
          prop: 'billNo'
        },
        {
          label: '备注',
          prop: 'zxyq'
        }
      ],
      gbFlagType: {
        NIL: '不需要',
        JCKX: '进厂空箱',
        CCZX: '出厂重箱',
        GCFJ: '工厂附近',
        GQ: '港区',
        WYQ: '无要求',
        OTHER: '其他'
      },
      socFlagType: {
        Y: '是',
        N: '否'
      }
    }
  },
  methods: {
    formateTime (time) {
      if (!time || time === null) {
        return '-'
      }
      return timeFomatter(time, 'yyyy.MM.dd hh:mm', true)
    },
    timeConversion () {
      let boxPlanList = this.orderDetail.boxPlanList
      boxPlanList.map(item => {
        if (item.boxDate) {
          item.boxDate = this.FormatDateTime(item.boxDate)
        }
        return item
      })
    },
    FormatDateTime (v) {
      if (!v) {
        return ''
      }
      var date = new Date(v)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      var h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      var M = date.getMinutes()
      M = M < 10 ? ('0' + M) : M
      var str = y + '-' + m + '-' + d + ' ' + h + ':' + M
      return str
    },
    transitionType (val) {
      for (let key in this.gbFlagType) {
        if (key === val) {
          return this.gbFlagType[key]
        }
      }
    },
    socFlagTypes (val) {
      for (let key in this.socFlagType) {
        if (key === val) {
          return this.socFlagType[key]
        }
      }
    }
  },
  mounted () {
  },
  watch: {
    orderDetail: {
      handler (nv, ov) {
        if (nv.boxPlanList) {
          this.timeConversion()
        }
      },
      deep: true,
      immediate: true
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
        color #fbb03b
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
.cell
  button
    margin 0
    padding 0
    border 1px solid transparent
    outline none
    background  none
    color #f6ab39
    cursor pointer
</style>
