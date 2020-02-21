<template>
  <div class="china-car">
    <TheMapCar type="map" :value="code" :infos="positionInfos" :loading="loading"  :render="renderInfoWindow"/>
  </div>
</template>
<script>
import TheMapCar from './map-car'
import { truckLocation } from 'api/location'
import { timeFomatter } from 'utils/utils'
export default {
  name: 'ChinaCar',
  data () {
    return {
      positionInfos: [],
      code: '',
      loading: false
    }
  },
  props: {
    pAllCarNames: Array
  },
  components: {
    TheMapCar
  },
  methods: {
    fetchPositionInfoByCode (code) {
      if (this.loading) return
      this.loading = true
      truckLocation({ params: code })
        .then(res => {
          if (res && res.msg === 'success') {
            this.positionInfos = res.data.records
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
    pAllCarNames: {
      handler (nv) {
        console.log('watch pAllCarNames:' + nv)
        this.fetchPositionInfoByCode(nv)
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .china-car
    width: 100%
    height: 392px
</style>
