<template>
  <div class="inquiry-content">
    <template v-for="(item, index) in  origin">
      <div class="inquiry-item"
            v-if="item.key"
            :key="index">
        <span class="key" :class="{'min-width1': item.value.length > 5, 'min-width': item.value.length > 6}">{{item.value}}: </span>

        <span v-if="String(item.key).length < 21" class="val"> {{item.key}} </span>
        <el-popover
          v-else
          placement="top-start"
          width="200"
          trigger="hover"
          popper-class="tg-tips">
          <div class="tips">{{item.key}}</div>
          <span class="val" slot="reference">
            {{item.key}}
          </span>
        </el-popover>
        <span class="val val1" v-if="item.value === '毛重'"> KGS</span>
        <span class="val val1" v-if="item.value === '体积'"> CBM</span>
      </div>
    </template>
  </div>
</template>

<script>
import { CURRENCY, MODES_OF_TRANSPORTAREA, originData } from 'assets/constant'
import { deepCopy } from 'utils/utils'
export default {
  props: {
    inquiryMessage: Object
  },
  data () {
    return {
      origin: deepCopy(originData)
    }
  },
  methods: {
    formatInquiry () {
      if (this.inquiryMessage.quoteNo) {
        this.origin[5].key = ''
        this.origin.map(item => {
          if (item.label === 'transferWay') {
            item.key = this.tranforTransferWay(this.inquiryMessage[item.label])
          } else if (item.label === 'currency') {
            CURRENCY.forEach(c => {
              if (c.value === this.inquiryMessage[item.label]) {
                item.key = c.label
                item.code = this.inquiryMessage[item.label]
              }
            })
            if (this.inquiryMessage.goodsValue) {
              item.key = this.inquiryMessage.goodsValue + ' ' + item.key
            }
          } else if (item.label === 'shipBookTag') {
            item.key = this.inquiryMessage[item.label] === 'y' ? '已订舱' : '未订舱'
          } else if (item.label === 'originCountry') {
            item.key = this.inquiryMessage.originLicenseTag ? this.inquiryMessage[item.label] + '(' + (this.inquiryMessage.originLicenseTag === 'y' ? '有原产地证' : '无原产地证') + ')' : this.inquiryMessage[item.label]
          } else if (item.label === 'shipInfo') {
            let shipName = this.inquiryMessage.shipName ? this.inquiryMessage.shipName : ''
            let vesselNo = this.inquiryMessage.vesselNo ? this.inquiryMessage.vesselNo : ''

            item.key = vesselNo ? shipName + ' ' + vesselNo : shipName
          } else if (item.label === 'targetPort') {
            if (this.inquiryMessage.targetPortArea) {
              let targetPortArea = ''
              MODES_OF_TRANSPORTAREA.forEach(item => {
                if (item.value === this.inquiryMessage.targetPortArea) {
                  targetPortArea = item.label
                }
              })
              item.key = this.inquiryMessage[item.label] + ' ' + targetPortArea
            } else {
              item.key = this.inquiryMessage[item.label]
            }
          } else if (item.label === 'cont') {
            item.key += this.inquiryMessage.cont20gp ? this.inquiryMessage.cont20gp + 'x 20GP ' : ''
            item.key += this.inquiryMessage.cont40gp ? this.inquiryMessage.cont40gp + 'x 40GP ' : ''
            item.key += this.inquiryMessage.cont40hq ? this.inquiryMessage.cont40hq + 'x 40HQ' : ''
          } else if (item.label === 'addr') {
            item.key += this.inquiryMessage.province ? this.inquiryMessage.province + ' ' : ''
            item.key += this.inquiryMessage.city ? this.inquiryMessage.city + ' ' : ''
            item.key += this.inquiryMessage.region ? this.inquiryMessage.region + ' ' : ''
            item.key += this.inquiryMessage.town ? this.inquiryMessage.town + ' ' : ''
            item.key += this.inquiryMessage.address ? this.inquiryMessage.address : ''
          } else if (item.label === 'units') {
            item.key = this.inquiryMessage.packageType ? this.inquiryMessage[item.label] + ' ' + this.inquiryMessage.packageType : this.inquiryMessage[item.label]
          } else {
            item.key = this.inquiryMessage[item.label]
          }
          return item
        })
      }
    },
    tranforTransferWay (key) {
      switch (key) {
        case 'lcl':
          return '进口拼箱'
        case 'fcl':
          return '进口整箱'
        case 'air':
          return '进口空运'
        default:
          return ''
      }
    }
  },
  watch: {
    inquiryMessage: {
      handler (nv) {
        this.formatInquiry()
      },
      deep: true
    }
  }
}
</script>

<style lang='stylus' scoped>
.inquiry-content
  padding 30px 20px 10px
  display flex
  flex-wrap wrap
  align-items center
  .inquiry-item
    display flex
    align-items center
    margin-bottom 20px
    background #F0F2F5
    border-radius 15px
    height 30px
    width 28%
    margin-left 8%
    &:nth-child(3n+1)
      margin-left 0
    .key
      font-size 12px
      font-weight 500
      margin-right 6px
      margin-left 12px
      // min-width 56px
      color #7A7E85
    .min-width1

      min-width 86px
    .min-width

      min-width 98px
    .val
      font-size 12px
      color #353535
    .val1
      margin-left 4px
    span
      &:last-child
        // width 72%
        max-width 176px
        display block
        .val
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          display: block
</style>
