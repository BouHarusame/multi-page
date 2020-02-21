<template>
  <div class="cpwd">
    <div class="bread clearfix">
      <p class="bread-item bread-text-active fl"> 个人资料</p>
      <p class="change-password" @click="passwordsync = true">修改密码</p>
    </div>
    <div class="cpwd-container">
      <div class="cpwd-content">
        <div class="avatar"
            @click="DialogVisible(true)">
          <div class="pop-shadow">
            编辑头像
          </div>
          <img :src="avatarUrl">
        </div>
        <el-dialog title="编辑头像"
                  :visible.sync="centerDialogVisible"
                  width="30%"
                  center>
          <my-cropper-image ref="cropImg"
                            @dialogCancel="DialogVisible"
                            @cancleDefault="addClassActive(imageList)"></my-cropper-image>
          <div class="init-photo">
            <h4 class="init-title">推荐头像</h4>
            <ul class="init-group">
              <li class="init-group-item"
                  :class="{active: item.isActive}"
                  v-for="item in imageList"
                  :ref="item.seq"
                  :key="item.seq"
                  @click="handleChangeImage(item)"><img :src="item.url" /></li>
            </ul>
          </div>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="DialogVisible(false)">取 消</el-button>
            <el-button type="primary"
                      @click="handleClickSubmit()">确 定</el-button>
          </span>
        </el-dialog>
        <div class="title">
          <span>个人资料</span>
          <div class="editmessage" v-if="!edit" @click="edit = !edit">
            <img src="./img/edit.png" alt="" srcset="">
          </div>
        </div>
        <el-form label-width="80px">
          <el-form-item style="text-align: left;">
            <span slot="label"
                  class="label">手机号</span>
            <div class="value">{{formData.mobile}}</div>
          </el-form-item>
          <el-form-item style="text-align: left;">
            <span slot="label"
                  class="label">E-mail</span>
            <div class="value" v-if="!edit">{{personalData.email}}</div>
            <el-input v-else @keyup="handleClickSaveInfo"
                      style="width: 300px;"
                      placeholder="请填写邮箱"
                      clearable
                      v-model="personalData.email" />
          </el-form-item>
          <el-form-item style="text-align: left;">
            <span slot="label"
                  class="label">Skype</span>
            <div class="value" v-if="!edit">{{personalData.skypeInfo}}</div>
            <el-input v-else @keyup="handleClickSaveInfo"
                      style="width: 300px;"
                      placeholder="请填写SKype"
                      clearable
                      v-model="personalData.skypeInfo" />
          </el-form-item>
          <el-form-item>
            <span slot="label"
                  class="label">QQ</span>
            <div class="value" v-if="!edit">{{personalData.qqInfo}}</div>
            <el-input v-else @keyup="handleClickSaveInfo"
                      style="width: 300px;"
                      placeholder="请填写QQ号"
                      clearable
                      v-model="personalData.qqInfo" />
          </el-form-item>
          <el-form-item>
            <span slot="label"
                  class="label">座右铭</span>
            <div class="value" v-if="!edit">{{personalData.slogan}}</div>
            <el-input v-else @keyup="handleClickSaveInfo"
                      type="textarea"
                      style="width: 300px;"
                      placeholder="请填写座右铭"
                      v-model="personalData.slogan" />
          </el-form-item>
        </el-form>
        <div class="changebtn" v-if="edit">
          <button class="el-button save-btn"
                  @click="handleClickSaveInfo">保存</button>
          <button class="el-button cancel-btn"
                  @click="edit = !edit">取消</button>
        </div>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="passwordsync" width="30%">
      <div class="cpwd-container">
        <div class="cpwd-content">
          <el-form label-width="80px">
            <el-form-item>
              <span slot="label"
                    class="label">旧密码</span>
              <el-input @keyup="handleClickSave"
                        type="password"
                        style="width: 300px;"
                        placeholder="请填写原密码"
                        v-model="formData.oldPwd" />
            </el-form-item>
            <el-form-item>
              <span slot="label"
                    class="label">新密码</span>
              <el-input @keyup="handleClickSave"
                        type="password"
                        style="width: 300px;"
                        placeholder="请填写新密码"
                        v-model="formData.newPwd" />
            </el-form-item>
          </el-form>
          <button class="el-button save-btn"
                  @click="handleClickSave">保存</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, changeUserInfo, changePwd, getAvatars, putAvatars } from 'api/user'
