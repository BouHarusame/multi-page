<template>
  <div>
    <div class="tips add-animation">
      一个平台解决您的所有问题， 让国际物流不再繁琐
    </div>
    <div class="content-box add-animation">
      <div class="content-text">
        <template v-for="(item, index) in contentList" >
          <div class="content-item" :key="index" v-if="item.show">
            <div class="content-title">
              <h4>{{item.label}}</h4>
              <p>{{item.title}}</p>
            </div>
            <div class="content-xq">
              <p v-for="(p,i) in item.con" :key="i">{{p}}</p>
            </div>
          </div>
        </template>
      </div>
      <div class="content-carousel add-animation">
        <div class="content-carousel-box">
          <div class="bg">
            <page-banner @change="handleChange" :activeIndex="activeIndex" :data="imgList" :height="height" :width="width" :itemWidth="itemWidth"></page-banner>
          </div>
          <div class="btn" @click="handleToLogin">使用我们的平台</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pageBanner from 'client-components/home-page/page-banner.vue'
import { getLocalStorage } from 'utils/utils'
export default {
  props: {
    contentList: Array,
    imgList: Array,
    activeIndex: Number
  },
  data () {
    return {
      height: '562px',
      width: '736px',
      itemWidth: '734px'
    }
  },
  components: {
    pageBanner
  },
  methods: {
    handleChange (nv) {
      this.$emit('changeSlide', nv)
    },
    handleToLogin () {
      this.roleNew = getLocalStorage('dr_roles') ? JSON.parse(getLocalStorage('dr_roles')) : []
      if (this.roleNew && this.roleNew.length > 0) {
        if (this.roleNew.indexOf('AC_GLY')) {
          // this.$router.addRoutes(AC_GLY)
          setTimeout(() => {
            this.$router.push({ path: '/console' })
          }, 0)
        } else if (this.roleNew.indexOf('AC_MH')) {
          setTimeout(() => {
            this.$router.push({ path: '/articleList' })
          }, 0)
        } else {
          // this.$router.addRoutes([])
          setTimeout(() => {
            this.$router.push({ path: '/toDoList' })
          }, 0)
        }
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.tips
  width 100%
  height 608px
  font-size 30px
  color #000000
  text-align center
  font-weight bold
  line-height 608px
  opacity 0
.content-box
  position relative
  margin-bottom -2px
  background #FAFAFA
  padding-bottom 100px
  padding-top 100px
  overflow hidden
  opacity 0
  .content-text
    position absolute
    top 300px
    left 50%
    margin-left 330px
    .content-item
      width 240px
      .content-title
        margin-bottom 50px
        h4
          font-size 16px
          font-weight bold
          position relative
          height 42px
          line-height 40px
          margin-bottom 20px
          &:after
            content ''
            position absolute
            bottom 0
            left 0
            height 0
            width 100%
            border-top 2px solid #FED900
        p
          font-size 14px
          color #636363
          font-weight bold
      .content-xq
        p
          font-size 12px
          color #343434
          line-height 22px
          margin 6px 0
  .content-carousel
    overflow hidden
    position relative
    opacity 0
    .content-carousel-box
      margin 0px auto
      display flex
      width 1180px
      .bg
        width 1024px
        background url('../img/carousel-bg.png')no-repeat center center
        background-size contain
        position relative
        overflow hidden
        transform translateX(-74px)
      .btn
        width:208px;
        height:49px;
        background:rgba(254,217,0,1);
        box-shadow:0px 12px 9px 0px rgba(33,26,4,0.4);
        border-radius:6px;
        font-size 16px
        font-weight bold
        text-align center
        line-height 49px
        color #000000
        position absolute
        left 50%
        margin-left 330px
        bottom 208px
        cursor pointer
      .page-banner
        opacity 1
        .el-carousel__container
          overflow hidden
        .banner-button
          margin 18px 0
</style>
