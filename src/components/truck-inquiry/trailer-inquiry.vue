<template>
  <div class="trailer-inquiry">
    <div class="search-bar">
      <div class="sb-top">
        <div class="st-item-1">
          <div class="clear-address-wrapper">
            <div ref="main">
              <input v-model="trailerAddress" placeholder="拖柜地址" @click="handleChangeAddress" class="input-address" />
              <v-distpicker v-if="visibleDistpicker" type="mobile" wrapper="address-wrapper" static-placeholder ref="addressRef" :DISTRICTS="DISTRICTS" @selected="onSelected" @province="selectProvince" @city="selectCity" @area="selectArea"></v-distpicker>
            </div>
            <span class="clear-address el-icon-circle-close" @click="handleClearTrailerAddress"></span>
          </div>
        </div>
        <div class="st-item-2">
          出运港口
          <el-select v-model="searchList.startPort" @change="handleStartPortChange" clearable class="si-2-select">
            <el-option v-for="item in startPortOption" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </div>
        <div class="st-item-3">
          出运码头
          <el-select v-model="searchList.dock" clearable class="si-3-select">
            <el-option v-for="item in dockOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="st-item-4">
          <!-- <el-input v-model="cont20gp">
            <template slot="append">x 20'GP</template>
          </el-input> -->
          <input v-model="searchList.cont20gp" class="el-input__inner si-input" size="small">
          <span class="st-item-padding">x 20GP</span>
        </div>
        <div class="st-item-5">
          <!-- <el-input v-model="cont40gp">
            <template slot="append">x 40'GP</template>
          </el-input> -->
          <input v-model="searchList.cont40gp" class="el-input__inner si-input" size="small">
          <span class="st-item-padding">x 40GP</span>
        </div>
        <div class="st-item-6">
          <!-- <el-input v-model="cont40hq"  class="si6-input">
            <template slot="append">x 40'HQ</template>
          </el-input> -->
          <input v-model="searchList.cont40hq" class="el-input__inner si-input" size="small">
          <span class="st-item-padding">x 40HQ</span>
        </div>
      </div>
      <div class="sb-top">
        <div>
          <el-checkbox v-model="searchList.custClear" @change="handleBaoGuanChange">ANYCASE报关</el-checkbox>
        </div>
        <div class="sb-buttom-detail" v-show="showDetail">
          报关地点
          <el-select v-model="searchList.custClearAddr" clearable>
            <el-option label="上海" value="SHANGHAI"></el-option>
            <el-option label="深圳" value="a1" disabled></el-option>
            <el-option label="宁波" value="a2" disabled></el-option>
            <el-option label="广州黄埔港" value="a3" disabled></el-option>
            <el-option label="南京" value="a4" disabled></el-option>
            <el-option label="青岛" value="a5" disabled></el-option>
            <el-option label="广州南沙" value="a6" disabled></el-option>
          </el-select>
        </div>
        <div class="sb-buttom-detail" v-show="showDetail">
          品名数量
          <el-input-number v-model="searchList.nameCount" :min="1" controls-position="right" class="sb-buttom-number"></el-input-number>
        </div>
        <div class="divShow">

        </div>
        <div class="divShow">

        </div>
        <div style="width:176px;text-align:right">
          <el-button class="sb-buttom-btn" @click="handleClickSearch">查询</el-button>
        </div>
      </div>
    </div>
    <div v-if="showEmptyRecord" class="inquiry-empty-wrapper">
      <p>价格波动中，未显示数据</p>
      <p>请联系客服获取精准报价</p>
    </div>
    <div class="inquiry-details-wrapper">
      <TrailerPriceList :pTrailList="trailerList" :nameCount="searchList.nameCount" />
    </div>
    <div class="page-wrap">
      <OrderPagination styleType="border" :total="total" :size="orderParams.size" v-model="orderParams.page" prevText="上一页" nextText="下一页">
      </OrderPagination>
    </div>
  </div>
</template>

