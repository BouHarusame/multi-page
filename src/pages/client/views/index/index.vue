<template>
  <div class="app-wrapper"  ref="wrapper">
    <el-container style="position:relative">
      <aside-bar :currentClass="'hidden-xs-only'"></aside-bar>
      <transition name="slide">
        <div v-if="toggleAside">
          <div class="aside-mask" @click="closeMenu"></div>
          <el-col :sm="0" :md="0" :lg="0" :xl="0">
            <aside-bar :currentClass="'el-position'" ></aside-bar>
          </el-col>
        </div>
      </transition>
      <el-container>
        <el-header height="45px">
          <header-bar></header-bar>
        </el-header>
        <el-main :class="help">
          <div :class="{'main-view-wrapper': className !== '智能下单'}">
            <!-- <span class="menu-name-span" v-show="showPadding  || hideQuick">{{menuName}}</span> -->
           <div class="header-slide" ref="headerSlide">
              <el-tag
                v-for="(route, index) in routeList"
                :key="index"
                :class="{'nav-active': route.routerName === $route.name}"
                closable
                @close="handleCloseRoute(index)"
                @dblclick.native="handleCloseRoute(index)"
                @click.native="handleClick(route)"
                :type="route.type">
                {{route.name}}
              </el-tag>
            </div>
            <!-- <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="(item, index) in editableTabs"
                :key="index"
                :label="item.title"
                :name="item.name"
              >
              </el-tab-pane>
            </el-tabs> -->
            <!-- <keep-alive :include="routerName"> -->
            <router-view :class="{'route-view-wrapper': showPadding}"/>
            <!-- </keep-alive> -->
          </div>
        </el-main>
        <div class="float-box-wrapper">
           <a href="#" @click="openDialog(56745)">
             <img src="./img/kefu.png" alt="" style="width: 26px;">
             <span class="text">联系你的AnyCase专属团队</span>
           </a>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import sha1 from 'js-sha1'
