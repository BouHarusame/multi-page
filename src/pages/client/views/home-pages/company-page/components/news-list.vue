<template>
  <div class="content">
    <pageBanner class="page-box" :pagination="pagination" :itemHeight="itemHeight" :height="height" :imgList="imgList"></pageBanner>
    <el-tabs v-model="dataTabsIndex" @tab-click="handleClickTab" class="">
      <template v-for="(item, index) in dataElTabs">
        <el-tab-pane :label="item.label" :name="item.label" :key="index">
          <div class="ocean-fcl add-animation">
            <page-detail v-if="detail" :detailList="item.detailList" @news-detail="handleToDetail"/>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import pageBanner from '../../components/page-card'
import pageDetail from 'client-components/home-page/detail'
import { deepCopy } from 'utils/utils'
export default {
  props: {
    imgList: Array,
    tabsIndex: String,
    elTabs: Array,
    detail: Boolean
  },
  data () {
    return {
      dataElTabs: [],
      dataTabsIndex: '',
      height: '460px',
      itemHeight: '400px',
      pagination: false
    }
  },
  components: {
    pageBanner,
    pageDetail
  },
  methods: {
    handleClickTab (tab) {
      this.$emit('clickTab', tab)
    },
    handleDetail (index) {
      this.$emit('fcldetail', index, true)
    },
    handleToDetail (id) {
      this.$emit('on-new', id)
    }
  },
  watch: {
    elTabs: {
      handler () {
        if (this.elTabs) {
          this.dataElTabs = deepCopy(this.elTabs)
        }
      },
      immediate: true,
      deep: true
    },
    tabsIndex: {
      handler () {
        this.dataTabsIndex = this.tabsIndex
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  .page-box
    opacity 1
  .title
    font-size 28px
    font-weight bold
    color #fff
    line-height 28px
    text-align center
    margin-top 150px
    margin-bottom 90px
    opacity 0
    .title-line
      width 155px
      height 4px
      background #FED901
      display inline-block
      margin-top 12px
  >>>.animated
    animation-fill-mode none
  .el-tabs.el-tabs--top
    width 1200px
    margin 50px 0 150px
    >>>.el-tabs__item
      font-size 16px !important
    .el-tabs__active-bar
      display none
    .el-tabs__nav-wrap::after
      height 2px
      background #e6e6e6
    .el-tabs__item.is-top
      height 60px
      font-size 30px !important
      color #A5A5A5 !important
      font-weight bold
      padding 0 80px 0 5px
      margin 0 20px 5px 0
    .el-tabs__item.is-top.is-active
      color #000 !important
      border-bottom 3px solid #FED900
  .ocean-fcl
    width 1200px
    .introduce
      margin 50px auto
      font-size 20px
      line-height 30px
      font-weight bold
      text-indent 42px
    .fcldetail
      margin-left 42px
      margin-bottom 20px
      display flex
      align-items center
      font-size 18px
      color #004EA2
      line-height 30px
      cursor pointer
      img
        margin-left 12px
</style>
