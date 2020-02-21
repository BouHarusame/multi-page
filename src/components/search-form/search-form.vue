<template>
  <div class="search">
    <el-form inline
             size="small"
             class="search-form"
             :class="className">
      <el-form-item v-for="(c, i) in cloneColumns"
                    :class="c.className"
                    :key="i">
        <div class="search-item">
          <template v-if="c.type === 'select'">
            <template v-if="c.filterable">
              <span class="search-term">{{c.text}}</span>
              <template v-if="c.group">
                <el-select clearable
                   class="item-value"
                   filterable
                   remote
                   @focus="(visible) => { handleVisible1(visible, c.request, c.optionsName)}"
                   :remote-method="(visible) => { handleVisible1(visible, c.request, c.optionsName)}"
                   v-model="c.value"
                   placeholder="请输入监管方式">
                  <el-option-group
                    v-for="group in getOptions(c.optionsName)"
                    :key="group.label"
                    :label="group.label">
                    <el-option
                      v-for="(cc, ii) in group.options"
                      :key="ii"
                      :label="c.formatValue(cc)"
                      :value="c.formatLabel(cc)">
                    </el-option>
                  </el-option-group>
                </el-select>
              </template>
              <template v-else>
                <el-select clearable
                         popper-class="si-select-list"
                         :filterable="c.filterable"
                         v-model="c.value"
                         :remote="c.remote"
                          @clear="handleClear(c.optionsName)"
                          :remote-method="(visible) => { handleVisible(visible, c.request, c.optionsName)}"
                          placeholder="请选择">
                  <el-option v-for="(cc, ii) in getOptions(c.optionsName)"
                            :key="ii"
                            :value="c.formatValue(cc)"
                            :label="c.formatLabel(cc)"></el-option>
                </el-select>
              </template>
            </template>
            <template v-else>
              <span class="search-term">{{c.text}}</span>
              <el-select v-model="c.value"
                         clearable
                         placeholder="请选择"
                         :style="{width: c.width + 'px'}"
                         size="small">
                <el-option v-for="item in c.dataItem"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </template>
          </template>
          <template v-else-if="c.type === 'date'">
            <span class="search-term">{{c.text}}</span>
            <el-date-picker v-model="c.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :value-format="c.formattype"
                            size="small">
            </el-date-picker>
          </template>
          <template v-else-if="c.type === 'time'">
            <span class="search-term">{{c.text}}</span>
            <el-date-picker v-model="c.value"
                            type="date"
                            placeholder="选择日期"
                            value-format="timestamp"
                            size="small">
            </el-date-picker>
          </template>
          <template v-else-if="c.type === 'input'">
            <span class="search-term">{{c.text}}</span>
            <el-input v-model="c.value"
                      clearable
                      style="width: 120px"></el-input>
          </template>
          <template v-else>
            <el-checkbox v-model="c.value">{{c.text}}</el-checkbox>
          </template>
        </div>
      </el-form-item>
      <el-form-item class="right">
        <div class="search-item">
          <el-button class="toggle-btn" :class="{'toggle-btn1': toggleText === '收起'}" @click="handleChangeToggle" type="text" v-if="toggle">{{toggleText}}</el-button>
          <el-button class="search-btn"
                     size="small"
                     @click="handleClickSearch">{{btnText}}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { deepCopy } from 'utils/utils'
