<template>
  <div class="Trailer">
    <div class="import-content" ref="dom" v-if="!fullScreenMap">
      <search-form :searchColumns="searchColumns" ref="search" :userRoles="userRoles" @on-search="handleClickSearch" />
      <order-table :data="orderDataList" :columns="columns" :loading="loading" :action="action" />
      <div class="page-wrap">
        <OrderPagination :total="total" :size="orderParams.size" v-model="orderParams.page" :pageName="pageName" prevText="上一页" nextText="下一页" />
      </div>
    </div>
    <div class="import-map" :style="styleMap">
      <div class="map-box" :class="{'full-screen': fullScreenMap, 'map-box-h': !transferInfoResult.shipName}">
        <div class="map-position" :class="{'map-position-h':  !transferInfoResult.shipName}" :style="{'height': cHeight}">
          <div class="full-screen-btn" @click="handleFullScreenMap"></div>
          <!-- <view-sea class="map-box-content" :pShipName="shipName" :importView="true"></view-sea> -->
          <view-sea class="map-box-content" :mapWidth="width" :mapHeight="cHeight" :first="first" v-if="mapBoxgl" :locationVO="locationVO"></view-sea>
        </div>
      </div>
      <div class="map-box height" v-if="transferInfoResult.shipName && !fullScreenMap">
        <div class="map-box-title">航线详情</div>
        <div class="map-box-step">
          <import-order-steps :transferInfoResult="transferInfoResult"></import-order-steps>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ViewSea from 'components/map-boxgl/map-boxgl-truck'