import AsideBar from '@/components/aside-bar/aside-bar'
import HeaderBar from '@/components/header-bar/header-bar'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    AsideBar,
    HeaderBar
  },
  computed: {
    ...mapGetters(['toggleAside', 'userRoles', 'menuName', 'userInfo', 'navMenus'])
  },
  data () {
    return {
      showPadding: true,
      num: -1,
      help: '',
      className: '',
      routeSet: new Set(),
      hideQuick: false,
      editableTabsValue: '2',
      routeList: [],
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    }
  },
  methods: {
    closeMenu () {
      this.setToggleAside(false)
    },
    handleCloseRoute (index) {
      if (this.routeList.length === 1) {
        return
      }
      const routeName = this.routeList[index].name
      this.routeSet.delete(routeName)
      this.routeList.splice(index, 1)
      localStorage.setItem('routeList', JSON.stringify(this.routeList))
      this.$router.push({ name: this.routeList[this.routeList.length - 1].routerName })
    },
    handleClick (route) {
      this.$router.push({ name: route.routerName })
    },
    removeTab () {

    },
    setRouteMenu () {
      // console.log(this.menuName, this.$route.name, !this.routeSet.has(this.menuName))
      let menuName = ''
      // console.log(this.navMenus)
      this.navMenus.forEach(item => {
        if (item.url === this.$route.name) {
          menuName = item.name
        }
      })
      if (menuName === this.menuName) {
        if (this.menuName && !this.routeSet.has(this.menuName)) {
          this.routeList.push({ name: this.menuName, routerName: this.$route.name })
          this.routeSet.add(this.menuName)
          localStorage.setItem('routeList', JSON.stringify(this.routeList))
          localStorage.setItem('routeSet', JSON.stringify(this.routeSet))
        }
      }
    },
    openDialog (id) {
      let height = 600
      let width = 500
      let iTop = window.screen.availHeight - height - 40
      let iLeft = window.screen.availWidth - width - 20
      let nonce = Date.now() + ''
      let timestamp = Date.now() + ''
      let signature = sha1('nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.userInfo.mobile + '&3d030c2ac013877aebaeaf6637e5b83a')
      signature = signature.toUpperCase()
      window.open('https://xiangxuntrack.udesk.cn/im_client/?web_plugin_id=' + id + '&nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.userInfo.mobile + '&signature=' + signature, 'CNN_WindowName', 'location=no,status=no,scrollvars=no,width=' + width + ',height=' + height + ',left=' + iLeft + ',top=' + iTop)
    },
    handleScroll () {
      if (this.$refs.headerSlide) {
        this.$refs.headerSlide.style.paddingLeft = 160 - document.documentElement.scrollLeft + 'px'
      }
    },
    ...mapMutations({
      setToggleAside: 'SET_TOGGLE_ASIDE',
      setMenuName: 'SET_MENU_NAME'
    })
  },
  created () {
    const roles = window.localStorage.getItem('dr_roles') ? JSON.parse(window.localStorage.getItem('dr_roles')) : []
    if (roles) {
      this.$store.commit('SET_ROLES', roles)
    } else {
      this.$message.error('用户身份验证失败')
      setTimeout(() => {
        this.$router.push('/login')
        window.localStorage.removeItem('dr_token')

        window.localStorage.removeItem('dr_roles')
      }, 1500)
    }
  },
  mounted () {
    this.className = window.sessionStorage.getItem('menuName')

    this.routeList = localStorage.getItem('routeList') ? JSON.parse(localStorage.getItem('routeList')) : []
    this.routeSet = localStorage.getItem('routeSet') ? new Set(JSON.parse(localStorage.getItem('routeSet'))) : new Set()
    if (this.className) {
      this.setMenuName(this.className)
      this.setRouteMenu()
    }
    window.addEventListener('scroll', this.handleScroll, true)
  },
  watch: {
    $route: {
      handler () {
        const routerName = this.$route.name
        this.setRouteMenu()
        this.help = (routerName === 'view-sea' || routerName === 'view-map') ? 'help-wrapper' : ''
        this.showPadding = !(routerName === 'view-sea' || routerName === 'view-map' || routerName === 'quickOrder' || routerName === 'detailInfo')
        this.hideQuick = (routerName === 'quickOrder' || routerName === 'detailInfo')
      },
      immediate: true,
      deep: true
    },
    menuName: {
      handler () {
        this.setRouteMenu()
      },
      immediate: true,
      deep: true
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
.el-container
  height : 100%
  .aside-mask
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index:99
  .el-position
    position:absolute
    top:0
    left:0
  .el-aside
    background-color: $color-menu-background
    height:100%
    h1
      color: #ffffff
      width: 200px
      height: 60px
      text-align:center
      line-height: 60px
      border-bottom: 1px solid rgba(109,120,138,.4)
  .el-main
    background-color: #f0f2f5
    height: auto
    padding 10px 10px
    overflow-y auto
  .el-header
    background-color: #ffffff
    border-bottom: 1px solid rgba(109,120,138,.4)
  .help-wrapper
    padding: 0
  .float-box-wrapper
    position: fixed

    width:234px
    line-height 32px
    background:rgba(255,255,255,1)
    box-shadow:0px 0px 25px 2px rgba(10,22,38,0.13)
    border-radius:10px

    right: 30px
    bottom: 0px
    z-index: 100
    a
     display flex
     align-items center
     justify-content center
    .text

      font-size 14px
      color #353535
      font-weight bold
      margin-left 10px
.main-view-wrapper
  margin-top 30px
  .header-slide
    position: fixed;
    top: 45px;
    left: 0;
    z-index: 99;
    background: #f0f2f5;
    width: 100vw;
    padding-top: 10px;
    padding-left: 160px;
  >>> .el-tag
    background-color #ffffff
    color #353535
    border-color #e5e5e5
    margin-right 10px
    margin-bottom 10px
    cursor pointer
    &:last-child
      margin-right 0
    .el-icon-close
      top 0
      color #353535
    .el-icon-close:hover
      color #f56c6c
      background-color #fff
  .nav-active
    border-color #FBB03B
    background-color #FFF7EB
    color #FBB03B
  .menu-name-span
    font-size: 16px
    color: #888888
.route-view-wrapper
  background-color: #fff
  padding: 20px 20px 30px
  margin 0px auto 10px
  overflow scroll
  box-sizing border-box
.slide-enter-active
  animation: slide-in .2s
.slide-leave-active
  animation: slide-in .2s reverse
@keyframes slide-in {
  0% {
    transform: translateX(-200px)
  }
  100% {
    transform: translateX(0px)
  }
}

.current-page-enter-active
.current-page-leave-active
  transition: opacity .3s

.current-page-enter
.current-page-leave-to
  opacity: 0
@media only screen and (max-width: 767px)
  .main-view-wrapper
    .header-slide
      padding-left 10px!important
</style>
