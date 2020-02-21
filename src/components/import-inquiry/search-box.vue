<template>
  <div class="search-box">
    <div class="search-item" v-for="(c, i) in formData" :key="i">
      <template v-if="c.type === 'selectInput'">
        <div class="search-section">
          <div class="search-item-label">
            <span class="label-content">{{c.text}}</span><span class="label-required" v-if="c.required">*</span><span class="lable-error" v-if="c.error">必填</span>
          </div>
          <div class="search1-box">
            <template v-for="(s, si) in c.searchGroup" >
              <div class="search1-box-items" :key="si" v-if="s.show">
                <template v-if="s.type === 'select'">
                  <template v-if="s.filterable">
                    <div class="search-item-value">
                      <el-select clearable
                                  popper-class="si-select-list"
                                  filterable
                                  v-model="s.value"
                                  remote
                                  :class="{'required-error1': s.error}"
                                  @blur="handleBlur(c,s)"
                                  @change="handleBlur(c,s)"
                                  @clear="handleClear(s.optionsName)"
                                  @focus="() => { handleVisible(true, s.request, s.optionsName)}"
                                  :remote-method="(visible) => { handleVisible(visible, s.request,  s.optionsName)}"
                                  :placeholder="s.placeholder">
                        <el-option v-for="(cc, ii) in getOptions(s.optionsName)"
                                    :key="ii"
                                    :value="s.formatValue(cc)"
                                    :label="s.formatLabel(cc)"></el-option>
                      </el-select>
                    </div>
                  </template>
                  <template v-else-if="s.option === 'group'">
                    <div class="search-item-value">
                      <el-select v-model="s.value"
                                clearable
                                popper-class="select-box"
                                :class="{'required-error1': s.error}"
                                @blur="handleBlur(c,s)"
                                @change="handleChangeSelect(c,s)"
                                :placeholder="s.placeholder"
                                size="small">
                        <el-option-group
                          v-for="group in s.dataItem"
                          :key="group.label"
                          :label="group.label">
                          <el-option
                            v-for="item in group.options"
                            :key="item.superviseCode"
                            :label="item.shortName"
                            :value="item.shortName">
                          </el-option>
                        </el-option-group>
                      </el-select>
                    </div>
                  </template>
                  <template v-else>
                    <div class="search-item-value">
                      <el-select v-model="s.value"
                                  clearable
                                  :class="{'required-error1': s.error}"
                                  @blur="handleBlur(c,s)"
                                  @change="handleChangeSelect(c,s)"
                                  :placeholder="s.placeholder"
                                  size="small">
                        <el-option v-for="item in s.dataItem"
                                    :key="item.value"
                                    :label="item.label"
                                    :disabled="item.disabled"
                                    :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <div class="search-item-value">
                    <el-input v-model="s.value" :type="s.inputType" v-if="s.limit" v-limit class="search-input" :class="{'required-error': s.error, 'required-error-textarea': s.error}" @blur="handleBlur(c,s)" :placeholder="s.placeholder" size="small"></el-input>
                    <el-input v-model="s.value" :type="s.inputType" v-else class="search-input" :class="{'required-error': s.error, 'required-error-textarea': s.error}" @blur="handleBlur(c,s)" :placeholder="s.placeholder" size="small"></el-input>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
      <template v-else-if="c.type === 'inputCount'">
        <div class="search-item-label">
          <span class="label-content">{{c.text}}</span><span class="label-required" v-if="c.required">*</span><span class="lable-error" v-if="c.error">必填</span>
        </div>
        <div class="search-item-value flex">
          <number-box :curVal="cont20gp" :unit="unit1" :edit="c.edit" @onChange="handleChangeVal1" />
          <number-box :curVal="cont40gp" :unit="unit2" :edit="c.edit" @onChange="handleChangeVal2" />
          <number-box :curVal="cont40hq" :unit="unit3" :edit="c.edit" @onChange="handleChangeVal3" />
        </div>
      </template>
      <template v-else-if="c.type === 'distpicker'">
        <div class="search-item-label">
          <span class="label-content">{{c.text}}</span><span class="label-required" v-if="c.required">*</span><span class="lable-error" v-if="c.error">必填</span>
          <div class="title-btn" @click="handleFetchUsualAddr"><span class="btn-icon"></span><p class="btn-p">历史查询地址</p></div>
          <!-- <div class="btn-addr" @click="handleFetchUsualAddr">历史查询地址</div> -->
        </div>
        <div class="search-item-value">
          <div class="clear-address-wrapper">
            <div class="choose-address">
              <area-cascader v-model="addressAll" v-if="showCascader" type="text" placeholder="请选择省市区镇" class="address-box" :class="{'required-error': c.error}" :data="$pcaa" :level="2" @change="handleChangearea"></area-cascader>
            </div>
            <el-input type="text" v-model="address" @change="handleBlurAddr" :placeholder="c.placeholder2" class="input-addr"></el-input>
          </div>
        </div>
      </template>
    </div>
    <el-dialog
      title="历史查询地址"
      :visible.sync="dialogVisible"
      @close="handleClose"
      :close-on-click-modal="false"
      width="600px"
      class="dialog-addr"
      center>
      <el-radio-group v-model="addrIndex">
        <el-radio class="radio-item" :label="index" v-for="(item, index) in usualAddrList" :key="index">{{item.province}} {{item.city}} {{item.region}} {{item.town}} {{item.addr}}</el-radio>
      </el-radio-group>
      <div class="el-dialog-footer">
        <div class="btn-box sty1" @click="handleClickDialog">确定</div>
        <div class="btn-box sty2" @click="handleCancleDialog">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuoteHisAddr, getTruckAddrTown } from 'api/import'
