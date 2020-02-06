<template>
  <div class="back-up" v-if="btnFlag" @click="handleBackUp"><span class="iconfont icon-huidaodingbu"></span></div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      scrollTop: 0,
      btnFlag: false
    }
  },
  methods: {
    handleBackUp () {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
        if (this.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },
    scrollToTop () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > 60) {
        this.btnFlag = true
      } else {
        this.btnFlag = false
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollToTop)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>
<style lang="stylus" scoped>
.back-up
  position fixed
  bottom 40px
  right 40px
  z-index 99
  color #000
  background rgba(221,221,221,0.3)
  width 50px
  height 50px
  font-size 16px
  text-align center
  line-height 50px
  border-radius 4px
  span
    color #CBCBCB
</style>
