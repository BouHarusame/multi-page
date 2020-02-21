<template>
  <div class="world-ship">
    <TheMap type="sea" :value="shipName" :info="positionInfo" :loading="loading"  :render="renderInfoWindow" placeholder="请输入船名"/>
  </div>
</template>
<script>
import TheMap from './map-world'
import { shipLocation } from 'api/location'
import { timeFomatter } from 'utils/utils'
export default {
  name: 'WorldShip',
  data () {
    return {
      positionInfo: {},
      shipName: '',
      loading: false
    }
  },
  props: {
    pShipName: String
  },
  components: {
    TheMap
  },
  methods: {
    fetchPositionInfoByCode (shipName) {
      if (this.loading) return
      this.loading = true
      // console.log('fetchPositionInfoByCode')
      shipLocation({ shipName: shipName })
        .then(res => {
          if (res && res.msg === 'success') {
            this.positionInfo = res.data.records[0]
            console.log(this.positionInfo)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
    },
    renderInfoWindow (info) {
      info.timestamp = timeFomatter(new Date(info.utc - 0), 'yyyy-MM-dd hh:ss', true)
      const start = info.currentVoyage ? info.currentVoyage.departPortName : ''
      const arrive = info.currentVoyage ? info.currentVoyage.arrivingPortName : ''
      if (info.navStatus === '5') { // 靠泊状态
        return `
          <div class="infoWindow" style="font-size: 14px;color: #414141;">
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">船名：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${info.shipname}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">类型：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${info.shiptypename}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">船速（单位节）：</span>
              <span style="display: inline-block;width: 157px;vertical-align: top;">${info.speed}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">状态：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${arrive}&nbsp;&nbsp;${info.navStatusName}</span></p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">预计到港时间：</span>
              <span style="display: inline-block;width: 172px;vertical-align: top;">${info.eta}</span>
            </p>
          </div>
        `
      } else {
        return `
          <div class="infoWindow" style="font-size: 14px;color: #414141;">
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">船名：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${info.shipname}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">类型：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${info.shiptypename}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">船速（单位节）：</span>
              <span style="display: inline-block;width: 157px;vertical-align: top;">${info.speed}</span>
            </p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">状态：</span>
              <span style="display: inline-block;width: 270px;vertical-align: top;">${start}&nbsp; → ${arrive}&nbsp;&nbsp;${info.navStatusName}</span></p>
            <p>
              <span style="display: inline-block;color: #000;margin-right: 8px;font-weight: bold;">预计到港时间：</span>
              <span style="display: inline-block;width: 172px;vertical-align: top;">${info.eta}</span>
            </p>
          </div>
        `
      }
    }
  },
  watch: {
    pShipName: {
      handler (nv) {
        console.log('watch shipname:' + nv)
        this.fetchPositionInfoByCode(nv)
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
  .world-ship
    width: 100%
    // height: calc(100vh - 75px)
    height: 392px
</style>
