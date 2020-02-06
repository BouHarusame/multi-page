<template>
  <div class="content">
    <div class="sub-menu add-animation">
      <div class="sub-menu-box">
        <div class="sub-title">{{menuTitle}}</div>
        <el-menu class="add-animation" :default-active="activeMenu" mode="horizontal" @select="handleSelectMenu">
          <template v-for="(item, i) in menuList">
            <el-menu-item :index="item" :key="i">{{item}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
    <div class="title add-animation" v-if="pagetitle">
      <div class="title-text">{{pagetitle}}</div>
      <div class="title-line"></div>
    </div>
    <pageBanner class="add-animation" :itemHeight="itemHeight" :menuList="menuList" :height="height" :imgList="imgList" :activePage="activePageCard" @handleChange="handleChange"></pageBanner>
    <el-tabs class="add-animation" v-if="dataElTabs.length > 0" v-model="dataTabsIndex" @tab-click="handleClickTab">
      <template v-for="(item, index) in dataElTabs">
        <el-tab-pane :label="item.label" :name="item.label" :key="index">
          <div class="ocean-fcl add-animation">
            <div class="introduce" v-if="item.introduce">
              <p class="title-p" v-for="(e, i) in item.introduce.split('\n')" :key="i">{{e}}</p>
            </div>
            <div class="fcldetail" v-if="item.detailList" @click="handleDetail(item.label, index)">
              了解详情
              <img src="./img/ocean-detail.png" :class="{'img-active': item.show}">
            </div>
            <page-detail v-if="item.show" :detailList="item.detailList" :class="{'animated': item.show, 'fadeInUp': item.show}"/>
          </div>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import pageBanner from './page-card'
import pageDetail from 'client-components/home-page/detail'
import { deepCopy } from 'utils/utils'
export default {
  props: {
    menuList: Array,
    activeMenu: String,
    menuTitle: String,
    pagetitle: String,
    imgList: Array,
    itemHeight: String,
    activePageCard: Number,
    elTabs: Array,
    tabsIndex: String,
    height: String
  },
  data () {
    return {
      dataElTabs: [],
      dataTabsIndex: ''
    }
  },
  components: {
    pageBanner,
    pageDetail
  },
  methods: {
    handleChange (index) {
      this.$emit('selectMenu', this.imgList[index].cont.category)
    },
    handleSelectMenu (val) {
      this.$emit('selectMenu', val)
    },
    handleClickTab (tab) {
      this.$emit('clickTab', tab.name)
    },
    handleDetail (index) {
      this.$emit('fcldetail', index)
    }
  },
  watch: {
    activeMenu: {
      handler () {
        if (this.elTabs) {
          this.dataElTabs = []
          let tabs = deepCopy(this.elTabs)
          tabs.forEach(item => {
            if (item.menu && item.menu === this.activeMenu) {
              this.dataElTabs = item.menumsg
              this.dataTabsIndex = item.menumsg[0].label
            }
          })
        }
      },
      immediate: true,
      deep: true
    },
    elTabs: {
      handler () {
        if (this.elTabs) {
          this.dataElTabs = []
          let tabs = deepCopy(this.elTabs)
          tabs.forEach(item => {
            if (item.menu && item.menu === this.activeMenu) {
              this.dataElTabs = item.menumsg
            }
          })
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
  width 100%
  padding-bottom 100px
  display flex
  flex-direction column
  align-items center
  .sub-menu
    width 100%
    border-bottom 2px solid #587390
    .sub-menu-box
      width 1192px
      margin 0 auto
      display flex
      align-items center
      justify-content space-between
    .sub-title
      font-size 14px
      color #ffffff
      margin-left 18px
  .el-menu.el-menu--horizontal
    opacity 0
    display flex
    justify-content center
    background transparent
    padding-bottom 5px
    border none
    .el-menu-item
      height 40px
      color #C7C7C7
      line-height 40px
      font-size 14px
      // padding 0 30px
      background transparent !important
      &:hover
        color: #C7C7C7 !important;
    .el-menu-item.is-active
      border-bottom 2px solid #FED900
      color #FFD900 !important
  .title
    font-size 28px
    font-weight bold
    color #fff
    line-height 28px
    text-align center
    margin-top 80px
    margin-bottom 60px
    opacity 0
    .title-line
      width 155px
      height 4px
      background #FED901
      display inline-block
      margin-top 12px
  .el-tabs.el-tabs--top
    width 100%
    max-width 1200px
    margin-bottom 200px
    opacity 0
    >>>.el-tabs__active-bar
      display none
    >>>.el-tabs__nav-wrap::after
      height 2px
      background #e6e6e6
    >>>.el-tabs__item.is-top
      height 50px
      font-size 22px !important
      color #A5A5A5 !important
      font-weight bold
      padding 0 80px 0 5px
      margin 0 20px 5px 0
    >>>.el-tabs__item.is-top.is-active
      color #004EA1 !important
      border-bottom 3px solid #FED900
  .ocean-fcl
    opacity 0
    .introduce
      margin 50px auto
      p
        font-size 16px
        line-height 30px
        text-indent 42px
        color #525252
      .title-p
        margin-bottom 15px
    .fcldetail
      margin-left 42px
      margin-bottom 20px
      display flex
      align-items center
      font-size 16px
      color #004EA2
      line-height 30px
      cursor pointer
      img
        margin-left 12px
        width 14px
        height 16px
        transition transform 0.5s ease-out
      .img-active
        transform rotate(180deg)
@media screen and (min-width: 1372px) and (max-width: 1446px)
  .content
    .sub-menu
      .sub-menu-box
        width 1160px
    .el-tabs.el-tabs--top
      width 1076px
@media screen and (max-width: 1372px)
  .content
    .sub-menu
      .sub-menu-box
        width 1040px
    .el-tabs.el-tabs--top
      width 972px
</style>
