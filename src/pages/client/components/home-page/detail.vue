<template>
  <div class="page-detail">
    <div class="detail-item" v-for="(item, index) in dataList" :key="index" >
      <template v-if="item.type === 'text'">
        <div class="text">
          <h1 class="headline">{{item.title}}</h1>
          <p class="cont" v-for="(e, i) in item.content.split('\n')" :key="i">{{e}}</p>
        </div>
      </template>
      <template v-else-if="item.type === 'news'">
        <div class="news-item" @click="handleToDetail(item.articleId)">
          <div class="news-headline">
            <h1 class="headline">{{item.articleTitle}}</h1>
            <p class="detail">
              <img src="./img/news-detail.png">
            </p>
          </div>
          <div class="news-cont">
            <img :src="item.articlePictureLarge">
            <p class="desc">{{item.articleIntroduction}}</p>
          </div>
        </div>
      </template>
      <template v-else-if="item.type === 'process'">
        <div class="text">
          <h1 class="headline">{{item.title}}</h1>
          <div class="step-line" v-for="(e, i) in item.process" :key="i">
            <div class="label">{{e.label}}</div>
            <div class="code">
              <span class="line"></span>
              <span class="codev">{{e.code}}</span>
            </div>
            <div class="value">{{e.value}}</div>
          </div>
        </div>
      </template>
      <template v-else-if="item.type === 'table'">
        <div class="text">
          <h1 class="headline">{{item.title}}</h1>
          <el-table :data="item.tableData" border style="width: 100%">
            <el-table-column prop="pname" label="部分细分产品名称" width="200"></el-table-column>
            <el-table-column prop="tips" label="办证或资质提示"></el-table-column>
          </el-table>
          <div class="content" v-if="item.content">
            <p class="cont" v-for="(e, i) in item.content.split('\n')" :key="i">{{e}}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { deepCopy } from 'utils/utils'
export default {
  data () {
    return {
      dataList: []
    }
  },
  props: {
    detailList: Array
  },
  methods: {
    handleToDetail (id) {
      this.$emit('news-detail', id)
    }
  },
  watch: {
    detailList: {
      handler () {
        if (this.detailList) {
          this.dataList = deepCopy(this.detailList)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.page-detail
  width 100%
  .detail-item
    margin-top 60px
    background #fff
    cursor pointer
    .text
      margin 0 42px
    .news-item
      padding 40px 30px
      display flex
      justify-content space-between
      background #FAFAFA
      .news-headline
        margin 10px 60px 0 0
        position relative
        .detail
          text-align right
          position absolute
          top 200px
          right -34px
      .news-cont
        img
          width 750px
          height 432px
        .desc
          font-size 14px
          line-height 30px
          margin-top 22px
    .headline
      font-size 16px
      margin-bottom 30px
      font-weight bold
      line-height 40px
      // width 200px
    .cont
      font-size 14px
      line-height 30px
      text-indent 32px
      color #525252
    .step-line
      display flex
      font-size 14px
      .label
        width 120px
        line-height 30px
        margin 10px 0
        text-align right
        flex-shrink 0
      .code
        width 51px
        line-height 50px
        position relative
        flex-shrink 0
        .line
          width 1px
          height 100%
          border-right 2px dashed #FED900
          position absolute
          top 0
          left 0
          right 0
          margin 0 auto
        .codev
          position absolute
          top 0
          left 0
          right 0
          margin 0 auto
          text-align center
          font-weight bold
          font-size 18px
      .value
        line-height 30px
        margin 10px 0
    >>>.el-table th>.cell, >>>.el-table .cell
      font-size 14px
      color #525252
    >>>.el-table td, >>>.el-table th, >>>.el-table--border
      border-color #525252
    .el-table--border::after, .el-table::before
      background-color #000
    .content
      margin-top 10px
</style>
