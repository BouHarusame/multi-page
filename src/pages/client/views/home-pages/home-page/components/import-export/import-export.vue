
<template>
  <div class="import-export">
    <div class="content">
      <div class="title add-animation">
        <div class="title-text">相比传统货代企业，我们可以帮您降低20%物流成本</div>
        <div class="title-line"></div>
      </div>
      <div class="tabs add-animation">
        <template v-for="(item, index) in slidePic">
          <div class="tab" :class="{ isactive:item.tab === show, isWhite: item.tab !== '进口平台' }" :key="index" @mouseover="setActiveItem(item.tab)">
            {{item.tab}}
            <!-- <div class="line"></div> -->
          </div>
        </template>
      </div>
      <!-- <div class="btn leftbtn">
        <img src="./img/left.png" @click="handleTranslate">
      </div>
      <div class="btn rightbtn">
        <img src="./img/right.png" @click="handleTranslate">
      </div> -->
      <el-carousel indicator-position="none" arrow="never" @change="switchtab" :autoplay="false" ref="carousel" class>
        <el-carousel-item v-for="item in slidePic" :key="item.id">
          <Carousel :imgWidth="520" :imgList="item.imgList" :initIndex="2" :loop="false"  :autoTime="2000" @on-detail="handleToDetail"></Carousel>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import Carousel from './carousel'
