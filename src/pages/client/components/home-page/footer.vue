<template>
  <div class="footer-wrapper">
    <div class="section">
      <div class="section-text">
        <p>注册AnyCase账户，开始您的智慧物流之旅！</p>
      </div>
      <div class="section-btn">
        <!-- <button class="btn">注册</button> -->
        <router-link to="/registers" class="btn">注册</router-link>
        <!-- <div class="line"></div> -->
        <!-- <button class="btn">登录</button> -->
        <router-link to="/login" class="btn">登录</router-link>
      </div>
    </div>
    <div class="section-foot">
      <div class="tell-box">
        <img src="./img/logo2.png" alt="">
        <p class="pl">箱讯科技</p>
        <h4>400-1567-881</h4>
        <p>全国统一服务热线</p>
        <button class="btn" @click="openDialog(59534)">在线客服</button>
      </div>
      <div class="foot-items">
        <div class="item" v-for="(item, index) in linkList" :key="index">
          <div class="title">{{item.title}}</div>
          <div class="con-box" v-if="item.twoLine">
            <div class="line">
              <p class="p" v-for="(c, i) in item.content1" :key="i" @click="handleToDetail(c.url, c.params)">{{c.text}}</p>
            </div>
            <div class="line">
              <p class="p" v-for="(c, i) in item.content2" :key="i" @click="handleToDetail(c.url, c.params)">{{c.text}}</p>
            </div>
          </div>
          <div v-else class="p" v-for="(c, i) in item.content" :key="i" @click="handleToDetail(c.url, c.params)">{{c.text}}</div>
        </div>
      </div>
    </div>
    <div class="foot-link">
      <a href="#" class="a" >
        <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path fill="#CDCDCD" id="fb-icon" d="M4.2,3.1c-0.6,0-1.1,0.5-1.1,1.1v17.6c0,0.6,0.5,1.1,1.1,1.1h9.5v-7.7h-2.6v-3h2.6V10c0-2.6,1.6-4,3.8-4c1.1,0,2,0.1,2.3,0.1v2.7l-1.6,0c-1.2,0-1.5,0.6-1.5,1.5v1.9h3l-0.4,3h-2.6v7.7h5c0.6,0,1.1-0.5,1.1-1.1V4.2c0-0.6-0.5-1.1-1.1-1.1H4.2z"></path>
        </svg>
      </a>
      <a href="#" class="a" >
        <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path fill="#CDCDCD" d="M19.8,6.1c-0.7-0.8-1.8-1.3-3-1.3c-2.2,0-4.1,1.9-4.1,4.2c0,0.3,0,0.6,0.1,0.9 C9.5,9.7,6.5,8,4.5,5.5C4.1,6.1,3.9,6.8,3.9,7.6c0,1.4,0.7,2.7,1.8,3.5c-0.7,0-1.3-0.2-1.8-0.5v0.1c0,2,1.4,3.7,3.3,4.1 c-0.3,0.1-0.7,0.1-1.1,0.1c-0.3,0-0.5,0-0.8-0.1c0.5,1.7,2,2.9,3.8,2.9c-1.4,1.1-3.1,1.8-5,1.8c-0.3,0-0.7,0-1-0.1 c1.8,1.2,3.9,1.9,6.2,1.9c7.5,0,11.6-6.3,11.6-11.9c0-0.2,0-0.4,0-0.5c0.8-0.6,1.5-1.3,2-2.2c-0.7,0.3-1.5,0.6-2.3,0.7 c0.8-0.5,1.5-1.3,1.8-2.3C21.6,5.5,20.7,5.9,19.8,6.1z"></path>
        </svg>
      </a>
      <a href="#" class="a" >
        <svg width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <path fill="#CDCDCD" id="linkedin-icon" d="M7.6,23.1H3.5V9.6h4.1V23.1z M5.5,7.8c-1.3,0-2.4-1.1-2.4-2.4c0-1.3,1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4C7.9,6.7,6.8,7.8,5.5,7.8z M22.9,23.1h-4.1v-6.6c0-1.6,0-3.6-2.1-3.6c-2.1,0-2.5,1.7-2.5,3.5v6.7h-4.1V9.6H14v1.8h0.1c0.5-1.1,1.9-2.2,3.9-2.2c4.1,0,4.9,2.8,4.9,6.4V23.1z"></path>
        </svg>
      </a>
      <a href="#" class="a" >
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="22" height="22" viewBox="0 0 28.031 30">
          <path fill="#CDCDCD" d="M28.003,20.031 C27.355,16.375 24.633,13.980 24.633,13.980 C25.022,10.661 23.596,10.072 23.596,10.072 C23.296,-0.197 14.202,-0.018 14.010,-0.013 C13.819,-0.018 4.723,-0.197 4.425,10.072 C4.425,10.072 2.999,10.661 3.388,13.980 C3.388,13.980 0.666,16.375 0.018,20.031 C0.018,20.031 -0.328,26.208 3.129,20.787 C3.129,20.787 3.906,22.846 5.332,24.695 C5.332,24.695 2.783,25.536 2.999,27.721 C2.999,27.721 2.912,30.157 8.442,29.990 C8.442,29.990 12.330,29.696 13.497,28.099 L14.006,28.099 L14.015,28.099 L14.524,28.099 C15.691,29.696 19.579,29.990 19.579,29.990 C25.107,30.157 25.022,27.721 25.022,27.721 C25.237,25.536 22.689,24.695 22.689,24.695 C24.115,22.846 24.892,20.787 24.892,20.787 C28.347,26.208 28.003,20.031 28.003,20.031 Z" class="cls-1"/>
        </svg>
      </a>
      <el-popover
        placement="top"
        width="200"
        trigger="hover"
        popper-class="popper-box"
      >
      <img class="img" src="./img/weixin.jpg" alt="">
      <a href="javascript:;" class="a" slot="reference">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="30px" height="30px" viewBox="0 0 1024 1024" version="1.1">
          <path fill="#CDCDCD" d="M843.854107 795.23069l23.606651 78.616522-85.744873-47.359634c-31.218002 7.887644-62.661132 15.70775-93.737918 15.70775-148.71095 0-265.754666-102.121865-265.754666-228.069369 0-125.72033 117.043716-228.155327 265.754666-228.155327 140.42217 0 265.531586 102.434997 265.531586 228.155327C953.436898 684.98582 906.683061 747.818867 843.854107 795.23069zM605.189426 509.328148c-18.741853 0-33.933857 15.285125-33.933857 34.137495 0 18.856463 15.192004 34.140565 33.933857 34.140565 18.741853 0 33.93488-15.285125 33.93488-34.140565C639.123282 524.613272 623.930255 509.328148 605.189426 509.328148zM777.721921 509.328148c-18.741853 0-33.933857 15.285125-33.933857 34.137495 0 18.856463 15.192004 34.140565 33.933857 34.140565 18.742876 0 33.93488-15.285125 33.93488-34.140565C811.656801 524.613272 796.464797 509.328148 777.721921 509.328148zM402.615731 617.907075c0 22.994714 3.542686 45.00296 9.650801 66.013483-9.727549 0.615007-19.457144 1.060145-29.254278 1.060145l0 0.005117-0.00614 0c-39.060621 0-70.353324-7.894807-109.429295-15.70161l-109.262496 55.085596 31.29168-94.539166C117.328195 574.745043 70.490447 503.872902 70.490447 417.528372c0-149.618623 140.731208-267.375583 312.589344-267.375583 153.702638 0 288.237727 94.163613 315.38297 220.799802-10.109242-1.149173-20.139689-1.824555-30.15888-1.824555C519.801686 369.129058 402.687362 480.585523 402.615731 617.907075zM278.111089 280.31222c-23.404036 0-42.37511 19.087731-42.37511 42.629913 0 23.545252 18.971074 42.63196 42.37511 42.63196 23.405059 0 42.377156-19.086707 42.377156-42.63196C320.488245 299.399951 301.516148 280.31222 278.111089 280.31222zM498.688833 279.898805c-23.404036 0-42.37511 19.087731-42.37511 42.632983 0 23.543206 18.971074 42.629913 42.37511 42.629913 23.405059 0 42.377156-19.086707 42.377156-42.629913C541.065989 298.985512 522.093892 279.898805 498.688833 279.898805z"/>
        </svg>
      </a>
      </el-popover>
      <a href="https://weibo.com/u/6828546744?refer_flag=1001030103_" target="_blank" class="a">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0, 0, 300, 300">
          <path fill="#CDCDCD" d="M196.802 39.964c-8.656 3.787-10.64 12.803-4.328 19.115 3.066 3.066 5.951 3.607 18.574 3.607 17.673 0 29.575 4.688 38.592 15.148 11 12.443 12.263 16.23 12.263 38.952 0 20.197 0 20.558 4.688 23.263 10.82 6.131 18.034-1.443 20.558-21.64 3.246-26.329-12.443-56.986-36.066-71.052-15.509-9.016-42.018-12.623-54.281-7.393zm-88.724 33.542c-20.198 7.213-39.674 21.099-60.592 43.46-49.592 52.658-46.346 102.791 8.295 129.48 56.805 27.771 133.267 18.574 174.924-21.099 31.198-29.575 27.411-66.724-8.115-79.347-6.312-2.164-8.296-3.787-7.394-5.771 3.246-7.934 4.328-17.131 2.525-22.541-5.591-17.132-25.968-21.099-56.264-10.82l-12.083 4.147 1.082-12.082c1.263-14.246-1.803-22.001-10.279-26.329-7.033-3.607-20.558-3.246-32.099.902zm50.133 69.789c26.869 7.394 43.28 23.624 43.28 42.919 0 21.46-19.116 40.756-50.133 51.035-16.591 5.41-47.428 6.492-62.576 2.344-28.673-8.115-44.903-23.984-44.903-44.362 0-11.181 4.869-20.919 15.509-30.837 9.918-9.377 17.492-13.886 32.099-18.755 22.001-7.393 45.625-8.295 66.724-2.344zm-56.806 17.492c-18.213 8.476-27.951 21.46-27.951 37.69 0 14.788 6.492 24.886 20.738 32.46 11 5.951 31.198 5.41 43.461-.901 15.689-8.296 25.968-23.624 25.968-38.592-.181-12.263-11.001-26.87-23.804-32.099-10.279-4.328-27.592-3.607-38.412 1.442zm13.165 33.903c1.262 1.262 2.164 4.328 2.164 7.033 0 9.017-15.148 16.411-21.28 10.279-3.426-3.426-2.524-11.902 1.443-15.869 3.967-3.968 14.246-4.869 17.673-1.443zm85.298-117.758c-8.296 8.296-2.705 18.214 10.459 18.214 11.361 0 16.41 5.771 16.41 18.755 0 8.115.722 10.459 3.968 12.623 9.738 6.853 17.673-.721 17.673-16.771 0-19.656-14.067-34.444-34.084-35.887-9.016-.721-11.18-.18-14.426 3.066z"/>
        </svg>
      </a>
      <el-popover
        placement="top"
        width="200"
        trigger="hover"
        popper-class="popper-box"
      >
      <img class="img" src="./img/douyin.png" alt="">
      <a href="javascript:;" class="a" slot="reference" >
        <svg id="douyin" t="1570181112474" class="icon" viewBox="0 0 1024 1024" version="1.1"
          xmlns="http://www.w3.org/2000/svg" p-id="2916" width="24" height="24">
          <path
            fill="#CDCDCD"
            d="M937.386667 423.850667a387.84 387.84 0 0 1-232.874667-77.824v352.341333C704.512 878.250667 565.930667 1024 394.922667 1024S85.333333 878.250667 85.333333 698.368c0-179.882667 138.581333-325.632 309.589334-325.632 17.066667 0 33.706667 1.450667 49.92 4.266667v186.624a131.754667 131.754667 0 0 0-48.64-9.216c-76.288 0-138.154667 65.024-138.154667 145.322666 0 80.213333 61.866667 145.322667 138.24 145.322667 76.202667 0 138.069333-65.109333 138.069333-145.322667V0h172.714667c0 134.485333 103.68 243.541333 231.594667 243.541333v180.309334h-1.28"
            p-id="2917"></path>
        </svg>
      </a>
      </el-popover>
    </div>
    <div class="icp">Copyright© 2015 Xiangxun Network.All Rights Reserved , 苏ICP备15058808号-3</div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
