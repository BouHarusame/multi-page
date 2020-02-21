<template>
  <div class="business-page">
    <home-header ref="header" :activeIndex="activeIndex"  @change="handleChange"></home-header>
    <div class="content-box" v-if="showCascader" :style="{'margin-top': marginTop}">
      <div class="sub-menu add-animation" :class="{'white': activeMenu === '联系我们'}">
        <div class="sub-menu-box" >
          <div class="sub-title">{{menuTitle}}</div>
          <el-menu class="add-animation" :default-active="activeMenu" mode="horizontal" @select="handleSelectMenu">
            <template v-for="(item, i) in menuList">
              <el-menu-item :index="item" :key="i">{{item}}</el-menu-item>
            </template>
          </el-menu>
        </div>
      </div>
      <!-- 新闻资讯 -->
      <div class="news-content" v-if="activeMenu === '新闻资讯'">
        <newsContent :acticleContent="acticleContent" :points="points" :pointsL="points1" :tabName="tabName" :height="height" @clickTab="handleClickTab" @fcldetail="fetchFclDetail" @handleBack="handleBack" @handleDetail="handleToDetail" @new-content="handleNewContent"></newsContent>
      </div>
      <!-- 关于我们 -->
      <div class="about-us" v-if="activeMenu === '关于我们'">
        <svg width="165" height="130px" style="position: absolute;z-index: 8; right:0;top: 760px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polygon points="165 0,0 0,45 65,0 130,165 130" fill="#FED900"/>
        </svg>
        <aboutUsContent :clientWidth="clientWidth"></aboutUsContent>
      </div>
      <!-- 专家团队 -->
      <div class="team" v-if="activeMenu === '专家团队'">
        <svg width="165" height="130px" style="position: absolute;z-index: 8; right:0;top: 660px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polygon points="165 0,0 0,45 65,0 130,165 130" fill="#FED900"/>
        </svg>
        <teamContent :points="points2" :pointsL="points3"></teamContent>
      </div>
      <!-- 加入我们 -->
      <div class="join-us" v-if="activeMenu === '加入我们'">
        <svg width="165" height="130px" style="position: absolute;z-index: 8; right:0;top: 760px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polygon points="165 0,0 0,45 65,0 130,165 130" fill="#FED900"/>
        </svg>
        <joinUsContent ></joinUsContent>
      </div>
      <!-- 联系我们 -->
      <div class="connect-us" v-if="activeMenu === '联系我们'">
        <svg width="165" height="130px" style="position: absolute;z-index: 8; right:0;top: 660px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polygon points="165 0,0 0,45 65,0 130,165 130" fill="#FED900"/>
        </svg>
        <connectUsContent></connectUsContent>
      </div>
    </div>
    <home-footer @change="handleChangeTop"></home-footer>
    <BackUp></BackUp>
  </div>
</template>

