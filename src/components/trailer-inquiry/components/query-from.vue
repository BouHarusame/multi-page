<template>
  <div class="query-form">
    <el-form ref="form" :model="searchParams">
      <div class="search-item">
        <el-form-item class="query-form-item item-width item-after" label="拖柜地址">
          <el-select v-model="searchParams.selectMode" class="select-small" @change="show">
            <el-option label="模糊" value="fuzzy"></el-option>
            <el-option label="精准" value="precise"></el-option>
            <el-option label="历史" value="history" :disabled="searchParams.disabled"></el-option>
          </el-select>
          <div class="box" style="width:70%">
            <el-select v-if="searchParams.selectMode === 'precise'" class="address-box" v-model="searchParams.addressAll" filterable remote placeholder="请输入关键词" :remote-method="remoteFetchAddressList" @change="handleSelectAddress" :loading="loading">
              <el-option v-for="item in remoteAddressList" :key="item.formatted_address" :label="item.formatted_address" :value="item.formatted_address">
              </el-option>
            </el-select>
            <area-cascader v-else-if="searchParams.selectMode === 'fuzzy'" v-model="searchParams.addressAll" type="text" placeholder="请选择省市区镇" class="address-box" :data="$pcaa" :level="2" @change="handleChangearea"></area-cascader>
            <el-input v-else v-model="searchParams.addressAll" placeholder="请输入内容"></el-input>
          </div>
          <div class="address-btn" @click="handleFetchUsualAddr"><span class="el-icon-time"></span>
            <p class="btn-p">历史地址</p>
          </div>
        </el-form-item>
      </div>
      <div class="search-item">
        <el-form-item class="query-form-item l" label="出运港口" style="display:inline-block;" :class="verify ==='SHANGHAI' ? 'active':'native'">
          <el-select v-model="searchParams.startPort" @change="call">
            <el-option :label="item.label" :value="item.value" v-for="item in startPortOption" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="query-form-item item-label item-label1" label="出运码头" style="display:inline-block;width:45%;margin-left:5px" v-if="verify ==='SHANGHAI'">
          <el-select v-model="searchParams.dock">
            <el-option :label="item.label" :value="item.value" v-for="item in dockOption" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="search-item">
        <el-form-item class="query-form-item item-width" label="箱型箱量">
          <number-box :curVal="searchParams.cont20gp" :unit="unit1" :edit="true" @onChange="handleChangeVal1" />
          <number-box :curVal="searchParams.cont40gp" :unit="unit2" :edit="true" @onChange="handleChangeVal2" />
          <number-box :curVal="searchParams.cont40hq" :unit="unit3" :edit="true" @onChange="handleChangeVal3" />
        </el-form-item>
      </div>
    </el-form>
    <el-form class="">
      <div class="search-item">
        <el-form-item class="query-form-item item-width">
          <el-checkbox v-model="searchParams.custClear" @change="btncustClear">AnyCase报关</el-checkbox>
        </el-form-item>
      </div>
      <div class="search-item">
        <el-form-item v-if="searchParams.custClear" label="申报地" class="query-form-item erect" style="display:inline-block;width:45% ">
          <el-select v-model="searchParams.custClearAddr">
            <el-option :label="item.label" :value="item.value" v-for="item in custClearAddrOption" :key="item.value" :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="searchParams.custClear" label="品名数量" class="query-form-item item-label" style="display:inline-block;width:45%;margin-left:5px">
          <el-input v-model="searchParams.nameCount"></el-input>
        </el-form-item>
      </div>
      <div class="search-item">
        <el-form-item class="query-form-item item-width">
          <el-button @click="handleClickSearch" class="search-query">查 询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog title="历史查询地址" :visible.sync="dialogVisible" @close="handleClose" :close-on-click-modal="false" width="600px" class="dialog-addr" center>
      <el-radio-group v-model="addrIndex">
        <el-radio class="radio-item" :label="index" v-for="(item, index) in usualAddrList" :key="index">{{item.province}} {{item.city}} {{item.region}} {{item.town}} {{item.addr}}</el-radio>
      </el-radio-group>
      <div class="el-dialog-footer">
        <div class="btn-box sty1" @click="handleClickDialog">确定</div>
        <div class="btn-box sty2" @click="handleCancleDialog">取消</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTruckZxmdsHistory, getTruckAddrQuery } from 'api/truck'
