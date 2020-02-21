<template>
  <div class="expense-detail-ac-wrapper">
    <span class="ac-title">费用明细</span>
    <div class="ac-search-wrapper">
      <div class="search-item">
        <span style="margin-right: 10px">状态</span>
      <el-select v-model="billStatus" @change="handleBillStatusChange(billStatus,'feeStatus')" style="width: 120px">
        <el-option v-for="item in billStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </div>
      <div class="search-item">
        <span style="margin-right: 10px">已开票</span>
      <el-select v-model="invoiceFlag" @change="handleBillStatusChange(invoiceFlag,'invoiceFlag')" style="width: 120px" clearable>
        <el-option v-for="item in invoiceFlagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </div>
      <div class="search-item">
        <span style="margin-right: 10px">已销账</span>
      <el-select v-model="chargeOffFlag" @change="handleBillStatusChange(chargeOffFlag,'chargeOffFlag')" style="width: 120px" clearable>
        <el-option v-for="item in chargeOffFlagList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      </div>
      <el-button class="revert-search-btn" @click="sendToCustomer">发送客户确认</el-button>
    </div>
    <div class="ac-content-wrapper">
      <el-table :data="feeList" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#f0f2f5'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="feeStatus" label="状态" fixed></el-table-column>
        <el-table-column prop="compCode" label="代码" width="90"></el-table-column>
        <el-table-column prop="compName" label="往来单位" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="currency" label="币种"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="invoiceDescp" label="发票种类"></el-table-column>
        <el-table-column prop="invoiceNo" label="发票编号" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exchangeCurrency" label="折开币种"></el-table-column>
        <el-table-column prop="exchangeRate" label="折开汇率"></el-table-column>
        <el-table-column prop="exchangeAmt" label="折开金额"  class-name="text-right"></el-table-column>
        <el-table-column prop="toPayAmt" label="应收金额"  class-name="text-right"></el-table-column>
        <el-table-column prop="paidAmt" label="实收金额" class-name="text-right"></el-table-column>
        <el-table-column prop="paidDate" label="实收日期"  width="120" ></el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <div style="cursor:pointer;text-decoration:underline" @click="handleShowDetailRecord(scope.row)">
                  明细
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="费用明细" :visible.sync="showExpenseDetail" width="80%">
      <el-table :data="expenseDetailList" :header-cell-style="{ background: '#f0f2f5'}">
        <el-table-column prop="name" label="收费项目"></el-table-column>
        <el-table-column prop="price" label="单价" class-name="text-right"></el-table-column>
        <el-table-column prop="count" label="数量"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="subtotal" label="金额"  class-name="text-right"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showExpenseDetail = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SHARK_EXPENSE_STATUS_LIST, SELECT_LIST } from 'assets/constant'
import { sendFee } from 'api/finance'
import { deepCopy, timeFomatter1 } from 'utils/utils'
export default {
  name: 'expense-detail-ac',
  data () {
    return {
      billStatus: '',
      billStatusList: SHARK_EXPENSE_STATUS_LIST,
      feeList: [],
      invoiceFlag: '',
      invoiceFlagList: SELECT_LIST,
      chargeOffFlag: '',
      chargeOffFlagList: SELECT_LIST,
      showExpenseDetail: false,
      expenseDetailList: [],
      selectedRows: [],
      params: {
        feeStatus: '',
        chargeOffFlag: false,
        invoiceFlag: false
      }
    }
  },
  mounted () {
  },
  props: {
    pFeeList: Array
  },
  methods: {
    handleShowDetailRecord (row, event) {
      this.expenseDetailList = deepCopy(row.itemList)
      this.expenseDetailList.forEach(item => {
        item.subtotal = this.handleLimit(item.subtotal)
        item.price = this.handleLimit(item.price)
      })
      this.showExpenseDetail = true
    },
    timeFomatter (date) {
      return timeFomatter1(date)
    },
    sendToCustomer () {
      let vFeeIdKts = []
      this.selectedRows.forEach(item => {
        vFeeIdKts.push(item.feeIdKt)
      })
      let obj = {
        feeIdKts: vFeeIdKts
      }
      sendFee(obj)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('发送成功')
            this.$emit('on-send-success', this.billStatus)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSelectionChange (val) {
      this.selectedRows = val
    },
    handleBillStatusChange (value, key) {
      this.params[key] = value
      this.$emit('on-select-change', this.params)
    },
    handleLimit (val, row, column) {
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
    }
  },
  watch: {
    pFeeList: {
      handler (nv) {
        this.feeList = deepCopy(nv)
        this.feeList.forEach(item => {
          item.exchangeAmt = this.handleLimit(item.exchangeAmt)
          item.toPayAmt = this.handleLimit(item.toPayAmt)
          item.paidAmt = this.handleLimit(item.paidAmt)
          item.paidDate = this.timeFomatter(item.paidDate)
        })
        this.selectedRows = []
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="stylus">
@import "~styles/variable"
.expense-detail-ac-wrapper
  padding-bottom: 10px
  .ac-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    color: $font-color-black
    font-weight: bold
    padding-left: 10px
  .ac-search-wrapper
    padding: 30px 10px 10px
    font-size 12px
    display flex
    justify-content flex-start
    .search-item
      margin-right 10px
  .ac-content-wrapper
    padding: 10px
  .text-right
    text-align right
</style>
