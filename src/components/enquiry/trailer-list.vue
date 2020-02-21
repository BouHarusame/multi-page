<template>
  <div class="trailer-list">
    <table class="trailer-inquiry-list">
      <thead>
        <tr>
          <th>
            <el-row>
              <el-col :span="8"
                      class="head">起运地／目的地／行程</el-col>
              <el-col :span="6"
                      class="head">运费</el-col>
              <el-col :span="6"
                      class="head">服务费</el-col>
              <el-col :span="4"
                      class="head"></el-col>
            </el-row>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in trailerList">
          <tr :key="i">
            <td>
              <div class="outer-border">
                <el-row>
                  <el-col :span="6"
                          class="trailer_list1">
                    <img src="./img/trailer.png">
                    <div class="trailer_name">
                      <span>{{item.finalAddr}}</span>
                      <div class="tn_startPort">
                        <span>{{item.startPort}} {{item.dockName}}</span>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6"
                          class="trailer_list2">
                    <p class="p-item" v-if="item.cont20gp">
                      <span class="box">
                        <font>【拖车费(20GP)】</font>
                        <span>{{item.fee20.substr(0,1)}} {{count(item.fee20, item.cont20gp)}}</span>
                        （{{item.fee20}} × {{item.cont20gp}} 箱）
                      </span>
                    </p>
                    <p class="p-item" v-if="item.cont40gp">
                      <span class="box">
                        <font>【拖车费(40GP)】</font>
                        <span>{{item.fee40.substr(0,1)}} {{count(item.fee40, item.cont40gp)}}</span>
                        （{{item.fee40}} × {{item.cont40gp}} 箱）
                      </span>
                    </p>
                    <p class="p-item" v-if="item.cont40hq">
                      <span class="box">
                        <font>【拖车费(40HQ)】</font>
                        <span>{{item.fee40.substr(0,1)}} {{count(item.fee40, item.cont40hq)}}</span>
                        （{{item.fee40}} × {{item.cont40hq}} 箱）
                      </span>
                    </p>
                    <p class="p-active">
                      <span class="box">
                        <font>【联单费】</font>
                        <span>{{item.feeDoc}}</span>
                      </span>
                    </p>
                  </el-col>
                  <el-col :span="6"
                          class="trailer_list3">
                    <p class="p-item" v-if="item.serviceUnitPrice">
                      <span class="box">
                        <font>【ANYCASE服务费】</font>
                        <span>￥ {{item.serviceUnitPrice * item.serviceCont}} </span>
                        (￥ {{item.serviceUnitPrice}} x {{item.serviceCont}} 箱)
                      </span>
                    </p>
                    <p class="p-item" v-if="item.custClear">
                      <span class="box">
                        <font>【报关费】</font>
                        <span>{{item.feeCust}}</span>
                        (票)
                      </span>
                    </p>
 <!--                    <p class="p-item">
                      <font></font>
                      <span></span>
                    </p> -->
                  </el-col>
                  <el-col :span="6"
                          class="trailer_list4">
                    <b :title="item.subtotal">￥{{item.subtotal}}</b>
                    <a @click="handleBookingOrder(item)">立即下单</a>
                    <p>拖车<span v-if="item.custClear">+报关</span></p>
                  </el-col>
                </el-row>

                <el-row class="trailer_list_buttom">
                  <el-col :span="12"
                          class="trailer_list5">
                    <span class="cma">国内拖车</span>
                    <span class="surch" @click="handleShowTuoCheFeeDetail(item.dockName)">拖车附加费用一览</span>
                  </el-col>
                  <el-col :span="12"
                          class="trailer_list6">
                    <el-popover placement="bottom"
                                width="600"
                                trigger="hover">
                      <div v-html="baoguanInstruction"
                           style="line-height: 30px">
                      </div>
                      <!-- <span class="trailer_list_popver_baoguanlink" @click="handleShowBaoGuanFeeDetail">ANYCASE针对GB1598价格调整方案</span> -->
                      <span class="item"
                            slot="reference" style="cursor: pointer">报关附加费说明</span>
                    </el-popover>
                    <el-popover placement="bottom"
                                width="300"
                                trigger="hover">
                      <div v-html="tuocheInstruction"
                           style="line-height: 30px">
                      </div>
                      <span class="trailer_list_popver_baoguanlink" @click="handleShowBaoGuanFeeDetail">ANYCASE针对GB1598价格调整方案</span>
                      <span class="item"
                            slot="reference">拖车附加费说明</span>
                    </el-popover>
                    <span class="item-zx" @click="openDialog(59534)">在线咨询</span>
                  </el-col>
                </el-row>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { postTruckOrder } from 'api/inquiry'
