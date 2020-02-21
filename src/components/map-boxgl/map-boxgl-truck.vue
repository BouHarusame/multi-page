<template>
  <div style='height:100%;width:100%;'>
    <div ref='basicMapbox'></div>
  </div>
</template>
<script>
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
export default {
  props: {
    mapWidth: {
      type: String
    },
    mapHeight: {
      type: String
    },
    first: {
      type: Boolean,
      default: false
    },
    locationVO: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      mapSize: {},
      popup: null,
      time: '12:00-6:00'
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.init()
    // })
    this.init([121, 31], 4)
  },
  methods: {
    // 初始化
    init (center, zoom) {
      mapboxgl.accessToken = 'pk.eyJ1Ijoid2FuZ3poYW96aG91IiwiYSI6ImNqdW1lZDNjcDJndzI0ZW8yZDhnMHRpeGUifQ.w8KW3IAQKo9biykyjG8fcw'
      const map = new mapboxgl.Map({
        container: this.$refs.basicMapbox,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: center,
        zoom: zoom
      })
      // 设置语言
      map.addControl(new MapboxLanguage({
        defaultLanguage: 'zh'
      }))
      if (this.locationVO.length > 0) {
        const targetPort = [121.0078125, 30.751277776257812]
        console.log(this.locationVO)
        this.locationVO.forEach(item => {
          let truck = [item.lon, item.lat]
          let truckData = {
            'type': 'FeatureCollection',
            'features': [
              {
                'type': 'Feature',
                'properties': {
                  'description': `
                    <div class="item-line"><span>车牌号：</span><p>${item.vehicle ? item.vehicle : ''}</p></div>
                    <div class="item-line"><span>司机姓名：</span><p>${item.driverName ? item.driverName : ''}</p></div>
                    <div class="item-line"><span>司机电话：</span><p>${item.driverPhone ? item.driverPhone : ''}</p></div>
                    <div class="item-line"><span>距离工厂的公里数：</span><p>${item.distanceFactory ? item.distanceFactory : ''}</p></div>
                    <div class="item-line"><span>距离港口的公里数：</span><p>${item.distancePort ? item.distancePort : ''}</p></div>
                    <div class="item-line"><span>备注：</span><p>${item.remarks ? item.remarks : ''}</p></div>
                    <div class="item-line"><span>上次更新时间：</span><p>${item.updateTime ? new Date(item.updateTime).toLocaleDateString() : ''}</p></div>`,
                  'icon': 'ship'
                },
                'geometry': {
                  'type': 'Point',
                  'coordinates': truck
                }
              }]
          }
          const _this = this
          map.on('load', function () {
            map.addLayer({
              'id': 'line-animation',
              'type': 'line',
              'source': {
                'type': 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': [
                    {
                      'type': 'Feature',
                      'properties': {},
                      'geometry': {
                        'type': 'LineString',
                        // 'coordinates': [startPort, ship, targetPort]
                        'coordinates': [truck, targetPort]
                      }
                    }
                  ]
                }
              },
              'layout': {
                'line-cap': 'round',
                'line-join': 'round'
              },
              'paint': {
                'line-color': '#ed6498',
                'line-width': 2,
                'line-opacity': 0.8
              }
            })
            map.loadImage('https://www.anycase.cn/data/ac2/import/importShip.png',
              function (error, image) {
                if (error) throw error
                map.addImage('ship', image)
                map.addLayer({
                  'id': 'places',
                  'type': 'symbol',
                  'source': {
                    'type': 'geojson',
                    'data': truckData
                  },
                  'layout': {
                    'icon-image': 'ship',
                    'icon-size': 0.5,
                    'icon-rotate': 0,
                    'icon-allow-overlap': true
                  }
                })
              })
            map.loadImage('https://www.anycase.cn/data/ac2/import/importPort.png',
              function (error, image) {
                if (error) throw error
                map.addImage('port', image)
                map.addLayer({
                  'id': 'points',
                  'type': 'symbol',
                  'source': {
                    'type': 'geojson',
                    'data': {
                      'type': 'FeatureCollection',
                      'features': [{
                        'type': 'Feature',
                        'geometry': {
                          'type': 'Point',
                          'coordinates': targetPort
                        }
                      }]
                    }
                  },
                  'layout': {
                    'icon-image': 'port',
                    'icon-size': 0.5
                  }
                })
              })
            _this.popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false
            })

            map.on('click', 'places', setPopup)

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'places', function () {
              map.getCanvas().style.cursor = ''
            })
          })
          setPopup(truckData, true)
        })
      }
      function setPopup (e, flag) {
        console.log(111, e)
        const coordinates = e.features[0].geometry.coordinates.slice()
        const description = e.features[0].properties.description
        if (!flag) {
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
        }
        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map)
      }
    }
  },
  watch: {
    mapWidth: {
      handler (nv, ov) {
        const styleObj = {
          width: this.mapWidth,
          height: this.mapHeight
        }
        this.mapSize = styleObj
      },
      deep: true,
      immediate: true
    },
    locationVO: {
      handler (nv, ov) {
        if (nv && nv.length > 0) {
          this.init([nv[0].lon, nv[0].lat], 10)
        } else {
          this.init([121, 31], 4)
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scope>
@import url('https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css');
.mapboxgl-map {
  height: 100%;
  width: 100%;
}
.mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right {
  display: none;
}
.item-line
  display flex
  align-items center
  margin 6px 0
  span
    font-size 12px
    color #7A7E85
  p
    font-size 12px
    color #353535
</style>
