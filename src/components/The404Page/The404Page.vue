<template>
  <div class="error-404">
    <div class="error-header">
      <HeaderBar></HeaderBar>
    </div>
    <img class="error-pic"
         src="./404.png"
         height="424"
         width="781">
    <p class="error-info">你访问的页面没有找到，请点击
      <a class="refresh"
         @click="handleClickRefresh"
         href="javascript:void(0)">刷新</a>
    </p>
  </div>
</template>
<script>
import HeaderBar from '@/components/header-bar/header-bar'
export default {
  name: 'The404Page',
  components: {
    HeaderBar
  },
  methods: {
    handleClickRefresh () {
      window.location.reload()
    }
  }
}
</script>
<style scoped lang="stylus">
.error-404
  width 100%
  height 100%
  background #f1f1f1
  .error-header
    background #fff
    box-shadow 0 1px 10px #ccc
  .error-pic
    display block
    width 100%
    max-width 781px
    max-height 424px
    margin 60px auto 0
  .error-info
    text-align center
    margin-top 50px
    font-weight bold
    .refresh
      text-decoration underline
      color #0d5ee7
      font-weight bold
</style>
