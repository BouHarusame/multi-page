<template>
  <div class="air-list-wrapper">
    <table class="air-list">
      <thead>
        <tr>
          <th>
            <el-row>
              <el-col :span="10" class="head">起运港／中转·行程／目的港</el-col>
              <el-col :span="2" class="head">+45</el-col>
              <el-col :span="2" class="head">+100</el-col>
              <el-col :span="2" class="head">+300</el-col>
              <el-col :span="2" class="head">+500</el-col>
              <el-col :span="2" class="head">+1000</el-col>
              <el-col :span="4" class="head"></el-col>
            </el-row>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in [1,2,3,4,5]">
          <tr :key="i">
            <td>
              <div class="outer-border">
                <el-row class="ob-row-1">
                  <el-col :span="10" class="p-item-1">
                    <span style="">上海(PVG) </span>
                    <span class="type-line">
                    </span>
                    <span>
                    曼谷（BKK）</span>
                  </el-col>
                  <el-col :span="2" class="p-item">15</el-col>
                  <el-col :span="2" class="p-item">154</el-col>
                  <el-col :span="2" class="p-item">155</el-col>
                  <el-col :span="2" class="p-item">157</el-col>
                  <el-col :span="2" class="p-item">457</el-col>
                  <el-col :span="4" class="p-item-7">
                    <div class="pi7-btn-1">
                      <el-button size="small">立即订舱</el-button>
                    </div>
                    <div class="pi7-btn-2">
                      <el-button size="small">在线询价</el-button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="ob-row-2">
                  <el-col>
                    <span>航空公司：</span>
                    <span>MU</span>
                    <span>航班：</span>
                    <span>1,2,3,4,5,6,7</span>
                    <span>中转：</span>
                    <span>1,2,3,4,5,6,7</span>
                    <span>时效：</span>
                    <span>3天</span>
                    <span>接散货</span>
                  </el-col>
                </el-row>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'air-list'
}
</script>

<style lang="stylus">
@import "~styles/variable"
.air-list-wrapper
  width 100%
  min-width 1100px
  .air-list
    width 100%
    thead
      width 100%
      height 36px
      line-height 36px
      background #597A96
      .head
        font-size 14px
        height 36px
        line-height 36px
        color #fff
        background $color-blue-background
    tbody
      .outer-border
        min-height 100px
        border 1px solid $border-color-light-grey
        box-sizing border-box
        margin-top 12px
        position relative
        color $font-color-black
        font-size 14px
        &:hover
          border 1px solid $color-yellow-background
        .ob-row-1
          padding-top: 20px
          padding-left: 10px
        .p-item
          text-align center
        .p-item-1
          position relative
          .type-line
            width: 60px
            display: inline-block
            height: 8px
            background: url('./img/arrow.png')no-repeat top center
            background-size 100% 100%
        .p-item-7
          position absolute
          right 20px
          top 4px
          width 86px
          height 100%
          text-align center
          margin-top: 10px
          z-index: 10
          .pi7-btn-1
            .el-button
              background $color-yellow-background
              color #fff
              border 0
          .pi7-btn-2
            margin-top: 14px
            .el-button
              background #FEF7EB
              height 28px
              border 1px solid $color-yellow-background
              color $color-yellow-background
        .ob-row-2
          margin-top: 40px
          padding-left: 10px
</style>
