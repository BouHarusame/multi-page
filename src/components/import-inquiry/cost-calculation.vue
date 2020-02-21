<template>
  <div class="cost-calculation">
    <div class="section">
      <div class="title">
        <h4 class="title-h4">测算信息录入</h4>
        <div class="title-btn"><span class="btn-icon"></span><p class="btn-p" @click="handleChangeRoute">询价信息</p></div>
      </div>
      <div class="section-content">
        <div class="search-form">
          <div class="search-form-item">
            <div class="search-item-label">
              <span class="search-term">订单币种</span>
              <span class="search-item-star">*</span>
            </div>
            <el-select v-model="formData.currency"
                       @change="handleExchangeRate"
                       placeholder="请选择订单币种"
                       size="small">
              <el-option v-for="item in currency"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="search-form-item">
            <div class="search-item-label">
              <span class="search-term">汇率</span>
              <span class="search-item-star">*</span>
              <p class="search-item-tips"
                 v-if="!formData.exchangeRate">汇率加载中... </p>
            </div>
            <el-popover
              placement="top"
              width="300"
              trigger="hover"
              popper-class="tg-tips"
              >
              <div  class="tips" v-if="releaseDate">汇率参照中国银行实时外汇牌价{{rateSource}} 发布时间：{{releaseDate}} </div>
              <el-input v-model="formData.exchangeRate"
                      slot="reference"
                      clearable
                      v-limit
                      placeholder="请输入汇率"
                      @change="handleChangeTransferFee"></el-input>
            </el-popover>
          </div>
          <div class="search-form-item">
            <div class="search-item-label">
              <span class="search-term">国际运费</span>
              <span class="search-item-star">*</span>
            </div>
            <div class="search-item-value">
              <span class="symbol">{{symbol}}</span>
              <el-input v-model="formData.transferFee"
                        clearable
                        v-limit
                        placeholder="请输入国际运费"
                        @change="handleChangeTransferFee"></el-input>
            </div>
          </div>
          <div class="search-form-item">
            <div class="search-item-label">
              <span class="search-term label-width">保险费</span>
              <span class="search-item-star">*</span>
              <!-- <p class="search-item-tips">除CIF申报货值外，中国海关默认保险费率为货值的0.3%</p> -->
            </div>
            <el-popover
              placement="top"
              width="300"
              trigger="hover"
              popper-class="tg-tips"
              >
              <div  class="tips">除CIF申报货值外，中国海关默认保险费率为货值的0.3%</div>
              <div class="search-item-value" slot="reference">
                <span class="symbol">{{symbol}}</span>
                <el-input v-model="formData.premium"
                          clearable
                          v-limit
                          placeholder="请输入保险费"
                          @change="handleChangePremium"></el-input>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
      <div class="section-content line">
        <div class="search-table">
          <hscode-view @add-hscode="handleClickAdd" @fetch-quote-cost="fetchQuoteCost" @handle-reset="handleDialogReset" @cancle-hscode="handleClickCancle"  :goodsInfo="goodsInfo" :goodsInfoItem="goodsInfoItem" ref="hsCode"></hscode-view>
          <el-table :data="formData.goodsInfo"
                    :header-cell-style="{ background: '#f6f7f8'}"
                    style="width: 100%;margin-top: 20px">
            <el-table-column prop="goodsName"
                             min-width="120"
                             label="品名">
            </el-table-column>
            <el-table-column prop="hsCode"
                             min-width="130"
                             label="HS">
            </el-table-column>
            <el-table-column label="产品数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.count"
                          v-limit
                          @change="handleChangeCount(scope.row)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="单价">
              <template slot-scope="scope">
                <div class="input-box">
                  <i class="label-icon">{{symbol}}</i>
                  <el-input v-model="scope.row.unitValue" v-if="tradeTerms !== 'CIF'"
                            v-limit
                            @change="handleChangeCount(scope.row)"></el-input>
                  <template v-else>
                    <el-popover
                      placement="top"
                      width="300"
                      trigger="hover"
                      popper-class="tg-tips"
                      >
                      <div  class="tips">您输入的单价是否已含国际运费和保险费？如若您单价未包含运费和保费，请填写国际运费和保费。</div>
                      <el-input v-model="scope.row.unitValue" slot="reference"
                            v-limit
                            @change="handleChangeCount(scope.row)"></el-input>
                    </el-popover>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="货值小计"
                             min-width="120">
              <template slot-scope="scope"
                        v-if="scope.row.goodsValue">
                <div class="input-box">
                  <i class="label-icon">{{symbol}}</i>
                  <span>{{scope.row.goodsValue.toFixed(2)}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="CIF货值小计"
                             width="120">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.goodsValueCif">
                  <i class="label-icon">{{symbol}}</i>
                  <span>{{scope.row.goodsValueCif}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="关税率">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.taxRate">
                  <span>{{scope.row.taxRate}}%</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="消费税率">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.consumeRate || scope.row.consumeRate === 0">
                  <span>{{scope.row.consumeRate}}%</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="增值税率">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.vatRate">
                  <span>{{scope.row.vatRate}}%</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="compositeRate"
                             label="综合税率">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.compositeRate">
                  <span>{{scope.row.compositeRate}}</span><span v-if="!isNaN(scope.row.compositeRate)">%</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column min-width="120"
                             label="税金总额">
              <template slot-scope="scope">
                <div class="input-box"
                     v-if="scope.row.totalTax">
                  <i class="label-icon">￥</i>
                  <span>{{scope.row.totalTax}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button @click="handleClickDetail(scope.row.hsCode)" type="text" class="btn-detail" size="small">查看</el-button>
                <el-button @click="handleDel(scope.$index)" type="text" size="small" class="btn-del">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-button class="btn"
                   @click="handleCalculate">
          测算
        </el-button>
      </div>
    </div>
    <div class="section">
      <div class="cost-content"
           v-if="calculateFlag">
        <div class="title">
          <h4 class="title-h4">测算结果</h4>
          <p class="title-p">(协定税率、反倾销税暂不列入预测计算)</p>
        </div>
        <div class="item-box">
          <div class="item">
            <div class="item-value" v-if="calculateResult.totalGoodsValue"><span>￥</span>{{calculateResult.totalGoodsValue.toFixed(2)}}</div>
            <div class="item-name">CIF未完稅总货值</div>
          </div>
          <div class="item">
            <div class="item-value" v-if="calculateResult.taxTotal"><span>￥</span>{{calculateResult.taxTotal.toFixed(2)}}</div>
            <div class="item-name">税金总计</div>
          </div>
          <div class="item">
            <div class="item-value" v-if="calculateResult.estimateCustFee"><span>￥</span>{{calculateResult.estimateCustFee.toFixed(2)}}</div>
             <div class="item-value" v-else><span>￥</span><el-input v-model="clearanceCost" @keyup.enter.native="handleCalculate"></el-input></div>
            <div class="item-name">预计清关费 <span v-if="containTruckFee">（含拖车、港杂预估）</span></div>
          </div>
          <div class="item">
            <div class="item-value red" v-if="calculateResult.estimateCostTotal"><span>￥</span>{{calculateResult.estimateCostTotal.toFixed(2)}}</div>
            <div class="item-name">进口成本测算总价</div>
          </div>
        </div>
        <div class="section-box"
             v-for="(item, index) in calculateResult.goodsInfo"
             :key="index">
          <div class="pd-items">
            <div class="item">
              <div class="item-name">品名:</div>
              <div class="item-input">{{item.goodsName}}</div>
            </div>
            <div class="item">
              <div class="item-name">产品数量:</div>
              <div class="item-input">{{item.goodsCount}}</div>
            </div>
            <div class="item">
              <div class="item-name">单件成本:</div>
              <div class="item-input" v-if="item.importUnitCost">￥ {{item.importUnitCost.toFixed(2)}}</div>
            </div>
          </div>
          <div class="line-action">
            <div class="line-action echart"
               :ref="item.hsCode + 'A'"
               style="width:100%;height:160px;position:relative">
             </div>
             <div class="legend">
              <ul class="legend-items">
                <li class="legend-item" v-if="item.goodsInfoItem[0].unitCost === 0 || item.goodsInfoItem[0].unitCost">
                  <span class="color color1"></span>
                  <p class="text">采购单价</P>
                  <span class="price-sy">￥</span>
                  <span class="price">{{(item.goodsInfoItem[0].unitCost).toFixed(2)}}</span>
                </li>
                <li class="legend-item" v-if="item.goodsInfoItem[0].unitTransferFee === 0 || item.goodsInfoItem[0].unitTransferFee">
                  <span class="color color2"></span>
                  <p class="text">国际运费单价</P>
                  <span class="price-sy">￥</span>
                  <span class="price">{{(item.goodsInfoItem[0].unitTransferFee).toFixed(2)}}</span>
                </li>
                <li class="legend-item" v-if="item.goodsInfoItem[0].unitPremium === 0 || item.goodsInfoItem[0].unitPremium">
                  <span class="color color3"></span>
                  <p class="text">保险金单价</P>
                  <span class="price-sy">￥</span>
                  <span class="price">{{item.goodsInfoItem[0].unitPremium.toFixed(2)}}</span>
                </li>
                <li class="legend-item"  v-if="item.goodsInfoItem[0].unitTax === 0 || item.goodsInfoItem[0].unitTax">
                  <span class="color color4"></span>
                  <p class="text">税金单价</P>
                  <span class="price-sy">￥</span>
                  <span class="price">{{item.goodsInfoItem[0].unitTax.toFixed(2)}}</span>
                </li>
                <li class="legend-item" v-if="item.goodsInfoItem[0].unitCustFee === 0 || item.goodsInfoItem[0].unitCustFee">
                  <span class="color color5"></span>
                  <p class="text">清关费单价</P>
                  <span class="price-sy">￥</span>
                  <span class="price">{{item.goodsInfoItem[0].unitCustFee.toFixed(2)}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="询价信息"
      :visible.sync="dialogXJVisible"
      :close-on-click-modal="false"
      width="1000px"
      center>
      <inquire-message :inquiryMessage="inquiryMessage"></inquire-message>
    </el-dialog>
  </div>
</template>

<script>
import { getHsName, getQuoteQuoteNo, getHsCode, validCode, CostCalculate, getQuoteRate, getQuoteCost } from 'api/import'
import { mapMutations } from 'vuex'
import { deepCopy } from 'utils/utils'
import limit from '@/directives/limit'
import { CURRENCY } from 'assets/constant'
import hscodeView from 'components/enquiry/hscode'
import inquireMessage from 'components/enquiry/inquire-message'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/bar')
require('echarts/lib/component/legend')
export default {
  name: 'costCalculation',
  data () {
    return {
      quoteNo: '',
      tradeTerms: '',
      symbol: '￥',
      calculateFlag: false,
      formData: {
        exchangeRate: null,
        premium: null,
        transferFee: null,
        goodsInfo: []
      },
      containTruckFee: false,
      releaseDate: '',
      calculateResult: {
        totalGoodsValue: 2000,
        taxTotal: 300,
        estimateCustFee: 300,
        estimateCostTotal: 400,
        goodsInfo: [{
          goodsName: '1111',
          goodsCount: 100,
          importUnitCost: 200,
          goodsInfoItem: [{
            unitCost: 111,
            unitTransferFee: 222,
            unitPremium: 333,
            unitTax: 444,
            unitCustFee: 555
          }]
        }]
      },
      currency: CURRENCY,
      loading: false,
      goodsInfo: [],
      goodsInfoOld: [],
      goodsInfoItem: [],
      dialogXJVisible: false,
      clearanceCost: null,
      inquiryMessage: {},
      rateSource: ''
    }
  },
  methods: {
    ...mapMutations('menu', {
      setMenuName: 'SET_MENU_NAME'
    }),
    handleDel (index) {
      this.formData.goodsInfo.splice(index, 1)
      this.goodsInfo.splice(index - 1, 1)
    },
    handleCheck (value) {
      return String(value).replace(/[^0-9.]/g, '')
    },
    handleClickDetail (hsCode) {
      getHsName({ name: hsCode })
        .then(res => {
          if (res && res.msg === 'success') {
            this.goodsInfoItem = res.data && (res.data.records || [])
            // this.goodsItemDialogVisible = true
            this.$refs.hsCode.handleShowDialog()
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
    handleDialogReset () {
      this.formData.goodsInfo.splice(this.formData.goodsInfo.length - this.goodsInfo.length, this.goodsInfo.length)
    },
    handleChangeRoute () {
      this.dialogXJVisible = true
      this.fetchQuoteMessage()
    },
    handleClickCancle (row) {
      let i = null
      this.formData.goodsInfo.forEach((item, index) => {
        if (item.hsCode === row.hsCode) {
          i = index
        }
      })
      this.formData.goodsInfo.splice(i, 1)
    },
    fetchQuoteMessage () {
      getQuoteQuoteNo(this.quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            this.inquiryMessage = res.data && (res.data.param || {})
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
    handleClickAdd ({ goodsName, hsCode }) {
      this.goodsInfo.push({
        goodsName: goodsName,
        goodsType: '',
        hsCode: hsCode
      })
      this.fetchRate(goodsName, hsCode)
    },
    // 查通关参数页面数据
    fetchRate (goodsName, hsCode) {
      getHsCode({ code: hsCode })
        .then(res => {
          if (res && res.msg === 'success') {
            // console.log(res.data)
            let goodName = ''
            let taxRate = res.data && res.data.taxRate
            let consumeRate = res.data && res.data.consumeRate
            let vatRate = res.data && res.data.vatRate
            let compositeRate = res.data && res.data.compositeRate
            goodName = goodsName.split('(')[0].split('（')[0]
            this.formData.goodsInfo.push({
              goodsName: goodName,
              hsCode: hsCode,
              count: '',
              unitCost: '',
              goodsValue: '',
              goodsValueCif: '',
              taxRate: taxRate,
              consumeRate: consumeRate,
              vatRate: vatRate,
              compositeRate: compositeRate,
              totalTax: ''
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
    verifyValidCode (event = '') {
      validCode()
        .then(res => {
          if (res && res.msg === 'success') {
            if (res.data && res.data.flag) {
              const validCodeUrl = res.data.validCodeUrl
              this.$refs.hsCode.handleShowValidDialog(validCodeUrl)
            } else if (res.data && !res.data.flag) {
              if (event === 'add') {
                this.$refs.hsCode.fetchGoodsName()
              } else {
                this.$refs.hsCode.fetchValidCode()
              }
            }
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
    handleCalculate () {
      let formData = deepCopy(this.formData)
      let flag = true
      /* formData.goodsInfo.map(item => {
        if (!isNaN(item.taxRate / 100)) {
          item.taxRate = item.taxRate / 100
        }
        if (!isNaN(item.consumeRate / 100)) {
          item.consumeRate = item.consumeRate / 100
        }
        if (!isNaN(item.vatRate / 100)) {
          item.vatRate = item.vatRate / 100
        }
        if (!isNaN(item.compositeRate / 100)) {
          item.compositeRate = item.compositeRate / 100
        }
        return item
      }) */
      formData.quoteNo = this.quoteNo
      formData.clearanceCost = this.clearanceCost
      formData.goodsInfo.forEach(item => {
        if (this.handleCheckValue(item) === false) {
          flag = false
          return
        }
        item.goodsCount = item.count
        item.unitCost = item.unitValue
        if (!isNaN(item.taxRate / 100)) {
          item.taxRate = item.taxRate / 100
        }
        if (!isNaN(item.consumeRate / 100)) {
          item.consumeRate = item.consumeRate / 100
        }
        if (!isNaN(item.vatRate / 100)) {
          item.vatRate = item.vatRate / 100
        }
        if (!isNaN(item.compositeRate / 100)) {
          item.compositeRate = item.compositeRate / 100
        }
      })
      if (!flag) return
      CostCalculate(formData)
        .then(res => {
          if (res.msg === 'success') {
            this.containTruckFee = res.data && res.data.containTruckFee
            this.calculateResult = res.data
            this.calculateFlag = true
            this.handleFormatData()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    handleFormatData () {
      this.calculateResult.goodsInfo.forEach(item => {
        let res = []
        let goodsInfoItem = {}
        for (let prop in item) {
          if (prop === 'unitCost') {
            item.unitCost ? res.push(item.unitCost) : res.push(0)
            goodsInfoItem[prop] = item.unitCost ? item.unitCost : 0
          } else if (prop === 'unitTransferFee') {
            item.unitTransferFee ? res.push(item.unitTransferFee) : res.push(0)
            goodsInfoItem[prop] = item.unitTransferFee ? item.unitTransferFee : 0
          } else if (prop === 'unitPremium') {
            item.unitPremium ? res.push(item.unitPremium) : res.push(0)
            goodsInfoItem[prop] = item.unitPremium ? item.unitPremium : 0
          } else if (prop === 'unitTax') {
            item.unitTax ? res.push(item.unitTax) : res.push(0)
            goodsInfoItem[prop] = item.unitTax ? item.unitTax : 0
          } else if (prop === 'unitCustFee') {
            item.unitCustFee ? res.push(item.unitCustFee) : res.push(0)
            goodsInfoItem[prop] = item.unitCustFee ? item.unitCustFee : 0
          }
        }
        item.tableData = res
        item.goodsInfoItem = [goodsInfoItem]
        // console.log(goodsInfoItem, 'dddd')
      })
      // window.addEventListener('resize', () => { this.createEcharts().resize() })
      this.createEcharts()
      // console.log(this.calculateResult.goodsInfo)
    },
    handleChangeTransferFee () {
      if (!this.formData.transferFee) {
        this.$message.error('国际费用不能为空')
        return
      }
      this.formData.transferFee = this.handleCheck(this.formData.transferFee)
      this.handleTestVal()
    },
    handleChangePremium () {
      if (this.tradeTerms !== 'CIF' && !this.formData.premium) {
        this.$message.error('保险费用不能为空')
        return
      }
      this.formData.premium = this.handleCheck(this.formData.premium)
      this.handleTestVal()
    },
    handleTestVal () {
      let val = this.formData.goodsInfo.every(item => {
        return item.count && item.unitValue
      })
      if (val && this.formData.transferFee && this.formData.exchangeRate) {
        if (this.tradeTerms !== 'CIF') {
          this.formData.premium && this.calculate()
        } else {
          this.calculate()
        }
      }
    },
    handleCheckValue (row) {
      if (!row.count) {
        this.$message.error('产品数量不能为空')
        return false
      }
      row.count = this.handleCheck(row.count)
      if (!row.unitValue) {
        this.$message.error('单价不能为空')
        return false
      }
      row.unitValue = this.handleCheck(row.unitValue)
      row.goodsValue = row.count * row.unitValue
      if (!this.formData.transferFee) {
        this.$message.error('国际费用不能为空')
        return false
      }
      if (this.tradeTerms !== 'CIF' && !this.formData.premium) {
        this.$message.error('保险费用不能为空')
        return false
      }
    },
    handleChangeCount (row) {
      if (this.handleCheckValue(row) === false) return
      const flag = this.formData.goodsInfo.every(item => {
        return item.goodsValue
      })
      if (!flag) return
      this.calculate()
    },
    calculate () {
      let subtotal = 0
      this.formData.goodsInfo.forEach(item => {
        subtotal = subtotal + Number(item.goodsValue)
      })
      let transferFee = this.formData.transferFee ? Number(this.formData.transferFee) : 0
      let premium = this.formData.premium ? Number(this.formData.premium) : 0
      const ratio = subtotal ? (transferFee + premium) / subtotal : 0
      // console.log(this.formData.goodsInfo)
      this.formData.goodsInfo.forEach(item => {
        const taxRatePer = !isNaN(item.taxRate) ? item.taxRate / 100 : 0
        const consumeRatePer = item.consumeRate ? item.consumeRate / 100 : 0
        const vatRatePer = item.vatRate ? item.vatRate / 100 : 0
        let taxRate = item.goodsValue * taxRatePer
        let consumeRate = ((Number(item.goodsValue) + taxRate) / (1 - consumeRatePer)) * consumeRatePer
        let consumeNumRate = item.consumeNumRate ? Number(item.consumeNumRate) * item.count : 0
        let vatRate = (Number(item.goodsValue) + taxRate + consumeRate) * vatRatePer
        // let compositeRate = item.compositeRate ? item.compositeRate / 100 : 0
        let valueCif = ratio * item.goodsValue + Number(item.goodsValue)
        item.goodsValueCif = valueCif.toFixed(2)
        // item.totalTax = (valueCif * compositeRate * this.formData.exchangeRate).toFixed(2)
        item.totalTax = ((taxRate + consumeRate + consumeNumRate + vatRate) * this.formData.exchangeRate).toFixed(2)
      })
    },
    handleExchangeRate (val) {
      // console.log(val)
      this.currency.forEach(item => {
        if (item.value === val) {
          this.symbol = item.symbol
        }
      })
      getQuoteRate({ code: val })
        .then(res => {
          if (res.msg === 'success') {
            this.formData.exchangeRate = isNaN(res.data.rate) ? 1 : Number(res.data.rate)
            this.releaseDate = res.data.releaseDate
            this.rateSource = res.data.rateSource
            this.handleTestVal()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchQuoteCost () {
      getQuoteCost(this.quoteNo)
        .then(res => {
          if (res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            data.forEach(item => {
              item.goodsValueCif = ''
              item.totalTax = ''
              item.consumeRate = item.consumeRate ? item.consumeRate : 0
              item.goodsName = item.goodsName && item.goodsName.split('(')[0].split('（')[0]
            })
            // console.log(data)
            this.formData.goodsInfo = data
            this.goodsInfoOld = deepCopy(data)
            // this.loading = false
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    createEcharts () {
      let echartArr = []
      this.calculateResult.goodsInfo.forEach((item, index) => {
        echartArr.push({ ...[item.hsCode + 'A'], 'data': item.tableData })
      })
      // console.log(echartArr)
      this.$nextTick(() => {
        echartArr.forEach(ele => {
          // console.log(ele)
          this.drawLine(ele[0], ele['data'])
        })
      })
    },
    drawLine (ele, num) {
      // console.log(this.$refs[ele])
      let myChart = echarts.init(this.$refs[ele][0])
      let colorList = ['#fbda24', '#0cd3fa', '#ff80db', '#ff443e', '#58e47c']
      let bgColor = '#ffffff'
      let data = num
      let total = 0
      const exchangeRate = this.formData.exchangeRate
      data[0] = data[0] * exchangeRate
      for (let i = 0; i < data.length; i++) {
        total += Number(data[i].toFixed(2))
      }
      myChart.setOption({
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          heigth: '100',
          containLabel: false
        },
        xAxis: {
          data: [],
          type: 'value',
          max: 100,
          show: false,
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          show: false,
          axisTick: {
            show: false
          }
        },
        color: colorList,
        backgroundColor: bgColor,
        series: [{
          type: 'bar',
          name: '采购单价',
          emphasis: {
            label: {
              show: true,
              position: 'top',
              backgroundColor: 'rgba(0,23,11,0.5)',
              padding: [10, 10, 10, 10],
              borderColor: '#353535',
              color: '#ffffff',
              formatter: function () {
                return (data[0] / total * 100).toFixed(2) + '%'
              }
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     offset: [-50, 40],
          //     formatter: function () {
          //       if (data[0] / total * 100 > 1) {
          //         return (data[0] / total * 100).toFixed(2) + '%'
          //       } else {
          //         return ''
          //       }
          //     }
          //   }
          // },
          data: [data[0] / total * 100],
          stack: 'income',
          barWidth: 40
          // barMinHeight: 40
        }, {
          type: 'bar',
          name: '国际运费单价',
          data: [data[1] / total * 100],
          emphasis: {
            label: {
              show: true,
              position: 'top',
              backgroundColor: 'rgba(0,23,11,0.5)',
              padding: [10, 10, 10, 10],
              borderColor: '#353535',
              color: '#ffffff',
              formatter: function () {
                return (data[1] / total * 100).toFixed(2) + '%'
              }
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     offset: [-50, 40],
          //     formatter: function () {
          //       if (data[1] / total * 100 > 1) {
          //         return (data[1] / total * 100).toFixed(2) + '%'
          //       } else {
          //         return ''
          //       }
          //     }
          //   }
          // },
          stack: 'income',
          barWidth: 40
          // barMinHeight: 40
        }, {
          type: 'bar',
          name: '保险费单价',
          data: [data[2] / total * 100],
          emphasis: {
            label: {
              show: true,
              position: 'top',
              backgroundColor: 'rgba(0,23,11,0.5)',
              padding: [10, 10, 10, 10],
              borderColor: '#353535',
              color: '#ffffff',
              formatter: function () {
                return (data[2] / total * 100).toFixed(2) + '%'
              }
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     offset: [-50, 40],
          //     formatter: function () {
          //       if (data[2] / total * 100 > 1) {
          //         return (data[2] / total * 100).toFixed(2) + '%'
          //       } else {
          //         return ''
          //       }
          //     }
          //   }
          // },
          stack: 'income',
          barWidth: 40
          // barMinHeight: 40
        }, {
          type: 'bar',
          name: '税金单价',
          data: [data[3] / total * 100],
          emphasis: {
            label: {
              show: true,
              position: 'top',
              backgroundColor: 'rgba(0,23,11,0.5)',
              padding: [10, 10, 10, 10],
              borderColor: '#353535',
              color: '#ffffff',
              formatter: function () {
                return (data[3] / total * 100).toFixed(2) + '%'
              }
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     offset: [-50, 40],
          //     formatter: function () {
          //       if (data[3] / total * 100 > 1) {
          //         return (data[3] / total * 100).toFixed(2) + '%'
          //       } else {
          //         return ''
          //       }
          //     }
          //   }
          // },
          stack: 'income',
          barWidth: 40
          // barMinHeight: 40
        }, {
          type: 'bar',
          name: '清关费单价',
          data: [data[4] / total * 100],
          emphasis: {
            label: {
              show: true,
              position: 'top',
              backgroundColor: 'rgba(0,23,11,0.5)',
              padding: [10, 10, 10, 10],
              borderColor: '#353535',
              color: '#ffffff',
              formatter: function () {
                return (data[4] / total * 100).toFixed(2) + '%'
              }
            }
          },
          // label: {
          //   normal: {
          //     show: true,
          //     position: 'right',
          //     offset: [-50, 40],
          //     formatter: function () {
          //       if (data[4] / total * 100 > 1) {
          //         return (data[4] / total * 100).toFixed(2) + '%'
          //       } else {
          //         return ''
          //       }
          //     }
          //   }
          // },
          stack: 'income',
          barWidth: 40
          // barMinHeight: 40
        }]
      })
      window.addEventListener('resize', () => { myChart.resize() })
    }
  },
  created () {
    this.formData.currency = localStorage.getItem('currency')
    this.handleExchangeRate(this.formData.currency)
  },
  mounted () {
    this.setMenuName('成本测算')
    this.quoteNo = this.$route.params.quoteNo
    this.tradeTerms = localStorage.getItem('tradeTerms')
    this.verifyValidCode()
  },
  directives: {
    limit: limit
  },
  components: {
    inquireMessage,
    hscodeView
  }
}
</script>

<style lang='stylus' scoped>
.cost-calculation
  width 100%
  background #F0F2F5
  height auto
  box-sizing border-box
  min-width 1100px
  padding 0px
  .section
    width 100%
    height auto
    background #ffffff
    margin-bottom 14px
    .title
      display flex
      align-items center
      box-sizing border-box
      border-bottom 1px solid #f0f2f5
      padding 20px
      .title-h4
        font-size 14px
        font-weight bold
        color #353535
        margin-right 14px
      .title-btn
        width 98px
        height 30px
        border-radius 15px
        background #F0F2F5
        display flex
        align-items center
        justify-content center
        cursor pointer
        .btn-icon
          width 12px
          height 14px
          background url('./img/xunjia.png')no-repeat center/100%
          margin-right 10px
        .btn-p
          font-size 12px
          color #353535
          font-weight 500
          line-height 16px
          border-bottom 1px solid #353535
      .title-p
        font-size 12px
        color #FBB03B
        font-weight 500
    .section-content
      padding 30px 20px 0
    .line
      border-top 1px solid #f0f2f5
    .search-form
      display flex
      justify-content space-between
      align-items center
      flex-wrap wrap
      .search-form-item
        width 28%
        margin-left 8%
        margin-bottom 30px
        &:nth-child(3n+1)
          margin-left 0
        .el-select
          width 100%
        .el-input__inner
          font-size 12px
        .search-item-label
          display flex
          align-items center
          margin-bottom 14px
          .search-term
            font-size 12px
            color #353535
            font-weight 500
            min-width 40px
          .search-item-star
            font-size 14px
            color #F56C6C
            font-weight 500
            margin 0 14px 0 8px
          .search-item-tips
            font-size 12px
            color #FBB03B
            font-weight 500
        .label-width
          width 42px !important
        .search-item-value
          position relative
          .symbol
            position absolute
            top 10px
            left 15px
            z-index 10
            font-size 12px
            color #353535
            font-weight 500
          >>>.el-input__inner
            padding-left 30px
    .search-table
      display block
      .btn-detail
        color #FBB03B
        font-size 12px
        font-weight 500
      .btn-del
        font-size 12px
        color #F56C6C
        font-weight 500
      .section-search-line
        margin 0px auto 30px
        display flex
        align-items center
        .search-item-input
          width 400px
          height 30px
          margin-right 10px
        .search-btn
          width 60px
          height 30px
          border 1px solid #FBB03B
          background #FFF7EB !important
          color #FBB03B
          font-size 14px
          font-weight 500
          text-align center
    .btn
      margin-top 20px
      margin-bottom 30px
      background #f6ab39
      color #fff
      border 0
    .cost-content
      .section
        margin 30px 0
      .item-box
        display flex
        align-item center
        justify-content space-between
        padding 30px 20px
        .item
          flex 1
          .item-name
            font-size 12px
            color #7A7E85
            font-weight 500
            margin-top 20px
            text-align center
          .item-value
            font-size 24px
            color #353535
            font-weight bold
            text-align center
            display flex
            align-items center
            justify-content center
            span
              font-size 14px
              font-weight 500
              color #353535
              margin-right 8px
            >>> .el-input
              width 80%
          .red
            color #F56C6C
      .section-box
        display flex
        align-items center
        padding 0 20px
        .pd-items
          display flex
          justify-content space-between
          flex-direction column
          width 260px
          height 94px
          position relative
          .item
            display flex
            align-items center
            font-size 12px
            .item-name
              color #7A7E85
            .item-input
              color #353535
        .line-action
          position relative
          flex 1
      .legend
        position absolute
        top 36px
        left 0
        right 0
        margin 0 auto
        z-index 99
        width 80%
        min-width 900px
        .legend-items
          display flex
          align-items center
          width 100%
          .legend-item
            flex 1
            display flex
            align-items center
            .color
              width 11px
              height 11px
              border-radius 2px
            .color1
              background #fbda24
            .color2
              background #0cd3fa
            .color3
              background #ff80db
            .color4
              background #ff443e
            .color5
              background #58e47c
            .text
              font-size 12px
              color #353535
              font-weight 500
              margin-left 8px
              margin-right 14px
            .price-sy, .price
              font-size 12px
              color #353535
              font-weight 500
            .price
              margin-left 8px
  .identifyCodeBox
    .tips
      font-size 14px
      font-weight bold
      color #353535
      margin-bottom 20px
    img
      display block
      margin 0 auto 20px
  .input-box
    display flex
    align-items center
    .label-icon
      margin-right 5px
    >>> .el-input__inner
      padding 0 5px
  .search-table
    display block
    >>> .el-table th>.cell
      color #7A7E85
  >>> .el-form-item__content
    width 100%
  >>>.el-dialog--center .el-dialog__body
    padding 0 20px 20px
  >>>.el-dialog__header
    text-align: left;
    padding 20px
    border-bottom: 1px solid #f0f2f5;
  >>>.el-popover
    background: #FFF7EB;
    font-size: 12px;
    border: 1px solid #FBB03B;
    color: #353535;
  >>> .el-button--text
    color #FBB03B
  .grey
    color #888888
  .btn-box
    width 90px
    height 30px
    line-height 30px
    text-align center
    font-size 14px
    font-weight 500
    border-radius 5px
    cursor pointer
  .sty1
    background #FBB03B
    border 1px solid #FBB03B
    color #FFFFFF
  .sty2
    background #FFF7EB
    border 1px solid #FBB03B
    color #FBB03B
    margin-left 50px
</style>
