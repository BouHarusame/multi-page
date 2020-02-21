<template>
  <div class="ocean-fcl-list-wrapper">
    <div class="ocean_header">
      <ul>
        <li class="ocean_1">起运港(码头)／中转·行程／目的港(码头)</li>
        <li class="ocean_2 empty_bg ocean-sort" @click="handleSortResult('20GP')">20GP<i v-show="sortField === '20GP'" class="ocean-title-sort" :class="[show20GPASC ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i></li>
        <li class="ocean_3 empty_bg ocean-sort" @click="handleSortResult('40GP')">40GP<i v-show="sortField === '40GP'" class="ocean-title-sort" :class="[show40GPASC ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i></li>
        <li class="ocean_4 empty_bg ocean-sort" @click="handleSortResult('40HQ')">40HQ<i v-show="sortField === '40HQ'" class="ocean-title-sort" :class="[show40HQASC ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i></li>
        <li class="ocean_5">备注</li>
        <li class="ocean_5">附加费</li>
        <li class="ocean_6 ocean-sort" @click="handleSortResult('VALIDITY')">有效日期<i v-show="sortField === 'VALIDITY'" class="ocean-title-sort" :class="[showScheduleASC ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></i></li>
        <li class="ocean_7">船期</li>
        <li class="ocean_cz" v-if="dr_role">操作</li>
        <li class="ocean_8"></li>
      </ul>
    </div>
    <div class="ocean_list_body"
         v-for="(item, i) in flcList"
         :key="i">
      <div class="ocean_list_top">
        <ul>
          <li class="ocean_list1">
            <img src="./img/ocean.png">
            <div class="ocean_name">
              <span :title="item.startPortDesc">{{item.startPortDesc}}</span>
              <font>海运 {{item.transitType}} · {{item.shippingDays}}天</font>
              <span :title="item.targetPort">{{item.targetPort}}</span>
            </div>
          </li>
          <li class="ocean_list2">
            <div class="boxType_top" v-if="!item.edit">
              <!-- <img src="./img/xing.png"> -->
              <span v-for="c in item.numData"
                    :key="c.name"
                    class="ocean_list2_price">
                <!-- <el-popover placement="top-start"
                            title="价格趋势"
                            width="300"
                            @show="drawLine(c.name, c.num)"
                            trigger="hover">
                  <div :ref="c.name"
                       style="width:300px;height:100px;"
                       class="echart"></div> -->
                  <div slot="reference">$ {{c.num}}</div>
                <!-- </el-popover> -->
              </span>
            </div>
            <div class="boxType_top" v-else>
              <el-input v-model="item.feeUsd20gp" placeholder="请输入20’GP海运费"></el-input>
              <el-input v-model="item.feeUsd40gp" placeholder="请输入40’GP海运费"></el-input>
              <el-input v-model="item.feeUsd40hq" placeholder="请输入40’HQ海运费"></el-input>
            </div>
          </li>
          <li class="ocean_listB">
            <el-popover
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{item.remarks}}</div>
              <p class="table-con" slot="reference">{{item.remarks}}</p>
            </el-popover>
          </li>
          <li class="ocean_list3" >
            <el-popover placement="bottom"
                        width="600"
                        @show="fetchSurcharge(item, item.priceId)"
                        trigger="hover">
              <el-table :data="item.feeDataList"
                        border
                        :span-method="arraySpanMethod"
                        :header-cell-style="{'background': '#597A96','color': '#fff','font-size':'12px'}">
                <el-table-column property="feeName"
                                show-overflow-tooltip
                                label="费用名称"></el-table-column>
                <el-table-column width="60"
                                property="currency"
                                label="币种"></el-table-column>
                <el-table-column width="50"
                                property="unit"
                                label="单位"></el-table-column>
                <el-table-column width="80"
                                property="feePerOrder"
                                label="单票价格"></el-table-column>
                <el-table-column width="80"
                                property="fee20gp"
                                label="20'GP"></el-table-column>
                <el-table-column width="80"
                                property="fee40gp"
                                label="40'GP"></el-table-column>
                <el-table-column width="80"
                                property="fee40hq"
                                label="40'HQ"></el-table-column>
                <el-table-column width="80"
                                property="remark"
                                rowspan="5"
                                label="备注"></el-table-column>
                <!-- <el-table-column width="60"
                                property="feeNor"
                                label="NOR"></el-table-column> -->
              </el-table>
              <img src="./img/icon-fujiafei.png"
                   slot="reference">
            </el-popover>
          </li>
          <li class="ocean_list4">
            <p class="ocean_span" v-if="!item.edit">
              <span>【起始日期】</span>
              <span>{{formateTime(item.effStartDate)}}</span>
              <span>【截止日期】</span>
              <span>{{formateTime(item.effEndDate)}}</span>
            </p>
            <div class="ocean_span" v-else>
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
            </div>
          </li>
          <li class="ocean_list5">
            <template v-if="!item.edit">
              <p v-if="item.shippingDayWeek" class="weekDay">{{fetchWeek(item.shippingDayWeek)}}</p>
              <p v-if="item.feeUsdLsf20">LSF20 ${{item.feeUsdLsf20}}</p>
              <p v-if="item.feeUsdLsf40">LSF40 ${{item.feeUsdLsf40}}</p>
              <p v-if="item.feeUsdPss20">PSS20 ${{item.feeUsdPss20}}</p>
              <p v-if="item.feeUsdPss40">PSS40 ${{item.feeUsdPss40}}</p>
            </template>
            <template v-else>
              <el-input clearable v-model="item.shippingDayWeek" placeholder="请输入船期（一二 ...）"></el-input>
            </template>
          </li>
          <!-- <li class="ocean_list6">
            <div>
              <label>
                <div class="boxType_body">
                  <img src="./img/xing.png">
                  <span>星级服务</span>
                  <img src="./img/xiang-qing.png">
                </div>
              </label>
            </div>
          </li> -->
          <li class="ocean_list7" v-if="!dr_role">
            <a @click="handleBookingOrder(item)">立即订舱</a>
            <!-- <span>舱位有限</span> -->
          </li>
          <li class="ocean_listcz" v-if="dr_role">
            <p v-if="!item.edit" @click="handleEdit(i)">编辑</p>
            <template v-else>
              <p @click="handleSave(item, i)">保存</p>
              <p @click="handleCancel(i)">取消</p>
            </template>
          </li>
          <el-popover
              placement="left"
              width="380"
              popper-class="pre-booking-poper"
              trigger="hover"
              content="提前预约，获得更好的舱位保证，价格以平台实时报价为准。">
            <li class="ocean_list7-1" slot="reference" v-if="!dr_role">
                <a @click="handleReserveOrder(item)">预约舱位</a>
              <!-- <span>舱位有限</span> -->
            </li>
          </el-popover>
          <li class="ocean_list8">
            船东直供
          </li>
        </ul>
      </div>
      <div class="ocean_list_btn">
        <span class="ocean_list_span">{{item.shipCompany}}</span>
        <span class="ocean_list_span">{{item.shipSupplier}}</span>
        <span class="ocean_list_span ocean_list_span_time">更新时间：{{formateTime(item.lastUpdateTime)}}</span>
        <!-- <font>
          <b>VSL/VOY：</b>
          CSCL SYDNEY/028W
        </font>
        <span class="ocean_list_CMA">COSCO</span>
        <span class="ocean_list_ae">ZAX3</span> -->
        <div class="time">
          <!-- <img src="./img/icon-dcbeizhu.png"> -->
          <a href="#" @click="openDialog(56745)">在线咨询</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deepCopy, timeFomatter } from 'utils/utils'