<script>
import { getTruckAddr, getTruckPrice } from 'api/inquiry'
import TrailerPriceList from 'components/enquiry/trailer-list'
import VDistpicker from 'components/distPicker/Distpicker'
import { ENQUIRY_TRAILER_START_PORT, ENQUIRY_TRAILER_DOCK_SH, ENQUIRY_TRAILER_DOCK_SZ, ENQUIRY_TRAILER_DOCK_NB, ENQUIRY_TRAILER_DOCK_QD } from 'assets/constant'
import OrderPagination from 'components/pagination/pagination'
export default {
  name: 'trailer-inquiry',
  data () {
    return {
      searchList: {
        province: '',
        city: '',
        region: '',
        startPort: 'SHANGHAI',
        dock: '',
        cont20gp: '',
        cont40gp: '',
        cont40hq: '',
        custClear: true,
        custClearAddr: 'SHANGHAI',
        nameCount: 1,
        priceType: 'export'
      },
      startPortOption: ENQUIRY_TRAILER_START_PORT,
      shOption: ENQUIRY_TRAILER_DOCK_SH,
      szOption: ENQUIRY_TRAILER_DOCK_SZ,
      nbOption: ENQUIRY_TRAILER_DOCK_NB,
      qdOption: ENQUIRY_TRAILER_DOCK_QD,
      dockOption: [],
      showDetail: true,
      trailerAddress: '',
      visibleDistpicker: false,
      select: { province: '', city: '', area: '' },
      trailerList: [],
      showEmptyRecord: false,
      total: 0,
      orderParams: {
        size: 12,
        page: 1
      },
      DISTRICTS: {}
    }
  },
  created () {
    getTruckAddr()
      .then(res => {
        if (res.msg === 'success') {
          // this.$set(this.DISTRICTS, 0, res.data)
          Object.assign(this.DISTRICTS, res.data)
        }
        if (res.msg === 'fail') {
          this.$message.error(res.verror)
        }
      })
      .catch(error => {
        console.log(error)
      })
    // console.log('1111', this.DISTRICTS)
  },
  mounted () {
    this.dockOption = ENQUIRY_TRAILER_DOCK_SH
  },
  methods: {
    handleStartPortChange (val) {
      this.searchList.dock = ''
      if (val === 'SHANGHAI') {
        this.dockOption = this.shOption
      } else if (val === 'SHENZHEN') {
        this.dockOption = this.szOption
      } else if (val === 'QINGDAO') {
        this.dockOption = this.qdOption
      } else if (val === 'NINGBO') {
        this.dockOption = this.nbOption
      }
    },
    checkValid () {
      if (!this.searchList.dock) {
        this.$message.error('请选择出运码头')
        return false
      }
      if (!(Number(this.searchList.cont20gp) >= 0) || this.searchList.cont20gp.indexOf('.') > -1) {
        this.$message.error('20gp数量只允许为正整数')
        return false
      }
      if (!(Number(this.searchList.cont40gp) >= 0) || this.searchList.cont40gp.indexOf('.') > -1) {
        this.$message.error('40gp数量只允许为正整数')
        return false
      }
      if (!(Number(this.searchList.cont40hq) >= 0) || this.searchList.cont40hq.indexOf('.') > -1) {
        this.$message.error('40hq数量只允许为正整数')
        return false
      }
      return true
    },
    handleClickSearch (orderParams) {
      if (!this.checkValid()) {
        return
      }
      this.showEmptyRecord = false
      if (this.searchList.startPort !== 'SHANGHAI') {
        this.showEmptyRecord = true
        this.trailerList = []
        return
      }
      this.searchList.cont20gp = this.searchList.cont20gp === '0' ? '' : this.searchList.cont20gp
      this.searchList.cont40gp = this.searchList.cont40gp === '0' ? '' : this.searchList.cont40gp
      this.searchList.cont40hq = this.searchList.cont40hq === '0' ? '' : this.searchList.cont40hq
      this.searchList.province = this.select.province.value || ''
      this.searchList.city = this.select.city.value || ''
      this.searchList.region = this.select.area.value || ''
      this.orderParams.page = 1
      this.fetchTruckPrice({ ...this.searchList, ...this.orderParams })
    },
    fetchTruckPrice (param) {
      getTruckPrice(param)
        .then(res => {
          if (res.msg === 'success') {
            this.trailerList = res.data.records
            this.total = res.data && res.data.total
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleBaoGuanChange (value) {
      if (value) {
        this.searchList.custClearAddr = 'SHANGHAI'
        this.showDetail = true
      } else {
        this.showDetail = false
        this.searchList.custClearAddr = ''
        this.searchList.nameCount = 0
      }
    },
    handleChangeAddress (e) {
      // this.setDistpicker(true)
      this.visibleDistpicker ? this.hide() : this.show()
    },
    show () {
      this.visibleDistpicker = true
      document.addEventListener('click', this.hidePanel, true)
    },
    hide () {
      this.visibleDistpicker = false
      document.removeEventListener('click', this.hidePanel, true)
    },
    hidePanel (e) {
      console.log(this.$refs.main)
      if (!this.$refs.main.contains(e.target)) {
        this.hide()
      }
    },
    selectProvince (data) {
      this.select.province = data
      this.trailerAddress = this.select.province.value
    },
    selectCity (data) {
      if (data.value === '市') return false
      this.select.city = data
      // if (this.select.city.value && this.select.city.value !== '市') {
      this.trailerAddress = this.select.province.value + ' ' + this.select.city.value
      // }
    },
    selectArea (data) {
      if (data.value === '区') return false
      this.select.area = data
      // if (this.select.city.value && this.select.city.value !== '市' && this.select.area.value && this.select.area.value !== '区') {
      this.trailerAddress = this.select.province.value + ' ' + this.select.city.value + ' ' + this.select.area.value
      this.handleChangeAddress()
      // }
    },
    onSelected (data) {
      // alert(data.province.value + ' | ' + data.city.value + ' | ' + data.area.value)
      // console.log(data)
    },
    handleClearTrailerAddress (event) {
      this.trailerAddress = ''
      this.searchList.province = ''
      this.searchList.city = ''
      this.searchList.area = ''
      // this.$refs.addressRef.cleanAddress()
      this.visibleDistpicker = false
    }
  },
  beforeDestroy () {
    this.hide()
  },
  components: {
    TrailerPriceList,
    VDistpicker,
    OrderPagination
  },
  watch: {
    orderParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          // 第一次进入页面显示空记录
        } else {
          this.fetchTruckPrice({ ...this.searchList, ...nv })
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~styles/variable';

.trailer-inquiry {
  .search-bar {
    min-width: 1100px;
    min-height: 91px;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
    font-size: 14px;

    .el-select:hover .el-input__inner {
      border: 1px solid #A2B6C7;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .sb-top {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      & > div {
        display: inline-block;
        margin-bottom: 10px;
        width: 176px;
        line-height: 32px;
      }

      .st-item-1 {
        width: 176px;
        position: relative;

        .clear-address-wrapper {
          position: relative;

          .clear-address {
            position: absolute;
            display: none;
            top: 10px;
            right: 10px;
            cursor: pointer;
            color: #c0c4cc;
          }

          &:hover .clear-address {
            display: inline-block !important;
          }
        }

        .input-address {
          display: inline-block;
          width: 100%;
          height: 32px;
          line-height: 40px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          color: #606266;
          padding: 0 10px;
          box-sizing: border-box;
          outline: 0;
          trasition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
          padding-right: 30px;
        }

        .distpicker-address-wrapper {
          position: absolute;
          left: 0;
          top: 32px;
          height: 200px;
          width: 100%;
          z-index: 99;
          overflow: scroll;
        }
      }

      .st-item-2 {
        width: 176px;

        .si-2-select {
          width: 112px;
        }
      }

      .st-item-3 {
        width: 176px;

        .si-3-select {
          width: 112px;
        }
      }

      .st-item-4 {
        width: 176px;
        position: relative;
        vertical-align: middle;

        .el-input-group__append {
          padding: 10px;
        }
      }

      .st-item-5 {
        width: 176px;
        position: relative;
        vertical-align: middle;

        .el-input-group__append {
          padding: 10px;
        }
      }

      .st-item-6 {
        width: 176px;
        position: relative;
        vertical-align: middle;

        .el-input-group__append {
          padding: 10px;
        }
      }

      .si-input {
        padding-right: 90px;
        height: 30px;
      }

      .st-item-padding {
        position: absolute;
        top: 3px;
        right: 0px;
        width: 79px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #C1C1C1;
        font-size: 15px;
        font-family: 'PingFang-SC-Medium';
      }

      .sb-buttom-detail {
        width: 176px;

        .el-select {
          width: 112px;
        }
      }

      .sb-buttom-number {
        width: 112px;
      }

      .sb-buttom-btn {
        background: $color-button-background;
        color: #fff;
        border: 0;
      }
    }
  }

  .inquiry-empty-wrapper {
    padding: 10px 0;
    color: red;
  }

  .inquiry-details-wrapper {
    width: 100%;
    min-width: 1100px;
    overflow: auto;
  }

  .page-wrap {
    width: 100%;
    min-width: 1100px;
    min-height: 40px;
  }
}
</style>
