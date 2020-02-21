<template>
  <div id="app">
    <router-view v-if="isRouterActive"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterActive: true
    }
  },
  methods: {
    reload () {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    }
  }
}
</script>
<style lang="stylus">
body .el-table th.gutter{
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
 -webkit-font-smoothing: antialiased;
}
</style>