import orderTable from 'components/order-table/order-table'
import OrderPagination from 'components/pagination/pagination'
import { getTruckLocation, getTruckOrderList } from 'api/truck'
import searchForm from 'components/search-form/search-form'
import { mapGetters } from 'vuex'
import { timeFomatter } from 'utils/utils'
import { setTimeout } from 'timers'
const PAGE = 'trailerOrder'
export default {
  name: 'trailerOrder',
  components: {
    orderTable,
    ViewSea,
    OrderPagination,
    searchForm
  },
  props: {},
  data () {
    return {
      styleMap: {
        height: '100%'
      },
      width: '320px',
      height: 'calc(100vh - 264px)',
      first: true,
      mapBoxgl: true,
      eta: '',
      fullScreenMap: false,
      total: 0,
      orderParams: {
        page: Number(window.sessionStorage.getItem('currentPage')) || 1,
        size: 12
      },
      pageName: PAGE,
      orderDataList: [],
      loading: true,
      locationVO: [],
      initData: '',
      columns: [
        {
          label: '订单编号',
          width: '130px',
          render: (h, params) => {
            let self = this
            return h('p', {
              class: {
                'job-number': true
              },
              style: {
                color: '#fbb03b',
                cursor: 'pointer'
              },
              domProps: {
                innerText: params.row.jobNo
              },
              on: {
                click: function () {
                  self.fetchTruckMapData(params.row.jobNo)
                }
              }
            })
          }
        },
        // {
        //   label: '业务类型',
        //   prop: 'ywdm',
        //   dataItem: ''
        // },
        {
          label: '订单状态',
          prop: 'orderStatus'
        },
        {
          label: '门点地址',
          prop: 'zxmdAddr'
        },
        {
          label: '门点简称',
          prop: 'zxmdCode'
        },
        {
          label: '提单号',
          prop: 'billNo'
        },
        {
          label: '箱型箱量',
          prop: 'totalXxxl'
        },
        {
          label: '船名航次',
          prop: 'shipNameVesselNo'
        },
        {
          label: '港口港区',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.startPort
                }
              }),
              h('span', {
                domProps: {
                  innerText: params.row.dock
                }
              })
            ])
          }
        },
        {
          label: '目的地',
          prop: 'targetPort'
        },
        {
          label: '中转港',
          prop: 'transitPort'
        },
        {
          label: '进港时间',
          prop: 'portOpenTime',
          width: '90px'
        },
        {
          label: '开船时间',
          prop: 'shipLeaveTime',
          width: '90px'
        },
        {
          label: '下单时间',
          prop: 'createTime',
          width: '90px'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '110px',
          render: (h, params) => {
            let self = this
            return h('div', [
              h('el-button', {
                class: {
                  'order-btn': true
                },
                props: {
                  type: 'text'
                },
                domProps: {
                  innerText: '查看'
                },
                on: {
                  click: function () {
                    self.showDetail('truckOrderDetail', params.row.jobNo)
                  }
                }
              }),
              h('el-button', {
                class: {
                  'order-btn': true
                },
                props: {
                  type: 'text'
                },
                style: {
                  color: this.orderDataList.custClear ? '#fbb03b' : '#c0c4cc'
                },
                domProps: {
                  innerText: '报关订单'
                },
                on: {
                  click: function () {
                    self.quickOrder('declareOrderDetail', params.row.customerNo)
                  }
                }
              })
            ])
          }
        }
      ],
      action: {},
      transferInfoResult: {},
      searchColumns: [
        {
          type: 'input',
          text: '订单编号',
          prop: 'jobNo',
          value: ''
        },
        {
          type: 'input',
          text: '船名',
          prop: 'shipName',
          value: ''
        },
        {
          type: 'input',
          text: '航次',
          prop: 'vesselNo',
          value: ''
        }
      ]
    }
  },
  computed: {
    cHeight: {
      get: function () {
        return this.height
      },
      set: function (newValue) {
        let h = ''
        if (newValue) {
          h = newValue
        } else if (!this.transferInfoResult.shipName) {
          h = 'calc(100vh - 264px)'
        }
        this.height = h
      }
    },
    ...mapGetters(['userRoles'])
  },
  methods: {
    handleFullScreenMap () {
      this.mapBoxgl = false
      this.fullScreenMap = !this.fullScreenMap
      this.width = '100vw'
      if (this.fullScreenMap) {
        this.height = 'calc(100vh - 264px)'
        this.$nextTick(() => {
          this.mapBoxgl = true
        })
      } else {
        setTimeout(() => {
          this.mapBoxgl = true
          this.height = this.$refs.dom.offsetHeight + 'px'
        }, 200)
      }
      this.first = false
    },
    showDetail (pathName, jobNo) {
      this.$router.push({ name: pathName, params: { jobNo: jobNo } })
    },
    fetchQueryTrailer (params) {
      getTruckOrderList(params)
        .then(res => {
          if (res.msg === 'success') {
            this.orderDataList = []
            let orderList = (res.data && res.data.records) || []
            orderList.map(item => {
              if (item.portOpenTime) {
                item.portOpenTime = timeFomatter(item.portOpenTime, 'yyyy/MM/dd hh:mm:ss', true)
              }
              if (item.createTime) {
                item.createTime = timeFomatter(item.createTime, 'yyyy/MM/dd hh:mm:ss', true)
              }
              if (item.shipLeaveTime) {
                item.shipLeaveTime = timeFomatter(item.shipLeaveTime, 'yyyy/MM/dd hh:mm:ss', true)
              }
              return item
            })
            this.total = res.data && res.data.total
            this.sortKey(orderList, 'createTime')
            this.orderDataList = orderList
            this.loading = false
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    sortKey (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return x > y ? -1 : x < y ? 1 : 0
      })
    },
    // 地图接口 参数可传 可不传
    fetchTruckMapData (val) {
      getTruckLocation({ jobNos: val })
        .then(res => {
          if (res && res.msg === 'success') {
            this.locationVO = res.data && (res.data.records || [])
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    handleClickSearch (params) {
      this.fetchQueryTrailer(params)
    },
    // 点击跳转报关详情页
    quickOrder (pathName, customerNo) {
      if (this.orderDataList.custClear && customerNo) {
        this.$router.push({ name: pathName, params: { customerNo: customerNo } })
      }
    }
  },
  mounted () {
    this.mapBoxgl = false
    setTimeout(() => {
      this.mapBoxgl = true
      this.height = this.$refs.dom.offsetHeight + 'px'
    }, 200)
  },
  watch: {
    orderParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          this.fetchQueryTrailer(this.orderParams)
        } else {
          this.fetchQueryTrailer(nv)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.Trailer {
  width: 100%;
  background: #f0f2f5;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  display: flex;

  .import-content {
    flex: 7;
    background: #ffffff;
    margin-right: 20px;
    overflow: scroll;
    padding: 30px 20px 20px;
  }

  .import-map {
    flex: 3;
    overflow-y: scroll;
    height: 100%;
    min-height: calc(100vh - 124px);

    .map-box {
      background: #ffffff;
      padding: 30px 20px;
      box-sizing: border-box;
      height: 50vh;

      &:nth-child(2) {
        margin-top: 14px;
      }

      .map-position {
        position: relative;
        height: calc(50vh - 130px);
      }

      .map-position-h {
        height: calc(100vh - 264px);
      }

      .full-screen-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        background: url('./img/btn.png') no-repeat center / 100%;
        cursor: pointer;
        z-index: 99;
      }

      .map-box-title {
        font-size: 14px;
        font-weight: bold;
        color: #353535;
        margin-bottom: 14px;
      }

      .map-box-line {
        display: flex;
        align-items: flex-start;

        .line-icon {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #F6AB39;
          margin-right: 14px;
        }

        .line-text {
          p {
            font-size: 12px;
            color: #353535;
            font-weight: bold;

            &:last-child {
              margin-top: 14px;
            }
          }
        }
      }

      .map-box-content {
        height: 320px;
        margin-top: 20px;
      }
    }

    .height {
      height: auto;
    }

    .map-box-h {
      height: 100%;
    }

    .full-screen {
      height: calc(100vh - 122px) !important;

      .map-box-content {
        height: calc(100vh - 182px) !important;
        margin-top: 0;
      }
    }
  }

  .page-wrap {
    background: #fff;
  }
}

.job-number {
  cursor: pointer !important;
}

>>>.el-button--text {
  color: #FBB03B;
}

>>>.search .search-form .search-item .search-term {
  width: auto;
}
</style>
