<template>
  <div class="air-parcel">
    <div class="search-bar">
      <div class="sb-item st-item-port">
        <el-select v-model="startPort"
                   placeholder="起运港"
                   style="width:130px"
                   filterable
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
            <em v-show="showSTUnderline"></em>
          </div>
          <el-option v-for="item in startPortOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
        <span class="vertical-line"></span>
        <el-select v-model="endPort"
                   placeholder="目的港"
                   style="width:130px"
                   filterable
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
            <em v-show="showETUnderline"></em>
          </div>
          <el-option v-for="item in startPortOptions"
                     :key="item.key"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="sb-item">
        <el-select v-model="airCompany"
                   class="si-2-select"
                   placeholder="航空公司"></el-select>
      </div>
      <div class="sb-item">
        <el-checkbox v-model="check1">是否直达</el-checkbox>
        <el-checkbox v-model="check2">托盘</el-checkbox>
        <el-checkbox v-model="check3">散货</el-checkbox>
      </div>
      <el-button>查询</el-button>
    </div>
    <div class="air-parcel-details-wrapper">
      <AirPriceList/>
    </div>
  </div>
</template>

<script>
import AirPriceList from 'components/enquiry/air-list'
export default {
  name: 'air-parcel',
  data () {
    return {
      startPort: '',
      endPort: '',
      airCompany: '',
      showSTUnderline: true,
      showETUnderline: true,
      startPortOptions: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      check1: false,
      check2: false,
      check3: false
    }
  },
  methods: {
    handleSTRMClick () {
      this.showSTUnderline = true
    },
    handleETRMClick () {
    }
  },
  components: {
    AirPriceList
  }
}
</script>

<style lang="stylus">
@import '~styles/variable'
.air-parcel
  .search-bar
    margin-bottom 10px
    .sb-item
      display inline-block
      margin-right 20px
      .el-checkbox
        color $font-color-grey
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
        .el-input__suffix
          display none
        .el-select .el-input__inner
          border none
        .el-input__inner
          border none
    .st-item-info
      font-size 12px
      color #a2b6c8
      line-height 22px
      margin-bottom 5px
    .vertical-line
      width 1px
      height 25px
      border-left 1px solid #A2B6C7
    .el-button
      background $color-button-background
      color #fff
      border 0
  .air-parcel-details-wrapper
    width 100%
    overflow auto
</style>
