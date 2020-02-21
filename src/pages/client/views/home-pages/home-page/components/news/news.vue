<template>
  <div class="news">
    <div class="title add-animation">
      <div class="title-text">新闻资讯，了解我们</div>
      <div class="title-line"></div>
    </div>
    <div class="content">
      <template v-for="(item, index) in news">
        <div class="news-item add-animation" :key="index">
          <img :src="item.articlePictureSmall">
          <p>{{item.articleTitle}}</p>
          <div @click="handleToDetail(item.url, item.params)">更多内容 >></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getAcArticleType } from 'clientApi/home'
export default {
  data () {
    return {
      newsType: [
        {
          articleType: 'XX',
          params: {
            tabName: '箱讯科技',
            tabIndex: '新闻资讯'
          }
        },
        {
          articleType: 'AC',
          params: {
            tabName: 'AnyCase',
            tabIndex: '新闻资讯'
          }
        },
        {
          articleType: 'ZX',
          params: {
            tabName: '行业资讯',
            tabIndex: '新闻资讯'
          }
        }
      ],
      news: [],
      defaultNews: [
        {
          articlePictureSmall: require('./img/new1.png'),
          articleTitle: '官宣！箱讯科技正式启用全新LOGO',
          url: 'company',
          params: {
            tabName: '箱讯科技',
            tabIndex: '新闻资讯'
          }
        },
        {
          articlePictureSmall: require('./img/new2.png'),
          articleTitle: '箱讯科技受邀参展2019第三届上海国际车轮展览会',
          url: 'company',
          params: {
            tabName: 'AnyCase',
            tabIndex: '新闻资讯'
          }
        },
        {
          articlePictureSmall: require('./img/new3.png'),
          articleTitle: '上港集团收购部分长江码头股权，这一步棋妙在何处？',
          url: 'company',
          params: {
            tabName: '行业资讯',
            tabIndex: '新闻资讯'
          }
        }
      ]
    }
  },
  methods: {
    handleToDetail (url, params) {
      this.$router.push({ name: url, params })
    },
    fetchNewsList () {
      getAcArticleType()
        .then(res => {
          if (res && res.msg === 'success') {
            if (res.data && res.data.records.length !== 0) {
              let newList = res.data.records
              newList.forEach(item => {
                item.url = 'company'
                this.newsType.forEach(n => {
                  if (item.articleType === n.articleType) {
                    item.params = n.params
                  }
                })
              })
              this.news = newList
            } else {
              this.news = this.defaultNews
            }
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
    this.fetchNewsList()
  }
}
</script>

<style lang="stylus" scoped>
.news
  .title
    font-size 28px
    font-weight bold
    color #000
    line-height 28px
    text-align center
    margin-top 260px
    opacity 0
    .title-line
      width 155px
      height 4px
      background #FED901
      display inline-block
      margin-top 12px
  .content
    width 70%
    max-width 1200px
    min-width 986px
    margin 96px auto 0
    display flex
    justify-content space-between
    .news-item
      width 33%
      opacity 0
      margin 0 10px
      img
        width 328px
        height 328px
      p
        color #333
        max-width 342px
        width 100%
        line-height 24px
        font-size 14px
        margin 40px 0 16px
        text-align: justify
        font-weight bold
      div
        font-size 12px
        color #004EA2
        cursor pointer
      &:nth-child(2)
        animation-delay 0.2s
      &:nth-child(3)
        animation-delay 0.4s
</style>
