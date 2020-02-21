<template>
  <div class="order-table">
    <el-table :data="data"
              v-loading="loading"
              highlight-current-row
              :row-class-name="tableRowClassName"
              :header-cell-style="{ background: '#f0f2f5'}"
              @selection-change="handleSelectChange"
              @current-change="handleCurrentChange"
              @row-dblclick="handleDblClick"
              header-cell-class-name="table-header"
              :ref="refType">
      <template v-if="refType === 'multipleTable'">
        <el-table-column type="selection"
                         width="55">
        </el-table-column>
      </template>
      <template v-for="(c, i) in columns">
        <template v-if="c.render">
          <el-table-column :key="i"
                           :label="c.label"
                           :width="c.width"
                           :show-overflow-tooltip="c.tooltip"
                           :fixed="c.fixed">
            <template slot-scope="scope">
              <Render :userRoles="userRoles"
                      :render="c.render"
                      :data="scope" />
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :key="i"
                           :label="c.label"
                           :prop="c.prop"
                           :min-width="c.width"
                           :width="c.w"
                           :show-overflow-tooltip="c.tooltip"
                           :formatter="c.formatter"
                           :class-name="c.class"
                           :fixed="c.fixed">
          </el-table-column>
        </template>
      </template>
      <el-table-column v-if="showDetails" fixed="right">
        <template slot-scope="scope">
          <div style="cursor:pointer;text-decoration:underline" @click="handleShowDetailRecord(scope.row)">
                明细
              </div>
        </template>
      </el-table-column>
      <!-- <el-table-column :width="action.width"
                       :label="action.label"
                       :fixed="action.fixed">
        <template slot-scope="scope">
          <template v-if="action.render">
            <Render :role="role"
                    :render="action.render"
                    :data="scope" />
          </template>
          <span v-else
                class="view-details"
                @click="showDetail(scope.row.instId)">{{action.btnText}}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import Render from './render'
export default {
  name: 'OrderTable',
  props: {
    columns: Array,
    data: Array,
    action: Object,
    loading: Boolean,
    userRoles: Array,
    refType: String,
    showDetails: Boolean
  },
  data () {
    return {
      currentRow: null
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.unreadTag === 'y') {
        return 'new-order'
      }
      return ''
    },
    handleCurrentChange (row) {
      this.currentRow = row
    },
    handleSelectChange (selection) {
      this.$emit('selectChange', selection)
    },
    handleDblClick (row) {
      this.$emit('onDblClick', row)
    },
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleShowDetailRecord (row) {
      this.$emit('show-detail-record', row)
    }
    // showDetail (e) {
    //   this.$router.push({ name: 'OrderDetails', params: { instId: e } })
    // }
  },
  components: {
    Render
  }
}
</script>
<style lang="stylus" scoped>
.order-table
  width 100%
  .view-details
    cursor pointer
    color #337df6
    font-weight bold
  .new-order
    background #fff7eb
</style>
