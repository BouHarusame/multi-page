<template>
  <div class="map-world">
    <!-- <div class="map-search-left">
      <input v-model="code" type="text" class="search-input search-item" @keydown.enter="handleClickSearch" :placeholder="placeholder">
      <button class="search-btn search-item" @click="handleClickSearch"></button>
    </div> -->
    <div id="container-world" class="container"></div>
    <div class="map-label" v-if="type !== 'sea'">覆盖90%全国干线，支持500万辆货车的查询</div>
    <div class="map-label" v-else>实时查询船舶动态，定点追踪</div>
    <div class="lt">
      <p>北纬：{{this.lat}}</p>
      <p>东经：{{this.lng}}</p>
    </div>
    <div class="mask" v-show="loading"></div>
    <p class="loading" v-show="loading"><img src="./img/loading.gif"></p>
  </div>
</template>
<script>
import BMap from 'BMap'
import BMapLib from 'BMapLib'
export default {
  name: 'BMap-world',
  props: {
    type: String,
    value: String,
    info: Object,
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
    this.map = new BMap.Map('container-world')
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
    if (this.type === 'sea') {
      scale = 4
    }
    this.map.centerAndZoom(point, scale)
    if (this.type !== 'sea') {
      this.getCurrentCity().then(city => {
        this.map.setCenter(city)
        this.map.setCurrentCity(city)
      })
    }
    this.$nextTick(() => {
      this.map.addEventListener('mousemove', ({ type, target, point, pixel, overlay }) => {
        this.lat = point.lat
        this.lng = point.lng
        // this.createInfoWindow(this.info)
      })
    })
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
      if (this.marker && this.oldCode && this.oldCode === this.code) {
        const startPoint = this.marker.getPosition()
        const self = this
        this.animation2(self, this.marker, startPoint, point)
        return
      }
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

      this.marker.addEventListener('mouseover', () => {
        if (!self.infoWindow.isOpen()) {
          self.map.openInfoWindow(self.infoWindow, point)
        }
      })
    },
    convertPosition (position) {
      const { lon, lat } = position
      const point = new BMap.Point(lon, lat)
      const convertor = new BMap.Convertor()
      return new Promise((resolve, reject) => {
        convertor.translate([point], 1, 5, (data) => {
          resolve(data.points[0])
        })
      })
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
     * [animation2 地图标注已存在，并且查询的是相同的车牌时，调用该动画]
     * @param  {[Object]} marker [地图标注对象]
     * @param  {[Object]} start  [标注起点位置信息]
     * @param  {[Object]} end    [标注终点位置信息]
     * @return {[null]}
     */
    animation2 (self, marker, start, end) {
      if (start.lng === end.lng && start.lat === end.lat) return
      var stepLng = (end.lng - start.lng) / 50
      var stepLat = (end.lat - start.lat) / 50
      var timer = setInterval(function () {
        if (Math.abs(start.lng - end.lng) > Math.abs(stepLng) * 10) {
          start.lng += stepLng
        }
        if (Math.abs(start.lat - end.lat) > Math.abs(stepLat) * 10) {
          start.lat += stepLat
        }
        if (Math.abs(start.lng - end.lng) <= Math.abs(stepLng) * 10 && Math.abs(start.lat - end.lat) <= Math.abs(stepLat) * 10) {
          clearInterval(timer)
        } else {
          marker.setPosition(start)
        }
      }, 40)
      setTimeout(function () {
        self.map.openInfoWindow(self.infoWindow, end)
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
    info: {
      handler (nv) {
        if (!nv) return
        this.convertPosition(nv).then(point => {
          let scale = 15
          if (this.type === 'sea') {
            scale = 4
          }
          this.map.centerAndZoom(point, scale)
          this.addMarker(point)
          this.infoWindow = this.createInfoWindow(nv, point)
          if (this.type === 'sea') {
            this.course = this.info.course
            this.marker.setRotation(this.course)
            this.map.setZoom(8)
          } else {
            this.drc = this.info.drc
            this.marker.setRotation(this.drc)
          }
          if (!this.infoWindow.isOpen()) {
            this.map.openInfoWindow(this.infoWindow, point)
          }
        })
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .map-world
    width: 100%
    height: 100%
    position: relative
    .lt
      position: absolute
      width: 160px
      right: 20px
      bottom: 55px
    .map-search-left
      font-size: 0
      position: absolute
      top: 60px
      left: 50px
      z-index: 1
      box-shadow: 0 2px 2px rgba(0,0,0,.15)
      .search-item
        font-size: 16px
        display: inline-block
        height: 45px
        line-height: 45px
        outline: none
        vertical-align: middle
      .search-input
        width: 215px!important
        padding-left: 15px
      .search-btn
        width: 66px
        text-align: center
        cursor: pointer
        line-height 54px
        &:before
          content ''
          display inline-block
          width 22px
          height 22px
          background-image: url('./img/search1.png')
          background-size 100% 100%
          background-repeat: no-repeat
          background-position: center
    .map-label
      position: absolute
      bottom: 20px
      left: 60px
      display: inline-block
      padding: 0 20px
      height: 40px
      line-height: 40px
      background: rgba(255,255,255,0.85)
      color: #656565
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
