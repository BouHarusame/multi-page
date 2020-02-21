<!--  -->
<template>
<div class=''>
  <div class="table-bar clearfix">
    <div class="quotation-list">
      <el-table :data="truckDraftList" header-cell-class-name="table-header" class="tble-content">
        <el-table-column label="港口" prop="startPort" width="120"></el-table-column>
        <el-table-column label="船名航次" prop="shipName" width="120">
          <template slot-scope="scope">
            <div>{{scope.row.shipName}} {{scope.row.vesselNo}}</div>
          </template>
        </el-table-column>
        <el-table-column label="提单号" prop="billNo" width="160"></el-table-column>
        <el-table-column label="箱型箱量">
          <template slot-scope="scope">
            {{scope.row.cont20gp ? scope.row.cont20gp + ' * 20GP' : ''}} {{scope.row.cont40gp ? scope.row.cont40gp + ' * 40GP': '' }} {{scope.row.cont40hq ? scope.row.cont40hq + ' * 40HQ' : '' }}
          </template>
        </el-table-column>
        <el-table-column label="总件数" prop="totalCount"></el-table-column>
        <el-table-column label="总体积" prop="totalVolumn"></el-table-column>
        <el-table-column label="总毛重" prop="totalWeight"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleToDetail(scope.row.draftId)">查看</el-button>
            <el-button @click="handleDelete(scope.row.draftId)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
    </div>
  </div>
</div>
</template>

<script>
import { deleteTruckDraft, getTruckDrafts } from 'api/truck'
export default {
  name: '',
  components: {},
  data () {
    return {
      truckDraftList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    fetchTruckDraftList () {
      getTruckDrafts()
        .then(res => {
          if (res && res.msg === 'success') {
            this.truckDraftList = res.data && (res.data.records || [])
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
        })
    },
    handleToDetail (draftId) {
      this.$router.push({ name: 'trailerConfirm', params: { draftId: draftId } })
    },
    handleDelete (draftId) {
      deleteTruckDraft(draftId)
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('删除成功')
            this.fetchTruckDraftList()
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
        })
    }
  },
  created () {

  },
  mounted () {
    this.fetchTruckDraftList()
  }
}
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类

</style>
