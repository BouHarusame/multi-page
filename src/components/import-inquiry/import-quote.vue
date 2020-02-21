<template>
  <div class="import-quote">
    <div class="section">
      <div class="title">
        <h4 class="title-h4">询价信息</h4>
      </div>
      <inquire-message :inquiryMessage="inquiryMessage"></inquire-message>
      <div class="section-box">
        <order-table
          :data="goodsInfo"
          :columns="goodsInfoData"
          :loading="loading"
          :refType="refType"
        />
      </div>
      <div class="line">
        <div class="line-label">增值服务：</div>
        <div class="line-value">
          <span class="line-value-item" v-for="(item, index) in service" :key="index">{{item}}</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="title">
        <div class="title-item">
          <h4 class="title-h4">报价信息</h4>
          <p class="title-p">(此报价为预估报价)</p>
        </div>
        <div class="title-item" v-if="this.titletime">
          <h4 class="title-name">报价更新时间：</h4>
          <p class="title-value">{{this.titletime}}</p>
        </div>
      </div>
      <div class="quote-content">
        <div class="tip-message" v-if="quoteMessage.length < 1">{{tipMessage}}</div>
        <div class="search-table" v-else>
          <template v-for="(item, index) in quoteMessage">
            <div class="section" v-if="item.tableData.length > 0" :key="index">
              <div class="section1-line">
                <div class="title">
                  <span @click="handleChangeTitle(item)">{{item.title}}</span>
                </div>
                <template v-if="item.title.indexOf('集装箱运输费') > -1">
                  <div class="tips" v-if="item.tableData[0].unfitMsg || item.tableData[1].unfitMsg">{{totalFeeTips.split(';')[0]}}</div>
                </template>
              </div>
              <el-table :data="item.tableData" border class="section-table" style="width: 100%">
                <el-table-column label="费用项目">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div class="item-box-span">{{scope.row.feeName}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="标准费率">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div class="item-box-span">{{scope.row.standardFee}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="加成费率">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div class="item-box-span" v-if="!scope.row.edit">{{scope.row.extraFeeRatio}}</div>
                      <el-input class="item-box-input" v-model="scope.row.extraFeeRatio" v-else></el-input>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="单位">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div class="item-box-span">{{scope.row.unit}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="预估金额">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div
                        class="item-box-span"
                        v-if="scope.row.estimatedFee || scope.row.estimatedFee === 0"
                      >{{scope.row.estimatedFee}}</div>
                      <div
                        class="item-box-span grey"
                        v-if="scope.row.calProcess && scope.row.estimatedFee"
                      >{{scope.row.calProcess}}</div>
                      <div
                        class="item-box-span grey"
                        v-if="scope.row.estimatedFeeRemark"
                      >({{scope.row.estimatedFeeRemark}})</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="备注">
                  <template slot-scope="scope">
                    <div class="item-box">
                      <div class="item-box-span">{{scope.row.remark}}</div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
          <div class="tip-message" v-if="tipMessage">{{tipMessage}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="item"><span>预计需要总费用为</span>{{totalFee}}</div> -->
    <div class="flex-bottom" :class="{'center': !totalFee}" ref="flexBottom">

      <div>
        <div class="line-con">
          <div class="line-item" v-if="totalFee">
            <span class="label">清关费合计预估:</span>
            <span class="icon">￥</span>
            <span class="number">{{parseFloat(totalFee)}}</span>
          </div>
          <div class="line-item" v-if="transferWay === 'fcl'">
            <span class="label">每柜预估:</span>
            <span class="icon">￥</span>
            <span class="number">{{parseFloat(perBoxFee)}}</span>
            <span class="icon">/柜</span>
          </div>
          <div class="line-item" v-if="transferWay === 'fcl' || transferWay === 'lcl'">
            <span class="label">每吨预估:</span>
            <span class="icon">￥</span>
            <span class="number">{{parseFloat(perTon)}}</span>
            <span class="icon">/吨</span>
          </div>
          <div class="line-item" v-if="transferWay === 'fcl' || transferWay === 'lcl'">
            <span class="label">每立方预估:</span>
            <span class="icon">￥</span>
            <span class="number">{{parseFloat(perCube)}}</span>
            <span class="icon">/立方</span>
          </div>
          <div class="line-item" v-if="transferWay === 'air'">
            <span class="label">每公斤预估:</span>
            <span class="icon">￥</span>
            <span class="number">{{parseFloat(perKilo)}}</span>
            <span class="icon">/公斤</span>
          </div>
        </div>

        <div class="tips">{{totalFeeTips.split(';')[1]}}</div>
      </div>
      <div class="btn-box sty1" :class="{ acflagsty: acflag }" v-if="showOrder" @click="handleBookingOrder">立即下单</div>
      <div class="btn-box sty2" @click="handleToCost">成本测算</div>
    </div>
    <!-- <el-button type="primary"
               @click.native="handleToCost">成本测算</el-button>
    <el-button type="primary"
               v-if="status === '已报价'"
               class="lcl-item6-btn"
    @click.native="handleBookingOrder">立即下单</el-button>-->
  </div>
</template>
<script>
import { postQuoteOrder, getQuoteQuoteNo } from 'api/import'
import { time } from 'utils/utils'
import { originData } from 'assets/constant'
import orderTable from 'components/order-table/order-table'
import inquireMessage from 'components/enquiry/inquire-message'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'importQuote',
  data () {
    return {
      quoteNo: '',
      status: '',
      inquiryMessage: {},
      quoteMessage: [],
      tipMessage: '',
      origin: originData,
      refType: 'singleTable',
      loading: true,
      goodsInfo: [],
      goodsInfoData: [
        {
          label: 'HS Code',

          prop: 'hsCode',
          width: '180'
        },
        {
          label: '已查 CAS 编号信息',
          prop: 'casGoodsName',
          width: '320',
          render: (h, params) => {
            return h('div', [
              h('p', {
                class: {
                  'goodsCas': true
                },
                domProps: {
                  innerText: params.row.casNo
                }
              }),
              h('p', {
                class: {
                  'goodsNane': true
                },
                domProps: {
                  innerText: params.row.casGoodsName
                }
              })
            ])
          }
        },
        {
          label: '品名',

          prop: 'goodsName',
          width: '360'
        },
        {
          label: '产品类别',

          prop: 'goodsType',
          width: '280'
        }
      ],
      columns: [
        {
          label: '费用项目',
          prop: 'feeName'
        },
        {
          label: '费用类型',
          prop: 'feeType'
        },
        {
          label: '费率',
          prop: 'standardFee'
        },
        {
          label: '单位',
          prop: 'unit'
        }
      ],

      feeType: [
        {
          label: 'ANYCASE服务费',
          value: 'acServiceFee'
        },
        {
          label: '清关服务费',
          value: 'custClearFee'
        },
        {
          label: '集装箱运输费',
          value: 'boxTransferFee'
        },
        {
          label: '代收代付费用清单',
          value: 'agentBuzFee'
        }
      ],
      service: [],
      order: false,
      showOrder: false,
      totalFee: null,
      perBoxFee: null,
      perTon: null,
      perKilo: null,
      perCube: null,
      transferWay: '',
      titletime: '',

      currency: '',
      acflag: null,
      totalFeeTips: ''
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  methods: {
    ...mapMutations('menu', {
      setPassRoute: 'SET_PASS_ROUTE',
      setMenuName: 'SET_MENU_NAME'
    }),
    handleToCost () {
      let tradeTerms = ''
      this.origin.forEach(item => {
        if (item.label === 'tradeTerms') {
          tradeTerms = item.key
        }
      })
      // console.log(this.currency, 'currency')
      localStorage.setItem('tradeTerms', tradeTerms)
      localStorage.setItem('currency', this.currency)
      this.$router.push({
        name: 'costCalculation'
      })
    },
    handleBookingOrder () {
      postQuoteOrder({ quoteNo: this.quoteNo })
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('下单成功')
            window.sessionStorage.setItem('menuName', '进口订单')
            this.setPassRoute(true)
            this.setMenuName('进口订单')
            this.$router.push({
              name: 'importOrder',
              params: {
                passRoute: true
              }
            })
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    transforService (key) {
      let q = key.split(',').map(item => {
        switch (item) {
          case 'A':
            item = '贸易代理'
            break
          case 'B':
            item = '仓储服务'
            break
          case 'C':
            item = '归类服务'
            break
          case 'D':
            item = '准入判定'
            break
          case 'E':
            item = '标签服务'
            break
          case 'F':
            item = '使用AnyCase机场监管仓库'
            break
          case 'G':
            item = '文件服务'
            break
          case 'H':
            item = '办证服务'
            break
          default:
            item = ''
        }
        return item
      })
      return q
    },
    fetchQuoteMessage (quoteNo) {
      getQuoteQuoteNo(quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            let feeType = []
            this.loading = false
            this.tipMessage = res.data && res.data.msg
            this.inquiryMessage = res.data.param || {}
            this.currency = res.data && res.data.param && res.data.param.currency
            this.service = this.inquiryMessage.services ? this.transforService(this.inquiryMessage.services) : ''
            if (res.data.quoteUpdatedTime) {
              this.titletime = time(new Date(res.data.quoteUpdatedTime))
            }
            this.goodsInfo = res.data.param && (res.data.param.goodsInfo || [])
            let quoteMessage = []
            if (res.data && res.data.result) {
              quoteMessage = res.data.result.fees || []
            }
            for (let i = 0; i < quoteMessage.length; i++) {
              for (let j = i + 1; j < quoteMessage.length; j++) {
                if (quoteMessage[i].feeType === quoteMessage[j].feeType) {
                  ++i
                  j = i
                }
              }
              feeType.push({ title: quoteMessage[i].feeType })
            }
            this.quoteMessage = this.formmatData(quoteMessage, feeType)
            if (res.data.result) {
              this.totalFee = res.data.result.totalFee
              this.perBoxFee = res.data.result.perBoxFee
              this.perTon = res.data.result.perTon
              this.perKilo = res.data.result.perKilo
              this.perCube = res.data.result.perCube
              this.transferWay = res.data.result.transferWay
            }
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    formmatData (data, feeType) {
      feeType.map(item => {
        item.tableData = []
        return item
      })
      data.forEach(item => {
        if (item.unfitMsg) {
          this.totalFeeTips = item.unfitMsg
        }
        feeType.forEach(f => {
          if (item.feeType === f.title) {
            f.tableData.push(item)
          }
        })
      })
      return feeType
    },
    handleScroll () {
      if (this.$refs.flexBottom) {
        this.$refs.flexBottom.style.left = 150 - document.documentElement.scrollLeft + 'px'
      }
    }
  },
  mounted () {
    this.acflag = JSON.stringify(this.userRoles).indexOf('AC') > -1
    // console.log('acflag', this.roles, this.acflag)
    this.quoteNo = this.$route.params.quoteNo
    this.order = this.$route.params.order || localStorage.getItem('order')
    localStorage.setItem('order', this.order)
    this.status = this.$route.params.status || localStorage.getItem('status')
    localStorage.setItem('status', this.status)
    if (this.order === 'true') {
      this.showOrder = false
    } else {
      if (this.status === '已报价') {
        this.showOrder = true
      } else {
        this.showOrder = false
      }
    }
    // console.log(this.order, this.status, this.showOrder)
    if (this.quoteNo) {
      this.fetchQuoteMessage(this.quoteNo)
    }
    window.addEventListener('scroll', this.handleScroll, true)
  },
  beforeDestroy () {
    localStorage.setItem('order', false)
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
    orderTable,
    inquireMessage
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~styles/variable';

.import-quote {
  width: 100%;
  background: #F0F2F5;
  height: auto;
  box-sizing: border-box;
  min-width: 1100px;
  padding: 0 0 30px;

  .section {
    width: 100%;
    height: auto;
    background: #ffffff;
    margin-bottom: 14px;

    .info-grey {
      color: #999;
      font-size: 12px;
    }
    .section1-line {
        display: flex;
        align-items: center;
        .tips {
          font-size: 12px;
          color: #f56c6c;
          margin-left: 10px;
        }
      }
    .title {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      border-bottom: 1px solid #f0f2f5;
      padding: 20px;

      .title-item {
        width: 40%;
        font-size: 12px;
        color: #353535;
        display: flex;
        align-items: center;

        .title-h4 {
          font-size: 14px;
          font-weight: bold;
          color: #353535;
          margin-right: 14px;
        }

        .title-p {
          font-size: 12px;
          color: #FBB03B;
          font-weight: 500;
        }

        .title-name {
          color: #7a7e85;
          margin-right: 8px;
        }
      }
    }

    .section-box {
      padding: 30px 20px;
      border-top: 1px solid #f0f2f5;
      border-bottom: 1px solid #f0f2f5;
    }

    .line {
      padding: 30px 20px;
      display: flex;
      align-items: center;

      .line-label {
        font-size: 12px;
      }

      .line-value {
        font-size: 12px;
        display: flex;
        align-items: center;

        .line-value-item {
          padding: 3px 8px;
          border-radius: 5px;
          border: 1px solid #fedfb0;
          background: #FFF7EB;
          margin-left: 10px;
        }
      }
    }

    .quote-table {
      margin-bottom: 20px;
    }

    .quote-content {
      .tip-message {
        width: 100%;
        height: 200px;
        text-align: center;
        line-height: 180px;
        color: #D3D3D3;
        font-size: 12px;
      }

      .section {
        padding: 20px;
        box-sizing: border-box;
      }

      .title {
        padding: 0;

        span {
          padding: 4px 10px;
          font-size: 12px;
          color: #353535;
          background: #E2E7EE;
          border-bottom: 0;
          display: inline-block;
          border-radius: 5px 5px 0 0;
        }
      }

      .title-input {
        width: 20%;
      }

      .section-table {
        .delete {
          color: #F56C6C;
        }
      }

      >>> .el-table th>.cell {
        color: #7A7E85;
      }

      >>> .el-table td div {
        color: #353535;
      }

      >>> .el-button--text {
        color: #FBB03B;
      }

      .item-box {
        .grey {
          font-size: 12px;
          color: #999;
        }
      }

      .section-add {
        margin: 10px 0;
        width: 100%;
        height: 40px;
        border: 1px dashed #FBB03B;
        display: flex;
        align-items: center;
        justify-content: center;

        .add {
          font-size: 12px;
          color: #FBB03B;
          font-weight: 500;
        }
      }
    }
  }

  .item {
    margin: 10px 0 20px;
  }

  .lcl-item6-btn {
    border: 0;
    background: #FFB037;
  }

  .flex-bottom {
    position: fixed;
    bottom: 0;
    left: 150px;
    width: calc(100% - 150px);
    background: #ffffff;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 99;
    min-width: 1140px;

    .line-con {
      display: flex;
      align-items: center;
      margin-left: 20px;
      margin-right: 20px;

      .label {
        font-size: 12px;
        color: #7A7E85;
      }

      .icon {
        font-size: 12px;
        color: #7A7E85;
      }

      .number {
        font-size: 14px;
        font-weight: bold;
        color: #353535;
        letter-spacing: -1px;
      }

      .line-item {
        display: flex;
        align-items: baseline;
        margin-right: 20px;
      }

      .line-item:first-child {
        .label {
          font-size: 14px;
          color: #353535;
        }

        .number {
          font-size: 20px;
          color: #F56C6C;
        }
      }
    }
    .tips {
      font-size: 12px;
      color: #f56c6c;
      margin-left: 20px;
      margin-top: 6px;
    }
    .btn-box {
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      border-radius: 5px;
      cursor: pointer;
    }

    .sty1 {
      background: #FBB03B;
      border: 1px solid #FBB03B;
      color: #FFFFFF;
    }

    .acflagsty {
      pointer-events: none;
      cursor: default;
      opacity: 0.6;
    }

    .sty2 {
      background: #FFF7EB;
      border: 1px solid #FBB03B;
      color: #FBB03B;
      margin-left: 14px;
    }
  }
  .center {
    justify-content: center;
  }
}

@media only screen and (max-width: 767px) {
  .import-quote {
    .flex-bottom {
      left: 0 !important;
    }
  }
}
</style>
