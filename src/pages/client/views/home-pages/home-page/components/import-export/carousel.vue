
<template>
  <div id="swiper" @mouseover="stopAuto" @mouseout="autoPlay" class="add-animation">
      <div class="swiper-box"  :style="{width:allCount,'-webkit-transition':transitionConfig,'-webkit-transform':slateX}" ref='swiper'>
        <carousel-item :img="imgList[imgList.length-1].img" :content="imgList[imgList.length-1].content" :imgWidth="-imgWidth" v-if="loop"/>
        <carousel-item v-for="(item,index)  in imgList" :class="{active:index==imgIndex}" :content="item.content" :key="index" :img="item.img" :imgWidth="imgWidth*index" @to-detail="handleToLink"></carousel-item>
        <carousel-item :img="imgList[0].img" :content="imgList[0].content" :imgWidth="imgWidth*imgList.length" v-if="loop"></carousel-item>
      </div>
      <span class='swiper-left' v-if="dotsIndex !== 0" @click="toLeft">
        <span class="iconfont icon-jiantoujinggao"></span>
      </span>
      <span class='swiper-right' v-if="dotsIndex !== imgList.length -1" @click='toRight'>
        <span class="iconfont icon-jiantoujinggao"></span>
      </span>
      <div class="swiper-dots add-animation" v-if="dots">
        <button v-for="(item,index) in imgList" :key="index" :class="{active:index==dotsIndex}" @mouseover="toDots(index)">{{item.title}}</button>
      </div>
  </div>
</template>

<script>
import CarouselItem from './carouselItem'
export default {
  name: 'swiper',
  props: {
    // 图片宽
    imgWidth: {
      type: Number,
      default: 100
    },
    // 图片地址
    imgList: {
      type: Array
    },
    // 指示器
    dots: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: Boolean,
      default: true
    },
    // 初始播放位置
    initIndex: {
      type: Number,
      default: 0
    },
    // 是否循环
    loop: {
      type: Boolean,
      default: true
    },
    // 持续时间
    duration: {
      type: Number,
      default: 0.3
    },
    // 自动播放
    auto: {
      type: Boolean,
      default: false
    },
    // 自动播放时间间隔
    autoTime: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      imgIndex: 0,
      durationTime: 0.2,
      dotsIndex: 0,
      autoer: null
    }
  },
  components: {
    'CarouselItem': CarouselItem
  },
  computed: {
    allCount () {
      return ((this.imgList.length + 1) * this.imgWidth) + 'px'
    },
    slateX () {
      return 'translate3d(' + (-this.imgIndex * this.imgWidth) + 'px,0,0)'
    },
    transitionConfig () {
      return 'all ' + this.durationTime + 's'
    }
  },
  methods: {
    toLeft () {
      if (this.loop) {
        this.imgIndex--
        this.dotsIndex--
        if (this.dotsIndex <= -1) this.dotsIndex = this.imgList.length - 1

        if (this.imgIndex <= -2) this.loopFn('left')
      } else {
        // eslint-disable-next-line no-return-assign
        if (this.imgIndex === 0) return this.dotsIndex = this.imgIndex = this.imgList.length - 1
        this.imgIndex--
        this.dotsIndex--
      }
    },
    toRight () {
      if (this.loop) {
        // alert(this.loop)
        this.imgIndex++
        this.dotsIndex++
        if (this.dotsIndex === this.imgList.length) this.dotsIndex = 0
        if (this.imgIndex === this.imgList.length + 1) this.loopFn('right')
      } else {
        this.imgIndex++
        this.dotsIndex++
        if (this.imgIndex > this.imgList.length - 1) {
          // eslint-disable-next-line no-return-assign
          return this.dotsIndex = this.imgIndex = 0
        }
      }
    },
    loopFn (type) {
      const dur = this.durationTime
      this.durationTime = 0

      this.imgIndex = type === 'right' ? 0 : this.imgList.length - 1

      setTimeout(() => {
        this.$nextTick(function () {
          this.durationTime = dur

          if (type === 'right') this.imgIndex++
          else this.imgIndex--
        })
      }, 30)
    },
    toDots (index) {
      this.dotsIndex = this.imgIndex = index
    },
    autoPlay () {
      if (this.auto) {
        clearInterval(this.autoer)
        this.autoer = setInterval(() => {
          this.toRight()
        }, this.autoTime)
      }
    },
    stopAuto () {
      if (this.auto) return clearInterval(this.autoer)
    },
    handleToLink (params) {
      this.$emit('on-detail', params)
    }
  },
  created () {
    this.imgIndex = this.dotsIndex = this.initIndex

    this.durationTime = this.duration

    if (this.auto) this.autoPlay()
  }

}
</script>

<style lang="stylus">
@import '../../../../../assets/iconfont/iconfont.css'
  #swiper{
      position: relative;
      /* overflow: hidden; */
      width: 880px;
      height: 348px;
      opacity: 0;
      animation-delay: 1s;
      /* background: #fff; */
  }
  .swiper-left{
      position: absolute;
      top:50%;
      display: inline-block;
      transform: translateY(-50%);
      left:-134px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #1E3F62 ;
      cursor: pointer;
      color: #ffffff;
      text-align: center;
      line-height: 100px;
      span {
        font-size: 40px;
      }
  }
  .swiper-right{
      position: absolute;
      top:50%;
      display: inline-block;
      transform: translateY(-50%);
      right: -134px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #1E3F62 ;
      cursor: pointer;
      color: #ffffff;
      text-align: center;
      line-height: 100px;
      span {
        transform: rotate(180deg)
        font-size: 40px;
        display: inline-block;
      }
  }
  .swiper-box {
    display: flex;
    align-items: center;
    position: absolute;
  }
  .swiper-box .active {
    width: 880px;
  }
  .swiper-box .active.swiper-item .item-content {
    transform: translateX(100%);
  }
  .swiper-dots{
      position: absolute;
      top: -78px;
      text-align: center;
      left: 0;
      border-bottom: 2px solid #979797
  }
  .swiper-dots button{
      width: 156px;
      height: 40px;
      line-height: 40px;
      display: inline-block;
      margin: 0 10px;
      text-align: center;
      color:#979797;
      font-weight: normal;
      border: none;
      outline: none;
      transition: all .2s;
      cursor: pointer;
      background: #ffffff;
  }
  .swiper-dots button:hover,.swiper-dots button.active{
      color: #000000;
  }
  .swiper-dots button.active::after {
      content: '';
      width: 40px;
      border-bottom: 2px solid #FED901;
      display: block;
      transform: translate(52px, -1px);
  }
</style>
