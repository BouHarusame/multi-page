<template>
  <div class="trailer-inquiry">
    <query-from @onsearch="fetchTruckOfferList" @on-change="handleChangeRadio"></query-from>
    <query-table @onOrder="handleClickOrder" :showCustFee="showCustFee" :truckOrderList="truckOrderList"></query-table>
    <OrderPagination styleType="border" :total="total" :size="orderParams.size" v-model="orderParams.page" prevText="上一页" nextText="下一页"></OrderPagination>
  </div>
</template>

<script>
import { getTruckAddr, getTruckPrice } from 'api/inquiry'
import { getTruckDraftsCount } from 'api/truck'
import { mapMutations } from 'vuex'
import QueryFrom from './components/query-from'
import QueryTable from './components/query-table'
import { ENQUIRY_TRAILER_DOCK_SH } from 'assets/constant'
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
      dockOption: [],
      truckOrderList: [],
      trailerList: [],
      showCustFee: true,
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
          Object.assign(this.DISTRICTS, res.data)
        }
        if (res.msg === 'fail') {
          this.$message.error(res.verror)
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    this.dockOption = ENQUIRY_TRAILER_DOCK_SH
    this.fetchTruckDraft()
  },
  methods: {
    ...mapMutations('menu', {
      setDraftCount: 'SET_DRAFT_COUNT'
    }),
    handleChangeRadio (val) {
      this.showCustFee = val
    },
    // 获取拖车订单草稿数量
    fetchTruckDraft () {
      getTruckDraftsCount()
        .then(res => {
          if (res && res.msg === 'success') {
            sessionStorage.setItem('truckDraftsCount', res.data.count)
            this.setDraftCount(res.data.count)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    fetchTruckOfferList (params) {
      getTruckPrice(params)
        .then(res => {
          if (res.msg === 'success') {
            this.truckOrderList = res.data && (res.data.records || [])
            if (this.truckOrderList.length === 0) {
              this.$message.warning('未匹配到相应数据')
            }
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    // 获取拖车价格
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
    handleClickOrder (row) {
      this.$router.push({ name: 'trailerConfirm', params: { row } })
    }
  },
  components: {
    QueryFrom,
    QueryTable,
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
        // font-family 'PingFang-SC-Medium'
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
