<template>
  <div class="content news-detail-wrapper">
    <div class="news-detail-content">
      <div class="back" @click="handleBack">
        <svg t="1574326664985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24627" width="20" height="20">
          <path fill="#ffffff" d="M474.496 512l338.752-338.752-90.496-90.496L293.504 512l429.248 429.248 90.496-90.496z" p-id="24628"></path>
        </svg>
        <span>返回</span>
      </div>
      <div class="title-box">
        <div class="title-box-h">
          {{acticleContent.articleTitle}}
        </div>
        <p class="sub-title">{{acticleContent.articleIntroduction}}</p>
        <p class="news-time" v-if="acticleContent.createTime">【{{acticleContent.createTime}}】</p>
      </div>
      <div class="news-content" v-html="acticleContent.articleContent"></div>
      <div class="line">
        <div class="back" @click="handleBack">
          <svg t="1574326664985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24627" width="20" height="20">
            <path fill="#004EA2" d="M474.496 512l338.752-338.752-90.496-90.496L293.504 512l429.248 429.248 90.496-90.496z" p-id="24628"></path>
          </svg>
          <span>返回</span>
        </div>
        <div class="next-btn">
          <div class="left">
            <svg t="1574326664985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24627" width="20" height="20">
              <path :fill="acticleContent.previousId ? '#004EA2' : '#929292'" d="M474.496 512l338.752-338.752-90.496-90.496L293.504 512l429.248 429.248 90.496-90.496z" p-id="24628"></path>
            </svg>
            <span :class="{'grey': !acticleContent.previousId}" @click="handlePrev(acticleContent.previousId)">上一篇</span>
          </div>
          <div class="right">
            <span :class="{'grey': !acticleContent.nextId}" @click="handleNext(acticleContent.nextId)">下一篇</span>
            <svg t="1574327787527" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25348" width="20" height="20">
              <path :fill="acticleContent.nextId ? '#004EA2' : '#929292'" d="M613.504 512L274.752 173.248l90.496-90.496L794.496 512l-429.248 429.248-90.496-90.496z" p-id="25349"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    acticleContent: Object
  },
  data () {
    return {

    }
  },
  methods: {
    handleBack () {
      this.$emit('on-back')
    },
    handlePrev (id) {
      if (!this.acticleContent.previousId) return
      this.$emit('new-content', id)
    },
    handleNext (id) {
      if (!this.acticleContent.nextId) return
      this.$emit('new-content', id)
    }
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.news-detail-wrapper
  width 100%
  margin 0 auto
  top 50px !important
  .news-detail-content
    width 1000px
    margin 80px auto
  .back
    display flex
    align-items center
    text-align left
    cursor pointer
    span
      color #ffffff
      font-size 16px
      margin-left 10px
  .title-box
    margin 144px 0 260px
    min-height 250px
    .title-box-h
      font-size 30px
      color #FFFFFF
      font-weight bold
    .sub-title
      font-size 24px
      font-weight bold
      color #ffffff
      margin 50px 0
      line-height 46px
    .news-time
      font-size 20px
      color #ffffff
  .news-content
    font-size 14px
    color #525252
    line-height 30px
    div
      font-size 14px
      color #525252
      margin 50px 0
      h4
        font-size 18px
        color #004EA2
        line-height 34px
        font-weight bold
        text-align center
        &:nth-child(1)
          margin-top 100px
      p
        line-height 24px
        margin 24px 0
        text-indent 28px
    img
      margin 120px auto 50px
      width 926px
  .line
    display flex
    align-items center
    justify-content space-between
    margin 150px 0
    .back
      cursor pointer
      span
        color #004EA2
    .next-btn
      display flex
      align-items center
      .left, .right
        display flex
        cursor pointer
        span
          margin 0 10px
          color #004EA2
          font-size 16px
        .grey
          color #929292
</style>
