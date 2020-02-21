<template>
  <div class="expense-detail-customer-wrapper">
    <span class="dc-title">费用明细</span>
    <div class="dc-search-wrapper">
      <span style="margin-right: 10px">状态</span>
      <el-select v-model="billStatus" @change="handleBillStatusChange" style="width: 120px">
        <el-option v-for="item in billStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button class="revert-search-btn" @click="confirmFee">确认费用无误</el-button>
    </div>
    <div class="dc-content-wrapper">
      <el-table :data="customerFeeList" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#f0f2f5'}">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="feeStatus" label="状态" fixed></el-table-column>
        <el-table-column prop="currency" label="币种"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="invoiceDescp" label="发票种类"></el-table-column>
        <el-table-column prop="invoiceNo" label="发票编号" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="exchangeCurrency" label="折开币种"></el-table-column>
        <el-table-column prop="exchangeRate" label="折开汇率"></el-table-column>
        <el-table-column prop="exchangeAmt" label="折开金额" class-name="text-right"></el-table-column>
        <el-table-column prop="toPayAmt" label="应付金额" class-name="text-right"></el-table-column>
        <el-table-column prop="paidAmt" label="实付金额" class-name="text-right"></el-table-column>
        <el-table-column prop="paidDate" label="实付日期"  width="120"></el-table-column>
        <el-table-column fixed="right">
          <template slot-scope="scope">
            <div style="cursor:pointer;text-decoration:underline" @click="handleShowDetailRecord(scope.row)">
                  明细
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="费用明细" :visible.sync="showExpenseDetail" width="60%">
      <el-table :data="customerFeeDetailList" :header-cell-style="{ background: '#f0f2f5'}">
        <el-table-column prop="name" label="收费项目"></el-table-column>
        <el-table-column prop="price" label="单价" class-name="text-right"></el-table-column>
        <el-table-column prop="count" label="数量" class-name="text-right"></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="subtotal" label="金额" class-name="text-right"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showExpenseDetail = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { CUSTOMER_EXPENSE_STATUS_LIST } from 'assets/constant'
import { confirmFee } from 'api/finance'
import { deepCopy, timeFomatter1 } from 'utils/utils'
export default {
  name: 'import-order-fee',
  data () {
    return {
      billStatus: '',
      billStatusList: CUSTOMER_EXPENSE_STATUS_LIST,
      customerFeeList: [],
      showExpenseDetail: false,
      customerFeeDetailList: [],
      selectedRows: []
    }
  },
  mounted () {

  },
  props: {
    pCustomerFeeList: Array
  },
  methods: {
    handleShowDetailRecord (row, event) {
      this.customerFeeDetailList = deepCopy(row.itemList)
      this.customerFeeDetailList.forEach(item => {
        item.subtotal = this.handleLimit(item.subtotal)
        item.price = this.handleLimit(item.price)
      })
      this.showExpenseDetail = true
    },
    timeFomatter (date) {
      console.log(date)
      return timeFomatter1(date)
    },
    // 通过循环拿到选中的id值 获取选中的数据
    confirmFee () {
      let vIds = []
      this.selectedRows.forEach(item => {
        vIds.push(item.id)
      })
      let obj = {
        ids: vIds
      }
      confirmFee(obj)
        .then(res => {
          if (res.msg === 'success') {
            this.$emit('on-save-success', this.billStatus)
            this.$message.success('发送成功')
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
    handleBillStatusChange (value) {
      this.$emit('on-select-change', value)
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
    pCustomerFeeList: {
      handler (nv) {
        let tmpCustomerFeeList = deepCopy(nv)
        this.customerFeeList = tmpCustomerFeeList || []
        this.customerFeeList.forEach(item => {
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
.expense-detail-customer-wrapper
  padding-bottom: 10px
  .dc-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    color: $font-color-black
    font-weight: bold
    padding-left: 10px
  .dc-search-wrapper
    padding: 30px 10px 10px
    font-size 12px
  .dc-content-wrapper
    padding: 10px
  .text-right
    text-align right
</style>