<script>
import HomeHeader from 'client-components/home-page/header.vue'
import newsContent from './components/news-content'
import aboutUsContent from './components/about-us-content'
import teamContent from './components/team-content'
import joinUsContent from './components/join-us-content'
import connectUsContent from './components/connect-us-content'
import BackUp from 'client-components/home-page/back-up.vue'
import HomeFooter from 'client-components/home-page/footer.vue'
import { getAcArticleDetail } from 'clientApi/home'
import { timeFomatter } from 'utils/utils'
import { setTimeout } from 'timers'
export default {
  name: 'company',
  data () {
    return {
      activeIndex: 'company',
      marginTop: '80px',
      height: 1800,
      showCascader: true,
      tabName: '全部',
      points: '',
      points1: '',
      points2: '',
      points3: '',
      points4: '',
      showNewList: true,
      clientWidth: 100,
      menuTitle: '公司介绍',
      activeMenu: '新闻资讯',
      menuList: ['新闻资讯', '关于我们', '专家团队', '加入我们', '联系我们'],
      acticleContent: {}
    }
  },
  components: {
    HomeHeader,
    newsContent,
    aboutUsContent,
    teamContent,
    joinUsContent,
    connectUsContent,
    BackUp,
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
    handleChange (data) {
      this.handleSelectMenu(data.tabIndex)
    },
    handleChangeTop (data) {
      document.documentElement.scrollTop = 0
      this.handleSelectMenu(data.tabIndex)
    },
    handleSelectMenu (val) {
      if (this.activeMenu === val) return
      this.activeMenu = val
      this.showCascader = false
      this.$nextTick(() => {
        this.handleResize()
        this.showCascader = true
        this.$nextTick(() => {
          this.handleScroll()
        })
      })
    },
    handleResize () {
      if (this.$refs.header) {
        this.marginTop = this.$refs.header.$el.offsetHeight + 'px'
      }
      let clientWidth = document.documentElement.offsetWidth
      if (clientWidth < 1180) {
        clientWidth = 1180
      }
      this.clientWidth = clientWidth
      if (this.showNewList) {
        this.points = `0 0,${clientWidth} 0,${clientWidth} 120,0 400`
        this.points1 = `0 0,${clientWidth - 400} 0,0 220`
      } else {
        this.points = `0 0,${clientWidth} 0,${clientWidth} 520,0 760`
        this.points1 = `0 0,${clientWidth} 0,${clientWidth} 180,0 400`
      }
      this.points2 = `0 0,${clientWidth} 0,${clientWidth} 320,0 600`
      this.points3 = `0 0,${clientWidth} 0,0 220`
    },
    handleBack () {
      this.showNewList = true
      this.$nextTick(() => {
        this.height = document.querySelector('.content').offsetHeight + 250
        this.handleResize()
        document.documentElement.scrollTop = 0
      })
    },
    handleToDetail (id) {
      this.showNewList = false
      this.articleId = id
      this.fetchArticleDetail(this.articleId)
    },
    fetchArticleDetail (articleId) {
      getAcArticleDetail()
        .then(res => {
          if (res && res.msg === 'success') {
            let acticleContent = res.data
            acticleContent.createTime = acticleContent.createTime ? timeFomatter(acticleContent.createTime, 'yyyy-MM-dd', true) : ''
            this.acticleContent = acticleContent
            this.$nextTick(() => {
              this.height = document.querySelector('.content').offsetHeight + 250
              this.handleResize()
              document.documentElement.scrollTop = 0
            })
          }
          if (res && res.msg === 'fail') {
            console.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    },
    handleNewContent (id) {
      this.fetchArticleDetail(id)
    },
    fetchFclDetail (index) {
      setTimeout(() => {
        this.showCascader = false
        this.height = document.querySelector('.content').offsetHeight
        this.handleResize()
        this.$nextTick(() => {
          this.showCascader = true
        })
        document.querySelectorAll('.page-detail')[index].classList.add('animated', 'fadeInUp')
        document.querySelectorAll('.page-detail')[index].style.opacity = 1
      }, 500)
    },
    handleClickTab (name) {
      this.tabName = name
      this.$nextTick(() => {
        this.height = document.querySelector('.content').offsetHeight + 250
      })
    }
  },
  mounted () {
    if (this.$route.params.tabIndex) {
      this.handleSelectMenu(this.$route.params.tabIndex)
    }
    if (this.$route.params.tabName) {
      this.handleClickTab(this.$route.params.tabName)
    }
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    setTimeout(() => {
      this.handleScroll()
      this.$nextTick(() => {
        this.handleResize()
        this.height = document.querySelector('.content').offsetHeight + 250
      })
    }, 500)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus">
// @import 'animate.css';
.business-page
  font-family 'Microsoft YaHei'
  .content-box
    position relative
    margin-bottom -2px
    .sub-menu
      width 100%
      border-bottom 1px solid #587390
      height 46px
      background transparent
      position relative
      z-index 9
      .sub-menu-box
        width 1192px
        margin 0 auto
        display flex
        align-items center
        justify-content space-between
        .el-menu
          background transparent
          .el-menu-item
            color #C7C7C7
            height 40px
            line-height 40px
            &:hover
              color #C7C7C7 !important
              background transparent !important
        .el-menu--horizontal
          border 0
          .is-active
            border-color #FFDA01 !important
            color #FFDA01 !important
            background transparent !important
            &:hover
              color #FFDA01 !important
              background transparent !important
      .sub-title
        font-size 14px
        color #ffffff
        margin-left 18px
    .white
      border-color #E1E1E1
      .sub-menu-box
        .el-menu--horizontal
          .is-active
            color #000000 !important
            &:hover
              color #000000 !important
      .sub-title
         color #000000
</style>
