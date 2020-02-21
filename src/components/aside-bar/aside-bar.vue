<template>
  <el-aside width="150px"
            background="#fff"
            :class="currentClass">
    <h1>
      <router-link class="hd-text"
                   to="/" @click.native="handleClearMenu"><img src="./img/logo.png"
             class="ab-logo"></router-link>
    </h1>
    <el-menu :default-active="activeMenuIndex"
             class="el-menu-vertical-demo"
             :class="{'delete-is-active': passRoute}"
             @select="handleSelect"
             text-color="#ffd04b"
             active-text-color="#ffd04b"
             :router="isRouter">
      <el-menu-item :class="{'active': metaIcon === 'map'}"
                    class="xx-menu-item"
                    v-if="getRole(userRoles, 'AC_GLY')"
                    index="console">
        <i class="fa fa-lg fa-style icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <template v-for="c in finalMenu">
        <el-menu-item v-if="c.subMenu.length === 0"
                      :key="c.menuId"
                      :index="c.url"
                      :class="{'active': metaIcon === c.url}">
          <i class="fa fa-lg fa-style"
             :class="'icon-' + c.icon"></i>
          {{c.name}}
        </el-menu-item>
        <el-submenu v-else
                    :index="c.name"
                    :key="c.menuId">
          <template slot="title">
            <i class="fa fa-lg fa-style"
               :class="'icon-' + c.icon"></i>
            <span>{{c.name}}</span>
          </template>
          <template v-for="cc in c.subMenu">
            <el-submenu v-if="cc.threeMenu.length !== 0"
                        :key="cc.menuId"
                        :index="cc.name">
              <template slot="title"><span>{{cc.name}}</span></template>
              <el-menu-item :index="t.url"
                            v-for="t in cc.threeMenu"
                            :key="t.menuId"
                            :class="{'active': metaIcon === t.url}">{{t.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-else
                          :index="cc.url"
                          :key="cc.menuId"
                          :class="{'active': metaIcon === cc.url}">
              {{cc.name}}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { getMenuList } from 'api/common'
import { mapGetters, mapMutations } from 'vuex'
import { roleType } from 'utils/utils'
export default {
  name: 'asidebar',
  props: {
    currentClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isRouter: false,
      navMenus: [],
      orderMenus: [],
      metaIcon: '',
      finalMenu: [],
      secondMenu: []
    }
  },
  computed: {
    ...mapGetters([
      'activeMenuIndex',
      'userRoles',
      'passRoute'
    ])
  },
  mounted () {
    this.getMenuList()
    // this.$store.dispatch('fetchNewMsgCount')
    // this.$store.dispatch('fetchUnreadInquiryCount')
  },
  methods: {
    ...mapMutations({
      setMenuName: 'menu/SET_MENU_NAME',
      setPassRoute: 'menu/SET_PASS_ROUTE',
      setNavMenus: 'menu/SET_NAV_MENUS',
      setActiveMenuIndex: 'menu/SET_ACTIVE_MENU_INDEX'
    }),
    getMenuList () {
      getMenuList()
        .then((res) => {
          console.log(res)
          if (res.msg === 'success') {
            this.navMenus = res.data.records
            this.navMenus = this.navMenus.sort(this.sortMenuItem)
            this.navMenus.forEach(item => {
              if (item.parentId === 0) {
                item.subMenu = []
                this.finalMenu.push(item)
              } else {
                this.finalMenu.forEach(item1 => {
                  if (item1.menuId === item.parentId) {
                    item1.subMenu.push(item)
                    this.secondMenu.push(item)
                  }
                })
              }
            })
            this.secondMenu.forEach(ele => {
              ele.threeMenu = []
              this.navMenus.forEach(ele1 => {
                if (ele.menuId === ele1.parentId) {
                  ele.threeMenu.push(ele1)
                }
              })
            })
            this.setRouterName(this.$route.name)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch((error) => {
          console.error(error)
        })
    },
    handleClearMenu () {
      window.sessionStorage.setItem('menuName', '')
      localStorage.setItem('routeList', '')
      localStorage.setItem('routeSet', '')
      this.setMenuName('')
    },
    handleSelect (key, keyPath) {
      this.setPassRoute(false)
      this.setRouterName(key)
      this.$router.push({ path: '/' + key })
    },
    setRouterName (key) {
      // console.log(key, this.navMenus)
      const menuDetail = [{
        url: 'importInquiryList',
        name: '询价列表'
      }, {
        url: 'trailerDraft',
        name: '待询价'
      }, {
        url: 'trailerConfirm'
      }]
      const navMenus = [...this.navMenus, ...menuDetail]
      this.setNavMenus(navMenus)
      navMenus.forEach(item => {
        if (key === 'console') {
          window.sessionStorage.setItem('menuName', '首页')
          this.setMenuName('首页')
        } else if (item.url === key) {
          window.sessionStorage.setItem('menuName', item.name)
          this.setMenuName(item.name)
          if (item.url === 'importInquiryList') {
            this.setActiveMenuIndex('import')
          } else if (item.url === 'trailerDraft' || item.url === 'trailerConfirm') {
            this.setActiveMenuIndex('trailer')
          } else {
            this.setActiveMenuIndex(item.url)
          }
        }
      })
    },
    sortMenuItem (menuItem1, menuItem2) {
      return menuItem1.seq - menuItem2.seq
    },
    getRole (routeList, type) {
      return roleType(routeList, type)
    }
  },
  watch: {
    '$route': {
      handler () {
        this.metaIcon = (this.$route.meta && this.$route.meta.icon) || ''
        this.setRouterName(this.$route.name)
        if (this.getRole(this.userRoles, 'DC') && this.$route.name === 'console') {
          this.$router.push({ path: '/toDoList' })
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~styles/variable'
@import '~styles/mixin'
.el-aside
  position relative
  background-color $color-menu-background
  height 100%
  z-index 999
  overflow-x hidden
  .ab-logo
    width 120px
    margin-top 5px
  h1
    color #ffffff
    height 75px
    text-align center
    line-height 75px
    box-sizing border-box
  .signout-btn
    padding 5px
    height 24px
    line-height 24px
    display inline-block
    color #0d5ee7
    cursor pointer
    position absolute
    bottom 30px
    left 25px
    font-size $font-size-small
    overflow hidden
    img
      float left
      margin-top 4px
      margin-right 20px
    .signout-text
      display inline-block
      height 24px
      line-height 24px
      text-align center
      float left
      text-indent 5px
  .el-menu
    width 150px
    box-sizing border-box
    .active
      color $font-color-menu-active !important
    .el-menu-item
      span
        font-weight bold
  .fa-style
    margin 0 20px 0 5px
    width 18px
    height 16px
    display inline-block
    background-size 100% 100% !important
  .icon-bill
    background-image url('./img/caiwu.png')
  .icon-help
    background-image url('./img/bangzhu.png')
  .icon-setting
    background-image url('./img/shezhi.png')
  .icon-quote
    background-image url('./img/baojia01.png')
  .icon-enquiry
    background-image url('./img/xunjia-.png')
  .icon-order
    background-image url('./img/dingdan-.png')
  .icon-home
    background-image url('./img/shouye.png')
  .icon-map
    background-image url('./img/map01.png')
  .icon-toDoList
    background-image url('./img/daibanshiyi.png')
  .icon-news
    background-image url('./img/news.png')
  .icon-pro
    background-image url('./img/pro.png')
  .icon-kt
    background-image url('./img/kt-h.png')
  .icon-dd
    background-image url('./img/dd-h.png')
  .icon-jx
    background-image url('./img/jx-h.png')
  .icon-custManage
    background-image url('./img/custManage-h.png')
  .is-active
    .icon-bill
      background-image url('./img/caiwu_bai.png')
    .icon-setting
      background-image url('./img/shezhi_bai.png')
    .icon-enquiry
      background-image url('./img/xunjia_bai.png')
    .icon-quote
      background-image url('./img/baojia03.png')
    .icon-order
      background-image url('./img/dingdan_bai.png')
    .icon-news
      background-image url('./img/news_bai.png')
    .icon-map
      background-image url('./img/map02.png')
    .icon-pro
      background-image url('./img/pro-dianji.png')
    .icon-kt
      background-image url('./img/kt.png')
    .icon-dd
      background-image url('./img/dd.png')
    .icon-jx
      background-image url('./img/jx.png')
    .icon-custManage
      background-image url('./img/custManage.png')
  .active
    .icon-home
      background-image url('./img/shouye-_dianji.png')
    .icon-toDoList
      background-image url('./img/daibanshiyi-_dianji.png')
    .icon-help
      background-image url('./img/bangzhu-_dianji.png')
    .icon-pro
      background-image url('./img/pro-dianji.png')
    .icon-bill
      background-image url('./img/caiwu_bai.png')
    .icon-enquiry
      background-image url('./img/xunjia_bai.png')
    .icon-setting
      background-image url('./img/shezhi_bai.png')
    .icon-order,.icon-kt
      background-image url('./img/dingdan_bai.png')
  .delete-is-active
    .is-active
      .icon-bill
        background-image url('./img/caiwu.png')
      .icon-help
        background-image url('./img/bangzhu.png')
      .icon-setting
        background-image url('./img/shezhi.png')
      .icon-quote
        background-image url('./img/baojia01.png')
      .icon-enquiry
        background-image url('./img/xunjia-.png')
      .icon-order
        background-image url('./img/dingdan-.png')
      .icon-home
        background-image url('./img/shouye.png')
      .icon-map
        background-image url('./img/map01.png')
      .icon-toDoList
        background-image url('./img/daibanshiyi.png')
      .icon-news
        background-image url('./img/news.png')
      .icon-pro
        background-image url('./img/pro.png')
</style>
