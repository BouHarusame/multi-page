<template>
  <div class="ocean-lcl-list-wrapper">
    <table class="ocean-lcl-list">
      <thead>
        <tr>
          <th>
            <el-row>
              <el-col :span="6" class="head">起运港(码头)／中转·行程／目的港(码头)</el-col>
              <el-col :span="2" class="head">运价(每立方)</el-col>
              <el-col :span="2" class="head">运价(每吨)</el-col>
              <el-col :span="1" class="head">附加费</el-col>
              <el-col :span="4" class="head">ANYCASE服务费(RT)</el-col>
              <el-col :span="2" class="head">目的港收费标准</el-col>
              <el-col :span="2" class="head">有效日期</el-col>
              <el-col :span="1" class="head">船期</el-col>
              <el-col :span="1" class="head">备注</el-col>
              <el-col :span="3" class="head" v-if="dr_role">操作</el-col>
              <el-col :span="3" class="head" v-else></el-col>
            </el-row>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, i) in oceanLclData">
          <tr :key="i">
            <td>
              <div class="outer-border">
                <div class="supplier-name">船东直供</div>
                <el-row>
                  <el-col :span="6"
                          class="lcl-item1">
                    <img src="./img/ocean.png">
                    <div class="ocean_name">
                      <span>SHANGHAI · CHINA 上海</span>
                      <font>海运&nbsp; {{handleTransitType(item.transitType, item.transitPort)}}&nbsp; {{item.shippingDays}}天</font>
                      <span :title="item.targetPort">{{item.targetPort}}</span>
                    </div>
                  </el-col>
                  <el-col :span="2"
                          class="lcl-item2">
                    <span v-if="!item.edit">
                      <!-- <el-popover placement="top-start"
                                  title="价格趋势"
                                  width="300"
                                  @show="drawLine(item.priceId + 'A', item.feePerCbm)"
                                  trigger="hover">
                        <div :ref="item.priceId + 'A'"
                             style="width:300px;height:100px;"
                             class="echart"></div> -->
                        <el-button slot="reference"
                                   v-if="item.feePerCbm">$ {{ item.feePerCbm }}</el-button>
                      <!-- </el-popover> -->
                    </span>
                    <template v-else>
                      <el-input clearable v-model="item.feePerCbm" placeholder="请输入运费/立方"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="2"
                          class="lcl-item3">
                    <span v-if="!item.edit">
                      <!-- <el-popover placement="top-start"
                                  title="价格趋势"
                                  width="300"
                                  @show="drawLine(item.priceId + 'B', item.feePerTon)"
                                  trigger="hover">
                        <div :ref="item.priceId + 'B'"
                             style="width:300px;height:100px;"
                             class="echart"></div> -->
                        <el-button slot="reference"
                                   v-if="item.feePerTon">$ {{item.feePerTon}}</el-button>
                      <!-- </el-popover> -->
                    </span>
                    <template v-else>
                      <el-input clearable v-model="item.feePerTon" placeholder="请输入运费/吨"></el-input>
                    </template>
                  </el-col>
                  <el-col :span="1"
                          class="lcl-itemf">
                    <span>
                      <el-popover placement="bottom"
                                  width="202"
                                  trigger="hover"
                                  v-if="item.feeBaf || item.feeCisf">
                        <!-- <el-table :data="[item]"
                                  border
                                  :header-cell-style="{'background': '#597A96','color': '#fff','font-size':'12px'}">
                          <el-table-column width="100"
                                          prop="feeBaf"
                                          label="费用名称"></el-table-column>
                          <el-table-column width="100"
                                          prop="feeCisf"
                                          label="价格"></el-table-column>
                        </el-table> -->
                        <table>
                          <tr class="header">
                            <td>费用名称</td>
                            <td>价格</td>
                          </tr>
                          <tr>
                            <th>BAF</th>
                            <th>{{item.feeBaf}}</th>
                          </tr>
                          <tr>
                            <th>CISF</th>
                            <th>{{item.feeCisf}}</th>
                          </tr>
                        </table>
                        <img src="./img/icon-fujiafei.png"
                          slot="reference">
                      </el-popover>
                      <span v-else>无</span>
                    </span>
                  </el-col>
                  <el-col :span="4" class="lcl-itemf">
                    <span class="red">$ {{item.acServiceFee}}</span>
                  </el-col>
                  <el-col :span="2"
                          class="lcl-itemf">
                     <span>
                      <el-popover placement="bottom"
                                  width="680"
                                  @show="fetchSurcharge(item, item.targetPort)"
                                  trigger="hover">
                        <el-table :data="item.feeDataList"
                                  border
                                  :header-cell-style="{'background': '#597A96','color': '#fff','font-size':'12px'}">
                          <el-table-column property="feeNameCn"
                                          label="费用名称"></el-table-column>
                          <el-table-column width="120"
                                          show-overflow-tooltip
                                          property="feeName"
                                          label="费用名称"></el-table-column>
                          <el-table-column width="80"
                                          property="currencyType"
                                          label="币种"></el-table-column>
                          <el-table-column width="80"
                                          property="chargeUnit"
                                          label="单位"></el-table-column>
                          <el-table-column width="100"
                                          property="fee"
                                          label="费用"></el-table-column>
                          <el-table-column width="80"
                                          property="courseLine"
                                          label="航线"></el-table-column>
                          <el-table-column width="120"
                                          property="remark"
                                          label="备注"></el-table-column>
                        </el-table>
                        <p slot="reference" class="portfee">费</p>
                      </el-popover>
                    </span>
                  </el-col>
                  <el-col :span="2"
                          class="lcl-item4">
                    <p class="ocean_span" v-if="!item.edit">
                      <span>【起始日期】</span>
                      <span>{{formateTime(item.effStartDate)}}</span>
                      <span>【截止日期】</span>
                      <span>{{formateTime(item.effEndDate)}}</span>
                    </p>
                    <p class="ocean_span" v-else>
                      <el-date-picker
                        v-model="item.effStartDate"
                        type="date"
                        size="small"
                        placeholder="起始日期">
                      </el-date-picker>
                      <el-date-picker
                        v-model="item.effEndDate"
                        type="date"
                        placeholder="截止日期">
                      </el-date-picker>
                    </p>
                  </el-col>
                  <el-col :span="1"
                          class="lcl-item5">
                    <p v-if="!item.edit">{{fetchWeek(item.shippingDayWeek)}}</p>
                    <template v-else>
                      <el-popover
                        placement="bottom"
                        width="600"
                        trigger="click">
                        <div class="sb-col-3">
                          <span class="sc-2-title">船期</span>
                          <el-checkbox :indeterminate="isIndeterminate"
                                      v-model="checkAll"
                                      @change="handleCheckAll(checkAll, i)">全选</el-checkbox>
                          <el-checkbox-group v-model="checkedDays"
                                            style="display: inline-block"
                                            @change="handleCheckedDay(checkedDays, i)">
                            <el-checkbox v-for="vDay in days"
                                        :label="vDay"
                                        :key="vDay">{{vDay}}</el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <div slot="reference" class="shippingday-change" @click="shippingChange(item.shippingDayWeek)">{{item.shippingDayWeek}}</div>
                      </el-popover>
                    </template>
                  </el-col>
                  <el-col :span="1"
                          class="lcl-itemb">
                    <el-popover
                      placement="bottom"
                      width="300"
                      trigger="hover">
                      <template v-if="item.remarks">
                        <div v-for="(data,i) in item.remarks.split('■')" :key="i">
                          <div v-if="data">■{{data}}</div>
                        </div>
                      </template>
                      <p slot="reference">{{item.remarks}}</p>
                    </el-popover>
                  </el-col>
                  <el-col :span="3"
                          class="lcl-itemcz"
                          v-if="dr_role">
                    <p v-if="!item.edit" @click="handleEdit(i)">编辑</p>
                    <template v-else>
                      <p @click="handleSave(item, i)">保存</p>
                      <p @click="handleCancel(i)">取消</p>
                    </template>
                  </el-col>
                  <el-col :span="3"
                          class="lcl-item6">
                    <!-- <a>立即订舱</a> -->
                    <el-button type="primary"
                               class="lcl-item6-btn"
                               @click.native="handleBookingOrder(item)">立即订舱</el-button>
                    <!-- <li class="ocean_list8">
                      船东直供
                    </li> -->
                  </el-col>
                </el-row>
                <el-row class="lcl-list-bottom">
                  <el-col :span="12"
                          class="lcl-item7">
                    <!-- <span class="cma">{{item.shipCompany}}</span> -->
                  </el-col>
                  <el-col :span="12"
                          class="lcl-item8">
                    <span class="item-zx" @click="openDialog(56745)">在线咨询</span>
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
import { deepCopy, timeFomatter } from 'utils/utils'
import { postLclOrder, getFclPortFee } from 'api/inquiry'
import sha1 from 'js-sha1'
import { mapGetters } from 'vuex'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')

