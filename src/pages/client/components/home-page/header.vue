<template>
  <div class="header-wrappper scroll" ref="headerWrap">
    <div class="wrapper">
      <div class="header-logo">
        <router-link to="/">
          <img class="logo1" src="./img/logo.png"/>
        </router-link>
        <!-- <div class="line-dotted"></div>
        <img class="logo2" src="./img/logo2@2x.png" /> -->
      </div>
      <div class="header-content">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="home" class="item-nav1" @click="handleToRoute('home')">首页</el-menu-item>
          <!-- <el-submenu index="2" popper-class="popper menu" :popper-append-to-body="false">
            <template slot="title">为何选择AnyCase</template>
            <el-menu-item index="2-1" class="item-nav">
              <span class="icon1"></span>
              <span class="item-text">使命</span>
            </el-menu-item>
            <el-menu-item index="2-2" class="item-nav">
              <span class="icon2"></span>
              <span class="item-text">愿景</span>
            </el-menu-item>
            <el-menu-item index="2-3" class="item-nav">
              <span class="icon3"></span>
              <span class="item-text">价值观</span>
            </el-menu-item>
          </el-submenu> -->
          <el-submenu index="serve" popper-class="popper submenu" :class="{'is-active': activeIndex === 'serve'}" :popper-append-to-body="false">
            <template slot="title">服务</template>
            <el-menu-item index="3-1" class="submenu-nav">
              <div class="nav-box">
                <div class="nav-left">
                  <div class="nav-title">物流服务</div>
                  <el-tree
                    :data="serviceList1"
                    @node-click="handleToRoute"
                    node-key="id">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span class="span-img"><span class="iconfont" :class="data.class"></span></span>
                      <span>{{ node.label }}</span>
                    </span>
                  </el-tree>
                </div>
                <div class="nav-right">
                  <div class="nav-title">行业解决方案</div>
                  <el-tree
                    :data="serviceList2"
                    node-key="id"
                    @node-click="handleToRoute"
                    :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span class="span-img"><span class="iconfont" :class="data.class"></span></span>
                      <span>{{ node.label }}</span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="business" :class="{'is-active': activeIndex === 'business'}" popper-class="popper submenu" :popper-append-to-body="false">
            <template slot="title">功能</template>
            <el-menu-item index="4-1" class="submenu-nav">
              <div class="nav-box">
                <div class="nav-left">
                  <div class="nav-title">出口平台</div>
                  <el-tree
                    :data="platList1"
                    @node-click="handleToRoute"
                    node-key="id">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span class="span-img"><span class="iconfont" :class="data.class"></span></span>
                      <span>{{ node.label }}</span>
                    </span>
                  </el-tree>
                </div>
                <div class="nav-right">
                  <div class="nav-title">进口平台</div>
                  <el-tree
                    :data="platList2"
                    node-key="id"
                    @node-click="handleToRoute"
                    :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }" >
                      <span class="span-img"><span class="iconfont" :class="data.class"></span></span>
                      <span>{{ node.label }}</span>
                    </span>
                  </el-tree>
                </div>
              </div>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="company" popper-class="popper menu" :class="{'is-active': activeIndex === 'company'}" :popper-append-to-body="false">
            <template slot="title">公司介绍</template>
            <el-menu-item v-for="(node, index) in nodeList" @click="handleToRoute(node.url, node.params)" :key="index" :index="node.index" class="item-nav">
              <span class="span-img"><span class="iconfont" :class="node.icon"></span></span>
              <span class="item-text">{{node.text}}</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="6" class="item-nav1">
            <div class="search-icon" v-if="seachShow" @mouseenter="handleChange"></div>
            <div class="search" v-else @mouseleave="handleChangeHide">
              <input type="text" class="search-input" placeholder="搜索">
              <div class="search-icon"></div>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="header-gn">
        <div class="sign"><router-link to="/login" class="link">登录</router-link></div>
        <div class="sign"><router-link to="/register" class="link">注册</router-link></div>
        <div class="line-dotted"></div>
        <div class="sign"><router-link to="/" class="link">CN</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeHeader',
  props: {
    activeIndex: {
      require: true,
      default: 'home',
      type: String
    }
  },
  data () {
    return {
      seachShow: false,
      platList1: [{
        id: 1,
        label: '一键订舱',
        class: 'icon-webcangdanhaiyun',
        url: 'business',
        params: {
          activeIdx: 0,
          exportActiveName: 'yjdc'
        }
      }, {
        id: 2,
        label: '标准定价',
        class: 'icon-zhangdan',
        url: 'business',
        params: {
          activeIdx: 0,
          exportActiveName: 'bzdj'
        }
      }, {
        id: 3,
        label: '实时查询',
        class: 'icon-xianshichazhaoliebiao',
        url: 'business',
        params: {
          activeIdx: 0,
          exportActiveName: 'sscx'
        }
      }, {
        id: 4,
        label: '实时响应',
        class: 'icon-kefu',
        url: 'business',
        params: {
          activeIdx: 0,
          exportActiveName: 'ssxy'
        }
      }, {
        id: 5,
        label: '极速对账',
        class: 'icon-duizhangmingxi',
        url: 'business',
        params: {
          activeIdx: 0,
          exportActiveName: 'jsdz'
        }
      }],
      platList2: [{
        id: 1,
        label: '自动清关报价',
        class: 'icon-baojia',
        url: 'business',
        params: {
          activeIdx: 1,
          importActiveName: 'zdqg'
        }
      }, {
        id: 2,
        label: '极速成本测算',
        class: 'icon-jisuanqi',
        url: 'business',
        params: {
          activeIdx: 1,
          importActiveName: 'cbcs'
        }
      }, {
        id: 3,
        label: '智能货物追踪',
        class: 'icon-genzongdingwei',
        url: 'business',
        params: {
          activeIdx: 1,
          importActiveName: 'znhw'
        }
      }, {
        id: 4,
        label: '专业单证指导',
        class: 'icon-qy_bdfw_3',
        url: 'business',
        params: {
          activeIdx: 1,
          importActiveName: 'zydz'
        }
      }, {
        id: 5,
        label: '便捷在线结算',
        class: 'icon-jiesuan',
        url: 'business',
        params: {
          activeIdx: 1,
          importActiveName: 'bjzx'
        }
      }],
      serviceList1: [{
        id: 1,
        label: '海运',
        class: 'icon-lunchuan',
        children: [{
          id: 11,
          label: '海运整箱',
          class: 'icon-xiangzi1',
          url: 'serve',
          params: {
            activeMenu: '海运',
            tabsIndex: '海运整箱'
          }
        }, {
          id: 12,
          label: '海运拼箱',
          class: 'icon-xiangzi',
          url: 'serve',
          params: {
            activeMenu: '海运',
            tabsIndex: '海运拼箱'
          }
        }]
      }, {
        id: 2,
        label: '拖车',
        class: 'icon-qiache-kongxin',
        url: 'serve',
        params: {
          activeMenu: '拖车',
          tabsIndex: '拖车'
        }
      }, {
        id: 3,
        label: '空运',
        class: 'icon-feiji',
        url: 'serve',
        params: {
          activeMenu: '空运',
          tabsIndex: '空运'
        }
      }, {
        id: 4,
        label: '报关',
        class: 'icon-haiguan-xianxing',
        url: 'serve',
        params: {
          activeMenu: '报关',
          tabsIndex: '报关'
        }
      }, {
        id: 5,
        label: '仓库内装',
        class: 'icon-cangku',
        url: 'serve',
        params: {
          activeMenu: '仓库内装',
          tabsIndex: '仓库内装'
        }
      }, {
        id: 6,
        label: '进口清关',
        class: 'icon-diqiu',
        url: 'serve',
        params: {
          activeMenu: '进口清关',
          tabsIndex: '进口清关'
        }
      }, {
        id: 7,
        label: '保税物流',
        class: 'icon-shui',
        children: [{
          id: 71,
          label: '保税区清关',
          class: 'icon-guojibiaozhunjizhuangxiangyunliang-zhongliang',
          url: 'serve',
          params: {
            activeMenu: '保税物流',
            tabsIndex: '保税区清关'
          }
        }, {
          id: 72,
          label: '保税区物流',
          class: 'icon-icon-test',
          url: 'serve',
          params: {
            activeMenu: '保税物流',
            tabsIndex: '保税区物流'
          }
        }, {
          id: 73,
          label: '保税仓储配送服务',
          class: 'icon-wuliucangchu',
          url: 'serve',
          params: {
            activeMenu: '保税物流',
            tabsIndex: '保税仓储配送服务'
          }
        }]
      }],
      serviceList2: [{
        id: 1,
        label: '物联网服务',
        class: 'icon-wangluo',
        url: 'increment',
        params: {
          activeMenu: '物联网服务',
          tabsIndex: '物联网服务'
        }
      }, {
        id: 2,
        label: '大数据服务',
        class: 'icon-shuju',
        url: 'increment',
        params: {
          activeMenu: '大数据服务',
          tabsIndex: '大数据服务'
        }
      }, {
        id: 3,
        label: '供应链金融服务',
        class: 'icon-gongyinglian',
        url: 'increment',
        params: {
          activeMenu: '供应链金融服务',
          tabsIndex: '供应链金融服务'
        }
      }, {
        id: 4,
        label: '保险服务',
        class: 'icon-baoxian',
        url: 'increment',
        params: {
          activeMenu: '保险服务',
          tabsIndex: '保险服务'
        }
      }],
      nodeList: [{
        index: '5-1',
        icon: 'icon-xinwenzixun-xianxing',
        text: '新闻资讯',
        url: 'company',
        params: {
          tabIndex: '新闻资讯'
        }
      }, {
        index: '5-2',
        icon: 'icon-loudongpeizhi',
        text: '关于我们',
        url: 'company',
        params: {
          tabIndex: '关于我们'
        }
      }, {
        index: '5-3',
        icon: 'icon-tuandui',
        text: '专家团队',
        url: 'company',
        params: {
          tabIndex: '专家团队'
        }
      }, {
        index: '5-4',
        icon: 'icon-jiarurongqi',
        text: '加入我们',
        url: 'company',
        params: {
          tabIndex: '加入我们'
        }
      }, {
        index: '5-5',
        icon: 'icon-dianhua',
        text: '联系我们',
        url: 'company',
        params: {
          tabIndex: '联系我们'
        }
      }]
    }
  },
  methods: {
    handleToRoute (route, params) {
      if (this.$route.name === route || this.$route.name === route.url) {
        if (typeof route === 'string') {
          this.$emit('change', params)
        } else {
          this.$emit('change', route.params)
        }
      } else {
        if (typeof route === 'string') {
          this.$router.push({ name: route, params })
        } else {
          this.$router.push({ name: route.url, params: route.params })
        }
      }
    },
    handleChange () {

    },
    handleChangeHide () {

    },
    handleScroll () {
      if (this.$refs.headerWrap) {
        this.$refs.headerWrap.style.left = 0 - document.documentElement.scrollLeft + 'px'
      }
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus">
@import '~@/styles/mixin'
@import '../../assets/iconfont/iconfont.css'
.header-wrappper
  width 100%
  min-width 1180px
  height 80px
  background #183350
  padding 0 24px
  box-sizing border-box
  font-family Microsoft YaHei
  // border-bottom 1px solid #000000
  .wrapper
    display flex
    align-items center
    justify-content space-between
    margin 0 auto
  flex-basis()
  .header-logo
    flex-basis()
    .logo1
      width 160px
      // margin-right 41px
    .logo2
      width 166px
      margin-left 14px
  .line-dotted
    width 0
    height 12px
    border-left 1px dotted #ffffff
    margin 0 15px
  .header-content
    display flex
    align-items center
    min-width 582px
    margin 0 100px
    .el-menu-demo
      background transparent
      border 0
      .el-menu-item, .el-submenu
        height 40px
        line-height 40px
        .el-submenu__title
          height 40px
          line-height 40px
          color #ffffff
          &:hover
            background transparent !important
            color #ffffff !important
      .el-menu-item:hover, .el-submenu
        background transparent !important
        color #ffffff !important
      .el-submenu
        position relative
        // margin 0 16px
        &:hover
          .popper
            opacity 1
      .is-active
        border 0
        color #FFD900 !important
        background transparent
        &:hover
          color #FFD900 !important
        .el-submenu__title
          color #FFD900 !important
          &:hover
            color #FFD900 !important
      .item-nav
        height 48px
        line-height 48px
        min-width 220px
        &:hover
          background #f5f7fa !important
    .item-nav,.item-nav1
      color #ffffff
      display flex
      align-items center
      justify-content center
      .item-text
        color #333333
        width 58px
      .span-img
        display block
        width 26px
        margin-right 25px
        display flex
        justify-content center
        span
          display block
          font-size 24px
          color #FFD900
      .icon1
        width 23px
        height 23px
        background url('./img/icon.png')no-repeat 0 0 / 252px 126px
      .icon2
        width 21px
        height 23px
        background url('./img/icon.png')no-repeat -27px -1px / 252px 126px
      .icon3
        width 19px
        height 18px
        background url('./img/icon.png')no-repeat -53px -4px / 252px 126px
      .icon4
        width 18px
        height 18px
        background url('./img/icon.png')no-repeat -78px -3px / 252px 126px
      .icon5
        width 18px
        height 22px
        background url('./img/icon.png')no-repeat -100px -2px / 252px 126px
      .icon6
        width 22px
        height 16px
        background url('./img/icon.png')no-repeat -123px -4px / 252px 126px
      .icon7
        width 18px
        height 18px
        background url('./img/icon.png')no-repeat -149px -2px / 252px 126px
      .icon8
        width 20px
        height 20px
        background url('./img/icon.png')no-repeat -174px -1px / 252px 126px
      .link
        color #ffffff
        font-size 14px
        font-weight 400
        letter-spacing 2px
      .search-icon
        width 18px
        height 18px
        background url('./img/search.png')no-repeat center / 100%
      .search
        width 160px
        height 20px
        border 1px solid #4B4B4B
        border-radius 6px
        padding 0 10px
        display flex
        align-items center
        justify-content space-around
        font-size 12px
        .search-input
          flex 1
          background #183350
          color #ffffff
          outline 0
          border 0
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden
          &::placeholder
            color #4D4D4D
    .submenu
      width 512px
      left -40px !important
      position absolute !important
      top 55px !important
      .submenu-nav
        padding 0
        height auto
        line-height normal
      .nav-box
        display flex
        .nav-title
          font-size 14px
          color #5F5F5F
          padding 12px 50px
        .nav-left
          flex 1
          padding 35px 0 35px 0
        .nav-right
          flex 1
          padding 35px 0 35px 0
          background #EFEFEF
          border-radius 0 10px 10px 0
        .el-tree
          background transparent
        .el-tree-node__content
          height auto
          padding 0 50px !important
        .el-tree-node__children
          .el-tree-node__content
            padding-left 70px !important
        .custom-tree-node
          margin 12px auto
          display flex
          align-items center
          cursor pointer
          width 100%
          .span-img
            display block
            width 26px
            margin-right 25px
            display flex
            justify-content center
            span
              display block
              font-size 24px
              color #FFD900
          .icon9
            width 22px
            height 21px
            background url('./img/icon.png')no-repeat -197px -2px / 252px 126px
          .icon10
            width 19px
            height 19px
            background url('./img/icon.png')no-repeat -224px -2px / 252px 126px
          .icon11
            width 19px
            height 20px
            background url('./img/icon.png')no-repeat -1px -31px / 252px 126px
          .icon12
            width 26px
            height 18px
            background url('./img/icon.png')no-repeat -25px -33px / 252px 126px
          .icon-kong
            width 24px
            height 24px
            background url('./img/kong.png')no-repeat top center /100% 100%
          .icon-qg
            width 26px
            height 22px
            background url('./img/qg.png')no-repeat top center /100% 100%
          .icon-wl
            width 26px
            height 16px
            background url('./img/wl.png')no-repeat top center /100% 100%
          .icon-cc
            width 24px
            height 24px
            background url('./img/cc.png')no-repeat top center /100% 100%
          .icon13
            width 22px
            height 22px
            background url('./img/icon.png')no-repeat -55px -30px / 252px 126px
          .icon14
            width 23px
            height 23px
            background url('./img/icon.png')no-repeat -79px -28px / 252px 126px
          .icon15
            width 22px
            height 22px
            background url('./img/icon.png')no-repeat -104px -31px / 252px 126px
          .icon16
            width 23px
            height 23px
            background url('./img/icon.png')no-repeat -130px -30px / 252px 126px
          .icon17
            width 21px
            height 22px
            background url('./img/icon.png')no-repeat -156px -30px / 252px 126px
          .icon18
            width 19px
            height 20px
            background url('./img/icon.png')no-repeat -182px -31px / 252px 126px
          .icon19
            width 21px
            height 22px
            background url('./img/icon.png')no-repeat -204px -31px / 252px 126px
          .icon20
            width 17px
            height 24px
            background url('./img/icon.png')no-repeat -228px -30px / 252px 126px
          .icon21
            width 24px
            height 27px
            background url('./img/icon.png')no-repeat 0px -61px / 252px 126px
          .icon22
            width 17px
            height 16px
            background url('./img/icon.png')no-repeat -29px -66px / 252px 126px
          .icon23
            width 21px
            height 20px
            background url('./img/icon.png')no-repeat -51px -64px / 252px 126px
          .icon24
            width 20px
            height 21px
            background url('./img/icon.png')no-repeat -76px -63px / 252px 126px
          .icon25
            width 21px
            height 21px
            background url('./img/icon.png')no-repeat -101px -63px / 252px 126px
          .icon26
            width 22px
            height 21px
            background url('./img/icon.png')no-repeat -126px -63px / 252px 126px
          .icon27
            width 19px
            height 21px
            background url('./img/icon.png')no-repeat -152px -63px / 252px 126px
          .icon28
            width 24px
            height 23px
            background url('./img/icon.png')no-repeat -174px -61px / 252px 126px
          .icon29
            width 24px
            height 21px
            background url('./img/icon.png')no-repeat -202px -63px / 252px 126px
          .icon30
            width 20px
            height 21px
            background url('./img/icon.png')no-repeat -229px -63px / 252px 126px
        .el-tree-node__expand-icon
          font-size 0
          padding 0
    .active
      .link
        color #FFD900
  .header-gn
    display flex
    align-items center
    justify-content flex-end
    min-width 224px
    .sign
      margin 0 15px
      .link
        color #FFD901
        font-size 14px
    .line-dotted
      height 8px
.scroll
  position fixed
  top 0
  left 0
  z-index 999
.popper
  opacity 0
  animation opacity 0.5s cubic-bezier(0,0.67,0,1) 1 forwards
  .el-menu--popup
    border-radius 10px
    box-shadow rgba(51,51,51,0.6) 0px 14px 12px
    overflow hidden
    padding 0
    // min-width 150px
  &::before
    content ''
    width 0
    height 0
    position absolute
    top -14px
    left 67px
    border-width 10px
    border-style solid
    border-color transparent transparent #ffffff transparent
.menu
  top 75px !important
  .el-menu--popup
    padding 35px 0
@keyframes opacity {
  0% {
    transform scale(0.9)
  }
  100% {
    transform scale(1)
  }
}
@media screen and (max-width: 1372px)
  .header-wrappper .header-content
    margin 0 40px
@media screen and (max-width: 1446px)
  .header-wrappper
    height 64px
    .menu
      top 59px !important
    .line-dotted
      margin 0 5px
    .header-content
      .submenu
        top 47px !important
      .el-menu-demo
        .el-submenu
          margin 0
    .header-gn
      min-width 190px
@media screen and (min-width: 1447px) and (max-width: 1600px)
  .header-wrappper
    height 64px
    .menu
      top 59px !important
    .header-content
      .submenu
        top 47px !important
      .item-nav
        .search
          width 160px
          height 20px
</style>