import { mapGetters } from 'vuex'
import MyCropperImage from 'components/cropper/cropper-image'
export default {
  data () {
    return {
      edit: false,
      passwordsync: false,
      imageList: [],
      personalData: {
        email: '',
        skypeInfo: '',
        qqInfo: '',
        slogan: ''
      },
      formData: {
        newPwd: '',
        oldPwd: '',
        mobile: ''
      },
      centerDialogVisible: false,
      // params: {
      //   token: '123456798',
      //   name: 'avatar'
      // },
      // headers: {
      //   smail: '*_~'
      // },
      avatarUrl: '',
      index: 0
    }
  },
  components: {
    MyCropperImage
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    getUserinfo () {
      getInfo()
        .then(res => {
          if (res.msg === 'success') {
            this.personalData.email = res.data.email ? res.data.email : '-'
            this.personalData.skypeInfo = res.data.skype ? res.data.skype : '-'
            this.personalData.qqInfo = res.data.qq ? res.data.qq : '-'
            this.personalData.slogan = res.data.slogan ? res.data.slogan : '-'
          } else {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    },
    handleClickSaveInfo () {
      let params = this.personalData
      changeUserInfo(params)
        .then(res => {
          if (res && res.msg === 'success') {
            this.edit = false
            this.getUserinfo()
          } else {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    },
    // 弹出层隐藏
    DialogVisible (data) {
      this.centerDialogVisible = data
    },
    // 修改密码
    handleClickSave () {
      if (!this.formData.newPwd) {
        this.$message.warning('请输入新密码')
        return false
      }
      if (!this.formData.oldPwd) {
        this.$message.warning('请输入旧密码')
        return false
      }
      changePwd(this.formData)
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('密码修改成功，请重新登陆')
            localStorage.removeItem('anycase_token')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1500)
          } else {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    },
    handleClickSavedata () {},
    // 设置推荐头像
    handleChangeImage (item) {
      if (this.index === item.seq) {
        if (item.isActive) {
          this.addClassActive(this.imageList)
        } else {
          this.addClassActive(this.imageList)
          item.isActive = true
        }
      } else {
        this.addClassActive(this.imageList)
        item.isActive = true
      }
      this.index = item.seq
    },
    // 提交头像信息
    handleClickSubmit () {
      let initAvatar = this.uploadData()
      if (initAvatar && initAvatar.length > 0) {
        this.handleUpdata()
      } else {
        this.$refs.cropImg.finish('blob')
      }
    },
    // 获取默认头像
    getAvatarImage () {
      getAvatars()
        .then(res => {
          if (res && res.msg === 'success') {
            this.imageList = res.data.records
            this.addClassActive(this.imageList)
          }
        })
    },
    // 初始化头像信息
    addClassActive (arr) {
      arr.forEach((item) => {
        this.$set(item, 'isActive', false)
      })
    },
    // 判断是否有默认头像
    uploadData () {
      return this.imageList.filter(item => {
        if (item.isActive) {
          return item.avatar
        }
      })
    },
    // 使用推荐头像
    handleUpdata () {
      let param = this.uploadData()
      let data = { avatar: param[0].avatar }
      putAvatars(data)
        .then(res => {
          if (res && res.msg === 'success') {
            // this.$store.commit('SET_AVATAR', res.data.avatar)
            this.DialogVisible(false)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    cancelAvatar () {
      this.addClassActive(this.imageList)
    }
  },
  // filters: {
  //   formatMobile (v) {
  //     if (!v) return
  //     const tmp = v.split('')
  //     tmp.splice(3, 4, '****')
  //     return tmp.join('')
  //   }
  // },
  mounted () {
    this.formData.mobile = this.mobile
    this.avatarUrl = this.avatar
    this.getUserinfo()
    this.getAvatarImage()
  },
  watch: {
    avatar () {
      this.avatarUrl = this.avatar
    },
    mobile () {
      this.formData.mobile = this.mobile
    }
  }
}
</script>

<style lang="stylus" scoped>
.cpwd
  padding 20px 0 20px
  min-height calc(100vh - 115px)
  font-size 14px
  background #fff
  box-sizing border-box
  .bread
    padding 0 20px 10px 20px
    border-bottom 1px solid #ccc
    position relative
    &-item
      height 22px
      line-height 20px
    &-item-link
      cursor pointer
    &-bread-text
      color #666
    &-arrow
      color #666
      font-size 16px
      font-weight bold
    &-text-active
      color #333
      font-size 18px
      font-weight bold
    .change-password
      padding 9px 15px
      position absolute
      top -6px
      right 20px
      background #f6ab39
      text-align left
      color #fff
      border-radius 3px
      cursor pointer
  &-container
    display flex
    justify-content center
    margin-top 35px
  &-content
    text-align center
    .avatar
      position relative
      display inline-block
      text-align center
      border-radius 50%
      overflow hidden
      border 1px solid #ccc
      &:hover .pop-shadow
        display inline-block
      .pop-shadow
        position absolute
        top 0
        left 0
        display none
        width 137px
        height 137px
        line-height 137px
        font-size 16px
        color #eee
        background rgba(0, 0, 0, 0.4)
      img
        width 137px
        border-radius 50%
        vertical-align top
    .init-photo
      overflow hidden
      margin-top 20px
      .init-title
        font-size 18px
        font-weight 600
        color rgba(51, 51, 51, 1)
        line-height 25px
      .init-group
        width 100%
        overflow hidden
        margin 10px auto
        display flex
        .init-group-item
          flex 1
          -webkit-flex 1
          display flex
          display -webkit-flex
          justify-content center
          -webkit-justify-content center
          width 60px
          height 60px
          margin-right 10px
          cursor pointer
          box-sizing border-box
        .active
          border 1px solid #D87B31
    .title
      margin 26px auto
      display flex
      justify-content space-between
      align-items center
      span
        font-size 18px
        font-weight bold
        text-align left
        color #333
        line-height 32px
      .editmessage
        cursor pointer
        margin-right 20px
        img
          width 30px
          height auto
    .label
      color #666
      margin-right 20px
      font-weight bold
    .value
      width 300px
      color #333
      text-align left
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    >>>.el-form-item--small .el-form-item__content
      margin-right 20px
    .save-btn
      margin 30px 10px
      background #fbb03b
      border 1px solid #fbb03b
      color #fff
      width 120px
    .cancel-btn
      background #fff7eb
      border 1px solid #fbb03b
      margin 30px 10px
      width 120px
      color #fbb03b
  >>>.el-dialog__wrapper .el-dialog
    .el-dialog__header
      border-bottom 1px solid #dcdbdb
      .el-dialog__title
        font-weight bold
</style>
