<template>
  <div class="switch-block">
    <svg width="100%" height="1280px" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polygon :points="points" fill="#183350"/>
      <polygon :points="points1" fill="#1E3F62"/>
      <polygon :points="points2" fill="#37AAD7"/>
    </svg>
    <div class="content">
      <div class="title add-animation">
        <div class="title-text">为您提供全方位的国际物流服务</div>
        <div class="title-line"></div>
      </div>
      <div class="tabs">
        <el-row>
          <el-col :span="5">
            <div class="labels add-animation">
              <template v-for="item in label">
                <template v-if="item.id === select">
                  <div class="label-select" :key="item.id">
                    {{item.text}}
                    <img src="./img/arrow.png" alt="" srcset="">
                  </div>
                </template>
                <template v-else>
                  <div class="label" :key="item.id" @mouseover="handleClick(item.id)">
                    <!-- <div class="dot doty"></div>
                    <div class="dot dotw"></div> -->
                    {{item.text}}
                  </div>
                </template>
              </template>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="tab-panes add-animation">
              <template v-for="(item, index) in label">
                <template v-if="item.id === select">
                  <div class="list" :key="index">
                    <ul>
                      <li v-for="(item, index) in item.cont" :key="index">{{item}}</li>
                    </ul>
                    <button @click="handleToDetail(item.url, item.params)">查看详情</button>
                  </div>
                  <img :src="item.contimg" :key="item.id">
                </template>
              </template>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'switchBlock',
  data () {
    return {
      label: [

        { id: 'trunk', text: '拖车', url: 'serve', params: { activeMenu: '拖车' }, cont: ['●  特有货车状态监管系统，实时显示车辆位置、状态', '●  通过电脑端、微信小程序随时随地查询', '●  所有费用实时公开，低价格，无虚报'], contimg: 'https://www.anycase.cn/data/ac30/index/tuoche1.jpg' },
        { id: 'ocean', text: '海运', url: 'serve', params: { activeMenu: '海运', tabsIndex: '海运整箱' }, cont: ['●  直链各大船公司，一手资源，舱位无忧', '●  深耕上海港，覆盖全球主要航线', '●  海运专家1对1服务，专业服务保障'], contimg: 'https://www.anycase.cn/data/ac30/index/haiyun1.jpg' },
        { id: 'airport', text: '空运', url: 'serve', params: { activeMenu: '空运' }, cont: ['●  正规空运进出口渠道，拥有各大航空公司合作资源', '●  价格全透明，具备同行业的价格竞争优势', '●  为客户量身打造最快捷、最实惠、最安全的运输方案'], contimg: 'https://www.anycase.cn/data/ac30/index/kongyun1.jpg' },
        { id: 'declare', text: '报关', url: 'serve', params: { activeMenu: '报关' }, cont: ['●  专业报关团队，便捷报关系统，助您高效通关', '●  针对性研究企业数据，实现更低的出错率、查验率', '●  费用清晰可见，节约通关成本'], contimg: 'https://www.anycase.cn/data/ac30/index/baoguan1.jpg' },
        { id: 'store', text: '仓库内装', url: 'serve', params: { activeMenu: '仓库内装' }, cont: ['●  在上海、宁波等多口岸拥有丰富的仓库资源', '●  配备现代化管理系统，科学管理，更加放心', '●  24小时实时监控，硬件设施过关，保证货物安全'], contimg: 'https://www.anycase.cn/data/ac30/index/cangchu1.jpg' },
        { id: 'import', text: '进口清关', url: 'serve', params: { activeMenu: '进口清关' }, cont: ['●  24小时在线清关智能询价，快速获取清关报价', '●  智能货物追踪，货物到港系统智能提醒', '●  7*24小时在线进口成本一键秒测，便捷在线结算'], contimg: 'https://www.anycase.cn/data/ac30/index/jinkouqingguan1.jpg' },
        { id: 'bonded', text: '保税物流', url: 'serve', params: { activeMenu: '保税物流', tabsIndex: '保税区清关' }, cont: ['●  灵活的关务方案，专业的操作团队', '●  提供低价、高效、智能的运输送达服务', '●  满足客户个性化的保税仓储需求 '], contimg: 'https://www.anycase.cn/data/ac30/index/baoshuiwuliu1.jpg' }
      ],
      points: '',
      points1: '',
      points2: '',
      select: 'trunk'
    }
  },
  methods: {
    handleClick (val) {
      this.select = val
    },
    handleResize () {
      let clientWidth = document.documentElement.offsetWidth
      if (clientWidth < 1180) {
        clientWidth = 1180
      }
      let point1 = clientWidth - 95
      let point2 = clientWidth - 145
      let point3 = clientWidth * 0.6
      let point4 = clientWidth * 0.7
      this.points = `${clientWidth} 0,0 0,0 1280,${point3} 1280,${clientWidth} 860`
      this.points1 = `${point4} 0,0 0,0 860`
      this.points2 = `${clientWidth} 1130,${point2} 1130,${point1} 1195,${point2} 1260,${clientWidth} 1260`
    },
    handleToDetail (url, params) {
      this.$router.push({ name: url, params })
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="stylus" scoped>
.switch-block
  width 100%
  min-width 1180px
  position relative
  .content
    width 70%
    max-width 1200px
    position absolute
    top 0
    left 0
    right 0
    margin 0 auto
    display flex
    flex-direction column
    align-items center
    .title
      font-size 28px
      font-weight bold
      color #fff
      line-height 28px
      text-align center
      margin-top 260px
      opacity 0
      animation-delay: 0.5s;
      .title-line
        width 155px
        height 4px
        background #FED901
        display inline-block
        margin-top 12px
    .tabs
      margin-top 120px
      width 1100px
      .el-row
        display flex
        justify-content space-between
      .labels
        opacity 0
        animation-delay: 0.5s;
        .label-select
          width 180px
          height 38px
          border-radius 10px
          background #FED901
          margin 29px 0
          color #2A2B30
          font-size 18px
          text-align center
          line-height 38px
          font-weight 600
          box-shadow 0 10px 10px 5px rgba(0,0,0,0.4)
          img
            margin-left 4px
            width 20px
        .label
          display flex
          height 56px
          align-items center
          color #fff
          font-size 18px
          font-weight 600
          margin 29px auto
          cursor pointer
          min-width 190px
          text-indent 20px
          .dot
            width 4px
            height 4px
            border-radius 50%
            background #FED901
          .doty
            margin 0 5px 0 10px
          .dotw
            background #fff
            margin-right 14px
        div
          &:first-child
            margin-top 10px
      .tab-panes
        margin-left 66px
        color #fff
        font-size 16px
        line-height 48px
        opacity 0
        animation-delay: 1s;
        .list
          display flex
          justify-content space-between
          button
            width 168px
            height 42px
            background #183350
            font-size 15px
            color #fff
            border-radius 4px
            border 1px solid #FED901
            margin-top 90px
            margin-left 20px
            cursor pointer
            outline 0
            &:hover
              background #FED901
              color #1E2B38
        img
          margin-top 40px
          width 100%
          height 380px
          box-shadow 0 0 18px 3px rgba(0,0,0,0.4)
</style>
