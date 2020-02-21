<template>
  <!--海运拼箱 -->
  <div class="ocean-lcl-inquiry">
    <div class="search-toggle" :class="{toggleBorder: toggle}">
      <span>筛选查询</span>
      <p @click="handleClickToggle">
        <span>{{searchText}}</span>
        <i :class="{rotate:!toggle}"></i>
      </p>
    </div>
    <div class="search-bar"
         ref="toggle">
      <div class="search-box"
           ref="searchBox">
        <div class="sb-top">
          <div class="sb-top-row">
            <div class="sb-top-col">
              <div class="st-item-port">
                <el-select v-model="startPort"
                           placeholder="起运港"
                           style="width:156px"
                           remote
                           :remote-method="fetchClickStartPort"
                           :loading="loading"
                           clearable
                           filterable
                           allow-create
                           default-first-option
                           class="oi-port"
                           popper-class="oi-slect-port">
                  <div class="st-item-title-wrapper">
                    <p class="st-item-info">
                      支持中文/拼音/简拼输入
                    </p>
                    <p class="st-item-text"
                       @click="handleSTRMClick"
                       :class="{'st-item-rm-active': showSTUnderline}">
                      热门
                    </p>
                  <el-option v-for="item in startPortOptions"
                             :key="item.key"
                             :label="item.name"
                             :value="item.name">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.line }}</span>
                  </el-option>
                   </div>
                </el-select>
                <!-- <el-input v-model="startPort"
                          placeholder="起运港"
                          style="width:130px"
                          class="oi-port-1"></el-input> -->
                <span class="vertical-line"></span>
                <el-select v-model="endPort"
                           placeholder="目的港"
                           style="width:156px"
                           filterable
                           allow-create
                           default-first-option
                           clearable
                           remote
                           :remote-method="fetchClickArrivePort"
                           :loading="loading"
                           class="oi-port"
                           popper-class="oi-slect-port oi-slect-arrive-port">
                  <div class="st-item-title-wrapper">
                    <p class="st-item-info">
                      支持中文/拼音/简拼输入
                    </p>
                    <p class="st-item-text"
                       @click="handleETRMClick"
                       :class="{'st-item-rm-active': showETUnderline}">
                      热门
                    </p>
                  </div>
                  <el-option v-for="item in arrivePortOptions"
                             :key="item.key"
                             :label="item.name"
                             :value="item.name">
                             <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.line }}</span>
                  </el-option>
                </el-select>
                <!-- <el-input v-model="endPort"
                          placeholder="目的港"
                          style="width:130px"
                          class="oi-port-1"></el-input> -->
              </div>
            </div>
            <!-- <div class="sb-top-col">
              <div class="st-item-btn">
                <el-input v-model="supplier"
                          placeholder="承运人"
                          clearable
                          style="width:145px"></el-input>
              </div>
            </div> -->
            <!-- <div class="sb-col-3">
              <div class="st-item st-item-2 st-item-btn">
                <el-checkbox-group v-model="companyName"
                                   style="display: inline-block">
                  <el-checkbox v-for="vCompany in companyNames"
                               :label="vCompany"
                               :key="vCompany">{{vCompany}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="st-item-3 st-item-btn">
                <el-button type="primary"
                           class="si-3-btn"
                           @click="handleClickSearch">查询</el-button>
              </div>
            </div> -->
            <div>
              <el-date-picker
                v-model="dateRange"
                type="daterange"
                size="small"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
                class="date-range"></el-date-picker>
            </div>
            <div>
              <el-select v-model="zhongzhuan"
                         style="width:145px"
                         placeholder="请选择中转方式"
                         clearable
                         class="zhong-zhuan">
                <el-option label="中转"
                           value="TRANSIT"></el-option>
                <el-option label="直达"
                           value="DIRECT"></el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div class="sb-buttom">
          <div class="sb-top-row">
            <!-- <div class="sb-top-col">
              <div class="sb-col-1">
                <el-date-picker v-model="dateRange"
                                type="daterange"
                                size="small"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="timestamp"
                                class="date-range"></el-date-picker>
              </div>
            </div> -->
            <!-- <div class="sb-top-col">
              <el-select v-model="zhongzhuan"
                         style="width:145px"
                         placeholder="请选择中转方式"
                         clearable
                         class="zhong-zhuan">
                <el-option label="中转"
                           value="TRANSIT"></el-option>
                <el-option label="直达"
                           value="DIRECT"></el-option>
              </el-select>
            </div> -->
            <div class="sb-top-col">
              <div class="sb-col-3">
                <span class="sc-2-title">班期</span>
                <el-checkbox :indeterminate="isIndeterminate"
                             v-model="checkAll"
                             @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedDays"
                                   style="display: inline-block"
                                   @change="handleCheckedDayChange">
                  <el-checkbox v-for="vDay in days"
                               :label="vDay"
                               :key="vDay">{{vDay}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div>
              <el-button type="primary"
                         class="si-3-btn"
                         @click="handleClickSearch">查询</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inquiry-details-wrapper">
      <OceanLCLPriceList :oceanLclList="oceanLclList"
                        @click-edit="handleClickEdit"
                        @click-save="handleClickSave"
                        @click-cancel="handleClickCancel" />
    </div>
    <div class="page-wrap">
      <OrderPagination styleType="border"
                       :total="total"
                       :size="orderParams.size"
                       v-model="orderParams.page"
                       @input="jumppage"
                       prevText="上一页"
                       nextText="下一页"></OrderPagination>
    </div>
  </div>
</template>

<script>
import { getHotPort, getLclPrice, getLclStart, getLclTarget, putLclPrice } from 'api/inquiry'
// import { timeFomatter } from 'common/js/utils'
import OceanLCLPriceList from 'components/enquiry/ocean-lcl-list'
import { ENQUIRY_SHIPPING_DAYS, ENQUIRY_SEARCH_COMPANY } from 'assets/constant'
import OrderPagination from 'components/pagination/pagination'
export default {
  name: 'ocean-LCL-inquiry',
  data () {
    return {
      startPort: '',
      endPort: '',
      // supplier: '',
      isIndeterminate: false,
      checkAll: false,
      checkedDays: [],
      days: ENQUIRY_SHIPPING_DAYS,
      startDate: '',
      endDate: '',
      dateRange: '',
      startPortOptions: [],
      arrivePortOptions: [],
      oceanLclList: [],
      zhongzhuan: '',
      companyName: [],
      companyNames: ENQUIRY_SEARCH_COMPANY,
      toggle: false,
      searchText: '收起筛选条件',
      showSTUnderline: true,
      showETUnderline: true,
      queryParams: {},
      loading: false,
      total: 0,
      orderParams: {
        size: 12,
        page: 1
      }
    }
  },
  methods: {
    fetchStartPortHot (type, mode, portOptions) {
      let params = {
        type,
        mode
      }
      getHotPort(params)
        .then(res => {
          if (res.msg === 'success') {
            this[portOptions] = res.data.records
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleCheckAllChange (val) {
      this.checkedDays = val ? this.days : []
    },
    handleCheckedDayChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.days.length
    },
    handleClickToggle () {
      this.toggle = !this.toggle
      if (this.toggle) {
        this.searchText = '展开筛选条件'
        this.$refs.toggle.style.height = 0
      } else {
        this.searchText = '收起筛选条件'
        this.$refs.toggle.style.height = this.$refs.searchBox.offsetHeight + 'px'
      }
    },
    fetchClickStartPort (query) {
      if (query !== '') {
        this.loading = true
        let param = {
          portParam: query.toUpperCase()
        }
        getLclStart(param)
          .then(res => {
            if (res.msg === 'success') {
              this.loading = false
              this.startPortOptions = res.data.records
              this.showSTUnderline = false
            }
            if (res.msg === 'fail') {
              this.$message.error(res.verror)
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.showSTUnderline = true
      }
    },
    fetchClickArrivePort (query) {
      if (query !== '') {
        this.loading = true
        let param = {
          portParam: query.toUpperCase()
        }
        getLclTarget(param)
          .then(res => {
            if (res.msg === 'success') {
              this.loading = false
              this.arrivePortOptions = res.data.records
              this.showETUnderline = false
            }
            if (res.msg === 'fail') {
              this.$message.error(res.verror)
            }
          })
          .catch(error => {
            console.logstring(error)
          })
      } else {
        this.showETUnderline = true
      }
    },
    handleClickSearch () {
      const searchObj = {
        targetPort: this.endPort,
        // carrier: this.supplier + ',' + this.companyName.join(','),
        // dateFrom: timeFomatter(this.startDate, 'yyyy-MM-dd') || '',
        // dateTo: timeFomatter(this.endDate, 'yyyy-MM-dd') || '',
        dateFrom: this.dateRange ? this.dateRange[0] : '',
        dateTo: this.dateRange ? this.dateRange[1] : '',
        transitType: this.zhongzhuan,
        shippingDayWeek: this.dateToString(this.checkedDays)
      }
      this.queryParams = {}
      for (let item in searchObj) {
        if (item && searchObj[item] !== '') {
          this.queryParams[item] = searchObj[item]
        }
      }
      this.getOceanLCL({ ...this.queryParams, ...this.orderParams })
    },
    handleSTRMClick () {
      this.showSTUnderline = true
    },
    jumppage (val) {
      this.orderParams.page = val
      this.getOceanLCL({ ...this.queryParams, ...this.orderParams })
    },
    getOceanLCL (params) {
      getLclPrice(params)
        .then(res => {
          if (res.msg === 'success') {
            // console.log('海运拼箱res', res)
            this.loading = false
            this.oceanLclList = res.data.records.map(item => {
              item.edit = false
              return item
            })
            this.total = res.data && res.data.total
            this.orderParams.page = res.data.current
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleClickEdit (i) {
      this.oceanLclList[i].edit = true
    },
    handleClickSave (param, i) {
      putLclPrice(param)
        .then(res => {
          if (res.msg === 'success') {
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
    handleClickCancel (i) {
      this.oceanLclList[i].edit = false
    },
    dateToString (data) {
      return data.join(',').replace(/[\u5468]/g, '')
    },
    handleETRMClick () {
    }
  },
  mounted () {
    this.fetchStartPortHot('lcl', 's', 'startPortOptions')
    this.fetchStartPortHot('lcl', 'e', 'arrivePortOptions')
  },
  components: {
    OceanLCLPriceList,
    OrderPagination
  }
}
</script>
<style lang="stylus">
@import '~styles/variable'
@import '../../assets/iconfont/iconfont.css'
.ocean-lcl-inquiry
  width 100%
  .search-toggle
    display flex
    justify-content space-between
    align-item flex-start
    height 30px
    padding-right 32px
    min-width 1100px
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
  .search-bar
    min-width 1100px
    box-shadow 0 4px 4px 0 rgba(0, 0, 0, 0.05)
    margin-bottom 20px
    overflow hidden
    .el-select:hover .el-input__inner
      border 1px solid #A2B6C7
      border-radius 4px
      box-sizing border-box
    .sb-top-row
      display flex
      justify-content space-between
    .sb-col-3
      width 606px
      height 32px
      line-height 32px
    .sb-top
      height 40px
      line-height 30px
      .el-checkbox+.el-checkbox
        margin-left 10px
      .st-item
        border 1px solid $border-color-light-grey
        border-radius 4px
        box-sizing border-box
      .st-item-port
        display inline-block
        border 1px solid $border-color-light-grey
        border-radius 4px
        box-sizing border-box
        background #ffffff
        padding 0 2px
        .oi-port
          .el-input
            border-color transparent
          .el-select .el-input__inner
            border none
          .el-input__inner
            border none
        .oi-port-1
          border none
          .el-input__inner
            border none
      .st-item-info
        font-size 12px
        color #a2b6c8
        line-height 22px
        margin-bottom 5px
      .st-item-btn
        display inline-block
      .st-item-2
        padding-left 10px
        width 354px
        height 32px
      .st-item-3
        padding-left 40px
        height 32px
        .si-3-btn
          height 31px
          background $color-button-background
          color #fff
          border 0
      .vertical-line
        width 1px
        height 25px
        border-left 1px solid #A2B6C7
      .st-item-title-wrapper
        position relative
        height auto
        border-bottom 1px solid #d3dde7
        margin-bottom 10px
    .sb-buttom
      margin-top 10px
      overflow hidden
      margin-bottom 10px
      .sb-col-1
        color $font-color-grey
        .start-date
          width 140px
        .date-range
          width 324px
        .zhong-zhuan
          width 145px
          width 145px
          border 1px solid $border-color-light-grey
          border-radius 4px
        .el-select .el-input__inner
          border none
      .sb-col-2
        border 1px solid $border-color-light-grey
        border-radius 4px
        box-sizing border-box
        height 40px
        line-height 30px
        width 280px
        .sc-2-title
          padding-left 10px
          color $font-color-grey
          font-size 14px
          margin-right 10px
        .el-checkbox+.el-checkbox
          margin-left 10px
  .inquiry-details-wrapper
    width 100%
    padding-left 20px
    box-sizing border-box
  .si-3-btn
    height 31px
    background $color-button-background
    color #fff
    border 0
  .page-wrap
    width 100%
    min-width 1100px
</style>
