<template>
  <div class="news-content add-animation">
    <svg width="100%" style="position:absolute;top:-100px;z-index:-1;" :height="height" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polygon :points="points" fill="#183350"/>
      <polygon :points="pointsL" fill="#1E3F62"/>
    </svg>
    <news-detail v-if="showNewsDetail" :acticleContent="acticleContent" @on-back="handleBack" @new-content="handleNewsContent"></news-detail>
    <news-list v-else :imgList="imgList" :tabsIndex="tabName" :elTabs="elTabs" :detail="detail" @on-new="handleToDetail" @fcldetail="fcldetail" @clickTab="clickTab"/>
  </div>
</template>

<script>
import NewsDetail from './news-detail'
import NewsList from './news-list'
import { getAcArticleList } from 'clientApi/home'
export default {
  components: {
    NewsDetail,
    NewsList
  },
  props: {
    height: Number,
    points: String,
    pointsL: String,
    tabName: String,
    acticleContent: Object
  },
  data () {
    return {
      showNewsDetail: false,
      imgList: [
        {
          img: require('../img/new1.jpg'),
          title: '官宣！箱讯科技正式启用全新LOGO'
        },
        {
          img: require('../img/new2.jpg'),
          title: '箱讯科技受邀参展2019第三届上海国际车轮展览会'
        },
        {
          img: require('../img/new3.jpg'),
          title: '上港集团收购部分长江码头股权，这一步棋妙在何处？'
        }
      ],
      elTabs: [
        {
          label: '全部',
          props: 'all',
          detailList: []
        },
        {
          label: '箱讯科技',
          props: 'XX',
          detailList: []
        },
        {
          label: 'AnyCase',
          props: 'AC',
          detailList: []
        },
        {
          label: '行业资讯',
          props: 'ZX',
          detailList: []
        }
      ],
      detail: true
    }
  },
  methods: {
    handleToDetail (id) {
      this.showNewsDetail = true
      this.$emit('handleDetail', id)
    },
    handleBack () {
      this.showNewsDetail = false
      this.$emit('handleBack')
    },
    handleNewsContent (id) {
      this.$emit('new-content', id)
    },
    fcldetail (index, boolean) {
      this.detail = boolean
      this.$emit('fcldetail', index)
    },
    clickTab (tab) {
      this.$emit('clickTab', tab.name)
    },
    fetchArticleNews () {
      getAcArticleList()
        .then(res => {
          if (res && res.msg === 'success') {
            let detailList = res.data.records
            detailList.forEach(item => {
              item.type = 'news'
            })
            this.elTabs.forEach(item => {
              item.detailList = []
              if (item.props === 'all') {
                item.detailList = detailList
              }
              detailList.forEach(detail => {
                if (detail.articleType === item.props) {
                  item.detailList.push(detail)
                }
              })
            })
            this.clickTab({ name: this.tabName })
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    }
  },
  mounted () {
    this.fetchArticleNews()
  }
}
</script>
<style lang="stylus" scoped>
.news-content
  transform translateY(-47px)
  opacity 0
.content
  width 100%
  // position absolute
  // top 100px
  // left 0
  margin-top 50px
  display flex
  flex-direction column
  align-items center
  .title
    font-size 28px
    font-weight bold
    color #fff
    line-height 28px
    text-align center
    margin-top 150px
    margin-bottom 90px
    opacity 0
    .title-line
      width 155px
      height 4px
      background #FED901
      display inline-block
      margin-top 12px
  .el-tabs.el-tabs--top
    width 1100px
    margin-top 80px
    .el-tabs__active-bar
      display none
    .el-tabs__nav-wrap::after
      height 2px
      background #e6e6e6
    .el-tabs__item.is-top
      height 50px
      font-size 22px !important
      color #A5A5A5 !important
      font-weight bold
      padding 0 80px 0 5px
      margin 0 20px 5px 0
    .el-tabs__item.is-top.is-active
      color #000 !important
      border-bottom 3px solid #FED900
  .ocean-fcl
    width 100%
    .introduce
      margin 50px auto
      font-size 20px
      line-height 30px
      font-weight bold
      text-indent 42px
    .fcldetail
      margin-left 42px
      margin-bottom 20px
      display flex
      align-items center
      font-size 18px
      color #004EA2
      line-height 30px
      cursor pointer
      img
        margin-left 12px
</style>
