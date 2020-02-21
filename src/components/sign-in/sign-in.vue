<template>
  <div class="sign-in-wrapper">
    <div class="content">
      <div class="login">
        <div class="logo-img" >
          <img src="./img/logo2@2x.png" alt="" @click="handleClick">
        </div>
        <div class="login-form">
          <input class="login-form-input" type="text" v-model="mobile" placeholder="手机/邮箱/用户名" @keyup.enter="autoNext()"/>
          <input class="login-form-input" type="password" v-model="password" placeholder="密码" ref="loginPassword" @keyup.enter="_userLogin"/>
           <button class="login-btn" @click="_userLogin">登录</button>
        </div>
        <div class="login-help">
          <el-checkbox class="checkbox" v-model="checked">7天内自动登录</el-checkbox>
          <div class="register" @click="_userRegister">注册账号</div>
          <div class="forget-pwd"  @click="handleForgetPassword">忘记密码？</div>
        </div>
      </div>
      <div class="login-entry">
        <div class="login-entry-title">
          扫码进入<span>微信小程序</span>
          <b> “AnyCase”</b>
        </div>
        <div class="login-entry-img">
          <img src="./img/ma@2x.png" alt="">
        </div>
        <p>立即体验</p>
      </div>
    </div>
    <!-- <resign ref="resign"></resign> -->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import { $http } from 'utils/http'
// import resign from 'views/home/base/resign/resign'
export default {
  name: 'signIn',
  components: {
    // resign
  },
  props: {},
  data () {
    return {
      mobile: '',
      password: '',
      checked: false
    }
  },
  methods: {
    ...mapMutations('user', {
      setUserRoles: 'SET_USER_ROLES'
    }),
    checkVaild () {
      if (!this.mobile) {
        this.$message.error('请输入用户名')
        return false
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return false
      }
      return true
    },
    handleClick () {
      this.$router.push('/')
    },
    autoNext () {
      if (this.mobile) {
        this.$refs.loginPassword.focus()
      }
    },
    handleForgetPassword () {
      this.$message.info('请联系ANYCASE客服')
    },
    _userLogin () {
      if (this.checkVaild()) {
        let data = { client: 'web', mobile: this.mobile.trim(), password: this.password }
        this.$store.dispatch('user/login', data).then(res => {
          window.localStorage.setItem('anycase_token', res.token)
          // this.$message.success({
          //   message: '登录成功'
          // })
          this.setUserRoles(res.roles)
          window.localStorage.setItem('user_roles', JSON.stringify(res.roles))
          if (res.roles.indexOf('AC_GLY') !== -1) {
            setTimeout(() => {
              this.$router.push({ path: '/console' })
            }, 0)
          } else if (res.roles.indexOf('AC_MH') !== -1) {
            setTimeout(() => {
              this.$router.push({ path: '/articleList' })
            }, 0)
          } else if (res.roles.indexOf('AC_ZKTGL') !== -1) {
            setTimeout(() => {
              this.$router.push({ path: '/ktorder' })
            }, 0)
          } else {
            setTimeout(() => {
              this.$router.push({ path: '/toDoList' })
            }, 0)
          }
        })
      }
    },
    _userRegister () {
      this.$router.push({ name: 'register' })
    }
  },
  mounted () {
    if (window.localStorage.getItem('anycase_token') && window.localStorage.getItem('user_roles')) {
      let drole = JSON.parse(window.localStorage.getItem('user_roles'))
      if (drole.indexOf('AC_GLY') !== -1) {
        setTimeout(() => {
          this.$router.push({ path: '/console' })
        }, 0)
      } else if (drole.indexOf('AC_MH') !== -1) {
        setTimeout(() => {
          this.$router.push({ path: '/articleList' })
        }, 0)
      } else if (drole === 'AC_ZKTGL') {
        setTimeout(() => {
          this.$router.push({ path: '/ktorder' })
        }, 0)
      } else {
        setTimeout(() => {
          this.$router.push({ path: '/toDoList' })
        }, 0)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.sign-in-wrapper
  width 100%
  height 100%
  max-width 1920px
  max-height 1080px
  min-width 1200px
  margin 0 auto
  background-color #eee
  background-image url('https://www.anycase.cn/data/ac30/index/bg.png')
  background-repeat no-repeat no-repeat
  background-position left center
  display flex
  align-items center
  .content
    margin-left 200px
    display flex
    .login
      margin-right 72px
      margin-bottom 130px
      .logo-img
        margin-bottom 35px
        img
          display block
          width 169px
          height 48px
          outline 0
          cursor pointer
      .login-form
        display flex
        align-items center
        .login-form-input
          display block
          width 170px
          height 40px
          border-radius 4px
          background #ffffff
          box-shadow:0px 6px 7px 0px rgba(42,35,12,0.32)
          text-indent 14px
          font-size 14px
          color #2C2C2C
          margin-right 15px
          outline 0
          &:placeholder
            font-size 12px
            color #D9D9D9
        .login-btn
          width 106px
          height 40px
          background linear-gradient(0deg,rgba(255,164,29,1) 38%,rgba(255,201,121,1) 90%)
          box-shadow 0px 6px 7px 0px rgba(42,35,12,0.32)
          border-radius 4px
          font-size 14px
          font-weight bold
          letter-spacing 1px
          text-align center
          line-height 40px
          color #593601
          outline 0
          border 0
          cursor pointer
      .login-help
        display flex
        align-items center
        margin-top 18px
        .checkbox
          width 170px
          margin-right 15px
          >>>.el-checkbox__label
            color #ffffff!important
            letter-spacing 1px
            font-size 12px
            font-weight bold
          >>>.el-checkbox__inner
            width 16px
            height 16px
            border 0
            border-radius 50%
            &::after
              border-width 2px
              left 5px
              top 3px
        .register,.forget-pwd
          color #ffffff
          font-size 12px
          font-weight bold
          margin-right 66px
          letter-spacing 1px
          cursor pointer
    .login-entry
      .login-entry-title
        font-size 12px
        color #ffffff
        width 124px
        text-align center
        font-weight bolder
        line-height 18px
        margin-bottom 10px
        letter-spacing 1px
        b
          font-weight bold
          color #fed901
        span
          color #fed901
      .login-entry-img
        img
          width 124px
      p
        text-align center
        font-size 12px
        font-weight bold
        color #ffffff
        letter-spacing 1px
</style>
