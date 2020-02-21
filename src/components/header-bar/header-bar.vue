<template>
  <div class="app-header header-wrapper">
    <el-col :xs="22"
            :sm="24"
            :md="24"
            :lg="24"
            :xl="24">
      <el-badge v-if="menuName === '拖车'" :value="count" class="item">
        <div class="trailer-btn" @click="handleToTruckDraft">待询价</div>
      </el-badge>
      <div class="user-bar clearfix" @mouseleave="handleMouseLeave">
        <div class="user-head fl"
             @click="handleClickCpwd">
          <img :src="userInfo.avatar"
               alt="">
        </div>
        <ul class="el-dropdown-menu el-popper header-droplist"
            v-show="dpVisible">
          <li class="el-dropdown-menu__item"
              @click="handleClickCpwd">个人资料</li>
          <li class="el-dropdown-menu__item"
              @click="signOut">安全退出</li>
          <div x-arrow=""
               class="header-droplist-icon popper__arrow"></div>
        </ul>
        <div class="fl"
             ref="main"
             @mouseenter="handleMouseEnter"
             style="margin-right: 30px;">
          <p> <span>{{userInfo.name}}</span>
            <i class="iconfont icon-xiaotuziCduan_" :class="{rotate:!toggle}"></i>
          </P>
          <!-- <p class="user-mobile">{{userInfo.mobile}}</p>
          <p class="user-full-name">{{userInfo.compFullName}}</p> -->
        </div>
      </div>
      <!-- <div class="fullScreen"
           @click="handleFullScreen"
           v-show="fullScreen"></div>
      <div class="fullScreen"
           @click="handleExitFullScreen"
           v-show="!fullScreen"></div> -->
      <!-- <div class="user-name">欢迎您，{{userInfo.name}}</div> -->
    </el-col>
    <el-col :xs="2"
            :sm="0"
            :md="0"
            :lg="0"
            :xl="0">
      <i class="el-icon-menu menu-btn"
         @click="showMenu"></i>
    </el-col>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'header-bar',
  data () {
    return {
      currentLanguage: '中文',
      error: false,
      visible: false,
      // userInfo: {},
      dpVisible: false,
      fullScreen: true,
      toggle: true
    }
  },
  computed: {
    ...mapGetters([
      'toggleAside',
      'userInfo',
      'menuName',
      'draftCount'
    ]),
    count: function () {
      return this.draftCount ? this.draftCount : sessionStorage.getItem('truckDraftsCount')
    }
  },
  methods: {
    handleToTruckDraft () {
      this.$router.push({ name: 'trailerDraft' })
    },
    handleFullScreen (elem) {
      this.fullScreen = !this.fullScreen
      let docElm = document.documentElement
      // W3C
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
        return false
      }
      // FireFox
      if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
        return false
      }
      // Chrome等
      if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
        return false
      }
      // IE11
      if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
        return false
      }
    },
    handleExitFullScreen () {
      this.fullScreen = !this.fullScreen
      if (document.exitFullscreen) {
        document.exitFullscreen()
        return false
      }
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
        return false
      }
      if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
        return false
      }
      if (document.msExitFullscreen) {
        document.msExitFullscreen()
        return false
      }
    },
    handleToggle () {
      this.dpVisible ? this.handleMouseLeave() : this.handleMouseEnter()
      this.toggle = !this.toggle
    },
    hidePanel (e) {
      if (!this.$refs.main.contains(e.target)) {
        this.handleMouseLeave()
      }
    },
    handleMouseEnter () {
      this.dpVisible = true
      // document.addEventListener('click', this.hidePanel, true)
    },
    handleMouseLeave () {
      this.dpVisible = false
      // document.removeEventListener('click', this.hidePanel, true)
    },
    handleClickCpwd () {
      this.$router.push('/cpwd')
      this.$nextTick(() => {
        this.dpVisible = false
      })
    },
    shiftLanguage (lang) {
      // this.$i18n.locale = "en"
      this.$confirm('是否切换当前语言？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$i18n.locale = lang
        this.currentLanguage = this.$i18n.locale === 'zh' ? '中文' : 'English'
      }).catch(() => {

      })
    },
    showMenu () {
      this.setToggleAside(!this.toggleAside)
    },
    ...mapMutations({
      setToggleAside: 'menu/SET_TOGGLE_ASIDE'
    }),
    ...mapActions({
      getInfo: 'user/getInfo'
    }),
    fetchUserInfo () {
      this.getInfo()
        .then(res => {
          if (res && res.msg === 'success') {
            // this.userInfo = res.data
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    signOut () {
      this.dpVisible = false
      this.$confirm('是否退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('anycase_token')
        window.localStorage.removeItem('routeList')
        window.localStorage.removeItem('routeSet')
        window.localStorage.removeItem('user_role')
        window.localStorage.removeItem('user_roles')
        window.sessionStorage.clear()
        this.$router.push({ name: 'login' })
      }).catch(() => {
      })
    }
  },
  mounted () {
    this.fetchUserInfo()
    this.error = this.$route.name === 'The404Error'
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~styles/variable'
@import '~styles/mixin'
@import '~assets/iconfont/iconfont.css'
.app-header
  width 100%
  height 45px
  .hd-text
    display inline-block
    margin-left -20px
  .hd-text-link
    font-size 36px
    // font-family fzzyjt
    color #0d5ee7
  .el-col
    height 45px
    line-height 45px
    font-size $font-size-medium
    .menu-btn
      height 45px
      display inline-block
      font-size $font-size-large-s
      line-height 45px
      cursor pointer
    .el-dropdown
      height 45px
      cursor pointer
    .user-name
      float right
      color #FE9373
      margin-right 20px
      font-weight bold
    .fullScreen
      width 24px
      height 24px
      float right
      margin-right 31px
      margin-top 29px
      background url('./img/fullscreen.png') no-repeat top center
      background-size 100% 100%
    .trailer-btn
      float left
      cursor pointer
      padding 3px 20px
      background #F2F2F2
      border-radius 11px
      height 16px
      line-height 16px
    .user-bar
      float right
      height 45px
      margin-right 20px
      position relative
      p
        color #6F6F6F
      .iconfont
        display inline-block
        vertical-align top
        transform rotate(0)
        transform-origin center center
        transition all 0.2s ease-in
        color #6F6F6F
       .rotate
          transform rotate(180deg)
      .user-notice
        margin-right 30px
        display inline-block
        height 50px
        cursor pointer
        margin-top 10px
        position relative
        span
          display inline-block
          width 14px
          height 14px
          border-radius 7px
          background #e3451e
          position absolute
          color #ffffff
          text-align center
          line-height 14px
          top 12px
          left 12px
          font-size $font-size-small-s
        img
          width 22px
          height 28px
      .user-head
        position relative
        display inline-block
        width 40px
        height 40px
        border-radius 22px
        margin-top 2px
        margin-right 20px
        cursor pointer
        text-align center
        line-height 40px
        img
          width 40px
          height 40px
          border-radius 20px
      .user-mobile
        margin-top 20px
        font-weight bold
        line-height 1.5
        color #666
      .user-full-name
        line-height 1.5
        font-weight bold
  .logo
    margin 12px 0 0 20px
  .user-info-drop
    position absolute
    background #dae2f0
    width 282px
    height 90px
    padding 18px 0 18px 18px
    border-radius 5px
    top 72px
    right 30px
    z-index 9
    text-align left
    .avatar
      display inline-block
      position relative
      width 86px
      height 86px
      border-radius 50%
      border 2px solid #0d5ee7
      background #fff
      img
        width 66px !important
        height 66px !important
        position absolute
        bottom 0
        left 12px
        border-radius 50% !important
    .info
      display inline-block
      position absolute
      bottom 40px
      margin-left 20px
      p
        padding 0
        line-height 1.5
        font-size 14px
        color #222
  .signout-btn
    cursor pointer
    img
      vertical-align middle
    .signout-text
      vertical-align middle
  .header-droplist
    width 100px
    position absolute
    top 40px
    left 40px
    z-index 999
  .header-droplist-icon
    width 0
    height 0
    border-color transparent
    border-style solid
    position absolute
    top -12px
    left 15px
    border-top-width 0
    border-bottom-color #ebeef5
    border-width 6px
    filter drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03))
    &:after
      top 1px
      margin-left -6px
      border-top-width 0
      border-bottom-color #fff
</style>
