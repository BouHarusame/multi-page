<template>
  <div class="customer-expense-wrapper">
    <div class="search-wrapper">
      <div v-for="c in searchItem"
           :key="c.label"
           class="search-item">
        <span :class="c.labelClass">
          {{c.label}}
        </span>
        <span>
          <template v-if="c.type === 'select'">
            <el-select v-model="c.value"
                       clearable
                       :class="c.itemClass"
                       placeholder="请选择">
              <el-option v-for="item in c.data"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </template>
          <template v-if="c.type === 'date'">
            <el-date-picker v-model="c.value"
                            type="daterange"
                            :class="c.itemClass"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"></el-date-picker>
          </template>
          <template v-if="c.type === 'input'">
            <el-input v-model="c.value"
                      clearable
                      :class="c.itemClass"
                      style="width: 150px"></el-input>
          </template>
        </span>
      </div>
      <span>
        <el-button
                   @click="handleClickSearch" class="search-cx-btn">查询</el-button>
      </span>
    </div>
    <div class="line"></div>
    <div class="content-wrapper">
      <div class="button-wrapper">
        <el-button class="revert-search-btn"
                   plain
                   @click="handleClickConfirm">确认费用无误</el-button>
      </div>
      <div class="table-wrapper">
        <order-table :data="expenseDataList"
                     :columns="columns"
                     :refType="refType"
                     :loading="loading"
                     @selectChange="handleSelectionChange"
                     :showDetails="true"
                     @show-detail-record="handleShowDetailRecord" />
      </div>
      <el-dialog title="费用明细"
                 :visible.sync="showExpenseDetail"
                 width="700px">
        <el-table :data="expenseDetailList" header-cell-class-name="table-header">
          <el-table-column :prop="item.prop"
                           v-for="item in detailColumns"
                           :key="item.prop"
                           :class-name="item.class"
                           :label="item.label"></el-table-column>
        </el-table>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="showExpenseDetail = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="page-wrap">
      <OrderPagination styleType="border"
                       :total="total"
                       :size="expenseParams.size"
                       v-model="expenseParams.page"
                       :pageName="pageName"
                       prevText="上一页"
                       nextText="下一页" />
    </div>
  </div>
</template>

