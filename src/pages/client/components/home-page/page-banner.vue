<template>
  <div class="page-banner">
    <el-carousel :height="height" :style="{'width': width}" :initial-index="activeIndex" arrow="never" :loop="true" :autoplay="true" ref="carousel" @change="bannerChange">
      <el-carousel-item  v-for="(item, i) in data" :key="i">
        <img :src="item.img" alt="" srcset="" :style="{'width': itemWidth, 'height': itemHeight}">
        <div class="btitle" v-if="item.title">{{item.title}}</div>
        <div class="cont" v-if="item.cont">
          <p class="head">{{item.cont.title}}</p>
          <h1 class="category">{{item.cont.category}}</h1>
          <template v-for="(e, index) in item.cont.listItem">
            <div :key="index">
              {{e}}
            </div>
          </template>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- <div class="banner-button">
      <span class="btn prev iconfont icon-jiantoujinggao" :class="{'grey': imgIndex === 0}" @click="prevpage">
      </span>
      <span class="btn next iconfont icon-jiantoujinggao" :class="{'grey': imgIndex === data.length - 1}" @click="nextpage">
      </span>
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgIndex: 0
    }
  },
  props: {
    data: Array,
    height: {
      default: '675px',
      type: String
    },
    width: {
      default: '880px',
      type: String
    },
    itemWidth: {
      default: '800px',
      type: String
    },
    itemHeight: {
      default: 'auto',
      type: String
    },
    activeIndex: {
      default: 0,
      type: Number
    }
  },
  methods: {
    prevpage () {
      if (this.imgIndex === 0) return
      this.$refs.carousel.prev()
    },
    nextpage () {
      if (this.imgIndex === this.data.length - 1) return
      this.$refs.carousel.next()
    },
    bannerChange (nv, ov) {
      this.imgIndex = nv
      this.$emit('change', nv)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../assets/iconfont/iconfont.css'
.page-banner
  width 100%
  overflow hidden
  opacity 0
  display flex
  height 846px
  flex-direction column
  align-items center
  justify-content center
  .el-carousel
    position relative
    margin-top 25px
    .el-carousel__item
      img
        width 100%
        height auto
        margin 0 auto
        display block
      .btitle
        font-size 18px
        color #000000
        font-weight bold
        margin 35px auto 0
        width 800px
        display none
      .cont
        color #fff
        position absolute
        bottom 85px
        left 85px
        line-height 30px
        .category
          font-size 30px
          font-weight 600
          line-height 50px
      .page-title
        font-size 16px
        font-weight bold
        line-height 60px
    .is-active
      .btitle
        display block
    >>>.el-carousel__indicators
      bottom 66px
    >>>.el-carousel__indicator
      .el-carousel__button
        background #c9c9c9
    >>>.is-active
      .el-carousel__button
        background-color #FED900 !important
  .banner-button
    width 770px
    display flex
    justify-content flex-end
    margin 0px 0 50px
    .btn
      cursor pointer
      font-size 40px
    .prev
      margin-right 40px
    .next
      transform translateY(4px) rotate(180deg)
    .grey
      color #9B9B9B
</style>
