<template>
  <div class="page-banner">
    <div :style="{'width': '100%', 'height': height}">
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="slideChange">
        <swiper-slide v-for="(item, i) in imgList" :key="i">
          <div class="shadow" :class="{'active': imgIndex !== i}" :style="{'width': itemWidth, 'height': itemHeight }"></div>
          <img :src="item.img" alt="" srcset="" :style="{'width': itemWidth, 'height': itemHeight}" >
          <div class="cont animated fadeInUp" v-if="item.cont && imgIndex === i">
            <p class="head">{{item.cont.title}}</p>
            <h1 class="category">{{item.cont.category}}</h1>
            <template v-for="(e, index) in item.cont.listItem">
              <div :key="index" >
                {{e}}
              </div>
            </template>
          </div>
          <div class="cont animated fadeInDown" v-if="item.cont && imgIndex !== i">
            <p class="head">{{item.cont.title}}</p>
            <h1 class="category">{{item.cont.category}}</h1>
          </div>
          <div class="cont1 animated fadeInUp" v-if="item.title && imgIndex === i">
            <p class="head1">{{item.title}}</p>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
        <div class="swiper-button-prev iconfont icon-jikediancanicon13" slot="button-prev"></div>
        <div class="swiper-button-next iconfont icon-jikediancanicon13" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      imgIndex: 0,
      swiperOption: {
        speed: 1000,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 100,
        // loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  props: {
    imgList: Array,
    activePage: Number,
    height: {
      default: '675px',
      type: String
    },
    width: {
      default: '850px',
      type: String
    },
    itemWidth: {
      default: '750px',
      type: String
    },
    itemHeight: {
      default: 'auto',
      type: String
    },
    pagination: {
      default: true,
      type: Boolean
    }
  },
  computed: {
    left: function () {
      return (this.width.split('p')[0] - this.itemWidth.split('p')[0]) / 2 + 'px'
    },
    swiper () {
      return this.$refs.mySwiper.swiper
    }
  },
  methods: {
    bannerChange (nv, ov) {
      this.imgIndex = nv
    },
    slideChange () {
      let activeIndex = this.swiper.activeIndex % 7
      this.imgIndex = activeIndex
      this.$emit('handleChange', activeIndex)
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    activePage: {
      handler () {
        if (this.$refs.mySwiper) {
          this.imgIndex = this.activePage
          this.swiper.slideToLoop(this.activePage, 1000, false)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-banner
  width 100%
  overflow hidden
  opacity 0
  display flex
  align-items center
  justify-content center
  margin-bottom 230px
  .swiper-container
    width 100%
    height 100%
    overflow visible
    //  --swiper-theme-color: #ff6600;/* 设置Swiper风格 */
    // --swiper-navigation-color: #00ff33;/* 单独设置按钮颜色 */
    // --swiper-navigation-size: 30px;/* 设置按钮大小 */
    >>>.swiper-pagination-bullet
      width 34px
      height 3px
      border-radius 3px
      background #C9C9C9
      opacity 1
    >>>.swiper-pagination-bullet-active
      background #004ea1
    >>>.swiper-button-prev,.swiper-button-next
      background rgba(255,255,255,0.6)
      width 80px
      height 80px
      border-radius 50%
      text-align center
      line-height 80px
      font-size 40px
      color #000000
      outline 0
    >>>.swiper-button-next
      transform rotate(180deg)
      left 50%
      margin-left 560px
    >>>.swiper-button-prev
      left 50%
      margin-left -650px
    .swiper-wrapper
      transition-timing-function: cubic-bezier(0.1, 0.7, 1, 0.1)
      .shadow
        position absolute
        z-index 99
        background rgb(255,255,255)
        width 100%
        height 100%
        opacity 0
        transition opacity 1s ease-in
      .active
        opacity 0.4
      img
        width 100%
        height auto
        margin 0 auto
        display block
      .cont1
        color #fff
        position absolute
        bottom 0px
        left 0px
        line-height 30px
        font-size 14px
        .head1
          font-size 16px
          font-weight bold
          opacity 1
          color #000000
      .cont
        color #fff
        position absolute
        bottom 138px
        left 85px
        line-height 30px
        font-size 14px
        .category
          font-size 22px
          font-weight 500
          line-height 50px
        // div
        //   // display none
        //   opacity 0
        //   transition all 2s
        // .item-show
        //   display block
        //   opacity 1
      .page-title
        font-size 16px
        font-weight bold
        line-height 60px
  .swiper-slide
    width: 750px;
  .banner-button
    width 1200px
    display flex
    justify-content flex-end
    margin 50px 0
    .btn
      cursor pointer
    .prev
      margin-right 40px
</style>