<script>
import { CUSTOMER_EXPENSE_STATUS_LIST, COUSTOMER_EXPENSE_DETAILCOLUMNS_LIST } from 'assets/constant'
import { confirmFee, getFeeDcList } from 'api/finance'
import { mapGetters, mapMutations } from 'vuex'
import orderTable from 'components/order-table/order-table'
import OrderPagination from 'components/pagination/pagination'
import filters from '@/filters'
const PAGE = 'dcExpense'
export default {
  name: 'customer-expense',
  data () {
    return {
      searchItem: [
        {
          label: '实际离港：',
          type: 'date',
          prop: ['atdFrom', 'atdTo'],
          labelClass: 'search-sjlg-label',
          itemClass: 'search-sjlg-item'
        },
        {
          label: '业务编号：',
          prop: 'jobNo',
          type: 'input',
          labelClass: 'search-ywbh-label',
          itemClass: 'search-ywbh-item'
        },
        {
          label: '状态：',
          prop: 'feeStatus',
          type: 'select',
          value: '待确认',
          data: CUSTOMER_EXPENSE_STATUS_LIST,
          labelClass: 'search-zt-label',
          itemClass: 'search-zt-item'
        }
      ],
      total: 0,
      expenseParams: {
        page: Number(window.sessionStorage.getItem(PAGE + 'currentPage')) || 1,
        size: 12
      },
      showExpenseDetail: false,
      expenseDetailList: [],
      expenseDataList: [],
      selectedRecords: [],
      loading: true,
      refType: 'multipleTable',
      detailColumns: COUSTOMER_EXPENSE_DETAILCOLUMNS_LIST,
      columns: [
        {
          label: '状态',
          prop: 'feeStatus'
        },
        // {
        //   label: '业务编号',
        //   prop: 'jobNo',
        //   width: '170',
        //   tooltip: true
        // },
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
                  self.showDetail(params.row.feeUrl, params.row.jobNo)
                }
              }
            })
          }
        },
        {
          label: '币种',
          prop: 'currency'
        },
        {
          label: '税率',
          prop: 'taxRate'
        },
        {
          label: '发票种类',
          prop: 'invoiceDescp',
          width: '100'
        },
        {
          label: '发票编号',
          prop: 'invoiceNo',
          width: '170',
          tooltip: true
        },
        {
          label: '折开币种',
          prop: 'exchangeCurrency',
          width: '100'
        },
        {
          label: '折开汇率',
          prop: 'exchangeRate',
          width: '100'
        },
        {
          label: '折开金额',
          prop: 'exchangeAmt',
          formatter: this.handleLimit,
          class: 'text-right',
          width: '100'
        },
        {
          label: '应付金额',
          prop: 'toPayAmt',
          formatter: this.handleLimit,
          class: 'text-right',
          width: '100'
        },
        {
          label: '实付金额',
          prop: 'paidAmt',
          formatter: this.handleLimit,
          class: 'text-right',
          width: '100'
        },
        {
          label: '实付日期',
          prop: 'paidDate',
          width: '120',
          formatter: this.formatTime
        }
      ],
      jobNo: '',
      pageName: PAGE
    }
  },
  methods: {
    ...mapMutations('menu', {
      setMenuName: 'SET_MENU_NAME'
    }),
    handleSearchInit () {
      let searchFlag = false
      this.searchItem.forEach((item, index) => {
        let itemValue = ''
        if (item.type === 'date') {
          let dateFrom = Number(window.sessionStorage.getItem(this.pageName + item.prop[0]))
          let dateTo = Number(window.sessionStorage.getItem(this.pageName + item.prop[1]))
          if (dateFrom && dateTo) {
            let aDateTemp = [dateFrom, dateTo]
            this.$set(this.searchItem[index], 'value', aDateTemp)
            searchFlag = true
          }
        } else {
          itemValue = window.sessionStorage.getItem(this.pageName + item.prop) || item.value
          if (itemValue) {
            this.$set(this.searchItem[index], 'value', itemValue)
            searchFlag = true
          }
        }
      })
      if (searchFlag) {
        this.handleClickSearch()
      }
    },
    handleClickSearch () {
      this.searchItem.forEach(item => {
        if (item.type === 'date') {
          this.expenseParams.dateFrom = item.value ? new Date(item.value[0]).getTime() : ''
          this.expenseParams.dateTo = item.value ? new Date(item.value[1]).getTime() : ''
        } else {
          this.expenseParams[item.prop] = item.value ? item.value : ''
        }
      })
      this.getexpenseData(this.expenseParams)
    },
    handleLimit (row, column, val) {
      let num = (val || 0).toString()
      let arr = num.split('-')
      num = arr[0] ? arr[0] : arr[1]
      let result = ''
      num = num === '0' ? '' : num ? Number(num).toFixed(2) : ''
      // 判断是否带小数点
      if (num.split('.')[1]) {
        let numInt = num.split('.')[0]
        let numFlo = num.split('.')[1]
        result = this.formatter(numInt) + '.' + numFlo
      } else {
        result = this.formatter(num)
      }
      if (arr[0]) return result
      else return '-' + result
    },
    formatter (numInt) { // 格式化整数
      var resultInt = ''
      while (numInt.length > 3) {
        resultInt = ',' + numInt.slice(-3) + resultInt
        numInt = numInt.slice(0, numInt.length - 3)
      }
      if (numInt) {
        resultInt = numInt + resultInt
      }
      return resultInt
    },
    handleClickConfirm () {
      let ids = []
      this.selectedRecords.forEach(item => {
        ids.push(item.id)
      })
      let params = {
        ids: ids
      }
      confirmFee(params)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('确认成功')
            this.getexpenseData(this.expenseParams)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleSelectionChange (val) {
      this.selectedRecords = val
    },
    handleShowDetailRecord (row) {
      this.showExpenseDetail = true
      this.expenseDetailList = row.itemList
      this.expenseDetailList.forEach(item => {
        item.price = item.price.toString().split(',')[1] ? this.toNumber(item.price) : item.price
        item.subtotal = item.subtotal.toString().split(',')[1] ? this.toNumber(item.subtotal) : item.subtotal
        item.price = this.handleLimit(null, null, item.price)
        item.subtotal = this.handleLimit(null, null, item.subtotal)
      })
    },
    formatTime (row, column, value) {
      return filters.formatTime(value)
    },
    toNumber (data) {
      return data.toString().split(',').join('')
    },
    getexpenseData (params) {
      getFeeDcList(params)
        .then(res => {
          if (res.msg === 'success') {
            let expenseData = (res.data && res.data.records) || []
            this.expenseDataList = expenseData
            this.loading = false
            this.total = (res.data && res.data.total) || 0
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    showDetail (feeUrl, jobNo) {
      if (this.userRoles.indexOf('DC_CW') > -1) {
        return
      }
      let menuName = '我的订单'
      window.sessionStorage.setItem('menuName', menuName)
      this.setMenuName(menuName)
      let pathName = ''
      if (feeUrl === 'import') {
        pathName = 'importOrderDetail'
        this.$router.push({ name: pathName, params: { quoteNo: jobNo } })
      } else {
        pathName = 'detailInfo'
        this.$router.push({ name: pathName, params: { jobNo: jobNo } })
      }
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  mounted () {
    this.jobNo = this.$route.params.jobNo
    if (this.jobNo) {
      this.$set(this.expenseParams, 'feeStatus', '待确认')
      window.sessionStorage.setItem(this.pageName + 'feeStatus', '待确认')
    }
    // this.getexpenseData()
    // this.handleSearchInit()
    // this.handleClickSearch()
  },
  components: {
    orderTable,
    OrderPagination
  },
  watch: {
    expenseParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          this.handleSearchInit()
        } else {
          this.getexpenseData(nv)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="stylus">
@import '~styles/variable'
.customer-expense-wrapper
  .search-wrapper
    .search-item
      display inline-block
      font-size $font-size-medium
      .search-sjlg-item
        width: 228px
      .search-ywbh-label
        margin-left: 10px
      .search-ywbh-item
        width: 222px
      .search-zt-label
        margin-left: 10px
      .search-zt-item
        width: 100px
    .search-cx-btn
      margin-left: 20px
      background $color-button-background
      color #fff
      border 0
  .line
    border-bottom 1px solid #eee
    margin 10px 0
  .content-wrapper
    .button-wrapper
    .table-wrapper
      margin-top: 20px
  .text-right
    text-align right
</style>