import { ENQUIRY_TRAILER_START_PORT, ENQUIRY_TRAILER_DOCK_SH } from 'assets/constant'
import NumberBox from 'components/number-box/number-box'
export default {
  components: {
    NumberBox
  },
  data () {
    return {
      searchParams: {
        selectMode: 'fuzzy',
        addressAll: '',
        dock: '',
        startPort: '',
        cont20gp: '',
        cont40gp: '',
        cont40hq: '',
        custClear: true,
        custClearAddr: '',
        nameCount: '',
        province: '',
        city: '',
        region: '',
        town: '',
        disabled: true
      },
      checked: true,
      dialogVisible: false,
      addrIndex: null,
      usualAddrList: [],
      startPortOption: ENQUIRY_TRAILER_START_PORT,
      dockOption: [],
      tpyeValue: ENQUIRY_TRAILER_DOCK_SH,
      verify: '',
      custClearAddrOption: [
        {
          label: '上海',
          value: 'SHANGHAI'
        },
        {
          label: '深圳',
          value: 'SHENZHEN',
          disabled: true
        },
        {
          label: '宁波',
          value: 'NINGBO',
          disabled: true
        },
        {
          label: '广州黄埔港',
          value: 'GUANGZHOUHPG',
          disabled: true
        },
        {
          label: '南京',
          value: 'NANJING',
          disabled: true
        },
        {
          label: '青岛',
          value: 'QINGDAO',
          disabled: true
        },
        {
          label: '广州南沙',
          value: 'GUANGZHOUNS',
          disabled: true
        }
      ],
      remoteAddressList: [],
      loading: false,
      unit1: 'x20GP',
      unit2: 'x40GP',
      unit3: 'x40HQ',
      cont20gp: '',
      cont40gp: '',
      cont40hq: '',
      address: '',
      province: '',
      city: '',
      region: '',
      town: ''
    }
  },
  computed: {},
  methods: {
    handleClose () {
      this.addrIndex = null
    },
    handleCancleDialog () {
      this.dialogVisible = false
    },
    handleClickDialog () {
      this.dialogVisible = false
      this.searchParams.address = this.usualAddrList[this.addrIndex].addr
      this.searchParams.province = this.usualAddrList[this.addrIndex].province
      this.searchParams.city = this.usualAddrList[this.addrIndex].city
      this.searchParams.region = this.usualAddrList[this.addrIndex].region
      this.town = this.usualAddrList[this.addrIndex].town
      this.searchParams.addressAll = this.searchParams.province + this.searchParams.city + this.searchParams.region + this.town
      this.searchParams.disabled = false
      this.showCascader = false
      this.$nextTick(() => {
        this.showCascader = true
      })
    },
    handleSelectAddress (val) {
      this.remoteAddressList.forEach(item => {
        if (item.formatted_address === val) {
          this.searchParams.province = item.province
          this.searchParams.city = item.city
          this.searchParams.region = item.region
        }
      })
    },
    handleChangearea (data) {
      this.province = data[0]
      this.city = data[1]
      this.region = data[2]
      this.town = data[3]
      let trailerAddress = this.province + ' ' + this.city + ' ' + this.region + ' ' + this.town
      this.searchParams.addressAll = trailerAddress
      this.searchParams.province = this.province
      this.searchParams.city = this.city
      this.searchParams.region = this.region
      this.searchParams.town = this.town
    },
    handleChangeVal1 (val) {
      this.searchParams.cont20gp = val ? parseInt(val) : ''
    },
    handleChangeVal2 (val) {
      this.searchParams.cont40gp = val ? parseInt(val) : ''
    },
    handleChangeVal3 (val) {
      this.searchParams.cont40hq = val ? parseInt(val) : ''
    },
    handleFetchUsualAddr () {
      getTruckZxmdsHistory()
        .then(res => {
          if (res && res.msg === 'success') {
            // res.data.records.push({
            //   city: '苏州市',
            //   province: '江苏省',
            //   region: '吴中区',
            //   town: '25产业园'
            // })
            this.usualAddrList = res.data && (res.data.records || [])
            if (this.usualAddrList.length > 0) {
              this.dialogVisible = true
            } else {
              this.$message.warning('您还没有历史询价地址')
            }
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          this.$message.error(err)
          console.error(err)
        })
    },
    fetchTruckEnquiryList (val) {
      getTruckAddrQuery({ param: val })
        .then(res => {
          if (res && res.msg === 'success') {
            this.remoteAddressList = res.data && (res.data.records || [])
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    handleClickSearch () {
      if (this.validityInquire()) return
      this.searchParams.cont20gp = this.searchParams.cont20gp ? parseInt(this.searchParams.cont20gp) : ''
      this.searchParams.cont40gp = this.searchParams.cont40gp ? parseInt(this.searchParams.cont40gp) : ''
      this.searchParams.cont40hq = this.searchParams.cont40hq ? parseInt(this.searchParams.cont40hq) : ''
      this.$emit('onsearch', this.searchParams)
    },
    async remoteFetchAddressList (query) {
      if (query !== '') {
        this.loading = true
        await this.fetchTruckEnquiryList(query)
        this.loading = false
      }
    },
    show (data) {
      if (data !== 'history') {
        this.searchParams.disabled = true
      }
      if (data === 'precise') {
        this.searchParams.addressAll = ''
      }
    },
    btncustClear (val) {
      if (undefined === val) {
        val = true
      }
      this.$emit('on-change', val)
    },
    call (val) {
      if (val === 'SHANGHAI') {
        this.dockOption = this.tpyeValue
        this.verify = 'SHANGHAI'
      } else {
        this.dockOption = []
        this.dock = ''
        this.verify = ''
      }
    },
    validityInquire () {
      if (!this.searchParams.addressAll) {
        this.$message.error('地址不能为空')
        return true
      }
      if (!this.searchParams.startPort) {
        this.$message.error('港口不能为空')
        return true
      }
      if (!this.searchParams.dock && this.verify === 'SHANGHAI') {
        this.$message.error('码头不能为空')
        return true
      }
      return false
    }
  },
  created () { },
  mounted () {
  },
  watch: {
    searchParams: {
      handler (nv) {
        if (!nv.disabled) {
          nv.selectMode = 'history'
        }
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.query-form {
  width: 100%;

  .el-form {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .query-form-item {
    font-size: 12px;
    color: #353535;
    font-weight: 500;
    line-height: 14px;

    >>>.el-form-item__content {
      display: flex;
      align-items: center;

      .select-small {
        width: 86px;
        margin-right: 15px;
      }

      .address-btn {
        display: flex;
        align-items: center;
        background: #f0f2f5;
        border-radius: 16px;
        padding: 0 16px;

        .btn-p {
          margin-left: 15px;
        }

        .el-icon-time {
          color: #fbb03b;
        }
      }

      .address-box {
        width: 100%;
        margin-right: 15px;
        color: #DCDFE6;
      }

      .area-select {
        width: 100%;

        .area-selected-trigger {
          padding: 0 20px;
        }
      }

      .number-box {
        width: 160px;
      }

      .el-checkbox__inner {
        border-radius: 50%;
        overflow: hidden;
        background: transparent;
        border: 1px solid #fbb03b;

        &::after {
          width: 8px;
          height: 8px;
          border: 0;
          left: 2px;
          top: 2px;
          background: #fbb03b;
          border-radius: 50%;
        }
      }

      .el-button {
        width: 160px;
      }
    }
  }

  .item-label {
    >>>.el-form-item__label {
      width: 68px;
    }
  }
}

>>>.btn-box {
  display: inline-block;
}

>>>.cascader-menu-list .cascader-menu-option.selected {
  color: #fbb03b;
}

.search-item {
  width: 30%;
  min-width: 270px;
  position: relative;
  margin-right: 10px;

  >>>.el-form-item--small .el-form-item__label {
    font-size: 12px;
    color: #353535;
    font-weight: 500;
    line-height: 14px;
    display: inline-block;
    float: none;
    padding: 0 12px 10px 2px;
  }

  >>>.item-after .el-form-item__label::after {
    content: '*';
    color: red;
    font-size: 16px;
    padding-left: 5px;
    position: relative;
    top: 5px;
  }

  >>>.l .el-form-item__label::before {
    content: '*';
    color: red;
    position: relative;
    font-size: 16px;
    top: 4px;
    left: -3px;
  }

  >>>.erect .el-form-item__label::after {
    content: '|';
    position: relative;
    left: 10px;
  }

  .address-btn {
    position: absolute;
    top: -25px;
    left: 80px;
    font-size: 12px;
    cursor: pointer;
    height: 20px;
  }

  >>>.item-label .el-form-item__label {
    position: absolute;
    top: 0;
    left: 58px;
  }
  >>>.item-label1 .el-form-item__label {
    position: absolute;
    top: 2px;
    left: 74px;
    &:before {
      content: '|';
      position: relative;
      left: -10px;
    }
  }
  >>>.area-select .area-selected-trigger {
    color: #000;
  }
}

>>>.el-dialog-footer {
  width: 90%;
  text-align: center;
  position: absolute;
  bottom: 20px;
}

>>>.el-dialog--center .el-dialog__body {
  position: relative;
  min-height: 300px;
}

.el-select {
  width: 100%;
}

.search-query {
  background: #fbb03b;
  color: #ffffff;
}

.active {
  width: 45%;
}

.native {
  width: 92%;
}
</style>
