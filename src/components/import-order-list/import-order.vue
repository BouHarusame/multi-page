<template>
  <div class="import-order">

    <div class="import-content" v-if="!fullScreenMap" ref="content">
      <div class="search-conditions">
        <el-form inline
              size="small"
              class="search-form"
              >
          <template v-if="isAnycase">
             <el-form-item v-for="(c, i) in searchColumnsAC"
                      :class="c.className"
                      :key="i">
              <div class="search-item">
                <template v-if="c.type === 'select'">
                  <template v-if="c.filterable">
                    <span class="search-term">{{c.text}}</span>
                    <el-select clearable
                              popper-class="si-select-list"
                              :filterable="c.filterable"
                              v-model="c.value"
                              :remote="c.remote"
                              @clear="handleClear(c.optionsName)"
                              @focus="(visible) => { handleVisible(visible, c.request, c.optionsName)}"
                              :remote-method="(visible) => { handleVisible(visible, c.request, c.optionsName)}"
                              placeholder="请选择">
                      <el-option v-for="(cc, ii) in getOptions(c.optionsName)"
                                :key="ii"
                                :value="c.formatValue(cc)"
                                :label="c.formatLabel(cc)"></el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <span class="search-term">{{c.text}}</span>
                    <el-select v-model="c.value"
                              clearable
                              placeholder="请选择"
                              :style="{width: c.width + 'px'}"
                              size="small">
                      <el-option v-for="item in c.dataItem"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </template>
                <template v-else-if="c.type === 'date'">
                  <span class="search-term" :class="c.class">{{c.text}}</span>
                  <el-date-picker v-model="c.value"
                                  type="date"
                                  placeholder="选择日期"
                                  size="small">
                  </el-date-picker>
                </template>
                <template v-else-if="c.type === 'input'">
                  <span class="search-term">{{c.text}}</span>
                  <el-input v-model="c.value"
                            clearable
                            :placeholder="c.placeholder"
                            style="width: 120px;margin:"></el-input>
                </template>
                <template v-else>
                  <el-checkbox v-model="c.value">{{c.text}}</el-checkbox>
                </template>
              </div>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item v-for="(c, i) in searchColumns"
                      :class="c.className"
                      :key="i">
              <div class="search-item">
                <template v-if="c.type === 'select'">
                  <template v-if="c.filterable">
                    <span class="search-term">{{c.text}}</span>
                    <el-select clearable
                              popper-class="si-select-list"
                              :filterable="c.filterable"
                              v-model="c.value"
                              :remote="c.remote"
                              @clear="handleClear(c.optionsName)"
                              @focus="(visible) => { handleVisible(visible, c.request, c.optionsName)}"
                              :remote-method="(visible) => { handleVisible(visible, c.request, c.optionsName)}"
                              placeholder="请选择">
                      <el-option v-for="(cc, ii) in getOptions(c.optionsName)"
                                :key="ii"
                                :value="c.formatValue(cc)"
                                :label="c.formatLabel(cc)"></el-option>
                    </el-select>
                  </template>
                  <template v-else>
                    <span class="search-term">{{c.text}}</span>
                    <el-select v-model="c.value"
                              clearable
                              placeholder="请选择"
                              :style="{width: c.width + 'px'}"
                              size="small">
                      <el-option v-for="item in c.dataItem"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </template>
                <template v-else-if="c.type === 'date'">
                  <span class="search-term" :class="c.class">{{c.text}}</span>
                  <el-date-picker v-model="c.value"
                                  type="date"
                                  placeholder="选择日期"
                                  size="small">
                  </el-date-picker>
                </template>
                <template v-else-if="c.type === 'input'">
                  <span class="search-term">{{c.text}}</span>
                  <el-input v-model="c.value"
                            clearable
                            :placeholder="c.placeholder"
                            style="width: 120px"></el-input>
                </template>
                <template v-else>
                  <el-checkbox v-model="c.value">{{c.text}}</el-checkbox>
                </template>
              </div>
            </el-form-item>
          </template>
        <el-form-item>
          <div class="search-item">
            <el-button class="search-btn"
                      size="small"
                      @click="handleClickSearch">查询</el-button>
          </div>
        </el-form-item>
      </el-form>
      </div>
      <div class="search-content">
        <order-table :data="orderDataList"
                    v-if="isAnycase"
                    :columns="columnsAC"
                    :action="action"
                    :loading="loading"
                    :refType="refType"
                    :userRoles="userRoles" />
        <order-table :data="orderDataList"
                    v-else
                    :columns="columns"
                    :action="action"
                    :loading="loading"
                    :refType="refType"

                    :userRoles="userRoles" />

        <div class="page-wrap">
          <OrderPagination styleType="border"
                          :total="total"
                          :size="orderParams.size"
                          v-model="orderParams.page"
                          :pageName="pageName"
                          prevText="上一页"
                          nextText="下一页" />
        </div>
      </div>
    </div>

    <div class="import-map" :style="styleMap">
      <div class="map-box" :class="{'full-screen': fullScreenMap, 'map-box-h': !transferInfoResult.shipName}" >
        <div class="map-box-title" v-if="!fullScreenMap">当前状态</div>
        <div class="map-box-line" v-if="!fullScreenMap">
          <div class="line-icon"></div>
          <div class="line-text">
            <p>至上海港途中</p>
            <p>预计到港时间：<span>{{eta}}</span></p>
          </div>
        </div>

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
import { getTransferMsg, orderQuick, getImportOrderlist, getOrderCompList } from 'api/order'
import ViewSea from 'components/map-boxgl/map-boxgl'
import ImportOrderSteps from './import-order-steps'
import { MODES_OF_TRANSPORT } from 'assets/constant'
import orderTable from 'components/order-table/order-table'
import OrderPagination from 'components/pagination/pagination'
import { mapGetters } from 'vuex'
import { roleType, getLocalStorage } from 'utils/utils'
const PAGE = 'importOrder'
export default {
  name: 'importOrder',
  data () {
    return {
      styleMap: {
        height: '100%'
      },
      width: '320px',
      height: 'calc(100vh - 264px)',
      first: true,
      loading: true,
      mapBoxgl: true,
      refType: 'singleTable',
      total: 0,
      className: 'search-dc-form',
      orderParams: {
        page: Number(window.sessionStorage.getItem(PAGE + 'currentPage')) || 1,
        size: 12
      },
      eta: '',
      transferInfoResult: {},
      locationVO: {},
      fullScreenMap: false,
      searchColumnsAC: [
        {
          type: 'input',
          text: '业务编号',
          placeholder: '请输入AC编号/康泰编号',
          prop: 'quoteNo',
          value: ''
        },
        {
          type: 'input',
          text: '提单号',
          prop: 'billNo',
          value: ''
        },
        // {
        //   type: 'date',
        //   text: '离港日期',
        //   class: 'search-date',
        //   prop: 'leftPortTime'
        // },
        {
          type: 'select',
          text: '客户名称',
          filterable: true,
          optionsName: 'compCodeKt',
          request: getOrderCompList,
          remote: true,
          formatValue (cc) {
            return cc.compCodeKt
          },
          formatLabel (cc) {
            return `${cc.compNameAc}(${cc.compCodeKt})`
          },
          prop: 'compCodeKt',
          value: ''
        },
        {
          type: 'date',
          text: '到港日期',
          prop: 'arrivePortTime',
          value: ''
        },
        {
          type: 'select',
          text: '业务类型',
          prop: 'transferWay',
          dataItem: MODES_OF_TRANSPORT,
          value: ''
        }
      ],
      searchColumns: [
        {
          type: 'input',
          text: '业务编号',
          placeholder: '请输入业务编号',
          prop: 'quoteNo',
          value: ''
        },
        {
          type: 'input',
          text: '提单号',
          prop: 'billNo',
          value: ''
        },
        // {
        //   type: 'date',
        //   text: '离港日期',
        //   class: 'search-date',
        //   prop: 'leftPortTime'
        // },
        {
          type: 'date',
          text: '到港日期',
          prop: 'arrivePortTime',
          value: ''
        },
        {
          type: 'select',
          text: '业务类型',
          prop: 'transferWay',
          dataItem: MODES_OF_TRANSPORT,
          value: ''
        }
      ],
      busType: [],
      columnsAC: [
        {
          label: '业务编号（AC编号/康泰编号）',
          prop: 'quoteNoShowAc',
          width: '260',
          tooltip: true,
          render: (h, params) => {
            let self = this
            return h('p', {
              class: {
                'job-number': true
              },
              domProps: {
                innerText: params.row.quoteNoShowAc
              },
              on: {
                click: function () {
                  self.handleFetchShipMessage(params.row.quoteNo)
                }
              }
            })
          }
        },
        {
          label: '提单号',
          width: '150',
          prop: 'billNo'
        },
        {
          label: '客户名称',
          width: '160',
          prop: 'compInfo'
        },
        {
          label: '业务类型',
          prop: 'transferWay',
          width: '120'
        },
        {
          label: '起运港',
          prop: 'startPort',
          width: '140'
        },
        {
          label: '目的港',
          width: '80',
          prop: 'targetPort'
        },
        // {
        //   label: '离港日期',
        //   prop: 'adt',
        //   width: '180'
        // },
        {
          label: '到港日期',
          prop: 'aat',
          width: '190'
        },
        {
          label: '销售',
          prop: 'importXsName',
          width: '100'
        },
        {
          label: '品类',
          prop: 'goodsType'
        },
        {
          label: '数量',
          prop: 'goodsCount'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '80',
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
                    self.showDetail('importOrderDetail', params.row.quoteNo)
                  }
                }
              })
            ])
          }
        }
      ],
      columns: [
        {
          label: '业务编号',
          prop: 'quoteNoShowDc',
          width: '200',
          tooltip: true,
          render: (h, params) => {
            let self = this
            return h('p', {
              class: {
                'job-number': true
              },
              domProps: {
                innerText: params.row.quoteNoShowDc
              },
              on: {
                click: function () {
                  self.handleFetchShipMessage(params.row.quoteNo)
                }
              }
            })
          }
        },
        {
          label: '提单号',
          width: '160',
          prop: 'billNo'
        },
        {
          label: '业务类型',
          prop: 'transferWay',
          width: '120'
        },
        {
          label: '起运港',
          prop: 'startPort',
          width: '140'
        },
        {
          label: '目的港',
          prop: 'targetPort'
        },
        // {
        //   label: '离港日期',
        //   prop: 'adt',
        //   width: '180'
        // },
        {
          label: '到港日期',
          prop: 'aat',
          width: '190'
        },
        {
          label: '销售',
          prop: 'importXsName',
          width: '100'
        },
        {
          label: '品类',
          prop: 'goodsType'
        },
        {
          label: '数量',
          prop: 'goodsCount'
        },
        {
          label: '操作',
          fixed: 'right',
          width: '140',
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
                    self.showDetail('importOrderDetail', params.row.quoteNo)
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
                domProps: {
                  innerText: '再来一单'
                },
                on: {
                  click: function () {
                    self.quickOrder(params.row.quoteNo)
                  }
                }
              })
            ])
          }
        }
      ],
      action: {},
      orderDataList: [],
      pageName: PAGE,
      isAnycase: ''
    }
  },
  computed: {
    cHeight: {
      get: function () {
        return this.height
      },
      // setter
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
    showDetail (pathName, quoteNo) {
      this.$router.push({ name: pathName, params: { quoteNo: quoteNo } })
    },
    handleClear (optionsName) {
      this[optionsName] = []
    },
    getOptions (optionsName) {
      // console.log(1111, this[optionsName])
      return this[optionsName]
    },
    handleFetchShipMessage (quoteNo) {
      getTransferMsg(quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            const { dock, billNo, shipName, shipCompanyName, eta, compName, address, locationVO } = res.data
            this.transferInfoResult = { dock, billNo, shipName, shipCompanyName, eta, compName, address }
            this.eta = locationVO[0] ? locationVO[0].eta : ''
            if (locationVO) {
              this.locationVO = { ...locationVO[0] }
            } else {
              this.locationVO = {}
            }
            // console.log(this.locationVO)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleFullScreenMap () {
      this.mapBoxgl = false
      this.fullScreenMap = !this.fullScreenMap
      this.width = '1000px'

      this.height = this.styleMap.height - 150 + 'px'
      this.first = false
      this.$nextTick(() => {
        this.mapBoxgl = true
      })
    },
    handleVisible (visible, request, optionsName) {
      if (visible) {
        this.loading = true
        request({ param: visible })
          .then(res => {
            if (res && res.msg === 'success') {
              this[optionsName] = res.data.records || []
            }
            if (res && res.msg === 'fail') {
              this.$message.error(res.verror)
            }
            this.loading = false
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    quickOrder (quoteNo) {
      orderQuick({ quoteNo })
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('下单成功')
            this.getImportOrder(this.orderParams)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleClickSearch () {
      if (this.isAnycase) {
        this.searchColumnsAC.forEach(item => {
          if (item.prop === 'arrivePortTime') {
            this.orderParams[item.prop] = item.value ? new Date(item.value).getTime() : ''
          } else {
            this.orderParams[item.prop] = item.value ? item.value : ''
          }
        })
      } else {
        this.searchColumns.forEach(item => {
          if (item.prop === 'arrivePortTime') {
            this.orderParams[item.prop] = item.value ? new Date(item.value).getTime() : ''
          } else {
            this.orderParams[item.prop] = item.value ? item.value : ''
          }
        })
      }

      // console.log('查询条件', this.orderParams)
      this.getImportOrder(this.orderParams)
    },
    getImportOrder (params) {
      getImportOrderlist({ params })
        .then(res => {
          if (res.msg === 'success') {
            // let orderList = (res.data && res.data.records) || []
            let orderDataList = (res.data && res.data.records) || []
            orderDataList.map(item => {
              if (item.transferWay) {
                MODES_OF_TRANSPORT.forEach(m => {
                  if (m.value === item.transferWay) {
                    item.transferWay = m.label
                  }
                })
              } else {
                item.aat = item.aat ? new Date(item.aat).toLocaleDateString() : ''
                item.adt = item.adt ? new Date(item.adt).toLocaleDateString() : ''
              }
            })
            this.orderDataList = orderDataList
            this.total = (res.data && res.data.total) || 0
            this.loading = false
            this.mapBoxgl = false
            this.$nextTick(() => {
              this.styleMap.height = this.$refs.content.offsetHeight + 'px'
              if (this.$refs.content.offsetHeight > document.documentElement.clientHeight - 130) {
                this.cHeight = this.$refs.content.offsetHeight - 150 + 'px'
                this.mapBoxgl = true
              }
            })
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  },
  mounted () {
    let userRoles = this.userRoles || getLocalStorage('user_roles') ? JSON.parse(getLocalStorage('user_roles')) : []
    this.isAnycase = roleType(userRoles, 'AC')
    if (userRoles.indexOf('AC_IMPORT_XS') > -1) {
      let DIndex = null
      this.columnsAC.forEach((item, index) => {
        if (item.prop === 'importXsName') {
          DIndex = index
        }
      })
      this.columnsAC.splice(DIndex, 1)
      // console.log(this.columns)
    }
  },
  components: {
    orderTable,
    OrderPagination,
    ViewSea,
    ImportOrderSteps
  },
  watch: {
    orderParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          this.getImportOrder(this.orderParams)
        } else {
          this.getImportOrder(nv)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.import-order
  width 100%
  background #f0f2f5
  overflow hidden
  box-sizing border-box
  padding 0
  display flex
  // align-items flex-start
  .search-conditions
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between
    .search-form
      display flex
      align-item center
      flex-wrap wrap
      >>>.el-form-item__content
        width 100%
      .el-form-item
        width 28%
        margin-left 8%
        margin-right 0!important
        &:nth-child(3n+1)
          margin-left 0%
        >>> .el-input
          width 100%!important
    .search-item
      display flex
      line-height 40px
      margin-bottom 15px
      >>>.el-input__inner
        font-size 12px
      .search-term
        display inline-block
        width 80px
        font-size 12px
        color #424242
        margin-right 5px
      >>>.el-select
        width 100%
      .search-date
        width 142px
    .right
      flex-grow 1
      text-align right
  .import-content
    flex 7
    background #ffffff
    margin-right 20px
    overflow scroll
    padding 30px 20px 20px
  .import-map
    flex 3
    overflow-y scroll

    height 100%
    min-height calc(100vh - 124px)
    .map-box
      background #ffffff
      padding 30px 20px
      box-sizing border-box
      height 50vh
      &:nth-child(2)
        margin-top 14px
      .map-position
        position relative
        height calc(50vh - 130px)
      .map-position-h
        height calc(100vh - 264px)
      .full-screen-btn
        position absolute
        top 10px
        right 10px
        width 20px
        height 20px
        background url('./img/btn.png')no-repeat center / 100%
        cursor pointer
        z-index 99
      .map-box-title
        font-size 14px
        font-weight bold
        color #353535
        margin-bottom 14px
      .map-box-line
        display flex
        align-items flex-start
        .line-icon
          width 10px
          height 10px
          border-radius 50%
          background #F6AB39
          margin-right 14px
        .line-text
          p
            font-size 12px
            color #353535
            font-weight bold
            &:last-child
              margin-top 14px
      .map-box-content
        height 320px
        margin-top 20px
    .height
      height auto
    .map-box-h
      height 100%
    .full-screen
      height calc(100vh - 122px) !important
      .map-box-content
        height calc(100vh - 182px) !important
        margin-top 0
  .page-wrap
    background #fff
.job-number
  cursor pointer!important
>>>.el-button--text
      color #FBB03B
</style>
