
<template>
  <div class="swiper-item">
    <img :src="img" class="item-img"/>
    <div class="item-content">
      <h4 class="item-title">{{content.title}}</h4>
      <p class="item-p">{{content.subtitle}}</p>
      <div class="item-line" v-for="(item,index) in content.itemList" :key="index">
        <img :src="item.icon" alt=""><span>{{item.text}}</span>
      </div>
      <button class="item_link" @click="handleToDetail(content.url, content.params)">查看详情</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'swiper-item',
  props: {
    img: {
      type: String
    },
    imgWidth: {
      type: Number,
      default: 100
    },
    content: {
      type: Object
    }
  },
  data () {
    return {

    }
  },
  computed: {
    imgLateX () {
      return 'translate3d(' + (this.imgWidth) + 'px,0,0)'
    }
  },
  methods: {
    handleToDetail (url, params) {
      this.$emit('to-detail', { url, params })
    }
  }
}
</script>

<style lang="stylus" scope>
.swiper-item
  width 440px
  height 348px
  margin-right 80px
  display flex
  align-items center
  transition all 0.6s ease-in-out
  overflow hidden
  position relative
  border-radius 4px
  .item-img
    width 440px
    height 348px
    position absolute
    z-index 2
  .item-content
    position absolute
    width 440px
    height 348px
    background #183350
    z-index 1
    transition all 0.6s ease-in-out
    box-sizing border-box
    padding 35px 30px
    .item-title
      font-size 18px
      color #FFFFFF
      font-weight 500
      margin-bottom 27px
    .item-p
      font-size 16px
      color #FFFFFF
      margin-bottom 24px
    .item-line
      margin-bottom 16px
      display flex
      align-items flex-start
      img
        display block
        width 20px
        margin-right 14px
      span
        font-size 14px
        color #F3F3F3
        line-height 18px
        text-align justify
    .item_link
      width 166px
      height 40px
      border 1px solid #FED901
      border-radius 10px
      text-align center
      font-size 16px
      color #FEFEFE
      margin-top 18px
      background transparent
      cursor pointer
      outline 0
</style>
