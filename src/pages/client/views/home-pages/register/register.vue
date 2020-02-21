<template>
  <div class="register-page">
    <home-header ref="header" :activeIndex="activeIndex"></home-header>
    <div class="content-box" :style="{'margin-top': marginTop}">
       <div class="sign-in">
        <div class="sign-in-box">
          <div class="sign-in-title">
            <h4>注册新账号</h4>
            <p>方便客服精准服务您，请填写以下信息</p>
          </div>
          <div class="sign-form">
            <el-form :model="form" :rules="rules">
              <el-form-item label="您的姓名:"
                            prop="clientName">
                <el-input v-model="form.clientName"
                          placeholder="您的姓名"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系方式:"
                            prop="contactNum">
                <el-input v-model="form.contactNum"
                          v-limitNum
                          @blur="e => {handleContactNum(e.target.value)}"
                          placeholder="手机号码"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="贵公司名称:"
                            prop="companyName">
                <el-input v-model="form.companyName"
                          placeholder="您所在的公司"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="主要出口方式:">
                <el-input v-model="form.exportMode"
                          placeholder="海运/空运"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="主要贸易方式:">
                <el-input v-model="form.tradeMode"
                          placeholder="CIF/FOB"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="主要出口口岸:">
                <el-input v-model="form.exportPort"
                          placeholder="上海"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="主要目的港:">
                <el-input v-model="form.destination"
                          placeholder="LA/BKK"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="出口货物品名:">
                <el-input v-model="form.goodsName"
                          placeholder="服装"
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="特殊需求备注:">
                <el-input v-model="form.remark"
                          placeholder="车辆一定要准时到厂、一定要保 证上船 ..."
                          autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="button-primary">
                  <el-button class="submit" @click.native="fetchUserInfo">提交</el-button>
                  <p v-show="submitShow">我们会在24小时内专属客服给您发放账号</p>
                  <p ><a href="#" @click="openDialog(59534)">&gt; 快速客服通道</a></p>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <home-footer></home-footer>
    <BackUp></BackUp>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import HomeHeader from 'client-components/home-page/header.vue'
import BackUp from 'client-components/home-page/back-up.vue'
import HomeFooter from 'client-components/home-page/footer.vue'
import { mapGetters } from 'vuex'
import { postRegister } from 'api/common'
import limitNum from '@/directives/limit-num'
export default {
  name: 'increment',
  data () {
    return {
      marginTop: '80px',
      activeIndex: 'register',
      form: {
        clientName: '',
        companyName: '',
        contactNum: '',
        exportMode: '',
        exportPort: '',
        goodsName: '',
        tradeMode: '',
        destination: '',
        remark: ''
      },
      rules: {
        clientName: [
          { required: true, message: '姓名不能为空' }
        ],
        contactNum: [
          { required: true, message: '联系方式不能为空' }
        ],
        companyName: [
          { required: true, message: '公司名称不能为空' }
        ]
      },
      contactNum: '',
      submitShow: false,
      formLabelWidth: '120px'
    }
  },
  components: {
    HomeHeader,
    BackUp,
    HomeFooter
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    handleScroll () {
      let clientHeight = document.documentElement.clientHeight
      const element = document.querySelectorAll('.add-animation')
      element.forEach(item => {
        let offsetTop = item.getBoundingClientRect().top
        if (clientHeight > offsetTop) {
          item.classList.add('animated', 'fadeInUp')
          item.style.opacity = 1
        }
      })
    },
    handleResize () {
      this.marginTop = this.$refs.header.$el.offsetHeight + 'px'
    },
    hideDialog () {
      this.dialogVisible = false
    },
    handleShowDialog () {
      this.dialogVisible = true
    },
    handleContactNum (num) {
      this.form.contactNum = num
    },
    fetchUserInfo () {
      postRegister(this.form)
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('我们会在24小时内专属客服给您发放账号')
            this.form = {}
            this.submitShow = false
            setTimeout(() => {
              this.hideDialog()
            }, 3000)
          }
          if (res && res.msg === 'fail') {
            this.submitShow = true
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
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
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    setTimeout(() => {
      this.handleScroll()
    }, 500)
    this.handleResize()
  },
  directives: {
    limitNum: limitNum
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus">
// @import 'animate.css';
.register-page
  font-family 'Microsoft YaHei'
  .content-box
    position relative
    overflow hidden
    .sign-in
      width 600px
      margin 80px auto 120px
      .sign-in-title
        display flex
        align-items flex-end
        position relative
        margin-bottom 60px
        h4
          font-size 32px
          font-weight 400
          color #000000
        p
          font-size 16px
          color #000000
          margin-left 30px
        &::after
          content: ''
          position absolute
          bottom -20px
          height 2px
          width 100%
          border-radius 2px
          background #FED900
      .el-form-item
        margin-bottom 24px
      .el-form-item__label
        display block
        width 100%
        text-align left
        color #000000
        margin-bottom 6px
      .el-input__inner
        width 100% !important
      .submit
        width 208px
        height 49px
        background rgba(254,217,0,1)
        box-shadow 0px 12px 9px 0px rgba(33,26,4,0.4)
        border-radius 6px
        font-size 16px
        font-weight bold
        color #000000
        border 0
        text-align center
        margin 50px 0 30px
      .button-primary
        a
          color #004EA2
          font-size 14px
</style>
