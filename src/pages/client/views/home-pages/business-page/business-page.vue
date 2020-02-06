<template>
  <div class="serve-page">
    <home-header ref="header" :activeIndex="activeIndex" @change="handleChange"></home-header>
    <div class="sub-menu add-animation" :style="{'margin-top': marginTop}">
      <div class="sub-menu-box">
        <div class="sub-title">{{menuTitle}}</div>
        <el-menu class="add-animation" :default-active="activeMenu" mode="horizontal" @select="handleSelectMenu">
          <template v-for="(item, i) in menuList">
            <el-menu-item :index="item" :key="i">{{item}}</el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
    <template v-if="tabshow" >
      <page-content v-if="showLayout" :contentList="exportTabList" :activeIndex="activeIdx" :imgList="exportImgList" @changeSlide="handleChangeSlide"></page-content>
    </template>
    <template  v-else>
      <page-content v-if="showLayout" :contentList="importTabList" :activeIndex="activeIdx" :imgList="importImgList" @changeSlide="handleChangeSlideImport"></page-content>
    </template>
    <home-footer @change="handleChangeTop"></home-footer>
    <BackUp></BackUp>
  </div>
</template>

<script>
import HomeHeader from 'client-components/home-page/header.vue'
import pageContent from './components/page-content'
import BackUp from 'client-components/home-page/back-up.vue'
import HomeFooter from 'client-components/home-page/footer.vue'
export default {
  name: 'business',
  data () {
    return {
      showLayout: true,
      activeIndex: 'business',
      tabshow: true,
      activeIdx: 0,
      marginTop: '80px',
      menuList: ['出口平台', '进口平台'],
      activeMenu: '出口平台',
      menuTitle: '平台功能',
      exportTabList: [
        {
          label: '一键订舱',
          name: 'yjdc',
          show: true,
          title: '线上询价、比价、智能订舱。',
          con: [
            '方便客户线上一键订舱，多重舱位保障。',
            '数十家船公司实时价格浏览，方便比价。',
            '智能分析历史订单，推荐从拖车到船期的最优物流方案。'
          ]
        },
        {
          label: '标准定价',
          name: 'bzdj',
          show: false,
          title: '标准定价，各项费用清晰透明。',
          con: [
            '业内首家统一标价平台，收费项目清晰直观。标准化收费，杜绝虚高报价。',
            '与船公司直接合作，去掉中间环节，致力于为外贸企业降低物流成本。'
          ]
        },
        {
          label: '实时查询',
          name: 'sscx',
          show: false,
          title: '实时查询，掌握物流环节所有信息。',
          con: [
            '订舱、拖车、仓储、报关、船舶等物流全过程一键查询。',
            '电脑端、微信小程序端实时定位集卡车辆、船舶位置动态。'
          ]
        },
        {
          label: '实时响应',
          name: 'ssxy',
          show: false,
          title: '实时响应，专家级客服顾问式服务。',
          con: [
            '专家团队1对1服务，随时响应。',
            '满足各种物流需求，保障客户利益。'
          ]
        },
        {
          label: '极速对账',
          name: 'jsdz',
          show: false,
          title: '极速对账，专业化管理系统。',
          con: [
            '专业级企业管理平台赋能外贸企业。一键对账，告别繁琐。',
            '企业统一分配账户权限，责任到人，方便企业主对物流环节实现全过程管理。'
          ]
        }
      ],
      importTabList: [
        {
          label: '自动清关报价',
          name: 'zdqg',
          show: true,
          con: [
            '24小时在线清关智能询价，快速获取清关报价',
            '进口询价信息专业引导，大大优化沟通效率',
            '特殊项目报价专家实时响应'
          ]
        },
        {
          label: '极速成本测算',
          name: 'cbcs',
          show: false,
          con: [
            '7*24小时在线进口成本自动测算',
            '清关费，关税极速测算',
            '单件商品进口成本一键秒测'
          ]
        },
        {
          label: '智能货物追踪',
          name: 'znhw',
          show: false,
          con: [
            '货物到港系统智能提醒，提前7天4次提醒，早于船公司掌控到货',
            '在港状态全掌握，在港数据全知晓',
            '进口派送精准定位，在途货物了然于心'
          ]
        },
        {
          label: '专业单证指导',
          name: 'zydz',
          show: false,
          con: [
            '在线进口文件指导与审核',
            '下单专业单证参考',
            '专家单证审核全控',
            '在线精准单证交接',
            '实时贴身单证指导'
          ]
        },
        {
          label: '便捷在线结算',
          name: 'bjzx',
          show: false,
          con: [
            '结算中心系统交互',
            '及时提醒快速对账',
            '全面细致掌控',
            '多人共享优化沟通'
          ]
        }
      ],
      exportImgList: [{
        img: require('./img/yjdc.jpg')
      }, {
        img: require('./img/bzdj.jpg')
      }, {
        img: require('./img/sscx.jpg')
      }, {
        img: require('./img/ssxy.jpg')
      }, {
        img: require('./img/ksdz.jpg')
      }],
      importImgList: [{
        img: require('./img/zdbg.jpg')
      }, {
        img: require('./img/cbcs.jpg')
      }, {
        img: require('./img/znzz.jpg')
      }, {
        img: require('./img/zydz.jpg')
      }, {
        img: require('./img/bjzx.jpg')
      }]
    }
  },
  components: {
    HomeHeader,
    pageContent,
    BackUp,
    HomeFooter
  },
  methods: {
    handleChange (data) {
      this.showLayout = false
      this.$nextTick(() => {
        this.showLayout = true
        if (data.importActiveName || data.exportActiveName) {
          if (data.exportActiveName) {
            this.exportTabList.forEach((item, index) => {
              if (item.name === data.exportActiveName) {
                this.activeIdx = index
              }
            })
            this.handleChangeSlide(this.activeIdx)
            this.handleSelectMenu('出口平台')
          }
          if (data.importActiveName) {
            this.importTabList.forEach((item, index) => {
              if (item.name === data.importActiveName) {
                this.activeIdx = index
              }
            })
            this.handleChangeSlideImport(this.activeIdx)
            this.handleSelectMenu('进口平台')
          }
          this.activeMenu = this.menuList[data.activeIdx]
        }
        setTimeout(() => {
          this.handleScroll()
        }, 500)
      })
    },
    handleChangeTop (data) {
      document.documentElement.scrollTop = 0
      this.handleChange(data)
    },
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
      if (this.$refs.header) {
        this.marginTop = this.$refs.header.$el.offsetHeight + 'px'
      }
    },
    handleChangeSlide (nv) {
      this.exportTabList.forEach((item, index) => {
        if (nv === index) {
          item.show = true
        } else {
          item.show = false
        }
      })
    },
    handleChangeSlideImport (nv) {
      this.importTabList.forEach((item, index) => {
        if (nv === index) {
          item.show = true
        } else {
          item.show = false
        }
      })
    },
    handleSelectMenu (val) {
      if (val === this.activeMenu) return
      this.activeMenu = val
      if (val === '出口平台') {
        this.tabshow = true
      } else {
        this.tabshow = false
      }
      this.showLayout = false
      this.$nextTick(() => {
        this.showLayout = true
        this.$nextTick(() => {
          this.handleScroll()
        })
      })
    }
  },
  mounted () {
    if (this.$route.params.importActiveName || this.$route.params.exportActiveName) {
      this.handleChange(this.$route.params)
    }
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleResize)
    setTimeout(() => {
      this.handleScroll()
    }, 500)
    this.$nextTick(() => {
      this.handleResize()
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus">
// @import 'animate.css';
.serve-page
  font-family 'Microsoft YaHei'
  .sub-menu
    width 100%
    border-bottom 2px solid #E1E1E1
    opacity 0
    .sub-menu-box
      width 1192px
      margin 0 auto
      display flex
      align-items center
      justify-content space-between
    .sub-title
      font-size 14px
      color #010101
      margin-left 18px
    .el-menu.el-menu--horizontal
      opacity 0
      display flex
      justify-content center
      background transparent
      padding-bottom 5px
      border none
      .el-menu-item
        height 40px
        color #C7C7C7
        line-height 40px
        font-size 14px
        padding 0 30px
        background transparent !important
        &:hover
          color: #C7C7C7 !important;
      .is-active
        border-bottom 2px solid #FED900
        color #0A0A0A !important
        &:hover
          color: #0A0A0A !important;
</style>
