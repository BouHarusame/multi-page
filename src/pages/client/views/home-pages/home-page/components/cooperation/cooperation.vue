<template>
  <div class="cooperation">
    <svg width="100%" height="1030" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="0" cy="110" r="64" stroke="#FED901" stroke-width="30" fill="#fff"/>
      <polygon :points="points" fill="#183350"/>
      <polygon :points="points1" fill="#1E3F62"/>
    </svg>
    <div class="content">
      <div class="title add-animation">
        <div class="title-text">我们的伙伴</div>
        <div class="title-line"></div>
      </div>
      <el-carousel indicator-position="outside" arrow="never" class="add-animation">
        <el-carousel-item>
          <img src="./img/merchants1.png" alt="" srcset="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="./img/merchants2.png" alt="" srcset="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="./img/merchants3.png" alt="" srcset="">
        </el-carousel-item>
        <el-carousel-item>
          <img src="./img/merchants4.png" alt="" srcset="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      carousel: [
        { url: './img/merchants1.png' },
        { url: './img/merchants2.png' },
        { url: './img/merchants3.png' },
        { url: './img/merchants4.png' }
      ],
      points: '',
      points1: ''
    }
  },
  methods: {
    handleResize () {
      let clientWidth = document.documentElement.offsetWidth
      if (clientWidth < 1180) {
        clientWidth = 1180
      }
      let point1 = clientWidth - 534
      let point2 = clientWidth - 267
      this.points = `${clientWidth} 692,${point1} 1030,${clientWidth} 1030`
      this.points1 = `${clientWidth} 861,${point2} 1030,${clientWidth} 1030`
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus" scoped>
.cooperation
  width 100%
  height 1030px
  position relative
  .content
    width 70%
    position absolute
    top 0
    left 0
    right 0
    margin 0 auto
    display flex
    flex-direction column
    align-items center
    .title
      font-size 28px
      font-weight bold
      color #000
      line-height 28px
      text-align center
      margin-top 300px
      opacity 0
      .title-line
        width 155px
        height 4px
        background #FED901
        display inline-block
        margin-top 12px
    .el-carousel
      width 960px
      margin-top 100px
      opacity 0
      overflow hidden
      >>>.el-carousel__container
        height 158px
        .el-carousel__item
          width 960px
          height 158px
          img
            width 960px
            height 158px
      >>>.el-carousel__indicator
        margin-top 66px
        padding 12px 20px
      >>>ul > li.el-carousel__indicator > button
        width 56px
        height 4px
        background #D0D0D0
        opacity 1
      >>>ul > li.el-carousel__indicator.is-active > button
        background #FED901
</style>
