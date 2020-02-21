<template>
  <div class="shipbox">
    <div class="section">
      <div class="title">
        <h4 class="title-h4">船期信息</h4>
      </div>
      <div class="table-top">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClickTab">
          <el-tab-pane label="信息" name="message">
            <order-table :data="shiporderDataList" :columns="shipcolumns" :loading="loading" />
          </el-tab-pane>
          <el-tab-pane label="挂靠港" name="affiliated">
            <order-table :data="shiporderDataList" :columns="portsofcall" :loading="loading" />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="title">
        <h4 class="title-h4">箱货信息</h4>
      </div>
      <div class="table-bottom">
        <el-tabs v-model="boxactiveName" type="card" @tab-click="handleClickTab">
          <el-tab-pane label="信息" name="boxmsg">
            <order-table :data="orderDetail.containerList" :columns="boxColumns" :loading="loading" />
          </el-tab-pane>
          <el-tab-pane label="时间轴" name="timer">
            <order-table :data="orderDetail.containerList" :columns="timeLine" :loading="loading" />
          </el-tab-pane>
          <el-tab-pane label="离岸跟踪" name="tracking">
            <!-- <order-table
              :data="orderDetail.containerList"
              :columns="timeLine"
              :loading="loading"
              /> -->
            <el-table :data="orderDetail.containerList" height="150" border style="width: 100%">
              <el-table-column prop="containerNo" label="箱号">
              </el-table-column>
              <el-table-column prop="sealNo" label="铅封号">
              </el-table-column>
              <el-table-column label="件毛体">
                <template slot-scope="scope">
                  <div>
                    <span>{{scope.row.contItems}}/</span>
                    <span>{{scope.row.contGw}}/</span>
                    <span>{{scope.row.contVol}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="unloadPort" label="卸货港">
              </el-table-column>
              <el-table-column prop="arriveTime" width="90px" label="运抵时间">
              </el-table-column>
              <el-table-column prop="a3" width="90px" label="VGM时间">
              </el-table-column>
              <el-table-column prop="cusClearanceTime" width="90px" label="海放时间">
              </el-table-column>
              <el-table-column prop="dockOnTime" width="90px" label="码放时间">
              </el-table-column>
              <el-table-column prop="dockOn" label="配载">
              </el-table-column>
              <el-table-column prop="loadShipFlag" label="装船">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import orderTable from 'components/order-table/order-table'
import { timeFomatter } from 'utils/utils'
export default {
  components: {
    orderTable
  },
  props: {
    orderDetail: Object
  },
  data () {
    return {
      shiporderDataList: [],
      loading: false,
      activeName: 'message',
      boxactiveName: 'boxmsg',
      shipcolumns: [
        {
          label: '码头',
          prop: 'dock'
        },
        {
          label: '中文船名',
          prop: 'shipChinName'
        },
        {
          label: '英文船名',
          prop: 'shipName'
        },
        {
          label: '出口航次',
          prop: 'vesselNo'
        },
        {
          label: '开港时间',
          width: '90px',
          prop: 'containerInStart',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.containerInStart
                },
                style: {
                  color: 'red'
                }
              })
            ])
          }
        },
        {
          label: '截港时间',
          prop: 'containerInEnd',
          width: '90px',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.containerInEnd
                }
              })
            ])
          }
        },
        {
          label: '计划靠泊',
          width: '90px',
          prop: 'eta',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.eta
                }
              })
            ])
          }
        },
        {
          label: '计划离泊',
          width: '90px',
          prop: 'etd',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.etd
                }
              })
            ])
          }

        },
        {
          label: '实际靠泊',
          width: '90px',
          prop: 'aat',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.aat
                },
                style: {
                  color: 'red'
                }
              })
            ])
          }
        },
        {
          label: '实际离泊',
          width: '90px',
          prop: 'adt',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.adt
                }
              })
            ])
          }
        },
        {
          label: '船代理简称',
          prop: 'shipProxyName'
        },
        {
          label: '船公司代码',
          prop: 'shipCompanyCode'
        },
        {
          label: '船期状态',
          prop: 'shipStatus'
        }
      ],
      portsofcall: [
        {
          label: 'KRKAN',
          prop: ''
        },
        {
          label: 'KRUSN',
          prop: ''
        },
        {
          label: 'KRPUS',
          prop: ''
        }
      ],
      boxColumns: [
        {
          label: '箱号',
          prop: 'containerNo'
        },
        {
          label: '铅封号',
          prop: 'sealNo'
        },
        {
          label: '件毛体',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.contItems ? params.row.contItems + '/' : ''
                }
              }),
              h('span', {
                domProps: {
                  innerText: params.row.contGw ? params.row.contGw + '/' : ''
                }
              }),
              h('span', {
                domProps: {
                  innerText: params.row.contVol
                }
              })
            ])
          }
        },
        {
          label: '卸货港',
          prop: 'unloadPort'
        },
        {
          label: '运抵',
          prop: 'arriveFlag'
        },
        {
          label: 'VGM',
          prop: 'vgmWeight'
        },
        {
          label: '海放',
          prop: 'cusClearanceFlag'
        },
        {
          label: '码放',
          prop: 'dockOn'
        },
        {
          label: '配载',
          prop: 'distribute'
        },
        {
          label: '装船',
          prop: 'loadShipFlag',
          fixed: 'right'
        }
      ],
      timeLine: [
        {
          label: '箱号',
          prop: 'containerNo'
        },
        {
          label: '铅封号',
          prop: 'sealNo'
        },
        {
          label: '件毛体',
          render: (h, params) => {
            return h('div', [
              h('span', {
                domProps: {
                  innerText: params.row.contItems ? params.row.contItems + '/' : ''
                }
              }),
              h('span', {
                domProps: {
                  innerText: params.row.contGw ? params.row.contGw + '/' : ''
                }
              }),
              h('span', {
                domProps: {
                  innerText: params.row.contVol
                }
              })
            ])
          }
        },
        {
          label: '卸货港',
          prop: 'unloadPort'
        },
        {
          label: '运抵时间',
          width: '90px',
          prop: 'arriveTime'
        },
        {
          label: 'VGM时间',
          width: '90px',
          prop: 'a3'
        },
        {
          label: '海放时间',
          width: '90px',
          prop: 'cusClearanceTime'
        },
        {
          label: '码放时间',
          width: '90px',
          prop: 'dockOnTime'
        },
        {
          label: '配载时间',
          width: '90px',
          prop: 'distributeTime'
        },
        {
          label: '装船时间',
          width: '90px',
          prop: 'a5',
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    handleClickCheckList () {
      this.checkListDialog = true
    },
    handleClickTab (tab) {
      if (tab.name === 'message') {
        // this.fetchTruckInprogress()
      } else if (tab.name === 'affiliated') {
        // this.fetchTruckPendingsync()
      } else if (tab.name === 'boxmsg') {
        // this.fetchTruckPendingsync()
      } else if (tab.name === 'timer') {
        // this.fetchTruckPendingsync()
      } else if (tab.name === 'tracking') {
        // this.fetchTruckPendingsync()
      }
    },
    timeCycle () {
      this.shiporderDataList = this.orderDetail.shipPlan ? [this.orderDetail.shipPlan] : []
      let orderList = this.shiporderDataList
      orderList.map(item => {
        if (item.containerInStart) {
          item.containerInStart = timeFomatter(item.containerInStart, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.containerInEnd) {
          item.containerInEnd = timeFomatter(item.containerInEnd, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.eta) {
          item.eta = timeFomatter(item.eta, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.etd) {
          item.etd = timeFomatter(item.etd, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.adt) {
          item.adt = timeFomatter(item.adt, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.aat) {
          item.aat = timeFomatter(item.aat, 'yyyy/MM/dd hh:mm', true)
        }
        return item
      })
      let tainerList = this.orderDetail.containerList
      tainerList.map(item => {
        if (item.arriveTime) {
          item.arriveTime = timeFomatter(item.arriveTime, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.cusClearanceTime) {
          item.cusClearanceTime = timeFomatter(item.cusClearanceTime, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.dockOnTime) {
          item.dockOnTime = timeFomatter(item.dockOnTime, 'yyyy/MM/dd hh:mm', true)
        }
        if (item.distributeTime) {
          item.distributeTime = timeFomatter(item.distributeTime, 'yyyy/MM/dd hh:mm', true)
        }
        return item
      })
    }
  },
  mounted () {
    this.timeCycle()
  }
}
</script>
<style lang="stylus" scoped>
.shipbox {
  width: 100%;
  background: #F0F2F5;
  overflow: hidden;
  padding: 0px;
  box-sizing: border-box;

  .section {
    width: 100%;
    position: relative;
    background: #ffffff;
    overflow: hidden;

    .step-info {
      margin-top: 50px;
    }

    .title {
      width: 90%;
      margin: 0 auto;
      padding: 21px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-h4 {
        color: #000;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  .table-top, .table-bottom {
    width: 90%;
    margin: 0 auto;
    min-height: 152px;
  }

  >>>.el-tabs__header {
    margin: 0;
  }
}

>>>.el-tabs__nav {
  width: auto;
}
</style>