import { getFclAdditional, postFclOrder, postFclReserve } from 'api/inquiry'
import sha1 from 'js-sha1'
import { mapGetters } from 'vuex'
import { ENQUIRY_SHOW_DAYS } from 'assets/constant'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
export default {
  name: 'ocean-fcl-list',
  props: {
    pFlcList: Array,
    pResetFilter: Boolean
  },
  data () {
    return {
      dr_role: false,
      flcList: [],
      feeDataList: [
        {
          feeName: 'ANYCASE服务费',
          feeCurrency: 'USD',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '25.00',
          feeG40: '50.00',
          feeH40: '50.00',
          feeNor: '0.00'
        },
        {
          feeName: '低硫油附加费',
          feeCurrency: 'USD',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '15.00',
          feeG40: '30.00',
          feeH40: '30.00',
          feeNor: '0.00'
        },
        {
          feeName: 'ENS',
          feeCurrency: 'USD',
          feeUnit: '票',
          feePrice: '30.00',
          feeG20: '',
          feeG40: '',
          feeH40: '',
          feeNor: ''
        },
        {
          feeName: '紧急燃油附加费',
          feeCurrency: 'USD',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '60.00',
          feeG40: '120.00',
          feeH40: '120.00',
          feeNor: '0.00'
        },
        {
          feeName: '订舱费(整箱)',
          feeCurrency: 'CNY',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '360.00',
          feeG40: '415.00',
          feeH40: '415.00',
          feeNor: '0.00'
        },
        {
          feeName: 'THC',
          feeCurrency: 'CNY',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '625.00',
          feeG40: '980.00',
          feeH40: '980.00',
          feeNor: '0.00'
        },
        {
          feeName: '单证费',
          feeCurrency: 'CNY',
          feeUnit: '票',
          feePrice: '450.00',
          feeG20: '',
          feeG40: '',
          feeH40: '',
          feeNor: ''
        },
        {
          feeName: 'VGM',
          feeCurrency: 'CNY',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '20.00',
          feeG40: '20.00',
          feeH40: '20.00',
          feeNor: '0.00'
        },
        {
          feeName: '封子费',
          feeCurrency: 'CNY',
          feeUnit: '箱型',
          feePrice: '',
          feeG20: '100.00',
          feeG40: '100.00',
          feeH40: '100.00',
          feeNor: '0.00'
        },
        {
          feeName: '舱单费',
          feeCurrency: 'CNY',
          feeUnit: '票',
          feePrice: '100.00',
          feeG20: '',
          feeG40: '',
          feeH40: '',
          feeNor: ''
        }
      ],
      sortField: '',
      sortAsc: '',
      rowlength: 1
    }
  },
  computed: {
    ...mapGetters(['mobile']),
    show20GPASC: function () {
      return this.sortField === '20GP' && this.sortAsc === 'ASC'
    },
    show40GPASC: function () {
      return this.sortField === '40GP' && this.sortAsc === 'ASC'
    },
    show40HQASC: function () {
      return this.sortField === '40HQ' && this.sortAsc === 'ASC'
    },
    showScheduleASC: function () {
      return this.sortField === 'VALIDITY' && this.sortAsc === 'ASC'
    }
  },
  methods: {
    handleSortResult (sortField) {
      if (this.sortField === sortField) {
        if (this.sortAsc === 'ASC') {
          this.sortAsc = 'DESC'
        } else {
          this.sortAsc = 'ASC'
        }
      } else {
        this.sortField = sortField
        this.sortAsc = 'ASC'
      }
      let param = {
        sortField: this.sortField === 'VALIDITY' ? 'validity' : this.sortField,
        sortAsc: this.sortAsc.toLowerCase()
      }
      this.$emit('on-click-sort', param)
    },
    fetchSurcharge (item, priceId) {
      // console.log(item, priceId)
      if (item.feeDataList && item.feeDataList.length > 0) return
      getFclAdditional({ priceId })
        .then(res => {
          if (res.msg === 'success') {
            const data = res.data.fees.map((e, index) => {
              if (index === 0) {
                e.remark = res.data.remark
              }
              return e
            })
            this.rowlength = data.length
            this.$set(item, 'feeDataList', data)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (column.label === '备注') {
        return {
          rowspan: this.rowlength,
          colspan: 1
        }
      }
    },
    handleBookingOrder (row) {
      let InquiryFclParam = {
        carrier: this.carrier,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        shippingDayWeek: this.shippingDayWeek,
        targetPort: this.targetPort,
        transitType: this.transitType
      }
      postFclOrder(row.priceId, InquiryFclParam)
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
    handleReserveOrder (row) {
      let InquiryFclParam = {
        carrier: this.carrier,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        shippingDayWeek: this.shippingDayWeek,
        targetPort: this.targetPort,
        transitType: this.transitType
      }
      postFclReserve(row.priceId, InquiryFclParam)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('预约成功')
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    formateTime (time) {
      if (!time || time === null) {
        return '-'
      }
      return timeFomatter(time, 'yyyy/MM/dd', true)
    },
    openDialog (id) {
      let height = 600
      let width = 500
      let iTop = window.screen.availHeight - height - 40
      let iLeft = window.screen.availWidth - width - 20
      let nonce = Date.now() + ''
      let timestamp = Date.now() + ''
      let signature = sha1('nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.mobile + '&3d030c2ac013877aebaeaf6637e5b83a')
      signature = signature.toUpperCase()
      window.open('https://xiangxuntrack.udesk.cn/im_client/?web_plugin_id=' + id + '&nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.mobile + '&signature=' + signature, 'CNN_WindowName', 'location=no,status=no,scrollvars=no,width=' + width + ',height=' + height + ',left=' + iLeft + ',top=' + iTop)
    },
    fetchWeek1 (vDate) {
      let finalWeekDay = ''
      for (let i = 0; i < vDate.length; i++) {
        let val = vDate.charAt(i)
        if (val) {
          finalWeekDay = finalWeekDay + this.fetchWeek(val) + ', '
        }
      }
      return finalWeekDay.substring(0, finalWeekDay.length - 2)
    },
    fetchWeek (date) {
      let result = []
      if (date && date !== null) {
        date.split('').forEach(item => {
          result.push('周' + item)
        })
        return result.join('，')
      }
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
    handleEdit (i) {
      this.$emit('click-edit', i)
    },
    handleCancel (i) {
      this.$emit('click-cancel', i)
    },
    handleSave (item, i) {
      let param = {}
      param.priceId = item.priceId
      param.feeUsd20gp = item.feeUsd20gp
      param.feeUsd40gp = item.feeUsd40gp
      param.feeUsd40hq = item.feeUsd40hq
      param.effStartDate = item.effStartDate
      param.effEndDate = item.effEndDate
      param.shippingDayWeek = item.shippingDayWeek
      this.$emit('click-save', param, i)
    }
  },
  mounted () {
    // let echartArr = []
    // this.flcList.forEach((ele, index) => {
    //   ele.numData.forEach((item, i) => {
    //     echartArr.push(item.name)
    //   })
    // })
    // this.$nextTick(function () {
    //   echartArr.forEach(ele => {
    //     this.drawLine(ele, 0)
    //   })
    // })
  },
  created () {
    let roles = window.localStorage.getItem('user_roles')
    this.dr_role = JSON.parse(roles).indexOf('AC_SW') > -1
  },
  watch: {
    pFlcList: {
      handler (nv, ov) {
        this.flcList = deepCopy(nv)
        this.flcList.forEach((item, index) => {
          let numData = []
          numData.push({
            name: 'echart' + index + '1',
            num: item.feeUsd20gp
          })
          numData.push({
            name: 'echart' + index + '2',
            num: item.feeUsd40gp
          })
          numData.push({
            name: 'echart' + index + '3',
            num: item.feeUsd40hq
          })
          item.numData = numData
          item.startPortDesc = `${item.startPort} · CHINA 上海 ${item.shipHarbor ? '- ' + item.shipHarbor : ''}`
          item.effStartDate = item.effStartDate && item.effStartDate
          item.effEndDate = item.effEndDate && item.effEndDate
          item.transitType = item.transitType === 'direct' ? '直达' : '中转'
          if (item.shippingDayWeek) {
            let aShippingDayWeek = item.shippingDayWeek.split(',')
            let filteredShippingDayWeek = [...new Set(aShippingDayWeek)]
            let result = []
            filteredShippingDayWeek.forEach(item => {
              result.push(ENQUIRY_SHOW_DAYS[item])
            })
            item.aShippingDayWeek = result.toString()
          }
        })
      },
      immediate: true,
      deep: true
    },
    pResetFilter: {
      handler (nv, ov) {
        if (nv) {
          this.sortField = '20GP'
          this.sortAsc = 'ASC'
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~styles/variable'
.ocean-fcl-list-wrapper
  min-width 1100px
  width 100%
  margin 0 auto
  font-size 12px
  .ocean_header
    width 100%
    line-height 36px
    background $color-blue-background
    color #fff
    ul
      font-size 0
      &:before
        clear both
        content ''
        display block
      li
        list-style none
        display inline-block
        font-size 14px
        vertical-align middle
        &.ocean_1
          width 27%
          text-align center
        &.ocean_2
          width 10%
        &.ocean_3
          width 10%
        &.ocean_4
          width 10%
        &.ocean_5
          width 9%
          text-align center
        &.ocean_6
          width 9%
          text-align center
          cursor pointer
        &.ocean_7
          width 10%
          text-align center
        &.ocean_cz
          width 6%
          text-align center
        &.empty_bg
          background $color-dark-background
          text-align center
          cursor pointer
    .ocean-sort
      position: relative
      .ocean-title-sort
        position: absolute
        margin-left: 2px
        height: 36px
        line-height: 36px
  .ocean_list_body
    width 100%
    border 1px solid $border-color-light-grey
    min-height 132px
    margin-top 13px
    .ocean_list_top
      width 100%
      margin 0 auto
      border-bottom 1px solid $border-color-light-grey
      position relative
      ul
        &:after
          clear both
          content ''
          display block
        li
          float left
          list-style none
          display inline-block
          &.ocean_list1
            height 97px
            width 27%
            img
              float left
              margin 20px 0 0 20px
              width 18px
              height 60px
            .ocean_name
              float left
              margin 13px 0 0 12px
              // width 300px
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
                display block
                color $font-color-grey
                margin 8px 0
                text-indent 0
          &.ocean_list2
            width 30%
            height 97px
            .boxType_top
              width 100%
              height 30px
              line-height 30px
              border-radius 4px
              margin 30px 0
              display flex
              img
                display inline-block
                margin 5px 0 0 10px
                float left
              .ocean_list2_price
                width 33%
              span
                font-size 14px
                color $font-color-red
                height 30px
                line-height 30px
                width 100%
                display inline-block
                position relative
                text-align center
              .el-input,.el-input--small
                margin 0 5px
          &.ocean_listB
            text-align center
            font-size 14px
            color #000000
            display flex
            align-items center
            justify-content center
            width 9%
            height 97px
            span
              &:last-child
                display: block;
                width: 100%;
                .table-con
                  text-overflow ellipsis
                  overflow hidden
                  white-space nowrap
                  width 100%
                  display block
          &.ocean_list3
            display table
            text-align center
            font-size 20px
            color #FA9132
            width 9%
            height 97px
            position relative
            display flex
            align-items center
            justify-content center
            img
              display inline-block
              width 16px
              height 16px
              line-height 97px
          &.ocean_list4
            width 9%
            height 97px
            display table
            text-align center
            .ocean_span
              margin-top 4px
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
                width 140px
                margin-bottom 2px
          &.ocean_list5
            width 10%
            height 97px
            display flex
            align-items center
            justify-content center
            flex-wrap wrap
            .weekDay
              font-size 14px
              font-weight bold
              color $font-color-black
            p
              width 100%
              text-align center
              color $font-color-grey
              line-height 18px
          &.ocean_listcz
            width 6%
            height 97px
            text-align center
            line-height 97px
            cursor pointer
            display flex
            justify-content space-around
            p
              color #ffb037
          &.ocean_list6
            width 130px
            height 97px
            display flex
            align-items center
            justify-content center
            div
              border-radius 4px
              label
                cursor pointer
                position relative
                display block
                height 30px
                line-height 29px
                font-size 12px
                .boxType_body
                  border 1px solid #DCB43C
                  background #FFFCEA
                  color #D6B953
                  padding 0 6px
                  width 95px
                  border-radius 4px
                  img:nth-of-type(1)
                    vertical-align middle
                    margin-top -2px
                    margin-right 3px
                  img:nth-of-type(2)
                    width 18px
                    height 18px
                    vertical-align middle
          &.ocean_list7
            position absolute
            width 100px
            right 3px
            top 25px
            a
              font-size 12px
              color #ffffff
              text-align center
              background $color-yellow-background
              border-radius 4px
              width 86px
              height 30px
              line-height 30px
              cursor pointer
              position absolute
              top -11px
              right 0
              margin auto
            span
              position absolute
              top 24px
              left 26px
              font-size 12px
              color $font-color-red
          &.ocean_list7-1
            position absolute
            width 100px
            right 3px
            top 65px
            a
              font-size 12px
              color #F6AB39
              text-align center
              background #FFF7EB
              border 1px solid #F6AB39
              border-radius 4px
              width 86px
              height 30px
              line-height 30px
              box-sizing border-box
              cursor pointer
              position absolute
              top -11px
              right 0
              margin auto
          &.ocean_list8
            position absolute
            width 20px
            height 65px
            border-radius 4px 0 0 4px
            font-size 12px
            color #fff
            line-height 15px
            left -22px
            top -1px
            text-align center
            padding-top 5px
            background $color-yellow-background = #FFB037
            border 1px solid $color-yellow-background = #FFB037
            margin 0
    .ocean_list_btn
      width 100%
      min-height 33px
      .ocean_list_span
        float left
        margin-top 7px
        font-size 12px
        color $font-color-black
        height 20px
        line-height 20px
        padding 0 5px
        margin-left 20px
      .ocean_list_span_time
        color: #888888
        margin-left: 10px
      .ocean_list_span + font
        float left
        border 1px solid #CDF3FF
        font-size 12px
        color #0AACDE
        height 20px
        padding 0 5px
        line-height 19px
        box-sizing border-box
        border-radius 0 4px 4px 0
        margin-right 10px
        margin-top 7px
      .ocean_list_CMA
        float left
        margin-top 7px
        background #E2EDFF
        border-radius 4px
        font-size 12px
        color #6E82AA
        height 20px
        line-height 20px
        padding 0 10px
      .ocean_list_ae
        float left
        margin-top 7px
        background #fff
        border-radius 4px
        border 1px solid #6AC0F0
        box-sizing border-box
        margin-left 6px
        font-size 12px
        color #6E82AA
        height 20px
        line-height 17px
        padding 0 10px
        margin-right 10px
      .time
        float right
        height 33px
        margin-right 22px
        img
          float left
          width 22px
          height 22px
          margin-top 6px
          margin-right 10px
        a
          display inline-block
          width 60px
          height 20px
          line-height 20px
          border-radius 10px
          color $color-yellow-background
          border 1px solid $color-yellow-background
          font-size 12px
          text-align center
          float left
          margin-top 6px
          margin-right -11px
        span
          padding-right 46px
    &:hover
      border 1px solid $color-yellow-background
  .btn-booking
    font-size 12px
    color #ffffff
    text-align center
    background #0098e4
    border-radius 4px
    width 86px
    height 30px
    line-height 30px
    cursor pointer
</style>
