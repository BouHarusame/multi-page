<template>
  <div class="show">
    <svg
      width="100%"
      min-width="1210"
      height="3366"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <polygon :points="points1" fill="#1E3F62" />
      <polygon :points="points2" fill="#183350" />
      <polygon :points="points3" fill="#37AAD7" />
      <polygon points="128 0,0 0,0 126,128 126,73 68" fill="#FED901" />
    </svg>
    <div class="content">
      <div class="title title1 add-animation">
        <div class="title-text">我们为您提供的行业解决方案</div>
        <div class="title-line"></div>
      </div>
      <div class="solution add-animation">
        <div class="solution-left">
          <div class="solution-item" v-for="item in solutionList" :key="item.id" @mouseenter="handleMouseenter(item)">
            <span class="img-icon" :class="item.icon"></span>
            <div class="con-text">
              <span>{{item.text}}</span>
              <div class="link" @click="handleToDetail(item.url, item.params)" >
                <span>查看详情</span>
                <span class="icon-arrow iconfont icon-jiantoujinggao"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="solution-right">
          <!-- <template v-for="item in solutionList">
            <img :key="item.id" :src="item.src" v-if="item.active" alt />
          </template> -->
          <img src="https://www.anycase.cn/data/ac30/index/tu3.jpg" alt />
        </div>
      </div>
      <div class="title add-animation">
        <div class="title-text">一个平台解决您的所有问题，让国际物流不再繁琐</div>
        <div class="title-line"></div>
      </div>
      <div class="shows add-animation">
        <div class="show-box">
          <div>
            <div>
              <img v-for="(item, index) in platImageList" :key="index" :src="item.src" @mouseenter="mouseenter" @mouseleave="mouseleave" @click="handleClick(item)" :style="item.style" :class="[item.class, {'active': item.prevActive}]"/>
            </div>
            <div class="background-box">
              <img src="./img/macbook_01.png" class="bg1" alt="">
              <img class="bg" src="./img/macbook_02.png" />
            </div>
          </div>
          <img src="./img/phone.png" class="img5" />
        </div>
        <button class="gotoplat" @click="handleToLogin">使用我们的平台</button>
      </div>
      <div class="title landmark add-animation">
        <div class="title-text">我们的实力遍及全球</div>
        <div class="title-line"></div>
      </div>
      <div class="info add-animation">遍及全球的航线支持，近洋、澳新、中东-印巴-红海、欧地、非洲、美加、中南美......</div>
      <!-- <img src="./img/landmark.png" alt="" srcset=""> -->
      <div class="map-box add-animation">
        <div class="point point1">温哥华</div>
        <div class="point point2">纽约</div>
        <div class="point point3">智利</div>
        <div class="point point4">鹿特丹</div>
        <div class="point point5">迪拜</div>
        <div class="point point6">新加坡</div>
        <div class="point point7">悉尼</div>
        <div class="point point8">釜山</div>
        <div class="point point9">东京</div>
        <div class="point point10">上海</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocalStorage } from 'utils/utils'