export default {
  data () {
    return {
      show: '出口平台',
      exportid: '一键订舱',
      importid: '自动清关报价',
      slidePic: [
        {
          id: 1,
          tab: '出口平台',
          imgList: [
            {
              title: '一键订舱',
              img: require('./img/export1.jpg'),
              content: {
                title: '一键订舱',
                subtitle: '线上询价、比价、智能订舱',
                url: 'business',
                params: {
                  activeIdx: 0,
                  exportActiveName: 'yjdc'
                },
                itemList: [
                  {
                    icon: require('./img/lunchuan@2x.png'),
                    text: '方便客户线上一键订舱，多重舱位保障。'
                  },
                  {
                    icon: require('./img/rule@2x.png'),
                    text: '数十家船公司实时价格浏览，方便比价。'
                  },
                  {
                    icon: require('./img/shujuchaxun_1@2x.png'),
                    text: '智能分析历史订单，推荐从拖车到船期的最优物流方案。'
                  }
                ]
              }
            },
            {
              title: '标准定价',
              img: require('./img/export2.jpg'),
              content: {
                title: '标准定价',
                subtitle: '各项费用清晰透明',
                url: 'business',
                params: {
                  activeIdx: 0,
                  exportActiveName: 'bzdj'
                },
                itemList: [
                  {
                    icon: require('./img/feiyongkemu@2x.png'),
                    text: '业内首家统一标价平台，收费项目清晰直观。'
                  },
                  {
                    icon: require('./img/shangpinjiagexinxi@2x.png'),
                    text: '标准化收费，杜绝虚高报价。'
                  },
                  {
                    icon: require('./img/hezuoguanxi-xianxing@2x.png'),
                    text: '与船公司直接合作，去掉中间环节，致力于为外贸企业降低物流成本。'
                  }
                ]
              }
            },
            {
              title: '实时查询',
              img: require('./img/export3.jpg'),
              content: {
                title: '实时查询',
                subtitle: '掌握物流环节所有信息',
                url: 'business',
                params: {
                  activeIdx: 0,
                  exportActiveName: 'sscx'
                },
                itemList: [
                  {
                    icon: require('./img/chaxun_1@2x.png'),
                    text: '订舱、拖车、仓储、报关、船舶等物流全过程一键查询。'
                  },
                  {
                    icon: require('./img/weizhi_2@2x.png'),
                    text: '电脑、微信小程序端实时定位集卡车辆、船舶位置动态。'
                  }
                ]
              }
            },
            {
              title: '实时响应',
              img: require('./img/export4.jpg'),
              content: {
                title: '实时响应',
                subtitle: '专家级客服顾问式服务',
                url: 'business',
                params: {
                  activeIdx: 0,
                  exportActiveName: 'ssxy'
                },
                itemList: [
                  {
                    icon: require('./img/kefu@2x.png'),
                    text: '专家团队1对1服务，随时响应。'
                  },
                  {
                    icon: require('./img/ziyuan@2x.png'),
                    text: '满足各种物流需求，保障客户利益。'
                  }
                ]
              }
            },
            {
              title: '极速对账',
              img: require('./img/export5.jpg'),
              content: {
                title: '极速对账',
                subtitle: '专业化管理系统',
                url: 'business',
                params: {
                  activeIdx: 0,
                  exportActiveName: 'jsdz'
                },
                itemList: [
                  {
                    icon: require('./img/duizhang@2x.png'),
                    text: '专业级企业管理平台赋能外贸企业，一键对账，告别繁琐。'
                  },
                  {
                    icon: require('./img/hezuoguanxi-xianxing@2x.png'),
                    text: '企业统一分配账户权限，责任到人，方便企业主对物流环节实现全过程管理。'
                  }
                ]
              }
            }
          ]
        },
        {
          id: 2,
          tab: '进口平台',
          imgList: [
            {
              title: '自动清关报价',
              img: require('./img/import1.jpg'),
              content: {
                title: '自动清关报价',
                url: 'business',
                params: {
                  activeIdx: 1,
                  importActiveName: 'zdqg'
                },
                itemList: [
                  {
                    icon: require('./img/huaban-@2x.png'),
                    text: '24小时在线清关智能询价，快速获取清关报价'
                  },
                  {
                    icon: require('./img/baojia@2x.png'),
                    text: '进口询价信息专业引导，大大优化沟通效率'
                  },
                  {
                    icon: require('./img/goutong@2x.png'),
                    text: '特殊项目报价专家实时响应'
                  }
                ]
              }
            },
            {
              title: '极速成本测算',
              img: require('./img/import2.jpg'),
              content: {
                title: '极速成本测算',
                url: 'business',
                params: {
                  activeIdx: 1,
                  importActiveName: 'cbcs'
                },
                itemList: [
                  {
                    icon: require('./img/huaban-@2x.png'),
                    text: '7*24小时在线进口成本自动测算'
                  },
                  {
                    icon: require('./img/miaosha@2x.png'),
                    text: '清关费，关税极速测算'
                  },
                  {
                    icon: require('./img/huiqiancesuan@2x.png'),
                    text: '单件商品进口成本一键秒测'
                  }
                ]
              }
            },
            {
              title: '智能货物追踪',
              img: require('./img/import3.jpg'),
              content: {
                title: '智能货物追踪',
                url: 'business',
                params: {
                  activeIdx: 1,
                  importActiveName: 'znhw'
                },
                itemList: [
                  {
                    icon: require('./img/tixing@2x.png'),
                    text: '货物到港系统智能提醒，提前7天4次提醒，早于船公司掌控到货'
                  },
                  {
                    icon: require('./img/shuju@2x.png'),
                    text: '在港状态全掌握，在港数据全知晓'
                  },
                  {
                    icon: require('./img/dingwei@2x.png'),
                    text: '进口派送精准定位，在途货物了然于心'
                  }
                ]
              }
            },
            {
              title: '专业单证指导',
              img: require('./img/import4.jpg'),
              content: {
                title: '专业单证指导',
                url: 'business',
                params: {
                  activeIdx: 1,
                  importActiveName: 'zydz'
                },
                itemList: [
                  {
                    icon: require('./img/jiaojie@2x.png'),
                    text: '在线精准单证交接'
                  },
                  {
                    icon: require('./img/cankaoxinxi@2x.png'),
                    text: '下单专业单证参考'
                  },
                  {
                    icon: require('./img/kefu@2x.png'),
                    text: '实时贴身单证指导'
                  },
                  {
                    icon: require('./img/shenhe@2x.png'),
                    text: '专家单证审核全控'
                  }
                ]
              }
            },
            {
              title: '便捷在线结算',
              img: require('./img/import5.jpg'),
              content: {
                title: '便捷在线结算',
                url: 'business',
                params: {
                  activeIdx: 1,
                  importActiveName: 'bjzx'
                },
                itemList: [
                  {
                    icon: require('./img/quanjubianliang@2x.png'),
                    text: '全面细致掌控'
                  },
                  {
                    icon: require('./img/jiaohu@2x.png'),
                    text: '结算中心系统交互'
                  },
                  {
                    icon: require('./img/duorenyonghu@2x.png'),
                    text: '多人共享优化沟通'
                  },
                  {
                    icon: require('./img/duizhang1@2x.png'),
                    text: '及时提醒快速对账'
                  }
                ]
              }
            }
          ]
        }
      ],
      selectIndex: 0
    }
  },
  methods: {
    handleToDetail (params) {
      this.$router.push({ name: params.url, params: params.params })
    },
    setActiveItem (val) {
      this.show = val
      this.show === '出口平台' ? this.$refs.carousel.setActiveItem(0) : this.$refs.carousel.setActiveItem(1)
    },
    switchtab (val) {
      if (val === 0) {
        this.show = '出口平台'
      } else {
        this.show = '进口平台'
      }
    },
    exportClick (val) {
      this.exportid = val
    },
    importClick (val) {
      this.importid = val
    },
    handleTranslate () {
      let selectIndex = this.selectIndex % 2
      this.$refs.carousel.setActiveItem(selectIndex)
      this.selectIndex++
    }
  },
  components: {
    Carousel
  }
}
</script>

