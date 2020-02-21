<template>
  <div class="china-car-thumbnail">
    <TheCarMapThumbnail type="map" :value="code" :info="positionInfo"/>
  </div>
</template>
<script>
import TheCarMapThumbnail from './map-car-thumbnail'
import { truckLocation } from 'api/location'
import { timeFomatter } from 'utils/utils'
export default {
  name: 'ChinaCarThumbnail',
  data () {
    return {
      positionInfo: {},
      code: '',
      loading: false
    }
  },
  props: {
    pThumbnailCarName: String
  },
  components: {
    TheCarMapThumbnail
  },
  methods: {
    fetchPositionInfoByCode (code) {
      if (this.loading) return
      this.loading = true
      truckLocation({ params: code })
        .then(res => {
          if (res && res.msg === 'success') {
            this.positionInfo = res.data.records[0].positionInfo
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(error => {
          console.error(error)
        })
    },
    renderInfoWindow (info) {
      info.timestamp = timeFomatter(new Date(info.utc - 0), 'yyyy-MM-dd hh:mm', true)
      return `
        <div class="infoWindow" style="font-size: 14px;color: #414141;">
          <p style="font-weight: bold;">车牌号：
            <span style="vertical-align: top;">${info.vno}</span>
          </p>
          <p style="font-weight: bold;">当前车速：
            <span style="vertical-align: top;">${info.spd}</span>
          </p>
          <p style="font-weight: bold;">行驶方向：
            <span style="vertical-align: top;">${info.drcStr}</span>
          </p>
          <p style="font-weight: bold;">
            当前位置：
            <span style="vertical-align: top;">${info.adr}</span>
          </p>
          <p style="font-weight: bold;">更新时间：
            <span style="vertical-align: top;">${info.timestamp}</span>
          </p>
        </div>`
    }
  },
  watch: {
    pThumbnailCarName: {
      handler (nv) {
        this.fetchPositionInfoByCode(nv)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .china-car-thumbnail
    width: 100%
    height: 140px
</style>