export default {
  name: 'ocean-lcl-list',
  props: {
    oceanLclList: Array
  },
  data () {
    return {
      dr_role: false,
      feeDataList: [],
      isIndeterminate: false,
      days: ['一', '二', '三', '四', '五', '六', '日'],
      checkAll: false,
      checkedDays: [],
      edt: '',
      oceanLclData: []
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created () {
    let roles = window.localStorage.getItem('user_roles')
    this.dr_role = JSON.parse(roles).indexOf('AC_SW') > -1
  },
  mounted () {
    this.makeClone(this.oceanLclList)
    // let echartArr = []
    // this.oceanLclData.forEach((ele, index) => {
    //   ele.numData.forEach((item, i) => {
    //     echartArr.push(...[item.priceId + 'A', item.priceId + 'B'])
    //   })
    // })
    // echartArr.forEach(ele => {
    //   this.drawLine(ele, 0)
    // })
    this.edt = new Date().toLocaleDateString()
  },
  methods: {
    handleBookingOrder (row) {
      let InquiryLclParam = {
        carrier: row.carrier,
        dateFrom: row.dateFrom,
        dateTo: row.dateTo,
        shippingDayWeek: row.shippingDayWeek,
        targetPort: row.targetPort,
        transitType: row.transitType
      }
      postLclOrder(row.priceId, InquiryLclParam)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('订舱成功')
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleTransitType (transitType, transitPort) {
      return transitType === 'DIRECT' ? '直达' : `中转 [${transitPort}]`
    },
    openDialog (id) {
      let height = 600
      let width = 500
      let iTop = window.screen.availHeight - height - 40
      let iLeft = window.screen.availWidth - width - 20
      let nonce = Date.now() + ''
      let timestamp = Date.now() + ''
      let mobile = ''
      mobile = this.userInfo && this.userInfo.mobile ? this.userInfo.mobile : ''
      let signature = sha1('nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + mobile + '&3d030c2ac013877aebaeaf6637e5b83a')
      signature = signature.toUpperCase()
      window.open('https://xiangxuntrack.udesk.cn/im_client/?web_plugin_id=' + id + '&nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + mobile + '&signature=' + signature, 'CNN_WindowName', 'location=no,status=no,scrollvars=no,width=' + width + ',height=' + height + ',left=' + iLeft + ',top=' + iTop)
    },
    getDateStr (AddDayCount) {
      let date = new Date()
      date.setDate(date.getDate() + AddDayCount)
      let m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      return m + '/' + d
    },
    drawLine (ele, num) {
      let myChart = echarts.init(this.$refs[ele][0])
      myChart.setOption({
        grid: {
          top: 10,
          bottom: 20,
          right: 45,
          left: 40
        },
        xAxis: {
          name: '日期',
          type: 'category',
          axisLabel: {
            interval: 0
          },
          data: [this.getDateStr(-12), this.getDateStr(-8), this.getDateStr(-4),
            {
              value: this.getDateStr(0),
              textStyle: {
                color: '#ff0000',
                fontSize: '14'
              }
            }, this.getDateStr(4), this.getDateStr(8)]
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            interval: 0
          }
        },
        series: [{
          symbolSize: 10,
          data: ['', '', '', num],
          type: 'scatter'
        }]
      })
    },
    formateTime (time) {
      if (!time || time === null) {
        return '-'
      }
      return timeFomatter(time, 'yyyy/MM/dd', true)
    },
    fetchSurcharge (item) {
      // console.log(item, priceId)
      if (item.feeDataList && item.feeDataList.length > 0) return
      let data = {
        port: item.targetPort,
        transitPort: ''
      }
      data.transitPort = item.transitPort ? item.transitPort : ''
      getFclPortFee(data)
        .then(res => {
          if (res.msg === 'success') {
            const data = res.data.records
            this.$set(item, 'feeDataList', data)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
    },
    makeClone (data) {
      this.oceanLclData = deepCopy(data)
    },
    fetchWeek (date) {
      let result = []
      if (date && date !== null) {
        date.split('/').join('').split('').forEach(item => {
          result.push('周' + item)
        })
        return result.join(',')
      }
    },
    shippingChange (value) {
      this.checkedDays = value.split('')
    },
    handleCheckAll (val, i) {
      this.checkedDays = val ? this.days : []
      this.oceanLclData[i].shippingDayWeek = this.checkedDays.join('')
    },
    handleCheckedDay (value, i) {
      this.checkedDays = value
      let checkedCount = value.length
      this.checkAll = checkedCount === this.days.length
      this.oceanLclData[i].shippingDayWeek = this.checkedDays.join('')
    },
    handleEdit (i) {
      this.$emit('click-edit', i)
    },
    handleCancel (i) {
      this.$emit('click-cancel', i)
    },
    handleSave (item, i) {
      let param = {}
      param.priceId = item.priceId
      param.feePerCbm = item.feePerCbm
      param.feePerTon = item.feePerTon
      param.effStartDate = item.effStartDate
      param.effEndDate = item.effEndDate
      param.shippingDayWeek = item.shippingDayWeek
      this.$emit('click-save', param, i)
      this.checkAll = false
      this.checkedDays = []
    }
  },
  watch: {
    oceanLclList: {
      handler () {
        this.makeClone(this.oceanLclList)
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~styles/variable"
.ocean-lcl-list-wrapper
  .ocean-lcl-list
    width 100%
    font-size 14px
    min-width 1100px
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
        &:nth-child(2),
        &:nth-child(3)
          background $color-dark-background
    tbody
      .outer-border
        min-height 132px
        border 1px solid $border-color-light-grey
        box-sizing border-box
        margin-top 12px
        position relative
        &:hover
          border 1px solid $color-yellow-background
        .supplier-name
            position absolute
            top 0
            left -20px
            width 20px
            height 60px
            font-size 12px
            text-align center
            padding 10px 0
            line-height 15px
            background $color-yellow-background
            color #fff
            border-radius: 4px 0 0 4px
      .el-row
        position relative
      .el-col
        text-align center
      .lcl-item1
        img
          float left
          margin 20px 0 10px 20px
          width 18px
          height 60px
        .ocean_name
          float left
          margin 13px 0 0 12px
          width 210px
          color $font-color-black
          span
            text-align left
            font-size 14px
            display block
            text-indent 0
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
          font
            text-align left
            font-size 12px
            color $font-color-grey
            display block
            margin 8px 0
            text-indent 0
      .lcl-item2, .lcl-item3
        height 90px
        padding 0 5px
        display flex
        justify-content center
        align-items center
        .el-button
          margin 0
      .lcl-itemf
        span
          height 90px
          display flex
          justify-content center
          align-items center
          color: #414141;
          img
            width 16px
            height 16px
        .red
          color #f56c6c
        .portfee
          border 1px solid #f56c6c
          box-sizing border-box
          border-radius 50%
          padding 2px
          color #f56c6c
      .lcl-item4
        display table
        text-align center
        .ocean_span
          padding-top 16px
          font-size 12px
          display table-cell
          vertical-align middle
          line-height 24px
          span
            font-size 12px
            color $font-color-grey
            display block
            line-height 18px
            text-align center
            &:nth-of-type(even)
              font-size 12px
              color $font-color-black
          .el-date-editor.el-input, .el-date-editor.el-input__inner
            width 100%
            margin-bottom 2px
      .lcl-item5
        text-align center
        padding 0 5px
        box-sizing border-box
        height 90px
        display flex
        justify-content center
        align-items center
        p
          width 120px
          vertical-align middle
          color $font-color-black
          line-height 20px
        .shippingday-change
          width 100px
          height 30px
          line-height 30px
          border-radius 4px
          border 1px solid #dcdfe6
      .lcl-itemb
        text-align center
        height 50px
        p
          width 120px
          margin-top 38px
          padding-left 10px
          box-sizing border-box
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          vertical-align middle
          color $font-color-black
      .lcl-itemcz
        line-height 90px
        display flex
        justify-content space-around
        p
          color #ffb037
      .lcl-item6
        vertical-align center
        line-height 80px
        .lcl-item6-btn
          position absolute
          top 30px
          right 24px
          vertical-align middle
        .el-button
          background $color-yellow-background
          border 0
      .lcl-list-bottom
        bottom 0
        min-height 34px
        line-height 34px
        border-top 1px solid $border-color-light-grey
        margin-top 8px
        .lcl-item7
          text-align left
          padding 7px 21px
          height 20px
          line-height 20px
          span
            color $font-color-black
        .lcl-item8
          text-align right
          // padding 7px 21px
          // height 18px
          line-height 18px
          .item-zx
            display inline-block
            cursor pointer
            width 60px
            height 20px
            line-height 20px
            border-radius 10px
            color $color-yellow-background
            border 1px solid $color-yellow-background
            font-size 12px
            text-align center
            margin 7px 31px
.el-popover
  table
    .header
      background #597A96
      color #fff
    tr
      width 200px
      height 30px
      td,th
        width 100px
        line-height 30px
        font-size 12px
        text-align center
        border: 1px solid #597A96
</style>