import { getTruckAddrImport } from 'api/inquiry'
import { deepCopy } from 'utils/utils'
import NumberBox from 'components/number-box/number-box.vue'
import limit from '@/directives/limit'
export default {
  name: 'search-box',
  props: {
    searchColumns: Array
  },
  data () {
    return {
      error: false,
      dialogVisible: false,
      addrIndex: null,
      usualAddrList: [],
      formData: {},
      targetPort: [],
      originCountry: [],
      unit1: 'x20GP',
      unit2: 'x40GP',
      unit3: 'x40HQ',
      cont20gp: null,
      cont40gp: null,
      cont40hq: null,
      address: '',
      province: '',
      city: '',
      region: '',
      town: '',
      townList: [],
      addressAll: '',
      DISTRICTS: {},
      trailerAddress: '',
      visibleDistpicker: false,
      select: { province: '', city: '', area: '', town: '' },
      showCascader: true
    }
  },
  created () {
    getTruckAddrImport()
      .then(res => {
        if (res.msg === 'success') {
          Object.assign(this.DISTRICTS, res.data)
        }
        if (res.msg === 'fail') {
          this.$message.error(res.verror)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    handleClose () {
      this.addrIndex = null
    },
    handleCancleDialog () {
      this.dialogVisible = false
    },
    handleClickDialog () {
      // console.log('历史地址', this.addrIndex)
      this.dialogVisible = false
      this.address = this.usualAddrList[this.addrIndex].addr
      this.province = this.usualAddrList[this.addrIndex].province
      this.city = this.usualAddrList[this.addrIndex].city
      this.region = this.usualAddrList[this.addrIndex].region
      this.town = this.usualAddrList[this.addrIndex].town
      this.addressAll = [this.province, this.city, this.region, this.town]
      this.showCascader = false
      this.$nextTick(() => {
        this.showCascader = true
      })
      this.handleBlurAddr()
    },
    handleFetchUsualAddr () {
      getQuoteHisAddr()
        .then(res => {
          if (res && res.msg === 'success') {
            this.usualAddrList = res.data && (res.data.records || [])
            if (this.usualAddrList.length > 0) {
              this.dialogVisible = true
            } else {
              this.$message.warning('您还没有历史询价地址')
            }
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleCheck () {
      if (!this.cont20gp && !this.cont40gp && !this.cont40hq) {
        this.formData[4].error = true
      } else {
        this.formData[4].error = false
      }
    },
    handleChangeVal1 (val) {
      this.cont20gp = Number(val)
      this.handleCheck()
      this.handleEmit()
    },
    handleChangeVal2 (val) {
      this.cont40gp = Number(val)
      this.handleCheck()
      this.handleEmit()
    },
    handleChangeVal3 (val) {
      this.cont40hq = Number(val)
      this.handleCheck()
      this.handleEmit()
    },
    handleClear (optionsName) {
      this[optionsName] = []
    },
    handleChangeSelect (parentItem, item) {
      this.handleBlur(parentItem, item)
      if (item.prop === 'targetPortArea') {
        if (item.value === 'YS' || item.value === 'WG') {
          this.formData.forEach(f => {
            if (f.searchGroup && f.searchGroup[0].prop === 'transferWay') {
              f.searchGroup[0].dataItem.forEach(d => {
                d.disabled = false
                if (d.value === 'air') {
                  d.disabled = true
                }
              })
            }
          })
        } else if (item.value === 'PDJC' || item.value === 'HQJC') {
          this.formData.forEach(f => {
            if (f.searchGroup && f.searchGroup[0].prop === 'transferWay') {
              f.searchGroup[0].dataItem.forEach(d => {
                d.disabled = true
                if (d.value === 'air') {
                  d.disabled = false
                }
              })
            }
          })
        } else if (item.value === 'WS') {
          this.formData.forEach(f => {
            if (f.searchGroup && f.searchGroup[0].prop === 'transferWay') {
              f.searchGroup[0].dataItem.forEach(d => {
                d.disabled = true
                if (d.value === 'lcl') {
                  d.disabled = false
                }
              })
            }
          })
        }
      }
      if (item.prop === 'transferWay') {
        this.formData.forEach(f => {
          if (f.prop === 'cont') {
            if (item.value === 'fcl') {
              f.edit = true
              f.error = false
              f.required = true
            } else {
              f.edit = false
              f.error = false
              f.required = false
              this.cont20gp = 0
              this.cont40gp = 0
              this.cont40hq = 0
            }
          }
        })
      }
      if (item.prop === 'custDeclareWay') {
        this.formData.forEach(f => {
          if (f.searchGroup && f.searchGroup[0].prop === 'buzDesc') {
            if (this.compareResulte(item.dataItem[1].options, item.value)) {
              f.required = true
            } else {
              f.required = false
              f.error = false
              f.searchGroup[0].error = false
            }
          }
        })
      }
    },
    compareResulte (c1, c2) {
      return c1.some(item => {
        return item.shortName === c2
      })
    },
    handleBlurAddr () {
      this.formData.forEach(item => {
        if (item.prop === 'address') {
          item.error = !this.addressAll
        }
      })
      this.handleEmit()
    },
    handleBlur (parentItem, item) {
      if (item.prop === 'targetPort') {
        if (item.value === '上海港') {
          parentItem.searchGroup[1].show = true
        } else {
          parentItem.searchGroup[1].show = false
          this.formData.forEach(f => {
            if (f.searchGroup && f.searchGroup[0].prop === 'transferWay') {
              f.searchGroup[0].dataItem.forEach(d => {
                d.disabled = false
              })
            }
          })
        }
      }
      let isValue = parentItem.searchGroup.every(item => {
        return !!item.value === true
      })
      if (item.limit && item.value) {
        item.value = item.value.replace(/[^0-9.]/g, '')
      }
      parentItem.searchGroup.map(item => {
        if (item.prop === 'shipBookTag') {
          if (item.value === 'y') {
            parentItem.searchGroup[1].show = true
            parentItem.searchGroup[2].show = true
          } else {
            isValue = true
            parentItem.searchGroup[1].show = false
            parentItem.searchGroup[2].show = false
          }
        }
        if (item.prop === 'buzDesc') {
          if (!parentItem.required) {
            isValue = true
            item.error = false
            return false
          }
        }
        if (item.value) {
          item.error = false
        } else {
          item.error = true
        }
        if (item.prop === 'remark') {
          item.error = false
          isValue = true
        }
      })
      if (isValue) {
        parentItem.error = false
      } else {
        parentItem.error = true
      }
      this.handleEmit()
    },
    handleEmit () {
      let tempData = this.formatData(this.formData)
      // console.log('搜索', tempData)
      this.$emit('on-search', tempData)
    },
    makeCloneData () {
      let searchColumns = deepCopy(this.searchColumns)
      this.formData = searchColumns
      // console.log('数据', this.formData)
    },
    formatData (data) {
      let tempData = {}
      data.forEach(item => {
        if (item.prop === 'cont') {
          tempData.cont20gp = this.cont20gp
          tempData.cont40gp = this.cont40gp
          tempData.cont40hq = this.cont40hq
        } else if (item.prop === 'address') {
          tempData.province = this.province
          tempData.city = this.city
          tempData.region = this.region
          tempData.address = this.address
          tempData.addressAll = this.addressAll
          tempData.town = this.town
          tempData.townList = this.townList
        } else {
          item.searchGroup.forEach(ele => {
            tempData[ele.prop] = ele.value ? ele.value : ''
          })
        }
      })
      return tempData
    },
    handleVisible (visible, request, optionsName) {
      this.loading = true
      if (visible && visible.toString() === 'true') {
        visible = ''
      }
      request({ param: visible })
        .then(res => {
          if (res && res.msg === 'success') {
            this[optionsName] = res.data && (res.data.records || [])
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
    },
    getOptions (optionsName) {
      // console.log(this[optionsName])
      return this[optionsName]
    },
    handleChangeAddress (e) {
      // this.setDistpicker(true)
      this.visibleDistpicker ? this.hide() : this.show()
    },
    show () {
      this.visibleDistpicker = true
      document.addEventListener('click', this.hidePanel, true)
    },
    hide () {
      this.visibleDistpicker = false
      document.removeEventListener('click', this.hidePanel, true)
    },
    hidePanel (e) {
      this.$nextTick(() => {
        if (!this.$refs.main2[0].contains(e.target)) {
          this.hide()
        }
      })
    },
    handleChangearea (data) {
      // console.log('地址', data)
      this.province = data[0]
      this.city = data[1]
      this.region = data[2]
      this.town = data[3]
      this.trailerAddress = this.province + ' ' + this.city + ' ' + this.region + ' ' + this.town
      this.addressAll = this.trailerAddress
      this.handleBlurAddr()
    },
    selectProvince (data) {
      this.select.province = data
      this.trailerAddress = this.select.province.value
      this.addressAll = this.trailerAddress
      this.handleBlurAddr()
    },
    selectCity (data) {
      if (data.value === '市') return false
      this.select.city = data
      // if (this.select.city.value && this.select.city.value !== '市') {
      this.trailerAddress = this.select.province.value + ' ' + this.select.city.value
      this.addressAll = this.trailerAddress
      this.handleBlurAddr()
      // }
    },
    selectArea (data) {
      if (data.value === '区') return false
      this.select.area = data
      // if (this.select.city.value && this.select.city.value !== '市' && this.select.area.value && this.select.area.value !== '区') {
      this.trailerAddress = this.select.province.value + ' ' + this.select.city.value + ' ' + this.select.area.value
      this.addressAll = this.trailerAddress
      this.province = this.select.province.value
      this.city = this.select.city.value
      this.region = this.select.area.value
      this.handleChangeAddress()
      this.handleBlurAddr()
      this.fetchTownList()
      // }
    },
    onSelected (data) {
      // alert(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
      // console.log(data)
    },
    handleClearTrailerAddress (event) {
      this.addressAll = ''
      this.trailerAddress = ''
      this.select.province = ''
      this.select.city = ''
      this.select.area = ''
      this.province = ''
      this.city = ''
      this.region = ''
      // this.$refs.addressRef.cleanAddress()
      this.visibleDistpicker = false
      this.handleBlurAddr()
    },
    fetchTownList () {
      const param = {
        province: this.province,
        city: this.city,
        region: this.region
      }
      getTruckAddrTown(param)
        .then(res => {
          if (res.msg === 'success') {
            // console.log(res.data.records)
            this.townList = res.data && (res.data.records || [])
            this.handleBlurAddr()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleFormatAddr () {
      // console.log(1111)
      this.searchColumns.forEach(item => {
        if (item.text === '箱型箱量') {
          this.cont20gp = item.cont20gp
          this.cont40gp = item.cont40gp
          this.cont40hq = item.cont40hq
        }
        if (item.text === '送货地址') {
          if (item.province) {
            this.province = item.province
            this.city = item.city
            this.region = item.area
            this.town = item.town
            this.address = item.address
            this.addressAll = [this.province, this.city, this.region, this.town]
          }
          // this.town = item.town
          // if (this.addressAll || item.town) {
          //   this.fetchTownList()
          // }
        }
      })
    }
  },
  mounted () {
  },
  beforeDestroy () {
    this.hide()
  },
  directives: {
    limit: limit
  },
  components: {
    NumberBox
  },
  watch: {
    searchColumns: {
      handler () {
        if (this.searchColumns) {
          this.makeCloneData()
          this.handleFormatAddr()
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang='stylus' scoped>
.search-box
  padding 0 20px 30px
  width 100%
  box-sizing border-box
  display flex
  flex-wrap wrap
  .search-item
    width 30%
    min-width 270px
    margin-top 30px
    margin-left 5%
    &:nth-child(3n+1)
      margin-left 0
    .search-item-label
      display flex
      align-items center
      margin-bottom 8px
      height 24px
      .title-btn
        width 112px
        height 24px
        border-radius 15px
        background #F0F2F5
        display flex
        align-items center
        justify-content center
        cursor pointer
        margin-left 20px
        .btn-icon
          width 12px
          height 16px
          background url('./img/addr-icon.png')no-repeat center/100%
          margin-right 10px
        .btn-p
          font-size 12px
          color #353535
          font-weight 500
          line-height 16px
          border-bottom 1px solid #353535
      .btn-addr
        width: 112px;
        height: 18px;
        border: 1px solid #fbb03b;
        background: #fff7eb !important;
        color: #fbb03b;
        font-size: 14px;
        font-weight: 500;
        text-align: center;
        line-height 18px
        margin-left 14px
        cursor pointer
      .label-content
        font-size 12px
        color #353535
        font-weight 500
        line-height 14px
      .label-required
        font-size 14px
        color #F56C6C
        font-weight 500
        line-height 14px
        margin-left 8px
      .lable-error
        margin-left 14px
        font-size 12px
        color #F56C6C
        font-weight 500
        line-height 14px
    .search1-box
      display flex
      flex-wrap wrap
      .search1-box-items
        flex 1
        margin-left 10px
        &:first-child
          margin-left 0
    .search-item-value
      width 100%
      >>> .el-select
        width 100%
      .search-input
        width 100%
        height 28px
        line-height 28px
        font-size 12px
        color #353535
        box-sizing border-box
        &placeholder
          color #D3D3D3
        &:focus
          border 1px solid #FBB03B
          outline 0
      >>> .el-input__inner
            height 28px
            line-height 28px
      >>> .el-textarea__inner
        height 75px
      >>> .el-input__inner:focus
          border 1px solid #FBB03B!important
      >>> .required-error1 .el-input__inner
            border 1px solid #F56C6C
      >>> .required-error-textarea
        border 0
        .el-textarea__inner
          border 1px solid #F56C6C
        .el-textarea__inner:focus
          border 1px solid #FBB03B!important
      >>> .required-error .el-input__inner
        border 1px solid #F56C6C
      .clear-address-wrapper
        width 100%
        display flex
        align-items center
        flex-wrap wrap
        .choose-address
          width 100%
          display flex
          align-items center
          .choose-select
            flex 1
            margin-bottom 14px
            margin-left 14px
          .area-cascader-wrap
            flex 1
            margin-bottom 14px
            >>>.area-select.large
              width 100%
              .area-selected-trigger
                font-size 12px
                color #606266
        .address-box
          flex 2
          position relative
          margin-bottom 14px
          width 100%
        .search-term
          width 110px
          display block
        .clear-address
          position absolute
          display none
          top 6px
          right 4px
          cursor pointer
          color #c0c4cc
        &:hover .clear-address
          display inline-block !important
        .required-error
          .input-address
            border 1px solid #F56C6C
      .input-address
        display inline-block
        width 100%
        min-width 154px
        height 30px
        line-height 40px
        font-size 12px
        border 1px solid #dcdfe6
        border-radius 4px
        color #353535
        padding 0 14px
        box-sizing border-box
        outline 0
        trasition border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)
        padding-right 24px
        &placeholder
          color #D3D3D3
      >>> .el-input__inner
        height 30px
        line-height 30px
        font-size 12px
      .distpicker-address-wrapper
        position absolute
        left 0
        top 32px
        height 200px
        width 100%
        z-index 99
        overflow scroll
    .flex
      display flex
      justify-content space-between
      align-items center
  >>>.el-dialog__body
    padding 0 !important
  .el-radio-group
    padding 30px 20px
    max-height 500px
    overflow scroll
    width 100%
    box-sizing: border-box;
  .radio-item
    display block
    margin 10px auto
  .el-dialog-footer
    display flex
    align-items center
    justify-content center
    margin-top 20px
  .btn-box
    width 90px
    height 30px
    line-height 30px
    text-align center
    font-size 14px
    font-weight 500
    border-radius 5px
    cursor pointer
  .sty1
    background #FBB03B
    border 1px solid #FBB03B
    color #FFFFFF
    margin-bottom 20px
  .sty2
    background #FFF7EB
    border 1px solid #FBB03B
    color #FBB03B
    margin-left 50px
    margin-bottom 20px
</style>
