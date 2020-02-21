<template>
  <div class="order-anycase">
    <div class="search-conditions">
      <search-form :searchColumns="searchColumns"
                   :className="className"
                   :userRoles="userRoles"
                   @on-search="handleClickSearch" />
    </div>
    <div class="search-content">
      <order-table :data="orderDataList"
                   :columns="columns"
                   :action="action"
                   :loading="loading"
                   :refType="refType"
                   :userRoles="userRoles" />
      <div class="page-wrap">
        <OrderPagination styleType="border"
                         :total="total"
                         :size="orderParams.size"
                         v-model="orderParams.page"
                         :pageName="pageName"
                         prevText="上一页"
                         nextText="下一页" />
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList, postOrderQuick, getYwList } from 'api/order'
import { mapGetters } from 'vuex'
import { roleType, getLocalStorage } from 'utils/utils'
import orderMixins from '@/mixins'
const PAGE = 'orderDc'
export default {
  name: 'exportOrderList',
  data () {
    return {
      loading: true,
      refType: 'singleTable',
      total: 0,
      className: 'search-dc-form',
      orderParams: {
        page: Number(window.sessionStorage.getItem(PAGE + 'currentPage')) || 1,
        size: 12
      },
      searchColumns: [
        {
          type: 'input',
          text: '业务编号',
          prop: 'jobNo'
        },
        {
          type: 'input',
          text: '提单号',
          prop: 'billNo'
        },
        {
          type: 'date',
          text: '预计离港',
          prop: ['etdFrom', 'etdTo']
        },
        {
          type: 'date',
          text: '实际离港',
          prop: ['atdFrom', 'atdTo']
        },
        {
          type: 'select',
          text: '业务种类',
          prop: 'yw',
          filterable: true,
          optionsName: 'yw',
          request: getYwList,
          formatValue (cc) {
            return cc.code
          },
          formatLabel (cc) {
            return cc.descp
          }
        },
        {
          type: 'input',
          text: '目的港',
          prop: 'targetPort'
        },
        {
          type: 'input',
          text: '收货人',
          prop: 'consignee'
        }
      ],
      columns: [
        {
          label: '业务编号',
          prop: 'jobNo',
          width: '170',
          tooltip: true,
          render: (h, params) => {
            let self = this
            return h('p', {
              class: {
                'job-number': true
              },
              domProps: {
                innerText: params.row.jobNo
              },
              on: {
                click: function () {
                  self.showDetail('exportOrderDetail', params.row.jobNo)
                }
              }
            })
          }
        },
        {
          label: '退关',
          width: '60',
          prop: 'customsRefuse'
        },
        {
          label: '类型',
          prop: 'yw',
          width: '60'
        },
        {
          label: '目的港',
          prop: 'targetPort',
          width: '100'
        },
        {
          label: '收货人',
          prop: 'consignee',
          width: '180',
          tooltip: true
        },
        {
          label: '提单号',
          prop: 'billNo',
          width: '180',
          tooltip: true
        },
        {
          label: '船公司',
          prop: 'shipCompany',
          tooltip: true
        },
        {
          label: '预计离港',
          formatter: this.formatTime,
          prop: 'etd',
          width: '120'
        },
        {
          label: '实际离港',
          formatter: this.formatTime,
          prop: 'atd',
          width: '120'
        },
        {
          label: '箱型箱量',
          prop: 'contCounts',
          formatter: this.formatContCounts,
          width: '150',
          tooltip: true
        },
        {
          label: '件数',
          prop: 'cargoCount'
        },
        {
          label: '毛重',
          prop: 'cargoWeight'
        },
        {
          label: '体积',
          prop: 'cargoVolumn'
        },
        {
          label: '',
          fixed: 'right',
          width: '100',
          render: (h, params) => {
            let self = this
            return h('el-button', {
              class: {
                'order-btn': true
              },
              domProps: {
                innerText: '再来一单'
              },
              on: {
                click: function () {
                  self.quickOrder(params.row.jobNo)
                }
              }
            })
          }
        }
      ],
      action: {},
      orderDataList: [],
      pageName: PAGE
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  methods: {
    showDetail (pathName, jobNo) {
      this.$router.push({ name: pathName, params: { jobNo: jobNo } })
    },
    quickOrder (jobNo) {
      postOrderQuick({ jobNo })
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('下单成功')
            this.getOrder(this.orderParams)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getOrder (params) {
      getOrderList(params)
        .then(res => {
          if (res.msg === 'success') {
            let orderList = (res.data && res.data.records) || []
            this.orderDataList = orderList
            this.total = (res.data && res.data.total) || 0
            this.loading = false
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted () {
    let userRoles = this.userRoles || (getLocalStorage('user_roles') ? JSON.parse(getLocalStorage('user_roles')) : [])
    this.isAnycase = roleType(userRoles, 'AC')
  },
  mixins: [orderMixins]
}
</script>
<style lang="stylus" scoped>
.order-anycase
  width 100%
  background $color-background
  overflow hidden
  padding 15px 10px
  box-sizing border-box
  .search-conditions
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    .search-item
      margin-right 15px
      margin-bottom 15px
      display inline-block
      line-height 40px
      .search-term
        display inline-block
        width 60px
        font-size 14px
        color #424242
        margin-right 5px
    .right
      flex-grow 1
      text-align right
  .page-wrap
    background #fff
    padding-bottom 10px
</style>
