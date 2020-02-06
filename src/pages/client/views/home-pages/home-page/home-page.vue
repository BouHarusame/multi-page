
<template>
  <div class="home-page">
    <home-header ref="header" :activeIndex="activeIndex"></home-header>
    <home-banner :style="{'margin-top': marginTop}"></home-banner>
    <switch-block></switch-block>
    <import-export></import-export>
    <show></show>
    <news></news>
    <cooperation></cooperation>
    <home-footer></home-footer>
    <BackUp></BackUp>
  </div>
</template>

<script>
import HomeHeader from 'client-components/home-page/header.vue'
import HomeBanner from 'client-components/home-page/banner.vue'
import BackUp from 'client-components/home-page/back-up.vue'
import SwitchBlock from './components/switch-block/switch-block'
import ImportExport from './components/import-export/import-export'
import Show from './components/show/show'
import News from './components/news/news'
import Cooperation from './components/cooperation/cooperation'
import HomeFooter from 'client-components/home-page/footer.vue'
export default {
  name: 'home',
  data () {
    return {
      marginTop: '80px',
      activeIndex: 'home'
    }
  },
  components: {
    HomeHeader,
    HomeBanner,
    BackUp,
    SwitchBlock,
    ImportExport,
    Show,
    News,
    Cooperation,
    HomeFooter
  },
  methods: {
    handleScroll () {
      let clientHeight = document.documentElement.clientHeight
      const element = document.querySelectorAll('.add-animation')
      element.forEach(item => {
        let offsetTop = item.getBoundingClientRect().top
        if (clientHeight > offsetTop) {
          item.classList.add('animated', 'fadeInUp')
          item.style.opacity = 1
        }
      })
    },
    handleResize () {
      this.marginTop = this.$refs.header.$el.offsetHeight + 'px'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    setTimeout(() => {
      this.handleScroll()
    }, 500)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus">
// @import 'animate.css';
.home-page
  font-family 'Microsoft YaHei'
</style>
