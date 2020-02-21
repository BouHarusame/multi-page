<template>
  <div class="map-car">
    <div id="container-car" class="container"></div>
    <div class="mask" v-show="loading"></div>
    <p class="loading" v-show="loading"><img src="./img/loading.gif"></p>
  </div>
</template>
<script>
import BMap from 'BMap'
import BMapLib from 'BMapLib'
export default {
  name: 'BMap-car',
  props: {
    type: String,
    value: String,
    infos: Array,
    loading: Boolean,
    render: Function,
    placeholder: String
  },
  data () {
    return {
      code: '',
      map: null,
      clickFlag: false,
      oldCode: '',
      marker: null,
      infoWindow: null,
      icon: null,
      lat: '',
      lng: '',
      drc: '', // 陆运转向
      course: '' // 海运转向
    }
  },
  mounted () {
    let icon = null
    if (this.type === 'map') {
      icon = require('./img/car-icon-4.png')
    } else {
      icon = require('./img/ship-icon-4.png')
    }

    // let anchorVal = new BMap.Size(30, 30)
    // if (this.type === 'map') {
    //   anchorVal = new BMap.Size(30, 30)
    // }
    this.icon = new BMap.Icon(icon, new BMap.Size(40, 70), {
      anchor: new BMap.Size(20, 35),
      imageOffset: new BMap.Size(0, 0)
    })
    this.map = new BMap.Map('container-car')
    const mapType = new BMap.MapTypeControl({ mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_SATELLITE_MAP], anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT })
    const traffic = new BMapLib.TrafficControl({ showPanel: false }) // 路况信息对象
    this.map.addControl(traffic) // 添加路况信息
    const topLeftControl = new BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT }) // 比例尺
    const topLeftNavigation = new BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_BOTTOM_LEFT })
    this.map.addControl(topLeftControl)
    this.map.addControl(topLeftNavigation)
    traffic.showTraffic() // 显示路况信息
    this.map.enableScrollWheelZoom() // 启用鼠标滚轮缩放
    this.map.enableContinuousZoom() // 开启连续缩放效果
    this.map.addControl(mapType) // 设置地图类型
    const point = new BMap.Point(24.100028, 6.419621)
    let scale = 12
    // if (this.type === 'sea') {
    //   scale = 4
    // }
    this.map.centerAndZoom(point, scale)
    if (this.type !== 'sea') {
      this.getCurrentCity().then(city => {
        this.map.setCenter(city)
        this.map.setCurrentCity(city)
      })
    }
    // this.$nextTick(() => {
    //   this.map.addEventListener('mousemove', ({type, target, point, pixel, overlay}) => {
    //     this.lat = point.lat
    //     this.lng = point.lng
    //     // this.createInfoWindow(this.info)
    //   })
    // })
  },
  methods: {
    handleClickSearch () {
      this.$emit('on-search', this.code)
    },
    getCurrentCity () {
      const currentCity = new BMap.LocalCity()
      return new Promise((resolve, reject) => {
        currentCity.get(result => {
          resolve(result.name)
        })
      })
    },
    addMarker (point) {
      // if (this.marker && this.oldCode && this.oldCode === this.code) {
      //   const startPoint = this.marker.getPosition()
      //   const self = this
      //   // this.animation2(self, this.marker, startPoint, point)
      //   return
      // }
      this.map.clearOverlays()

      this.marker = new BMap.Marker(point, {
        icon: this.icon,
        enableClicking: true,
        offset: new BMap.Size(0, 0)
      })

      this.map.addOverlay(this.marker)
      const offsetWidth = document.body.offsetWidth / 2
      const self = this
      if (this.type !== 'sea') {
        this.marker.setOffset(new BMap.Size(-offsetWidth, 0))
        this.animation(self, this.marker, offsetWidth, 5, point)
      }

      // this.marker.addEventListener('mouseover', () => {
      //   if (!self.infoWindow.isOpen()) {
      //     self.map.openInfoWindow(self.infoWindow, point)
      //   }
      // })
    },
    convertPosition (position) {
      const { lon, lat } = position
      const point = new BMap.Point(lon, lat)
      const convertor = new BMap.Convertor()
      return new Promise((resolve, reject) => {
        convertor.translate([point], 1, 5, (data) => {
          console.log(data)
          resolve(data.points[0])
        })
      })
    },
    addMarkerNew (point, positionInfo) {
      // console.log(point)
      let marker = new BMap.Marker(point, { icon: this.icon })
      marker.setRotation(positionInfo.drc)
      let resizeMap = function () {
        // console.log('marker clicked.')
        this.map.centerAndZoom(point, 15)
      }
      marker.addEventListener('click', resizeMap)
      this.map.addOverlay(marker)
      return marker
    },
    addInfoWindow (marker, info) {
      // console.log(info)
      let infoWindow = this.createInfoWindow(info.positionInfo)
      let openInfoWinFun = function () {
        marker.openInfoWindow(infoWindow)
      }
      marker.addEventListener('mouseover', openInfoWinFun)
      return openInfoWinFun
    },
    /**
     * [animation 第一次查询时调用的动画]
     * @param  {[Object]} marker      [百度地图标注对象]
     * @param  {[number]} offsetWidth [车辆位置]
     * @param  {[number]} step        [动画增加的步长]
     * @return {[null]}
     */
    animation (self, marker, offsetWidth, step, point) {
      var initOffsetWidth = offsetWidth
      var timer = setInterval(function () {
        if (offsetWidth > initOffsetWidth / 2) {
          step += 2
        } else {
          step -= 2
        }
        if (offsetWidth <= 0 || step <= 0) {
          clearInterval(timer)
        } else {
          offsetWidth -= step
          marker.setOffset(new BMap.Size(-offsetWidth, 0))
        }
        if (self.type === 'sea') {
          marker.setRotation(self.course)
        } else {
          marker.setRotation(self.drc)
        }
      }, 40)
      setTimeout(function () {
        // if (self.type === 'sea') {
        //   marker.setRotation(self.course)
        // } else {
        //   marker.setRotation(self.drc)
        // }
        self.map.openInfoWindow(self.infoWindow, point)
      }, 1000)
    },
    /**
     * [createInfoWindow 创建百度地图的弹框]
     * @param  {[object]} positionInfo [弹框参数信息]
     * @return {[object]}              [百度地图弹框对象]
     */
    createInfoWindow (positionInfo) {
      const content = this.render(positionInfo)
      const opts = {
        width: 370,
        enableAutoPan: true,
        offset: new BMap.Size(0, 0)
      }
      return new BMap.InfoWindow(content, opts)
    }
  },
  watch: {
    infos: {
      handler (nv) {
        // console.log('map-car watch info:' + nv)
        if (!nv) return
        let viewArea = []
        let promiseRequests = []
        nv.forEach(item => {
          /*
          // 测试代码
          let p0 = item.positionInfo.lon // 经度
          let p1 = item.positionInfo.lat // 纬度
          let marker = this.addMarkerNew(new BMap.Point(p0, p1), item.positionInfo)
          this.addInfoWindow(marker, item)
          viewArea.push(new BMap.Point(p0, p1))
          */

          let pRequest = this.convertPosition(item.positionInfo).then(point => {
            // console.log('convertPosition:', point)
            let p0 = point.lng // 百度经度lng， 后台经度lon
            let p1 = point.lat // 纬度
            let marker = this.addMarkerNew(new BMap.Point(p0, p1), item.positionInfo)
            this.addInfoWindow(marker, item)
            viewArea.push(new BMap.Point(p0, p1))
          })
          promiseRequests.push(pRequest)
        })
        Promise.all(promiseRequests).then((result) => {
          this.map.setViewport(viewArea, {
            margins: [40, 20, 0, 40]
          })
        }).catch(error => {
          console.log(error)
        })
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.map-car
  width: 100%
  height: 100%
  position: relative
  .mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1009
    background: rgba(0,0,0,0.25)
  .loading
    width: 40px
    height: 40px
    position: fixed
    top: 50%
    left: 50%
    margin: -20px 0 0 -20px
    z-index: 1010
  .container
    width: 100%
    height: 100%
</style>
