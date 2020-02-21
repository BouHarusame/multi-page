<template>
  <div class="import-inquiry-list">
    <div class="search-conditions">
      <div class="search-area"
           ref="toggle">
        <search-form :searchColumns="searchColumns"
                     :userRoles="userRoles"
                     ref="search"
                     :showClass="showClass"
                     :toggle="toggle"
                     :toggleText="toggleText"
                     @changeToggle="handleChangeToggle"
                     @on-search="handleClickSearch" />
        <!-- <el-button class="search-btn"
                   size="small"
                   @click="handleClickInquiry">询价</el-button> -->
      </div>
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
import { getQuoteList } from 'api/import'
import orderMixins from '@/mixins'
import { mapGetters } from 'vuex'
import { IMPORT_INQUIRY_SEARCH_SHORT, IMPORT_INQUIRY_SEARCH } from 'assets/constant'

const PAGE = 'import'
export default {
  name: 'importInquiryList',
  data () {
    return {
      total: 0,
      orderParams: {
        page: Number(window.sessionStorage.getItem(PAGE + 'currentPage')) || 1,
        size: 12
      },
      showClass: 'search-order-form',
      refType: 'singleTable',
      loading: true,
      toggle: true,
      toggleFlag: true,
      toggleText: '展开',
      searchColumns: IMPORT_INQUIRY_SEARCH_SHORT,
      columns: [
        {
          label: '询价编号',
          prop: 'quoteNo',
          tooltip: true,
          render: (h, params) => {
            let self = this
            return h('p', {
              class: {
                'job-number': true
              },
              domProps: {
                innerText: params.row.quoteNo
              },
              on: {
                click: function () {
                  if (params.row.status === '已报价' || params.row.status === '已下单') {
                    self.showDetail(params.row.quoteNo, params.row.status)
                  } else if (params.row.status === '待询价') {
                    self.showInquiry(params.row.quoteNo, params.row.status)
                  }
                }
              }
            })
          }
        },
        {
          label: '目的港',
          prop: 'targetPort'
        },
        {
          label: '运输方式',
          prop: 'transferWay'
        },
        {
          label: '送货地址',
          prop: 'address',
          width: '180'
        },
        {
          label: '客户名称',
          prop: 'compInfo'
        },
        {
          label: '监管方式',
          prop: 'superviseMethod'
        },
        {
          label: '成交条款',
          prop: 'tradeTerms'
        },
        {
          label: '销售',
          prop: 'importXsName'
        },
        {
          label: '状态',
          prop: 'status'
        },
        {
          label: '来源',
          prop: 'buzSource'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '140',
          render: (h, params) => {
            let self = this
            if (params.row.status === '已报价' || params.row.status === '已下单') {
              return h('div', [
                h('el-button', {
                  class: {
                    'order-btn': true
                  },
                  props: {
                    type: 'text'
                  },
                  domProps: {
                    innerText: '查看'
                  },
                  on: {
                    click: function () {
                      self.showDetail(params.row.quoteNo, params.row.status)
                    }
                  }
                }),
                h('el-button', {
                  class: {
                    'order-btn': true
                  },
                  props: {
                    type: 'text'
                  },
                  domProps: {
                    innerText: '成本测算'
                  },
                  on: {
                    click: function () {
                      self.showCostCalculation(params.row.quoteNo, params.row.currency, params.row.tradeTerms)
                    }
                  }
                })
              ])
            } else if (params.row.status === '待询价') {
              return h('div', [
                h('el-button', {
                  class: {
                    'order-btn': true
                  },
                  props: {
                    type: 'text'
                  },
                  domProps: {
                    innerText: '编辑'
                  },
                  on: {
                    click: function () {
                      self.showInquiry(params.row.quoteNo)
                    }
                  }
                })
              ])
            } else if (params.row.status === '待报价') {
              return h('div', [
                h('el-button', {
                  class: {
                    'order-btn': true
                  },
                  props: {
                    type: 'text'
                  },
                  domProps: {
                    innerText: '查看'
                  },
                  on: {
                    click: function () {
                      self.showDetail(params.row.quoteNo, params.row.status)
                    }
                  }
                })
              ])
            }
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
    // handleClickInquiry (pathName, jobNo) {
    //   this.$router.push({ name: 'import' })
    // },
    handleChangeToggle () {
      this.toggleFlag = !this.toggleFlag
      if (this.toggleFlag) {
        this.toggleText = '展开'
        this.searchColumns = IMPORT_INQUIRY_SEARCH_SHORT
      } else {
        this.toggleText = '收起'
        this.searchColumns = IMPORT_INQUIRY_SEARCH
      }
    },
    showCostCalculation (quoteNo, currency, tradeTerms) {
      localStorage.setItem('currency', currency)
      localStorage.setItem('tradeTerms', tradeTerms)
      this.$router.push({
        name: 'costCalculation',
        params: { quoteNo }
      })
    },
    showDetail (quoteNo, status) {
      this.$router.push({ name: 'importQuote', params: { quoteNo, status } })
    },
    showInquiry (quoteNo) {
      this.$router.push({ name: 'import', query: { quoteNo } })
    },
    getOrder (params) {
      getQuoteList(params)
        .then(res => {
          if (res.msg === 'success') {
            let orderList = (res.data && res.data.records) || []
            // this.orderDataList = orderList
            this.orderDataList = orderList.map(item => {
              if (item.status === 'quoted') {
                item.status = '已报价'
              } else if (item.status === 'ordered') {
                item.status = '已下单'
              } else if (item.status === 'draft') {
                item.status = '待询价'
              } else if (item.status === 'pendQuote') {
                item.status = '待报价'
              }
              if (item.buzSource === 'web') {
                item.buzSource = '电脑端'
              } else if (item.buzSource === 'mini') {
                item.buzSource = '小程序'
              }
              if (item.transferWay === 'lcl') {
                item.transferWay = '进口拼箱'
              } else if (item.transferWay === 'fcl') {
                item.transferWay = '进口整箱'
              } else if (item.transferWay === 'air') {
                item.transferWay = '进口空运'
              }
              return item
            })
            this.total = (res.data && res.data.total) || 0
            this.loading = false
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
            this.loading = false
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    columnsList () {
      if (this.userRoles.indexOf('AC_GLY') > -1 || this.userRoles.indexOf('AC_KF') > -1) {
        this.columns.push({
          label: '直客操作',
          prop: 'userId',
          width: '150',
          fixed: 'right',
          render: (h, params) => {
            const self = this
            const assigners = params.row.assigners || []
            return h('el-select', {
              props: {
                value: params.row.userId,
                size: 'mini',
                'popper-class': 'olsa_select',
                filterable: true,
                placeholder: '请选择'
              },
              class: {
                'olsa_select_style': true
              },
              on: {
                change: (item) => {
                  self.assignMember(item, params.row.jobNo)
                }
              }
            }, assigners.map(c => {
              return h('el-option', {
                props: {
                  label: c.name,
                  value: c.id
                }
              })
            })
            )
          }
        })
      }
    }
  },
  mounted () {
    if (this.userRoles.indexOf('AC_IMPORT_XS') > -1) {
      let DIndex = null
      this.columns.forEach((item, index) => {
        if (item.prop === 'importXsName') {
          DIndex = index
        }
      })
      this.columns.splice(DIndex, 1)
      // console.log(this.columns)
    }
    // this.findKefu()
    // this.getOrder()
  },
  beforeRouteEnter (to, from, next) {
    if (from.name === 'import') {
      next(vm => {
        vm.orderParams.page = 1
      })
      return
    }
    next()
  },
  mixins: [orderMixins]
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~styles/variable'
.import-inquiry-list
  width 100%
  background $color-background
  overflow hidden
  padding 20px 20px
  box-sizing border-box
  .search-toggle
    display flex
    justify-content space-between
    align-item flex-start
    height 25px
    padding-right 12px
    margin-bottom 5px
    span
      font-size $font-size-medium
      font-weight bold
      color $font-color-black
    p
      cursor pointer
      span
        color $font-color-grey
        font-weight 300
      i
        display inline-block
        width 8px
        height 14px
        vertical-align middle
        background url('./img/search-arrow.png') no-repeat top center
        background-size 100% 100%
        transform rotate(0deg)
        transform-origin center center
        transition all 0.4s ease-in
      .rotate
        transform rotate(90deg)
  .toggleBorder
    border-bottom 1px solid #eee
  .search-area
    transition all 0.2s ease-in
    display flex
    >>> .search-form .el-form-item
      margin-right 0!important
      width 28%
      margin-left 8%
      &:nth-child(3n+1)
        margin-left 0
      .el-form-item__content
        width 100%
        .search-item
          width 100%
          margin-right 0
          display flex
          .search-term
            font-size 12px
          .el-input
            flex 1
            &placeholder
              font-size 12px
          .el-select
            flex 1
    .search-btn
      height 30px
      margin-top 6px
      color #fff
  .search-content
    >>>.el-button--text
      color #FBB03B
    >>>.el-button+.el-button
      position relative
      &:before
        content ''
        width 0
        height 12px
        position absolute
        top 9px
        left -7px
        border-left 1px solid #E5E5E5
    >>>.el-table .cell
      font-size 12px
  .page-wrap
    background #fff
    padding-bottom 10px
</style>
