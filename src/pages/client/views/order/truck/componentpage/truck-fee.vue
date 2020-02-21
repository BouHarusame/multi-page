<template>
  <div class="wrapper">
    <div class="section">
    <div class="title">
      <h4 class="title-h4">费用信息</h4>
    </div>
    <div class="kong"></div>
    <el-table
    :data="tableData"
    :header-cell-style="{ background: '#f0f2f5'}"
    stripe
    style="width: 98%; margin:0 auto">
    <el-table-column
      prop="date"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <div>
          <button>确定</button>
          <button>复议</button>
          <button style="color:grey">下载</button>
          <p v-if="scope.row.orderRemark">{{scope.row.orderRemark}}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="jobNo"
      label="业务编号">
    </el-table-column>
    <el-table-column
      prop=""
      label="费用名称">
    </el-table-column>
    <el-table-column
      prop=""
      label="费用金额">
    </el-table-column>
    <el-table-column
      prop=""
      label="应付金额">
    </el-table-column>
    <el-table-column
      prop=""
      label="应付日期">
    </el-table-column>
    <el-table-column
      prop=""
      label="费用发生日期"
      width="100px">
    </el-table-column>
    <el-table-column
      prop=""
      label="单据">
    </el-table-column>
    <el-table-column
      prop="customerNo"
      label="自有业务编号"
      width="100px">
    </el-table-column>
    <el-table-column
      prop=""
      label="门点简称">
    </el-table-column>
    <el-table-column
      prop=""
      label="门点地址">
    </el-table-column>
    <el-table-column
      prop="billNo"
      label="提单号">
    </el-table-column>
    <el-table-column
      prop="totalXxxl"
      label="箱型箱量">
    </el-table-column>
    <el-table-column
      prop=""
      label="港口港区">
    </el-table-column>
  </el-table>
  </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {

  },
  data () {
    return {
      tableData: [
        {
          desc: '这是数据'
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.wrapper
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
    .kong
      width 100%
      height 20px
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
