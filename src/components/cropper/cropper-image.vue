<template>
  <div class="cropper-wrapper">
    <div class="info-item">
      <div class="line">
        <div class="cropper-content">
          <div class="cropper">
            <vueCropper ref="cropper"
                        :img="option.img"
                        :outputSize="option.size"
                        :outputType="option.outputType"
                        :info="true"
                        :full="option.full"
                        :canMove="option.canMove"
                        :canMoveBox="option.canMoveBox"
                        :original="option.original"
                        :autoCrop="option.autoCrop"
                        :autoCropWidth="option.autoCropWidth"
                        :autoCropHeight="option.autoCropHeight"
                        :fixedBox="option.fixedBox"
                        @realTime="realTime"></vueCropper>
          </div>
          <div class="preview-right">
            <div class="show-preview">
              <div :style="previews.div"
                   class="preview">
                <img :src="previews.url"
                     :style="previews.img">
              </div>
            </div>
            <div class="preview-text">
              <h4>预览头像</h4>
              <p>仅支持JPG、PNG、JPEG、BMP格 <br/>文件小于4兆</p>
            </div>
          </div>
        </div>
      </div>
      <label class="btn btn-orange"
             @click="changeDefaultImg()"
             for="uploads">重新上传</label>
      <input type="file"
             id="uploads"
             style="position:absolute; clip:rect(0 0 0 0);"
             accept="image/png, image/jpeg, image/gif, image/jpg"
             @change="uploadImg($event, 1)">
      <input type="button"
             class="oper amp"
             value=""
             title="放大"
             @click="changeScale(1)">
      <input type="button"
             class="oper nar"
             value=""
             title="缩小"
             @click="changeScale(-1)">
      <input type="button"
             class="oper rotate"
             value=""
             title="左旋转"
             @click="rotateLeft">
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropper'
import { postAvatars } from 'api/user'

export default {
  data () {
    return {
      avatarImg: '',
      // 剪切图片上传
      crap: false,
      previews: {},
      option: {
        img: '',
        outputSize: 1, // 剪切后的图片质量（0.1-1）
        full: false, // 输出原图比例截图 props名full
        outputType: 'png',
        canMove: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        autoCropWidth: 135,
        autoCropHeight: 135,
        fixedBox: true
      },
      fileName: '' // 本机文件地址
    }
  },
  components: {
    VueCropper
  },
  methods: {
    // 放大/缩小
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    // 坐旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    // 右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    // 上传图片（点击上传按钮）
    finish (type) {
      let formData = new FormData()
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          let img = window.URL.createObjectURL(data)
          this.model = true
          this.modelSrc = img
          formData.append('file', data, this.fileName)
          postAvatars(formData)
            .then((res) => {
              if (res && res.msg === 'success') {
                this.$store.commit('SET_AVATAR', res.data.avatar)
                this.$emit('dialogCancel', false)
              }
            })
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    // 实时预览函数
    realTime (data) {
      this.previews = data
    },
    // 选择本地图片
    uploadImg (e, num) {
      // 上传图片
      let file = e.target.files[0]
      if (file.size && file.size > 4194304) {
        return false
      }
      this.fileName = file.name
      if (!/\.(jpg|jpeg|png|bmp|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error('图片类型必须是.jpeg,jpg,png,bmp中的一种')
        return false
      }
      let reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    changeDefaultImg () {
      this.$emit('cancleDefault')
    }
  }
}
</script>

<style lang="stylus">
.cropper-wrapper
  width 495px
  margin 0 auto
  overflow hidden
  .oper-dv
    height 20px
    text-align right
    margin-right 100px
    a
      font-weight 500
      &:last-child
        margin-left 30px
  .info-item
    margin-top 15px
    label
      display inline-block
      width 100px
      text-align right
    .sel-img-dv
      position relative
      .sel-file
        position absolute
        width 90px
        height 30px
        opacity 0
        cursor pointer
        z-index 2
      .sel-btn
        position absolute
        cursor pointer
        z-index 1
    .btn-orange
      display inline-block
      width 160px
      padding 0
      text-align left
      line-height 34px
      color #D87B31
      vertical-align top
      font-weight 600
      font-size 18px
      cursor pointer
    .oper
      height 28px
      width 28px
      font-size 20px
      margin 3px 5px
      outline none
      cursor pointer
    .amp
      background url('./amplification.png') no-repeat center
      background-size 100%
    .nar
      background url('./narrow.png') no-repeat center
      background-size 100%
    .rotate
      background url('./rotating.png') no-repeat center
      background-size 100%
      width 26px
      height 26px
      vertical-align top
.cropper-content
  display flex
  display -webkit-flex
  justify-content flex-start
  -webkit-justify-content flex-start
  .cropper
    width 283px
    height 283px
    .vue-cropper
      background rgba(240, 240, 240, 1)
  .preview-right
    margin-left 20px
  .show-preview
    flex 1
    -webkit-flex 1
    display flex
    display -webkit-flex
    justify-content center
    -webkit-justify-content center
    margin 5px
    width 137px
    height 137px
    overflow hidden
    padding-left 20px
    .preview
      overflow hidden
      border-radius 50%
      border 1px solid #cccccc
      background #cccccc
      margin-left 40px
  .preview-text
    text-align center
    margin 20px auto
    h4
      font-size 18px
      font-weight 600
      color #666666
      line-height 25px
    p
      font-size 12px
      font-weight 600
      color rgba(153, 153, 153, 1)
      line-height 17px
      margin-top 15px
.cropper-content .show-preview .preview
  margin-left 0
</style>
