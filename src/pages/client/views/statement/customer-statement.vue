<template>
  <div class="customer-statement-wrapper">
    <div class="search-wrapper">
      <span>
        对账名称：
      </span>
      <span>
        <el-input v-model="stmtName" style="width: 150px"></el-input>
      </span>
      <span class="search-zt-label">
        状态：
      </span>
      <span>
        <el-select v-model="stmtStatus" placeholder="请选择" class="search-zt-select">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </span>
      <span>
        <el-button class="search-btn search-cx-btn" size="small" @click="handleClickSearch">查询</el-button>
      </span>
    </div>
    <div class="line"></div>
    <div class="table-wrapper">
      <div class="button-wrapper">
        <el-button class="revert-search-btn" plain @click="handleConfirmStmt">确认对账单无误</el-button>
      </div>
      <div class="table-wrapper">
        <el-table :data="customerStatementList" @selection-change="handleSelectionChange" header-cell-class-name="table-header" style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="stmtStatus" label="状态"></el-table-column>
          <el-table-column prop="stmtName" label="对账名称" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column label="对账单" width="150">
            <template slot-scope="scope" v-if="scope.row.attachId">
              <a style="cursor:pointer;text-decoration:underline" download :href="scope.row.attachUrl"><span>{{scope.row.attachName}}</span></a>
            </template>
          </el-table-column>
          <el-table-column prop="usdInvoiceNo" label="发票号码" width="120"></el-table-column>
          <el-table-column prop="usdTotal" label="美金" width="120" class-name="text-right"></el-table-column>
          <el-table-column prop="rmbInvoiceNo" label="发票号码" width="120"></el-table-column>
          <el-table-column prop="rmbTotal" label="人民币" width="120" class-name="text-right"></el-table-column>
          <el-table-column prop="usdPaid" label="付款金额(USD)" width="130" class-name="text-right" :render-header="renderheader"></el-table-column>
          <el-table-column prop="rmbPaid" label="付款金额(RMB)"  width="130" class-name="text-right" :render-header="renderheader"></el-table-column>
          <el-table-column prop="usdUnpaid" label="结余未付(USD)"  width="140" class-name="text-right" :render-header="renderheader"></el-table-column>
          <el-table-column prop="rmbUnpaid" label="结余未付(RMB)"  width="140" class-name="text-right" :render-header="renderheader"></el-table-column>
        </el-table>
        <div class="page-wrap">
          <OrderPagination
            styleType="border"
            :total="total"
            :size="statementParams.size"
            v-model="statementParams.page"
            prevText="上一页"
            nextText="下一页"
          ></OrderPagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CUSTOMER_STATEMENT_STATUS } from 'assets/constant'
import { getStmtList, stmtDcConfirm } from 'api/finance'
import OrderPagination from 'components/pagination/pagination'
export default {
  name: 'customer-statement',
  data () {
    return {
      stmtName: '',
      stmtStatus: '',
      statusList: CUSTOMER_STATEMENT_STATUS,
      customerStatementList: [],
      selectedRows: [],
      total: 0,
      statementParams: {
        page: 1,
        size: 12
      }
    }
  },
  mounted () {
  },
  methods: {
    getCustomerStatementList (statementParams) {
      // let queryParams = `stmtName=${this.stmtName}&stmtStatus=${this.stmtStatus}`
      getStmtList(statementParams)
        .then(res => {
          if (res.msg === 'success') {
            this.customerStatementList = res.data.records
            this.customerStatementList.forEach(item => {
              item.usdUnpaid = isNaN(parseFloat((item.usdTotal - item.usdPaid).toFixed(2))) ? 0 : parseFloat((item.usdTotal - item.usdPaid).toFixed(2))
              item.rmbUnpaid = isNaN(parseFloat((item.rmbTotal - item.rmbPaid).toFixed(2))) ? 0 : parseFloat((item.rmbTotal - item.rmbPaid).toFixed(2))
              item.usdUnpaid = this.handleLimit(item.usdUnpaid)
              item.rmbUnpaid = this.handleLimit(item.rmbUnpaid)
              item.usdTotal = this.handleLimit(item.usdTotal)
              item.usdPaid = this.handleLimit(item.usdPaid)
              item.rmbTotal = this.handleLimit(item.rmbTotal)
              item.rmbPaid = this.handleLimit(item.rmbPaid)
            })
            this.total = res.data && res.data.total
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleClickSearch () {
      this.statementParams.page = 1
      this.statementParams.stmtName = this.stmtName
      this.statementParams.stmtStatus = this.stmtStatus
      this.getCustomerStatementList(this.statementParams)
    },
    handleLimit (val, row, column) {
      let num = (val || 0).toString()
      let arr = num.split('-')
      num = arr[0] ? arr[0] : arr[1]
      num = num === '0' ? '' : num ? Number(num).toFixed(2) : ''
      let result = ''
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
    handleConfirmStmt () {
      let vStmtIds = []
      this.selectedRows.forEach(item => {
        vStmtIds.push(item.id)
      })
      let SendStmtParam = {
        ids: vStmtIds
      }
      stmtDcConfirm(SendStmtParam)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('发送成功')
            this.handleClickSearch()
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
    renderheader (h, { column, $index }) {
      return h('span', {}, [
        h('span', {}, column.label.split('/')[0]),
        h('br'),
        h('span', {}, column.label.split('/')[1])
      ])
    }
  },
  components: {
    OrderPagination
  },
  watch: {
    statementParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          this.getCustomerStatementList(this.statementParams)
        } else {
          this.getCustomerStatementList(nv)
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
.customer-statement-wrapper
  .search-wrapper
    font-size $font-size-medium
    color $font-color-black
    span
      font-size $font-size-medium
    .search-zt-label
      margin-left: 20px
    .search-zt-select
      width: 150px
    .search-cx-btn
      margin-left: 20px
  .table-wrapper
    margin-top: 20px
  .text-right
    text-align right
    input
      text-align right
  .line
    border-bottom 1px solid #eee
    margin 10px 0
</style>