import { deepCopy } from 'utils/utils'
import { BAO_GUAN_INSTRUCTION, TUO_CHE_INSTRUCTION } from 'assets/constant/instruction'
import { mapGetters } from 'vuex'
import sha1 from 'js-sha1'
export default {
  name: 'trailer-list',
  data () {
    return {
      baoguanInstruction: BAO_GUAN_INSTRUCTION,
      tuocheInstruction: TUO_CHE_INSTRUCTION,
      trailerList: []
    }
  },
  props: {
    pTrailList: Array,
    nameCount: [String, Number]
  },
  methods: {
    handleBookingOrder (row) {
      let trailerParam = row
      trailerParam.nameCount = this.nameCount
      postTruckOrder(row.priceId, trailerParam)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('下单成功')
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    count (num1, num2) {
      return num1.split(' ')[1] * num2
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
    },
    handleShowTuoCheFeeDetail (dockName) {
      if (dockName === '外港') {
        window.open('wgInstruction', '_blank')
      }
      if (dockName === '洋山') {
        window.open('ysInstruction', '_blank')
      }
    },
    handleShowBaoGuanFeeDetail () {
      window.open('bgInstruction', '_blank')
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
    pTrailList: {
      handler (nv) {
        this.trailerList = deepCopy(nv)
        this.trailerList.forEach(item => {
          if (item.province) {
            item.finalAddr = item.province
          }
          if (item.city) {
            item.finalAddr = item.finalAddr + '-' + item.city
          }
          if (item.region) {
            item.finalAddr = item.finalAddr + '-' + item.region
          }
          if (item.town) {
            item.finalAddr = item.finalAddr + '-' + item.town
          }
          item.fee20 = (item.fee20 && item.fee20 !== 0) ? '¥ ' + item.fee20 : ''
          item.fee40 = (item.fee40 && item.fee40 !== 0) ? '¥ ' + item.fee40 : ''
          item.feeDoc = '¥ ' + item.feeDoc
          item.serviceCont = (item.serviceCont && item.serviceCont !== 0) ? item.serviceCont : ''
          item.serviceUnitPrice = (item.serviceUnitPrice && item.serviceUnitPrice !== 0) ? item.serviceUnitPrice : ''
          item.feeCust = (item.feeCust && item.feeCust !== 0) ? '¥ ' + item.feeCust : ''
        })
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus">
@import "~styles/variable"
.trailer-list
  width 100%
  min-width 1100px
  .trailer-inquiry-list
    width 100%
    thead
      width 100%
      height 36px
      line-height 36px
      background #597A96
      .head
        font-size 14px
        height 36px
        line-height 36px
        color #fff
        background $color-blue-background
      .el-col-8
        width 34%
      .el-col-4
        width 16%
    tbody
      .outer-border
        min-height 132px
        border 1px solid $border-color-light-grey
        box-sizing border-box
        margin-top 12px
        position relative
        &:hover
          border 1px solid $color-yellow-background
      p
        width 100%
        height 20px
        line-height 19px
        border-radius 4px
        margin-bottom 6px
        padding 1px 5px
        font-size 12px
    p.p-item
      border 1px solid $font-color-menu-active
      color $font-color-black
      .box
        width 286px
        display block
        margin 0 auto
        padding-left 10px
        span
          color $font-color-red
    p.p-active
      background #F4F6FA
      border 1px solid #888888
      color $font-color-black
      font-size 12px
      .box
        width 286px
        display block
        margin 0 auto
        padding-left 10px
        font
          display inline-block
        span
          color $font-color-red
    .trailer_list1
      min-height 86px
      margin-top 13px
      position relative
      width 34%
      img
        margin 5px 0 0 20px
        vertical-align top
        float left
      .trailer_name
        float left
        margin 5px 0 0 12px
        line-height 26px
        .tn_startPort
          margin-top 10px
        span
          text-align left
          font-size 14px
          display block
          color $font-color-black
    .trailer_list2
      min-height 86px
      margin-top 13px
      position relative
    .trailer_list3
      min-height 86px
      margin-top 13px
      position relative
      padding-left 20px
    .trailer_list4
      position absolute
      right 20px
      top 0
      width 86px
      height 100%
      text-align center
      margin-top 13px
      b
        width 86px
        font-size 14px
        color $font-color-red
        font-weight normal
        display inline-block
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      a
        color #fff
        height 30px
        line-height 30px
        display block
        font-size 12px
        border-radius 4px
        background $color-yellow-background
        margin 8px 0
        cursor pointer
      p
        font-size 12px
        color $font-color-grey
        font-weight normal
        border 0
    .trailer_list_buttom
      bottom 0
      min-height 33px
      line-height 33px
      border-top 1px solid #dcdcdc
      margin-top 8px
      .trailer_list5
        .cma
          float left
          padding 2px 5px
          height 18px
          line-height 18px
          border-radius 4px
          margin-top 7px
          margin-left 10px
          border 1px solid $color-yellow-background
          color $color-yellow-background
          background #FEF4EB
          font-size 12px
          text-align center
        .surch
          float left
          font-size 12px
          padding 2px 5px
          border 1px solid $color-yellow-background
          height 18px
          color $color-yellow-background
          line-height 17px
          margin 7px 0 0 10px
          border-radius 4px
          cursor pointer
      .trailer_list6
        text-align right
        .item
          font-size 12px
          color $color-yellow-background
          margin-right 10px
          position relative
        .item-zx
          cursor: pointer
          display inline-block
          width 60px
          height 20px
          line-height 20px
          border-radius 10px
          color $color-yellow-background
          border 1px solid $color-yellow-background
          font-size 12px
          text-align center
          margin-right 10px
</style>