export default {
  data () {
    return {
      points1: '',
      points2: '',
      points3: '',
      platImageList: [
        {
          src: 'https://www.anycase.cn/data/ac30/index/PC3.jpg',
          class: 'img1',
          style: {
            left: '12px',
            top: '175px',
            width: '540px',
            zIndex: 1
          },
          index: 0,
          active: false,
          prevActive: false
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/PC2.jpg',
          class: 'img2',
          style: {
            left: '122px',
            top: '156px',
            width: '592px',
            zIndex: 2
          },
          index: 1,
          active: false,
          prevActive: false
        },
        {
          src: 'https://www.anycase.cn/data/ac30/index/PC1.jpg',
          class: 'img3',
          style: {
            left: '270px',
            top: '142px',
            width: '620px',
            zIndex: 10
          },
          index: 2,
          active: true,
          prevActive: false
        }
      ],
      positionImageList: [{
        left: '12px',
        top: '175px',
        width: '540px',
        zIndex: 1,
        opacity: 0.7
      }, {
        left: '122px',
        top: '156px',
        width: '592px',
        zIndex: 2,
        opacity: 0.9
      }, {
        left: '270px',
        top: '142px',
        width: '620px',
        zIndex: 10,
        opacity: 1
      }],
      solutionList: [{
        text: '大数据服务',
        icon: 'icon1',
        active: true,
        url: 'increment',
        params: {
          activeMenu: '大数据服务'
        },
        id: 1
      }, {
        text: '供应链金融服务',
        icon: 'icon2',
        active: false,
        url: 'increment',
        params: {
          activeMenu: '供应链金融服务'
        },
        id: 2
      }, {
        text: '物联网服务',
        icon: 'icon3',
        active: false,
        url: 'increment',
        params: {
          activeMenu: '物联网服务'
        },
        id: 3
      }, {
        text: '保险服务',
        icon: 'icon4',
        active: false,
        url: 'increment',
        params: {
          activeMenu: '保险服务'
        },
        id: 4
      }],
      timer: null,
      num: 0
    }
  },
  methods: {
    handleClick (item) {
      if (item.active) return
      this.platImageList.forEach(item => {
        let i = (item.index + 1) % 3
        item.style = this.positionImageList[i]
        item.index = i
        if (item.index === 2) {
          item.active = true
        } else {
          item.active = false
        }
        if (item.index === 0) {
          item.prevActive = true
        } else {
          item.prevActive = false
        }
      })
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
    },
    handleResize () {
      let clientWidth = document.documentElement.offsetWidth
      if (clientWidth < 1210) {
        clientWidth = 1210
      }
      let point1 = clientWidth * 0.65
      // let point2 = clientWidth * 0.21
      // let point3 = clientWidth * 0.06
      let point4 = clientWidth - 95
      let point5 = clientWidth - 145
      // if (point1 < 1032) {
      //   point1 = 1032
      // }
      this.points1 = `${clientWidth} 1600,0 2500,0 3360,${point1} 3360,${clientWidth} 3030`
      this.points2 = `${clientWidth} 540,0 1350,0 2502,${clientWidth} 1602`
      this.points3 = `${clientWidth} 2080,${point5} 2080,${point4} 2143,${point5} 2206,${clientWidth} 2206`
    },
    handleMouseenter (item) {
      this.solutionList.forEach(s => {
        s.active = false
      })
      item.active = true
    },
    handleToDetail (url, params) {
      this.$router.push({ name: url, params })
    },
    mouseenter () {
      clearInterval(this.timer)
    },
    mouseleave () {
      this.timer = setInterval(() => {
        let i = (this.num + 1) % 3
        this.handleClick(this.platImageList[i])
        this.num++
      }, 1500)
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.mouseleave()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
    this.mouseenter()
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../../../assets/iconfont/iconfont.css'
.show {
  width: 100%;
  position: relative;
  min-width 1180px
  .content {
    width: 70%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      font-size: 28px;
      font-weight: bold;
      color: #fff;
      line-height: 28px;
      text-align: center;
      margin-top: 370px;
      opacity: 0;

      .title-line {
        width: 155px;
        height: 4px;
        background: #FED901;
        display: inline-block;
        margin-top: 12px;
      }
    }

    .title1 {
      color: #000000;
      margin-top: 200px;
    }

    .solution {
      width: 900px;
      // min-width: 840px
      // max-width: 1000px
      display: flex;
      justify-content: space-between;
      margin: 110px auto 0;
      .solution-left {
        width: 310px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        height: 429px;
        .solution-item {
          padding: 32px 0;
          width: 130px;
          position: relative;
          .line {
            position: absolute;
            left: 40px;
            top: 88px;
            width: 230px;
            border-top: 2px solid #FED900;
            &:before {
              position: absolute;
              top: -4px;
              left: 0;
              width: 116%;
              height: 22px;
              background: #ffffff;
              content: '';
              z-index: 9;
              transition all 0.5s;
            }
            &:after {
              position: absolute;
              right: -35px;
              top: -2px;
              content: '';
              width: 35px;
              height: 0;
              border-top: 2px solid #fed900;
              transform: rotate(30deg);
              transform-origin: top left;
            }
          }
          .animation {
            &:before {
              left: 116%;
              width: 0;
            }
          }
          .img-icon {
            display: block;
          }

          .icon1 {
            width: 21px;
            height: 22px;
            background: url('../../../../../components/home-page/img/icon.png') no-repeat -156px -30px / 252px 126px;
          }
          .icon2 {
            width 19px
            height 22px
            background url('../../../../../components/home-page/img/icon.png')no-repeat -182px -31px / 252px 126px
          }
          .icon3 {
            width 21px
            height 24px
            background url('../../../../../components/home-page/img/icon.png')no-repeat -204px -31px / 252px 126px
          }
          .icon4 {
            width 17px
            height 24px
            background url('../../../../../components/home-page/img/icon.png')no-repeat -228px -30px / 252px 126px
          }

          .con-text {
            .link {
              display flex
              align-items center
              cursor: pointer;
              span {
                font-size 12px
                color #004EA2
                margin-right 10px
              }
            }
            span {
              font-size: 18px;
              color: #424242;
              font-weight: 600;
              margin: 14px 0 20px;
              display: block;
            }

            .icon-arrow {
              transform: rotate(180deg)
            }
          }
        }
      }

      .solution-right {
        margin-left: 50px;
        // min-width: 510px;
        img {
          height:510px;
          // width: 510px;
          box-shadow: 0 0 18px 3px rgba(0, 0, 0, 0.4);
        }
      }
    }

    .shows {
      width: 1180px;
      height: 750px;
      opacity: 0;

      .show-box {
        display: flex;
        justify-content: space-around;
        align-items: center;
        transform: scale(0.8);

        div {
          position: relative;
          width: 960px;
          height: 740px;

          img {
            position: absolute;
            transition: all 0.8s ease-out 0.2s;
          }
          .img1 {
            top: 175px;
            left: 12px;
            width: 540px;
            z-index: 1;
            cursor: pointer;
            opacity: 0.7;
          }

          .img2 {
            top: 156px;
            left: 122px;
            width: 592px;
            z-index: 2;
            cursor: pointer;
            opacity: 0.9;
          }

          .img3 {
            top: 142px;
            left: 270px;
            width: 620px;
            z-index: 10;
            cursor: pointer;
            opacity: 1;
          }
          .active {
            animation: opacity 1s ease-in
            transition: all 0.1s ease-in 0.5s
          }
          .background-box {
            width 861px;
            position: absolute;
            top: 0px;
            left: 121px;
          }
          .bg1 {
            height: 687px;
            position: absolute;
            top: 22px;
            left: 24px;
          }
          .bg {
            top: 22px;
            left: 125px;
            width: 770px;
            display: block;
            z-index: 5;
          }
        }
      }

      .gotoplat {
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 64px;
        width: 210px;
        height: 50px;
        border-radius: 10px;
        border: none;
        background: #FED901;
        color: #2A2B30;
        font-size: 16px;
        text-align: center;
        line-height: 50px;
        font-weight: 600;
        box-shadow: 0 10px 10px 5px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        outline: 0;
      }
    }

    .landmark {
      margin-top: 300px;
      opacity: 0;
    }

    .info {
      font-size: 18px;
      color: #E7E7E7;
      line-height: 30px;
      margin: 94px auto 52px;
      opacity: 0;
    }

    .map-box {
      opacity: 0;
      width: 1010px;
      height: 500px;
      background: url('./img/map.png') no-repeat center / 100%;
      position: relative;

      .point {
        font-size: 16px;
        cololr: #000000;
      }

      .point1 {
        width: 79px;
        height: 40px;
        line-height: 26px;
        text-indent: 5px;
        background: url('./img/point1.png') no-repeat center;
        position: absolute;
        top: 68px;
        left: -1px;
        opacity: 0;
        animation: play 20s 0s ease-in-out infinite;

        &::before {
          position: absolute;
          top: 28px;
          right: -12px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point2 {
        width: 100px;
        height: 32px;
        opacity: 0;
        line-height: 34px;
        text-indent: 53px;
        animation: play 20s 2s ease-in-out infinite;
        background: url('./img/point2.png') no-repeat center;
        position: absolute;
        top: 135px;
        left: 204px;

        &::before {
          position: absolute;
          top: -12px;
          left: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point3 {
        width: 96px;
        height: 28px;
        opacity: 0;
        line-height: 26px;
        text-indent: 14px;
        animation: play 20s 4s ease-in-out infinite;
        background: url('./img/point3.png') no-repeat center;
        position: absolute;
        top: 360px;
        left: 112px;

        &::before {
          position: absolute;
          top: 4px;
          right: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point4 {
        width: 84px;
        height: 28px;
        opacity: 0;
        line-height: 26px;
        text-indent: 6px;
        background: url('./img/point4.png') no-repeat center;
        animation: play 20s 6s ease-in-out infinite;
        position: absolute;
        top: 90px;
        left: 350px;

        &::before {
          position: absolute;
          top: 3px;
          right: -19px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point5 {
        width: 82px;
        height: 40px;
        opacity: 0;
        line-height: 26px;
        text-indent: 14px;
        background: url('./img/point5.png') no-repeat center;
        animation: play 20s 8s ease-in-out infinite;
        position: absolute;
        top: 172px;
        left: 516px;

        &::before {
          position: absolute;
          top: 27px;
          right: -12px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point6 {
        width: 95px;
        height: 40px;
        opacity: 0;
        line-height: 50px;
        text-indent: 6px;
        background: url('./img/point6.png') no-repeat center;
        animation: play 20s 10s ease-in-out infinite;
        position: absolute;
        top: 277px;
        left: 666px;

        &::before {
          position: absolute;
          top: -11px;
          right: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point7 {
        width: 92px;
        height: 40px;
        opacity: 0;
        line-height: 50px;
        text-indent: 14px;
        background: url('./img/point7.png') no-repeat center;
        animation: play 20s 12s ease-in-out infinite;
        position: absolute;
        top: 414px;
        left: 796px;

        &::before {
          position: absolute;
          top: -11px;
          right: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point8 {
        width: 99px;
        height: 40px;
        opacity: 0;
        line-height: 26px;
        text-indent: 52px;
        background: url('./img/point8.png') no-repeat center;
        animation: play 20s 14s ease-in-out infinite;
        position: absolute;
        top: 67px;
        left: 834px;

        &::before {
          position: absolute;
          top: 28px;
          left: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point9 {
        width: 86px;
        height: 34px;
        opacity: 0;
        line-height: 38px;
        text-indent: 39px;
        background: url('./img/point9.png') no-repeat center;
        animation: play 20s 16s ease-in-out infinite;
        position: absolute;
        top: 135px;
        left: 854px;

        &::before {
          position: absolute;
          top: -11px;
          left: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2s infinite;
        }
      }

      .point10 {
        width: 96px;
        height: 28px;
        opacity: 0;
        text-indent: 13px;
        line-height: 26px;
        background: url('./img/point10.png') no-repeat center;
        animation: play 20s 18s ease-in-out infinite;
        position: absolute;
        top: 160px;
        left: 707px;

        &::before {
          position: absolute;
          top: 1px;
          right: -11px;
          content: '';
          background: url('./img/circle.png') no-repeat center;
          width: 24px;
          height: 24px;
          animation: flashing 2sinfinite;
        }
      }
    }
  }
}

@keyframes flashing {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
@keyframes opacity {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.5;
  }
  30% {
    opacity: 0.5;
  }
  40% {
    opacity: 0;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0.7;
  }
}
@keyframes play {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