export default {
  name: 'search-form',
  props: {
    searchColumns: Array,
    userRoles: Array,
    className: String,
    btnText: {
      type: String,
      default: '查询'
    },
    toggle: Boolean,
    toggleText: String
  },
  data () {
    return {
      cloneColumns: [],
      professor: [],
      compCode: [],
      targetPort: [],
      superviseMethod: [],
      salesmanItem: [],
      operatorItem: [],
      supplierItem: [],
      shipCompanyItem: [],
      yw: [],
      customList: '客服员'
    }
  },
  mounted () {
    this.makeCloneData()
    this.getSelectOptions()
  },
  methods: {
    handleChangeToggle () {
      this.$emit('changeToggle')
    },
    getSelectOptions () {
      this.cloneColumns.forEach(c => {
        if (c.type === 'select') {
          if (c.filterable) {
            this.handleVisible(true, c.request, c.optionsName, c.value)
          }
        }
      })
    },
    handleClickSearch () {
      let tempData = this.formatData(this.cloneColumns)
      tempData.searchClicked = true
      this.$emit('on-search', tempData)
    },
    makeCloneData () {
      let searchColumns = deepCopy(this.searchColumns)
      if (this.userRoles.indexOf('AC_GLY') === -1 && this.userRoles.indexOf('AC_CW') === -1) {
        this.cloneColumns = searchColumns.filter(item => {
          if (item.text !== this.customList) {
            return item
          }
        })
      } else {
        this.cloneColumns = searchColumns
      }
      this.cloneColumns.forEach((item, index) => {
        let itemValue = ''
        if (item.type === 'date') {
          let dateFrom = Number(window.sessionStorage.getItem(item.prop[0]))
          let dateTo = Number(window.sessionStorage.getItem(item.prop[1]))
          if (dateFrom && dateTo) {
            let aDateTemp = [dateFrom, dateTo]
            this.$set(this.cloneColumns[index], 'value', aDateTemp)
          }
        } else {
          itemValue = window.sessionStorage.getItem(item.prop)
        }
        if (itemValue) {
          if (item.type !== 'date') {
            this.$set(this.cloneColumns[index], 'value', itemValue)
          }
        }
      })
      let tempData = this.formatData(this.cloneColumns)
      tempData.searchClicked = false
      this.$emit('on-search', tempData)
    },
    getOptions (optionsName) {
      // console.log(1111, this[optionsName])
      return this[optionsName]
    },
    handleClear (optionsName) {
      this[optionsName] = []
    },
    handleVisible (visible, $http, optionsName) {
      if (visible) {
        this.loading = true
        if (visible.toString() === 'true') {
          visible = ''
        }
        $http({ param: visible })
          .then(res => {
            if (res && res.msg === 'success') {
              this[optionsName] = res.data.records || []
              // console.log(this[optionsName])
            }
            if (res && res.msg === 'fail') {
              this.$message.error(res.verror)
            }
            this.loading = false
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    handleVisible1 (visible, $http, optionsName) {
      if (visible) {
        this.loading = true
        if (visible.toString() === 'true') {
          visible = ''
        }
      }
      $http()
        .then(res => {
          if (res && res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            let group1 = []
            let group2 = []
            data.forEach(item => {
              if (item.acSupport && item.acSupport === 'Y') {
                group1.push(item)
              } else {
                group2.push(item)
              }
            })
            this[optionsName] = [{
              label: '常用类型',
              options: group1
            }, {
              label: '其他',
              options: group2
            }]
            console.log(this[optionsName], optionsName)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    formatData (data) {
      let tempData = {}
      data.forEach(item => {
        if (item.type === 'date') {
          tempData[item.prop[0]] = item.value ? item.value[0] : ''
          tempData[item.prop[1]] = item.value ? item.value[1] : ''
        } else {
          tempData[item.prop] = item.value ? item.value : ''
        }
      })
      return tempData
    }
  },
  watch: {
    searchColumns: {
      handler () {
        if (this.searchColumns) {
          this.makeCloneData()
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.search
  width 100%
  .search-order-form
    position relative
    padding-right 100px
    .right
      position absolute
      right 0
      bottom 0
  .search-dc-form
    .search-item
      margin-right 5px !important
      .search-term
        width auto !important
  .search-form
    display flex
    flex-wrap wrap
    justify-content space-between
    .search-item
      margin-right 10px
      margin-bottom 15px
      display inline-block
      line-height 40px
      .search-term
        display inline-block
        width 60px
        font-size 14px
        color #424242
        margin-right 5px
      .toggle-btn
        color #F6AB39
        width 64px
        position relative
        margin-right 4px
        &:after
          position absolute
          top 12px
          right 0
          content ''
          width 12px
          height 7px
          transition transform 0.6s
          transform rotate(180deg)
          background url('./arrow.png')no-repeat top center / 100%
      .toggle-btn1
        &:after
          position absolute
          top 12px
          right 0
          content ''
          width 12px
          height 7px
          transform rotate(0deg)
          background url('./arrow.png')no-repeat top center / 100%
    .right
      flex-grow 48
      text-align right
.optAuditStatus, .buzAuditStatus, .invoiceFlag, .chargeOffFlag
  flex-grow 1
@media screen and (max-width: 1460px) and (min-width: 1420px)
  .search .buzRange
    flex-grow 0
@media screen and (max-width: 1600px)
  .search .search-form .right
    flex-grow 7
</style>
