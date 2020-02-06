<template>
  <div class="banner-wrapper">
    <img src="https://www.anycase.cn/data/ac30/index/banner.jpg" class="banner-bg" alt="">
    <div class="banner-box animated fadeInUp">
      <div class="box">
        <img class="logo animated fadeInUp" src="./img/logo@2x.png"/>
        <img class="text animated fadeInUp" src="./img/text@2x.png" alt=""/>
      </div>
    </div>
    <div class="box-btn add-animation">
      <!-- <button class="btn">登录</button> -->
      <router-link to="/login" class="btn">登录</router-link>
      <router-link to="/register" class="btn">注册</router-link>
      <!-- <button class="btn">注册</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeBanner'
}
</script>

<style lang="stylus">
.banner-wrapper
  width 100%
  position relative
  line-height 0
  min-width 1180px
  .banner-bg
    width 100%
  .banner-box
    position absolute
    width 990px
    height 460px
    top 0
    left 0
    right 0
    bottom 0
    margin auto
    background rgba(24, 19, 5, 0.6)
    display flex
    align-items center
    opacity 0
    animation-delay: 0s;
    .box
      width 100%
      height 256px
    .logo
      width 442px
      display block
      margin 0 auto 72px
      opacity 0
      animation-delay: 0.2s;
    .text
      width 783px
      display block
      margin 0 auto
      opacity 0
      animation-delay: 0.5s;
  .box-btn
    position absolute
    bottom 54px
    right 100px
    display flex
    align-items center
    opacity 0
    animation-delay: 0.5s;
    .btn
      display block
      background #FED901
      font-size 18px
      color #24303E
      font-weight bold
      width 170px
      height 40px
      border-radius 8px
      border 0
      cursor pointer
      text-align center
      line-height 40px
      margin-left 70px
      letter-spacing 2px
      box-shadow 0 10px 12px rgba(0,0,0,0.6)
@media screen and (max-width 1440px)
  .banner-wrapper
    .banner-box
      width 680px
      height 300px
      .box
        height 200px
      .logo
        width 320px
        margin 0 auto 34px
      .text
        width 540px
@media screen and (min-width 1441px) and (max-width 1600px)
  .banner-wrapper
    .banner-box
      width 810px
      height 354px
      .box
        height 210px
      .logo
        width 360px
        margin 0 auto 45px
      .text
        width 644px
</style>