<style lang="stylus" scoped>
.import-export
  width 100%
  display flex
  justify-content center
  .content
    width 100%
    // max-width 1200px
    // min-width 1052px
    display flex
    flex-direction column
    align-items center
    position relative
    .title
      font-size 28px
      font-weight bold
      color #262626
      line-height 28px
      text-align center
      margin-top 240px
      opacity 0
      animation-delay: 0.5s;
      .title-line
        width 155px
        height 4px
        background #FED901
        display inline-block
        margin-top 12px
    .tabs
      width 100%
      max-width 840px
      display flex
      margin-top 100px
      opacity 0
      animation-delay: 0.5s;
      position absolute
      top 272px
      z-index 99
      .tab
        flex 1
        color #979797
        font-size 26px
        font-weight bold
        display flex
        flex-direction column
        align-items center
        cursor pointer
        .line
          width 46px
          height 4px
          background #FEB71F
          margin-top 8px
      // .isWhite
      //   color #ffffff
      .isactive
        color #FED901
        .line
          background #000
    .btn
      position absolute
      top 60%
    .leftbtn
      left -100px
      opacity 0
      cursor pointer
    .rightbtn
      right -100px
      opacity 0
      cursor pointer
    &:hover
      .leftbtn, .rightbtn
        opacity 1
        transition all 0.5s
    .el-carousel
      width 100%
      height 750px
      >>>.el-carousel__container,.el-carousel__item
        height 540px
        display flex
        justify-content space-around
        align-items flex-end
        padding-bottom 20px
      >>>.el-carousel__item
        margin-top 42px
        // &:last-child
        //   background #24303E
        .carousel-cont
          width 406px
          height 550px
          box-sizing border-box
          color #4A4A4A
          display flex
          flex-direction column
          justify-content center
          opacity 0
          .showitem
            font-size 16px
            font-weight 600
            margin-bottom 28px
          .info
            font-size 16px
            margin-bottom 30px
          button
            width 168px
            height 42px
            font-size 14px
            color #1E2B38
            border-radius 4px
            border 1px solid #feb71f
            background transparent
            margin-bottom 38px
          .queue
            color #2D2D2D
            font-size 14px
            line-height 40px
            display flex
            align-items center
            img
              width 24px
              height 24px
              margin-right 16px
        .left
          animation-delay 0.5s
          // .showitem, .info, button
          //   color #FFFFFF
          // .queue
          //   color #F3F3F3
        .right
          animation-delay 1s
          h1
            color #ffffff
        .import
          // padding 0 70px 0 0
          div
            text-align end
            .queue
              justify-content: flex-end
              img
                margin 0 0 0 16px
</style>