import { mapGetters } from 'vuex'
export default {
  name: 'homeFooter',
  data () {
    return {
      linkList: [
        {
          title: '物流服务',
          twoLine: true,
          content1: [
            {
              text: '海运整箱',
              url: 'serve',
              params: {
                activeMenu: '海运',
                tabsIndex: '海运整箱'
              }
            },
            {
              text: '海运拼箱',
              url: 'serve',
              params: {
                activeMenu: '海运',
                tabsIndex: '海运拼箱'
              }
            },
            {
              text: '拖车',
              url: 'serve',
              params: {
                activeMenu: '拖车'
              }
            },
            {
              text: '空运',
              url: 'serve',
              params: {
                activeMenu: '空运'
              }
            },
            {
              text: '报关',
              url: 'serve',
              params: {
                activeMenu: '报关'
              }
            }
          ],
          content2: [
            {
              text: '仓库内装',
              url: 'serve',
              params: {
                activeMenu: '仓库内装'
              }
            },
            {
              text: '进口清关',
              url: 'serve',
              params: {
                activeMenu: '进口清关'
              }
            },
            {
              text: '保税区清关',
              url: 'serve',
              params: {
                activeMenu: '保税物流',
                tabsIndex: '保税区清关'
              }
            },
            {
              text: '保税区物流',
              url: 'serve',
              params: {
                activeMenu: '保税物流',
                tabsIndex: '保税区物流'
              }
            },
            {
              text: '保税仓储配送服务',
              url: 'serve',
              params: {
                activeMenu: '保税物流',
                tabsIndex: '保税仓储配送服务'
              }
            }
          ]
        },
        {
          title: '出口功能',
          content: [
            {
              text: '一键订舱',
              url: 'business',
              params: {
                activeIdx: 0,
                exportActiveName: 'yjdc'
              }
            },
            {
              text: '标准定价',
              url: 'business',
              params: {
                activeIdx: 0,
                exportActiveName: 'bzdj'
              }
            },
            {
              text: '实时查询',
              url: 'business',
              params: {
                activeIdx: 0,
                exportActiveName: 'sscx'
              }
            },
            {
              text: '实时响应',
              url: 'business',
              params: {
                activeIdx: 0,
                exportActiveName: 'ssxy'
              }
            },
            {
              text: '极速对账',
              url: 'business',
              params: {
                activeIdx: 0,
                exportActiveName: 'jsdz'
              }
            }
          ]
        },
        {
          title: '进口功能',
          content: [
            {
              text: '自动清关报价',
              url: 'business',
              params: {
                activeIdx: 1,
                importActiveName: 'zdqg'
              }
            },
            {
              text: '极速成本测算',
              url: 'business',
              params: {
                activeIdx: 1,
                importActiveName: 'cbcs'
              }
            },
            {
              text: '智能货物追踪',
              url: 'business',
              params: {
                activeIdx: 1,
                importActiveName: 'znhw'
              }
            },
            {
              text: '专业单证指导',
              url: 'business',
              params: {
                activeIdx: 1,
                importActiveName: 'zydz'
              }
            },
            {
              text: '便捷在线结算',
              url: 'business',
              params: {
                activeIdx: 1,
                importActiveName: 'bjzx'
              }
            }
          ]
        },
        {
          title: '行业解决方案',
          content: [
            {
              text: '物联网服务',
              url: 'increment',
              params: {
                activeMenu: '物联网服务'
              }
            },
            {
              text: '大数据服务',
              url: 'increment',
              params: {
                activeMenu: '大数据服务'
              }
            },
            {
              text: '供应链金融服务',
              url: 'increment',
              params: {
                activeMenu: '供应链金融服务'
              }
            },
            {
              text: '保险服务',
              url: 'increment',
              params: {
                activeMenu: '保险服务'
              }
            }
          ]
        },
        {
          title: '公司介绍',
          content: [
            {
              text: '新闻资讯',
              url: 'company',
              params: {
                tabIndex: '新闻资讯'
              }
            },
            {
              text: '关于我们',
              url: 'company',
              params: {
                tabIndex: '关于我们'
              }
            },
            {
              text: '专家团队',
              url: 'company',
              params: {
                tabIndex: '专家团队'
              }
            },
            {
              text: '加入我们',
              url: 'company',
              params: {
                tabIndex: '加入我们'
              }
            },
            {
              text: '联系我们',
              url: 'company',
              params: {
                tabIndex: '联系我们'
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    handleToDetail (url, params) {
      if (this.$route.name === url) {
        this.$emit('change', params)
      } else {
        this.$router.push({ name: url, params })
      }
    },
    openDialog (id) {
      let height = 600
      let width = 500
      let iTop = window.screen.availHeight - height - 40
      let iLeft = window.screen.availWidth - width - 20
      let nonce = Date.now() + ''
      let timestamp = Date.now() + ''
      let signature = sha1('nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.userInfo.mobile + '&3d030c2ac013877aebaeaf6637e5b83a')
      signature = signature.toUpperCase()
      window.open('https://xiangxuntrack.udesk.cn/im_client/?web_plugin_id=' + id + '&nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.userInfo.mobile + '&signature=' + signature, 'CNN_WindowName', 'location=no,status=no,scrollvars=no,width=' + width + ',height=' + height + ',left=' + iLeft + ',top=' + iTop)
    }
  }
}
</script>

<style lang="stylus">
.footer-wrapper
  width 100%
  min-width 1180px
  background #183350
  overflow hidden
  .section
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 400px
    border-bottom: 2px solid #313C47;
    .section-text
      min-width 330px
      p
        font-size 26px
        line-height 30px
        letter-spacing 2px
        text-align center
        color #D6D6D6
        // font-weight bold
        &:last-child
          margin-top 18px
    .section-btn
      display flex
      align-items center
      justify-content center
      margin-top 60px
      .btn
        font-size 18px
        font-weight bold
        color #000000
        width 156px
        height 38px
        line-height 38px
        text-align center
        border 0
        border-radius 8px
        letter-spacing 2px
        background #FED900
        box-shadow 0px 12px 9px 0px rgba(33,26,4,0.4)
        border-radius 8px
        &:first-child
          margin-right 50px
      .line
        height 12px
        width 0
        border-left 1px solid #FFFFFF
  .section-foot
    display flex
    margin-top 120px
    align-items flex-start
    justify-content space-between
    width 1180px
    margin 120px auto 0
    .tell-box
      min-width 120px
      .pl
        font-size 8px
        text-align center
        margin 0 auto 22px
        color #ffffff
        letter-spacing 2px
        transform scale(0.8)
        display none
      img
        width 62px
        display block
        margin 0 auto 22px
      h4
        font-size 14px
        text-align center
        color #FFFFFF
      p
        font-size 12px
        color #AAAAAA
        margin 12px 0 16px
        text-align center
      .btn
        width 138px
        height 30px
        border 0
        font-size 12px
        color #FFFEFE
        background transparent
        border-radius 8px
        position relative
        text-indent 18px
        cursor pointer
        outline 0
        &:before
          content ''
          width 22px
          height 22px
          position absolute
          top 4px
          left 22px
          display block
          background url('./img/weixin.png')no-repeat center
    .foot-items
      margin-left 260px
      display flex
      align-items flex-start
      justify-content space-between
      width 732px
      .item
        .title
          font-size 14px
          color #FFD900
          margin-bottom 40px
        .con-box
          display flex
          align-items center
          margin-top -28px
          .line
            &:nth-child(1)
              p
                margin-right 30px
        .p
          font-size 12px
          color #F1F1F1
          margin-top 28px
          cursor pointer
          span:last-child
            margin-left 20px
  .foot-link
    display flex
    align-items center
    margin 150px auto 74px
    width 1164px
    span
      overflow hidden
      padding-top 20px
    .a
      margin 0px 10px
      padding-top 20px
    .img
      width 200px
  .icp
    font-size 12px
    color #777777
    font-weight bold
    text-align center
    margin-bottom 50px
</style>
