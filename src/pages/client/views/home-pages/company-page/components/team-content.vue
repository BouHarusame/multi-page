<template>
  <div class="team-wrap add-animation">
    <svg width="100%" style="transform: translateY(-47px)" height="3050px" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <polygon :points="points" fill="#183350"/>
      <polygon :points="pointsL" fill="#1E3F62"/>
    </svg>
    <div class="team-content content">
      <div class="title">{{teamTitle}}</div>
      <div class="teams">
        <div class="team-item add-animation" v-for="(item, index) in teamList" :key="index">
          <div class="img-box">
            <img :src="item.src" alt="">
          </div>
          <div class="name">{{item.name}}</div>
          <div class="jobs">{{item.jobs}}</div>
          <div class="introduce">{{item.introduce}}</div>
        </div>
      </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    points: String,
    pointsL: String
  },
  data () {
    return {
      teamTitle: '箱讯科技的专家团队',
      teamList: [
        {
          src: 'https://www.anycase.cn/data/ac30/index/team1.jpg',
          name: '张力 Alex',
          jobs: '箱讯科技  创始人/CEO',
          introduce: '超过15年国际贸易经验，9年智能制造和供应链管理经验，对供应链管理、数据应用有深刻认知。'
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/team2.jpg',
          name: '许斌 Andy',
          jobs: '箱讯科技  创始人/总经理',
          introduce: '2015年创立箱讯科技，19年国际物流行业经验，上海国际货代协会理事，全国货代私董会创始人。'
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/team4.jpg',
          name: '陈垚 James',
          jobs: '箱讯科技   副总经理',
          introduce: '13年进出口贸易、物流、关务、咨询行业经验，12年进口清关实操及方案经验，现任上海航运商会货代私董会主任。'
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/team3.jpg',
          name: '丁保国 Paul',
          jobs: 'CTO',
          introduce: '曾供职于新加坡电信集团，超过10年软件开发和软件管理经验，拥有丰富的产品研发及团队管理经验。'
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/team5.jpg',
          name: '祁佳琳 Sam',
          jobs: '出口部经理',
          introduce: '超过15年国际物流从业经验。历任操作、客服、销售、市场、经理职位，对国际物流行业有着深刻认识。'
        }
      ],
      professor: [
        {
          'title': '出口部门',
          'icon': 'https://www.anycase.cn/data/ac2/mini/ap/seaIcon.png',
          'data': [
            {
              'name': '李君 Season',
              'workYears': '从业经验：10年+',
              'type': '资深海空运出口客服人员',
              'des': '专精意大利、欧洲航线，英语交流无障碍，可以满足客户的多样化需求，耐心，细心，精准。',
              'imageUrl': 'https://www.anycase.cn/data/ac2/mini/ap/season.png'
            },
            {
              'name': '屈永翔 Torres',
              'workYears': '从业经验：10年+',
              'type': '资深海空运出口客服人员',
              'des': '精通日韩、中东、印巴、东南亚航线，擅长散杂货物运输，通过丰富的经验积累为客户的货物保驾护航。',
              'qq': '3007258427',
              'mobile': '19921612673',
              'imageUrl': 'https://www.anycase.cn/data/ac2/mini/ap/torres.png'
            },
            {
              'name': '陈众平 Cola',
              'workYears': '从业经验：6年+',
              'type': '高级海运出口客服人员',
              'des': '精通东南亚、日本、韩国、非洲航线业务，可为海运整箱、拼箱、空运进出口等业务提供专业的咨询服务。',
              'qq': '3007258391',
              'mobile': '13764865984',
              'imageUrl': 'https://www.anycase.cn/data/ac2/mini/ap/cola.png'
            }
          ]
        },
        {
          'title': '进口部门',
          'icon': 'https://www.anycase.cn/data/ac2/mini/ap/importIcon.png',
          'data': [
            {
              'name': '郑千帆 Peter',
              'workYears': '从业经验：10年+',
              'type': '资深海空运进口客服人员',
              'des': '精通进口海空运申报全流程，可根据客户所经营产品种类量身定制最佳的进口物流方案。',
              'qq': '3007286003',
              'mobile': '19821363616',
              'imageUrl': 'https://www.anycase.cn/data/ac2/mini/ap/peter.png'
            },
            {
              'name': '徐正嫣 Halen',
              'workYears': '从业经验：10年+',
              'type': '资深海空运进口客服人员',
              'des': '专业进口清关、保税物流，专注进口全品类物流解决方案，擅长化妆品类、红酒类及奢侈品类的入境操作。',
              'qq': '3007285997',
              'mobile': '13917660215',
              'imageUrl': 'https://www.anycase.cn/data/ac2/mini/ap/halen.png'
            }
          ]
        }
      ]
    }
  },
  methods: {},
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.team-wrap
  opacity 0
.team-content
  width 100%
  position absolute
  top 0
  display flex
  flex-direction column
  align-items center
  .title
    margin 160px auto 120px
    text-align center
    font-size 32px
    color #FFFFFF
  .teams
    width 1000px
    margin 0 auto 50px
    display flex
    flex-wrap wrap
    // justify-content space-between
    .team-item
      width 260px
      margin-bottom 100px
      margin-left 110px
      opacity 0
      &:nth-child(3n+1)
        margin-left 0
      .img-box
        width 260px
        img
          width 100%
      .name
        font-size 26px
        color #014DA1
        font-weight 400
        margin-top 14px
      .jobs
        font-size 14px
        color #000000
        margin 16px 0 24px
      .introduce
        font-size 14px
        color #000000
        line-height 24px
  .section
    width 1000px
    margin 60px auto
    .section-title
      text-align center
      margin-bottom 110px
      span
        display inline-block
        font-size 32px
        color #414141
        height 32px
        line-height 32px
        position relative
        &::before
          content: ''
          position: absolute
          top 16px
          left -264px
          width 192px
          height 1px
          background #888888
        &::after
          content: ''
          position: absolute
          top 16px
          right -266px
          width 192px
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
        margin-bottom 60px
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
            color #014DA1
            font-weight bold
            height 22px
            line-height 22px
            margin-bottom 10px
          .work
            font-size 14px
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
</style>
