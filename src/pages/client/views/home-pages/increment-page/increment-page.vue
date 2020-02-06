<template>
  <div class="logistics-page">
    <home-header ref="header" :activeIndex="activeIndex" @change="handleChange"></home-header>
    <div class="content-box" :style="{'margin-top': marginTop}">
      <svg width="100%" v-if="showCascader" :height="height" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polygon :points="points" fill="#183350"/>
        <polygon :points="points1" fill="#1E3F62"/>
        <!-- <polygon :points="points2" fill="#183350"/>
        <polygon :points="points3" fill="#1E3F62"/> -->
      </svg>
      <page-layout v-if="showLayout"
                   :menuList="menuList"
                   :activeMenu="activeMenu"
                   :pagetitle="pagetitle"
                   :imgList="imgList"
                   :menuTitle="menuTitle"
                   :itemHeight="itemHeight"
                   :height="imgHeight"
                   :activePageCard="activePageCard"
                   :elTabs="elTabs"
                   :tabsIndex="tabsIndex"
                   @fcldetail="fcldetail"
                   @clickTab="clickTab"
                   @selectMenu="selectMenu"/>
    </div>
    <home-footer @change="handleChangeTop"></home-footer>
    <BackUp></BackUp>
  </div>
</template>

<script>
import HomeHeader from 'client-components/home-page/header.vue'
import pageLayout from '../components/page-layout'
import BackUp from 'client-components/home-page/back-up.vue'
import HomeFooter from 'client-components/home-page/footer.vue'
export default {
  name: 'increment',
  data () {
    return {
      showLayout: true,
      marginTop: '80px',
      height: '1800px',
      imgHeight: '450px',
      itemHeight: '400px',
      activeIndex: 'serve',
      showCascader: true,
      points: '',
      points1: '',
      points2: '',
      points3: '',
      menuList: ['物联网服务', '大数据服务', '供应链金融服务', '保险服务'],
      activeMenu: '物联网服务',
      menuTitle: '行业解决方案',
      pagetitle: '为您提供全方位的国际物流服务',
      imgList: [
        {
          img: 'https://www.anycase.cn/data/ac30/index/wulianwang1.jpg',
          cont: {
            title: '行业解决方案',
            category: '物联网服务'
          }
        },
        {
          img: 'https://www.anycase.cn/data/ac30/index/dashuju1.jpg',
          cont: {
            title: '行业解决方案',
            category: '大数据服务'
          }
        },
        {
          img: 'https://www.anycase.cn/data/ac30/index/gongyinglian1.jpg',
          cont: {
            title: '行业解决方案',
            category: '供应链金融服务'
          }
        },
        {
          img: 'https://www.anycase.cn/data/ac30/index/baoxian1.jpg',
          cont: {
            title: '行业解决方案',
            category: '保险服务'
          }
        }
      ],
      activePageCard: 0,
      tabsIndex: '物联网服务',
      elTabs: [
        {
          menu: '物联网服务',
          menumsg: [
            {
              label: '物联网服务',
              introduce: 'AnyCase的物联网服务针对运输过程中货物的地理位置、温度、震荡、开箱、野蛮装卸等状态进行全程自动监控。为各行各业的客户提供价值。\n实时监控在途货物安全信息，及时发现问题并解决问题， 独特的信号传输技术可以让设备在完全密封的环境中，实时把定位信息传输出来，不用担心信号的丢失而造成的隐患。',
              detailList: [
                {
                  type: 'text',
                  title: 'AnyCase的物联网提供：',
                  content: '时效警报\n野蛮装卸警报\n开箱警报\n到货提醒\n预警提醒'
                },
                {
                  type: 'text',
                  title: '特别针对：',
                  content: '高端货物：货联网除了全方位的实时监控外，还可以通过设备监控货物在运输过程中有没有被非法开箱，最大程度上保证货物的价值，避免窜货的可能。货联网通过平台判断，可准确掌握货物运输的时效，提早做出相应处理。\n冷链货物：本系统针对要控制温度的冷冻冷藏的产品，以及需要控制温度的货物进行 位置、开箱、撞击和温度等信息的严格监控和管理，保护货物安全，对超温货物及时预警防止损害发生。\n危品货物：针对危险品、化学品，尤其是零散、小件危化品的位置、开箱、撞击等信息进行严格监控和管理，保护货物安全，对问题货物可追溯。实时监控危险品、化学品的运输状态信息，及时发现问题并防卡丢失和污染的事件发生，极大的提高的危化品的运输安全水平。'
                }
              ],
              show: false
            }
          ]
        },
        {
          menu: '大数据服务',
          menumsg: [
            {
              label: '大数据服务',
              introduce: 'AnyCase为平台客户提供全球贸易大数据服务，并对行业进行垂直化深入研究，为外贸企业提供精准的数据分析及全面的外贸资讯信息服务。其依靠高速的信息流动和以人为中心的操作模式完成对海量信息更有效的汇聚、关联、整理以及交互呈现。\n打造跨国采购的货物贸易、服务贸易、技术贸易以及电子商务四大主体业务功能板块，为全球采购商、供应商提供双向服务。',
              detailList: [
                {
                  type: 'text',
                  title: '产品特点:',
                  content: '结合中国国际贸易新形势和新特点；\n以重点行业为线索；\n打造具备行业；\n度的系列专业外贸资讯；\n填补国际贸易咨询服务领域对终端市场深度调查与数据分析的空白；\n推动垂直行业企业拓展国际市场。'
                }
              ],
              show: false
            }
          ]
        },
        {
          menu: '供应链金融服务',
          menumsg: [
            {
              label: '供应链金融服务',
              introduce: 'AnyCase物流服务于国际及国内经济贸易的短期资金融通业务，包括信用证（含国际及国内信用证）、托收、汇款、保理等业务项下的授信及融资等业务。',
              detailList: [
                {
                  type: 'text',
                  title: '物流融资业务范围：',
                  content: 'AnyCase物流面向广大客户特推出贸易融资担保、项目融资担保、信用证担保及其他融资性担保业务。'
                },
                {
                  type: 'text',
                  title: '物流融资业务范围：',
                  content: '依据中国法律在中国境内注册成立的独立法人企业，企业各类资质证照有效、齐全， 具有良好的商业信誉及健全的财务管理；\n成立2年以上或者与AnyCase物流合作1年以上的企业；\n特殊行业应提供相关部门颁发的生产、经营许可证；\n企业要对质物拥有所有权。'
                },
                {
                  type: 'process',
                  title: '物流融资基本流程：',
                  process: [
                    {
                      code: 'A',
                      value: '客户准备授信所需资料'
                    },
                    {
                      code: 'B',
                      value: '合作银行审批/授信'
                    },
                    {
                      code: 'C',
                      value: '客户提交用款申请'
                    },
                    {
                      code: 'D',
                      value: '办理货物抵押'
                    },
                    {
                      code: 'E',
                      value: '银行放款'
                    },
                    {
                      code: 'F',
                      value: '客户还款/提货'
                    }
                  ]
                },
                {
                  type: 'text',
                  title: '物流融资业务优势：',
                  content: '审核便捷，放款更快速。\n以拟进口的货物作质押，解决担保问题。\n一次授信分次循环使用。\n还款方式灵活，解决资金占用问题。'
                }
              ],
              show: false
            }
          ]
        },
        {
          menu: '保险服务',
          menumsg: [
            {
              label: '保险服务',
              introduce: 'AnyCase物流联合保险行业的领军企业，提供优质的货物运输保险服务，无论是有关自然灾害、海盗、货物污染、盗窃，还是战争险、恐怖袭击、沿岸的海上作业或货存，AnyCase物流专业的货运险团队都会为客户提供独到的、最优的解决方案，为客户的货物保驾护航。',
              detailList: [
                {
                  type: 'process',
                  title: '货运险投保操作流程：',
                  process: [
                    {
                      label: '委托',
                      code: 'A',
                      value: '委托人填写投保信息单，提供被保险人名称、货物描述、投保金额、起运港、目的地、船舶信息等。'
                    },
                    {
                      label: '预投保',
                      code: 'B',
                      value: '根据委托人指定的保险公司，由代理人出具保险预投保信息单供委托人核对相关信息，并确认。'
                    },
                    {
                      label: '生成正式保单',
                      code: 'C',
                      value: '经委托人确认，生成正式保险单及货运险生效，由代理人出具正本保单邮寄委托人。'
                    },
                    {
                      label: '费用结算',
                      code: 'D',
                      value: '委托人与代理人按照保险单显示的投保金额，按照事先约定的费率进行费用保险费用的结算。'
                    }
                  ]
                },
                {
                  type: 'text',
                  title: '货运险投保注意事项：',
                  content: '投保信息要求真实有效。填写投保单。投保单是企业向保险公司申请订立保险合同的文字依据，也是保险公司签发保险单接受投保的重要依据。投保人应详实、清楚地填写投保单的各项。\n保险金额与报关单显示金额一致，需足额投保。一般按照发票金额10%加成计算，加成比例不得超过30%;国内水路、陆路货物运输可按发票金额或发票金额加运费投保。\n被保险人显示原则以双方签订的贸易合同条款为依据。被保险人栏目要按保险利益的实际有关人称谓的全称填写。因为保险是否有效，同被保险人保险利益直接有关。买方为被保险人则保险责任从货物装上船才开始；反之，卖方为被保险人则保险自保单载明起运地运出时开始。\n运输工具，如是轮船运输，应写明船名，需转运的也要写明确；如是火车、汽车或航空运输的，仅写明火车、汽车牌号或空运（或航班号）即可。联运的最好写明联运方式。\n货运险投保日期，应在船舶开航或运输工具开行之前。'
                }
              ],
              show: false
            }
          ]
        }
      ]
    }
  },
  components: {
    HomeHeader,
    pageLayout,
    BackUp,
    HomeFooter
  },
  methods: {
    handleChange (data) {
      this.showLayout = false
      this.$nextTick(() => {
        this.showLayout = true
        if (data.activeMenu) {
          this.selectMenu(data.activeMenu)
          if (data.tabsIndex) {
            this.clickTab(data.tabsIndex)
          }
        }
        setTimeout(() => {
          this.handleScroll()
        }, 500)
      })
    },
    handleChangeTop (data) {
      document.documentElement.scrollTop = 0
      this.clickTab(data.activeMenu)
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
      let clientWidth = document.documentElement.offsetWidth
      let point = (clientWidth - 1200) / 2
      if (clientWidth < 1180) {
        clientWidth = 1180
        point = 1180
      }
      this.height = document.querySelector('.content').offsetHeight
      let heights = document.querySelector('.content').offsetHeight
      this.points = `0 0,${clientWidth} 0,${clientWidth} 500,0 800`
      this.points1 = `0 0,${clientWidth} 0,${clientWidth} 200,0 500`
      this.points2 = `0 ${heights},${clientWidth} ${heights},${clientWidth} ${heights - 350}`
      this.points3 = `${point} ${heights},${clientWidth} ${heights}, ${clientWidth} ${heights - 250}`
    },
    fcldetail (label, index) {
      this.tabsIndex = label
      this.elTabs.forEach(item => {
        if (item.menu === this.activeMenu) {
          item.menumsg.forEach(e => {
            if (e.label === this.tabsIndex) {
              e.show = !e.show
            }
          })
        }
      })
      setTimeout(() => {
        this.showCascader = false
        this.handleResize()
        this.$nextTick(() => {
          this.showCascader = true
        })
      }, 0)
    },
    clickTab (tab) {
      this.tabsIndex = tab
      setTimeout(() => {
        this.showCascader = false
        this.handleResize()
        this.$nextTick(() => {
          this.showCascader = true
        })
      }, 0)
    },
    selectMenu (val) {
      this.activeMenu = val
      let num = 0
      this.menuList.forEach((item, i) => {
        if (this.activeMenu === item) {
          num = i
        }
      })
      setTimeout(() => {
        this.showCascader = false
        this.activePageCard = num
        this.$nextTick(() => {
          this.handleResize()
          this.showCascader = true
        })
      }, 0)
    }
  },
  mounted () {
    if (this.$route.params.activeMenu) {
      this.selectMenu(this.$route.params.activeMenu)
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
.logistics-page
  font-family 'Microsoft YaHei'
  .content-box
    position relative
    margin-bottom -2px
    svg
      position absolute
      top 0
      left 0
</style>
