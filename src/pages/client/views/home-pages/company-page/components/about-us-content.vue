<template>
  <div class="about-us-content content">
    <div class="company-title add-animation">
      <svg width="100%" height="800px">
        <polygon :points="points" fill="#183350"/>
        <polygon :points="points1" fill="#1E3F62"/>
      </svg>
      <div class="company-content">
        <div class="text">
          <div class="title">愿景</div>
          <div class="subtitle">成为全球供应链服务企业之最！</div>
          <p>最智能化的系统、最专业化的团队、最人性化的服务。</p>
        </div>
        <div class="text">
          <div class="title">使命</div>
          <div class="subtitle">通过智慧物流大数据，携手中国企业走向世界，推动全球贸易立体化，与客户形成物贸命运共同体！</div>
        </div>
        <div class="text">
          <div class="title">价值观</div>
          <div class="subtitle">务实、诚信、高效、成长、共赢</div>
          <p>务实为根，诚信为本，以高效的标准要求自己，时刻怀着成长的心态，追求共 赢的结果。</p>
        </div>
      </div>
    </div>
    <div class="content-box add-animation">
      <div class="title">
        了解箱讯科技
      </div>
      <div class="content-line">
        <div class="content">
          <div class="cont">
            箱讯科技（上海）有限公司成立于2015年，响应行业发展和技术变革的大趋势，依托卓越的行业洞察，以市场需求为导向，通过整合、利用、优化配置国内优质的各类跨境物流供应商资源，为国际贸易企业提供可视化物流、标准化操作系统、大数据分析的专业化综合服务平台。
          </div>
        </div>
        <div class="content">
          <div class="cont">
                  总部位于上海，在苏州建立研发中心，在天津、大连、青岛、宁波、深圳、广州、厦门设有多个分公司。经过多年发展，逐渐建立了覆盖全国的国际物流业务团队和服务网络，客户群体遍布全球。
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-content-box add-animation">
      <swiper :options="swiperOption" style="height: 516px">
        <swiper-slide style="width:674px"><img src="https://www.anycase.cn/data/ac30/index/aboutUs1.jpg" height="400px" alt=""></swiper-slide>
        <swiper-slide style="width:600px"><img src="https://www.anycase.cn/data/ac30/index/aboutUs3.jpg" height="400px" alt=""></swiper-slide>
        <swiper-slide style="width:674px"><img src="https://www.anycase.cn/data/ac30/index/aboutUs2.jpg" height="400px" alt=""></swiper-slide>
        <swiper-slide style="width:700px"><img src="https://www.anycase.cn/data/ac30/index/aboutUs4.jpg" height="400px" alt=""></swiper-slide>
        <swiper-slide style="width:532px"><img src="https://www.anycase.cn/data/ac30/index/aboutUs5.jpg" height="400px" alt=""></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    clientWidth: Number
  },
  data () {
    return {
      points: '',
      points1: '',
      points2: '',
      swiperOption: {
        loop: true,
        freeMode: true,
        speed: 4000,
        autoplay: {
          delay: 0,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        spaceBetween: 0
      }
    }
  },
  methods: {
    fectchSvg () {
      let offsetWidth = this.clientWidth - 400
      this.points = `${this.clientWidth} 0,0 0, 0 800,${this.clientWidth} 500`
      this.points1 = `${offsetWidth} 0, 0 0, 0 200`
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.fectchSvg()
    })
  },
  watch: {
    clientWidth: {
      handler () {
        this.fectchSvg()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.about-us-content
  transform translateY(-47px)
  .content-box
    width 100%
    padding 240px 0
    background #FAFAFA
    opacity 0
    .title
      width 1000px
      margin 0 auto 40px
      font-size 32px
      color #000000
    .content-line
      width 1000px
      margin 0 auto
      display flex
      justify-content center
    .content
      width 500px
      &:nth-child(1)
        margin-right 50px
      .cont
        font-size 14px
        color #000000
        line-height 30px
  .swiper-content-box
    padding 200px 0
    opacity 0
  .swiper-container
    width 100%
    >>>.swiper-wrapper
      transition-timing-function linear
    >>>.swiper-slide
       display flex
       flex-direction column
       align-items center
       justify-content center
       height 100%
      img
        display block
  .company-title
    position relative
    opacity 0
    background #FAFAFA
    // &:after
    //   content ''
    //   width 100%
    //   height 0
    //   position absolute
    //   bottom 0
    //   left 0
    //   border-bottom 2px solid rgba(149,149,149,0.4)
    .company-content
      display flex
      justify-content space-between
      width 1000px
      position absolute
      top 250px
      left 50%
      margin-left -500px
      .text
        width 260px
        .title
          font-size 32px
          color #FED900
          margin-bottom 20px
        .subtitle
          font-size 16px
          color #ffffff
          line-height 26px
        p
          font-size 12px
          color #ffffff
          line-height 20px
          margin-top 15px
</style>
