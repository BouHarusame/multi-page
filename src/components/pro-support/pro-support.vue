<template>
<div class="pro-support">
   <div class="section" v-for="item in professor" :key="item.title">
     <div class="section-title"><span>{{item.title}}</span></div>
     <div class="section-items">
       <div class="item" v-for="(e,i) in item.data" :key="i">
         <div class="item-avatar">
           <img :src="e.imageUrl" />
         </div>
         <div class="item-des">
           <div class="name">{{e.name}}</div>
           <div class="work">{{e.type}}</div>
           <div class="workYears">{{e.workYears}}</div>
           <div class="des">{{e.des}}</div>
           <div class="line">
             <div class="contact">
              <i class="qq"></i><span>{{e.qq}}</span>
             </div>
             <div class="contact">
              <i class="mobile"></i><span>{{e.mobile}}</span>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
</div>
</template>

<script>
import { $fetchFromJSONFile } from 'utils/http'
export default {
  name: 'firstPage',
  data () {
    return {
      professor: []
    }
  },
  methods: {
    fetchProfessor () {
      $fetchFromJSONFile('ap/professor.json', true)
        .then(res => {
          if (res && res.msg === 'success') {
            this.professor = res.data
          }
        })
        .catch(err => {
          throw Error(err)
        })
    }
  },
  mounted () {
    this.fetchProfessor()
  }
}
</script>

<style lang='stylus' scoped>
.pro-support
  padding 40px 50px 0
  .section
    min-width 1056px
    .section-title
      text-align center
      margin-bottom 40px
      span
        display inline-block
        font-size 20px
        color #414141
        font-weight bold
        height 20px
        line-height 20px
        position relative
        &::before
          content: ''
          position: absolute
          top 10px
          left -146px
          width 126px
          height 1px
          background #888888
        &::after
          content: ''
          position: absolute
          top 10px
          right -146px
          width 126px
          height 1px
          background #888888
    .section-items
      display flex
      flex-wrap wrap
      justify-content space-between
      align-items center
      .item
        display flex
        align-items center
        width 45%
        margin-bottom 40px
        .item-avatar
          width 142px
          height 142px
          margin-right 40px
          border-radius 50%
          overflow hidden
          img
            width 142px
            height 142px
        .item-des
          flex 1
          .name
            font-size 22px
            color #000000
            font-weight bold
            height 22px
            line-height 22px
            margin-bottom 10px
          .work
            font-size 18px
            color #353535
            font-weight 500
            height 18px
            line-height 18px
            margin-bottom 10px
          .workYears
            font-size 16px
            color #888888
            font-weight 500
            height 16px
            line-height 16px
            margin-bottom 10px
          .des
            font-size 14px
            color #353535
            font-weight 500
            line-height 24px
            margin-bottom 10px
          .line
            display flex
            align-items center
            .contact
              display flex
              margin-right 20px
              i
                display block
              .qq
                width 14px
                height 16px
                background url('./img/qq.png')no-repeat top center/100%
              .mobile
                width 14px
                height 14px
                background url('./img/mobile.png')no-repeat top center/100%
              span
                font-size 14px
                color #353535
                font-weight 500
                line-height 14px
                margin-left 8px
</style>
