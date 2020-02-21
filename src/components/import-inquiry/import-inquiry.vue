<template>
  <div class="import-inquiry">
    <div class="section">
      <div class="title">
        <el-row>
          <el-col :span="9">
            <div class="title-tips">
              <h4 class="title-h4">询价信息录入</h4>
              <div class="title-btn">
                <span class="btn-icon"></span>
                <p class="btn-p" @click="handleChangeRoute">历史询价</p>
              </div>
            </div>
          </el-col>
          <el-col :span="15">
            <div class="title-edit" v-if="userRoles.indexOf('AC_IMPORT_GLY') > -1 || userRoles.indexOf('AC_IMPORT_XS') > -1">
              <template v-if="mode === 'add'">
                <div>
                  <el-select
                  clearable
                  popper-class="si-select-list"
                  filterable
                  v-model="DCCompCode"
                  remote
                  :class="{'required-error1': miss1}"
                  @change="handleSelect"
                  @focus="fetchDCInfo(false)"
                  :remote-method="(val) => { fetchDCInfo(val)}"
                  placeholder="请选择直客公司"
                >
                  <el-option
                    v-for="(c, i) in DCComList"
                    :key="i"
                    :value="c.compCode"
                    :label="c.compName"
                  ></el-option>
                </el-select>
                <el-select
                  v-show="DCComUserList.length !== 0 || this.DCUserId"
                  clearable
                  popper-class="si-select-list"
                  v-model="DCUserId"
                  @change="handleSelectUser"
                  :class="{'required-error1': miss2}"
                  placeholder="请选择操作"
                >
                  <el-option
                    v-for="(c, i) in DCComUserList"
                    :key="i"
                    :value="c.userId"
                    :label="c.username"
                  ></el-option>
                </el-select>
                </div>
              </template>
              <template v-else-if="mode === 'edit'">
                <div class="dcdesc">
                  <span>询价人员：{{this.dcUsername}}</span>
                </div>
                <div class="dcdesc">
                  <span>公司：{{this.compName}}</span>
                </div>
              </template>
            </div>
          </el-col>
        </el-row>
        <!-- </div> -->
      </div>
      <search-box
        :searchColumns="searchColumns"
        @on-search="handleChangeSearch"
        v-if="searchBoxVisible"
      />
    </div>
    <div class="section">
      <div class="title">
        <div class="title-tips">
          <h4 class="title-h4">报关物品信息录入</h4>
        </div>
      </div>
      <div class="section-content">
        <hscode-view
          @add-hscode="handleClickAdd"
          @cancle-hscode="handleClickCancle"
          @handle-reset="handleDialogReset"
          @check-danger="checkdanger"
          :goodsInfo="goodsInfo"
          :goodsInfoItem="goodsInfoItem"
          :checked="checked"
          ref="hsCode"
        ></hscode-view>
        <div class="section-table">
          <el-table
            :data="goodsInfo"
            highlight-current-row
            :header-cell-style="{ background: '#f6f7f8'}"
            class="section-table-con"
            style="width: 100%">
            <template slot="empty">
              <div class="normal">
                <img src="./img/normal.png" alt />
                <p>暂无数据，请查询并添加，可添加多条</p>
              </div>
            </template>
            <el-table-column prop="goodsName" label="品名" min-width="70"></el-table-column>
            <el-table-column prop="casGoodsName" label="已查 CAS 编号信息" min-width="70">
              <template slot-scope="scope">
                <div class="danger-goods" v-if="scope.row.casNo && scope.row.casGoodsName">
                  <p class="goodsCas">{{scope.row.casNo}}</p>
                  <p class="goodsNane">{{scope.row.casGoodsName}}</p>
                </div>
                <div v-else-if="!scope.row.casNo && scope.row.casGoodsName">
                  <p>{{scope.row.casGoodsName}}</p>
                </div>
                <div v-else class="noDetermine">{{scope.row.casGoodsName = '未作判定'}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="hsCode" label="HS Code" min-width="80"></el-table-column>
            <el-table-column prop="goodsType"  min-width="160">
              <template slot="header" slot-scope="scope">
                <span v-if="!scope"></span>
                <div class="cell-head" >
                  <span >产品类别为必选项</span>
                  <span class="cell-header-star">*</span>
                  <span class="cell-header-tips">请在添加产品时，遵循单类别产品原则</span>

                </div>
              </template>
              <template slot-scope="scope">
                <el-select
                  v-model="goodsType"
                  clearable
                  :class="{'': scope.row.hsCode}"
                  placeholder="请选择"
                  size="small"
                  @change="goodsTypechange"
                >
                  <el-option
                    v-for="c in goodsTypeVal"
                    :key="c.value"
                    :label="c.label"
                    :value="c.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClickDetail(scope.row.hsCode)"
                  type="text"
                  class="btn-detail"
                  size="small"
                >查看</el-button>
                <el-button
                  @click="handleDel(scope.$index)"
                  type="text"
                  size="small"
                  class="btn-del"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="title service">
        <div class="title-tips">
          <h4 class="title-h4">增值服务</h4>
          <span class="title-p">（仓储服务、准入判定、标签服务暂不计入预估费用，若需委托，请与客服单议）</span>
        </div>
      </div>
      <div class="section-content">
        <el-checkbox-group v-model="services" class="checkbox">
          <template v-for="item in servicesItem">
            <el-checkbox
              :label="item.label"
              :class="item.class"
              :key="item.label"
              @change="handleChangeCheck(item)"
            >
              {{item.value}}
              <span v-if="item.tips" class="ye">{{item.tips}}</span>
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </div>
    </div>
    <div class="flex-bottom">
      <div class="btn-box sty1" @click="handleClickSave">保存</div>
      <div class="btn-box sty1" @click="handleClickSearch">询价</div>
      <div class="btn-box sty2" @click="handleReset">重置</div>
    </div>
  </div>
</template>
<script>
import { getQuoteDraft, getSuperviseMethod, getHsName, getQuoteCountry, getQuotePortQuery, postQuoteAc, postQuote, getQuoteDcInfo } from 'api/import'
// import OrderPagination from 'components/pagination/pagination'
import hscodeView from 'components/enquiry/hscode'
import searchBox from './search-box'
import { MODES_OF_TRANSPORT, TRADING_TERMS, GOODS_CATEGORY, CURRENCY, MODES_OF_TRANSPORTAREA } from 'assets/constant'
// import VDistpicker from 'components/distPicker/Distpicker'
import { mapGetters } from 'vuex'
export default {
  name: 'import',
  data () {
    return {
      selected2: '',
      quoteNo: '',
      miss1: false,
      miss2: false,
      DCCompCode: '',
      compName: '',
      DCComList: [],
      DCUserId: '',
      dcUsername: '',
      DCComUserList: [],
      searchBoxVisible: true,
      name: '',
      delay: true,
      targetPort: [],
      formData: [],
      goodsTypeVal: GOODS_CATEGORY,
      goodsInfo: [],
      goodsInfoItem: [],
      goodsType: '',
      services: [],
      quoteVersion: '',
      servicesItem: [
        {
          label: 'A',
          value: '贸易代理'
        },
        {
          label: 'C',
          value: '归类服务'
        },
        {
          label: 'G',
          value: '文件服务'
        },
        {
          label: 'H',
          value: '办证服务'
        },
        {
          label: 'B',
          value: '仓储服务',
          tips: '',
          class: 'yellow'
        },
        {
          label: 'D',
          value: '准入判定',
          tips: '',
          class: 'yellow'
        },
        {
          label: 'E',
          value: '标签服务',
          tips: '',
          class: 'yellow'
        }
      ],
      error: false,
      infoParams: {},
      mode: 'add',
      searchColumns: [
        {
          type: 'selectInput',
          text: '是否订舱 | 船名航次',
          error: false,
          required: true,
          searchGroup: [
            {
              type: 'select',
              error: false,
              show: true,
              placeholder: '请选择是否已订舱',
              dataItem: [{
                label: '已订舱',
                value: 'y'
              }, {
                label: '未订舱',
                value: 'n'
              }],
              value: '',
              prop: 'shipBookTag'
            },
            {
              type: 'input',
              show: false,
              error: false,
              value: '',
              placeholder: '请输入船名',
              prop: 'shipName'
            },
            {
              type: 'input',
              show: false,
              error: false,
              value: '',
              placeholder: '请输入航次',
              prop: 'vesselNo'
            }
          ]
        },
        {
          type: 'selectInput',
          text: '原产国 | 有无原产地证',
          error: false,
          required: true,
          searchGroup: [
            {
              type: 'select',
              error: false,
              show: true,
              prop: 'originCountry',
              value: '',
              filterable: true,
              optionsName: 'originCountry',
              request: getQuoteCountry,
              formatValue (cc) {
                return cc.originalCountry
              },
              formatLabel (cc) {
                return `${cc.originalCountry}(${cc.originalCountryEn})`
              },
              placeholder: '请选择原产国'
            },
            {
              type: 'select',
              error: false,
              show: true,
              prop: 'originLicenseTag',
              value: '',
              placeholder: '请选择有无原产地证',
              dataItem: [{
                label: '有',
                value: 'y'
              }, {
                label: '无',
                value: 'n'
              }]
            }
          ]
        },
        {
          type: 'selectInput',
          text: '目的港',
          error: false,
          required: true,
          searchGroup: [
            {
              type: 'select',
              show: true,
              error: false,
              filterable: true,
              placeholder: '请选择/输入目的港',
              optionsName: 'targetPort',
              value: '',
              request: getQuotePortQuery,
              formatValue (cc) {
                return cc.targetPort
              },
              formatLabel (cc) {
                return cc.targetPort
              },
              prop: 'targetPort'
            },
            {
              type: 'select',
              error: false,
              show: false,
              placeholder: '请选择港区',
              value: '',
              dataItem: MODES_OF_TRANSPORTAREA,
              prop: 'targetPortArea'
            }
          ]
        },
        {
          type: 'selectInput',
          text: '运输方式',
          error: false,
          required: true,
          searchGroup: [
            {
              type: 'select',
              error: false,
              show: true,
              placeholder: '请选择运输方式',
              value: '',
              dataItem: MODES_OF_TRANSPORT,
              prop: 'transferWay'
            }
          ]
        },
        {
          type: 'inputCount',
          error: false,
          required: true,
          text: '箱型箱量',
          prop: 'cont',
          value: '',
          cont20gp: null,
          cont40gp: null,
          cont40hq: null,
          edit: true
        },
        {
          type: 'selectInput',
          error: false,
          required: true,
          text: '产品数量',
          searchGroup: [
            {
              type: 'input',
              show: true,
              error: false,
              prop: 'count',
              value: '',
              placeholder: '请输入产品数量',
              limit: true
            }
          ]
        },
        {
          type: 'selectInput',
          error: false,
          required: true,
          text: '件数 | 包装种类 | 毛重(KGS) | 体积(CBM)',
          searchGroup: [
            {
              type: 'input',
              error: false,
              show: true,
              prop: 'units',
              placeholder: '请输入件数',
              value: '',
              limit: true
            },
            {
              type: 'select',
              error: false,
              prop: 'packageType',
              value: '',
              show: true,
              dataItem: [
                {
                  label: '散装',
                  value: '散装'
                },
                {
                  label: '裸装',
                  value: '裸装'
                },
                {
                  label: '球状罐类',
                  value: '球状罐类'
                },
                {
                  label: '包/袋',
                  value: '包/袋'
                },
                {
                  label: '纸制或纤维板制盒/箱',
                  value: '纸制或纤维板制盒/箱'
                },
                {
                  label: '木制或竹藤等植物性材料制盒/箱',
                  value: '木制或竹藤等植物性材料制盒/箱'
                },
                {
                  label: '其他性材料制盒/箱',
                  value: '其他性材料制盒/箱'
                },
                {
                  label: '纸制或纤维板制桶',
                  value: '纸制或纤维板制桶'
                },
                {
                  label: '木制或竹藤等植物性材料制桶',
                  value: '木制或竹藤等植物性材料制桶'
                },
                {
                  label: '其他材料制桶',
                  value: '其他材料制桶'
                },
                {
                  label: '再生木托',
                  value: '再生木托'
                },
                {
                  label: '天然木托',
                  value: '天然木托'
                },
                {
                  label: '其他包装',
                  value: '其他包装'
                }
              ],
              placeholder: '请选择'
            },
            {
              type: 'input',
              error: false,
              show: true,
              prop: 'grossWeight',
              value: '',
              placeholder: '请输入毛重',
              limit: true
            },
            {
              type: 'input',
              error: false,
              show: true,
              prop: 'volume',
              value: '',
              placeholder: '请输入体积',
              limit: true
            }
          ]
        },
        {
          type: 'selectInput',
          error: false,
          required: true,
          text: '货值 | 币种',
          searchGroup: [
            {
              type: 'input',
              error: false,
              show: true,
              prop: 'goodsValue',
              value: '',
              placeholder: '请输入货值',
              limit: true
            },
            {
              type: 'select',
              error: false,
              show: true,
              dataItem: CURRENCY,
              prop: 'currency',
              value: '',
              placeholder: '请选择币种'
            }
          ]
        },
        {
          type: 'selectInput',
          error: false,
          required: true,
          text: '成交条款 | 监管方式',
          searchGroup: [
            {
              type: 'select',
              error: false,
              show: true,
              text: '成交条款',
              dataItem: TRADING_TERMS,
              prop: 'tradeTerms',
              value: '',
              placeholder: '请选择成交条款'
            },
            {
              type: 'select',
              option: 'group',
              text: '监管方式',
              show: true,
              error: false,
              value: '',
              dataItem: [],
              prop: 'custDeclareWay',
              placeholder: '请选择监管方式'
            }
          ]
        },
        {
          type: 'distpicker',
          error: false,
          required: true,
          text: '送货地址',
          prop: 'address',
          value: '',
          town: '',
          province: '',
          city: '',
          region: '',
          address: '',
          placeholder1: '请选择省市区',
          placeholder2: '请输入详细地址'
        },
        {
          type: 'selectInput',
          text: '备注',
          searchGroup: [
            {
              type: 'input',
              show: true,
              prop: 'remark',
              value: '',
              inputType: 'textarea',
              placeholder: '您可以在此处填写具体尺寸（长宽高）、特殊需求等'
            }
          ]
        },
        {
          type: 'selectInput',
          error: false,
          required: false,
          text: '业务描述',
          searchGroup: [
            {
              type: 'input',
              error: false,
              show: true,
              prop: 'buzDesc',
              value: '',
              inputType: 'textarea',
              placeholder: '特别的监管方式请在此处填入业务描述以供专家报价分析'
            }
          ]
        }
      ],
      checked: false
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  methods: {
    requestData (quoteNo) {
      getQuoteDraft(quoteNo)
        .then(res => {
          if (res && res.msg === 'success') {
            this.formData = res.data
            this.quoteVersion = res.data.quoteVersion || res.data.quoteVersion === 0 ? res.data.quoteVersion : ''
            // console.log('123', this.quoteVersion)
            this.DCCompCode = res.data.compCode
            this.compName = res.data.compName
            this.DCUserId = res.data.dcUserId
            this.dcUsername = res.data.dcUsername
            this.conversion(this.searchColumns, res.data)
            this.services = res.data.services ? res.data.services.split(',') : []
            this.goodsInfo = res.data.goodsInfo
            this.goodsType = res.data.goodsInfo.length > 0 ? res.data.goodsInfo[0].goodsType : ''
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    conversion (searchColumns, data) {
      this.searchColumns = searchColumns.map(item => {
        if (item.type === 'selectInput') {
          item.searchGroup.map(list => {
            list.value = data[list.prop]
          })
        } else if (item.type === 'inputCount') {
          item.cont20gp = data['cont20gp']
          item.cont40gp = data['cont40gp']
          item.cont40hq = data['cont40hq']
        } else if (item.type === 'distpicker') {
          item.value = [data['province'], data['city'], data['region'], data['town']]
          item.province = data['province']
          item.city = data['city']
          item.area = data['region']
          item.town = data['town']
          item.address = data['address']
        }
        return item
      })
    },
    handleReset () {
      this.searchBoxVisible = false
      this.$nextTick(() => {
        this.searchBoxVisible = true
      })
      this.services = []
      this.goodsInfo = []
      this.$refs.hsCode.handleReset()
    },
    handleDialogReset () {
      this.goodsInfo = []
    },
    handleChangeCheck (item) {
      if (this.services.indexOf(item.label) > -1) {
        if (item.label === 'B' || item.label === 'D' || item.label === 'E') {
          item.tips = '（此项暂不计入预估）'
        }
      } else {
        item.tips = ''
      }
    },
    handleChangeSearch (data) {
      this.formData = data
      if (this.formData['targetPortArea'] === 'PDJC' && this.servicesItem[0].label !== 'F') {
        this.servicesItem.unshift({
          label: 'F',
          value: '使用AnyCase机场监管仓库',
          class: 'red'
        })
      } else if (this.formData['targetPortArea'] !== 'PDJC' && this.servicesItem[0].label === 'F') {
        this.servicesItem.shift()
      }
    },
    customFieldColumn (h, { column, $index }) {
      return (
        h('div', {
          class: 'cell-head'
        }, [
          h('span', '产品类别'),
          h('span', {
            class: 'cell-header-star',
            domProps: {
              innerHTML: '*'
            }
          }),
          h('span', {
            class: 'cell-header-tips',
            domProps: {
              innerHTML: '请在添加产品时，遵循单类别产品原则'
            }
          })
        ])
      )
    },
    getCustDeclareWay () {
      getSuperviseMethod()
        .then(res => {
          if (res && res.msg === 'success') {
            let data = res.data && (res.data.records || [])
            let group1 = []
            let group2 = []
            data.forEach(item => {
              if (item.acSupport && item.acSupport === 'Y') {
                group1.push(item)
              } else {
                group2.push(item)
              }
            })
            let custDeclareWayData = [{
              label: '常用类型',
              options: group1
            }, {
              label: '其他',
              options: group2
            }]
            this.searchColumns.map(item => {
              if (item.text === '成交条款 | 监管方式') {
                item.searchGroup[1].dataItem = custDeclareWayData
              }
              return item
            })
            // console.log(this.searchColumns)
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
    handleDel (index) {
      this.goodsInfo.splice(index, 1)
    },
    handleChangeRoute () {
      this.$router.push({ name: 'importInquiryList' })
    },
    handleClickAdd ({ goodsName, hsCode, casNo, casGoodsName, determine }) {
      // console.log('添加', goodsName, hsCode, casNo, casGoodsName, determine)
      this.goodsInfo.push({
        goodsName: goodsName,
        casNo: casNo,
        casGoodsName: casGoodsName,
        goodsType: '',
        hsCode: hsCode
      })
      this.goodsType = determine
      console.log('品名', this.goodsInfo, this.goodsType)
      this.goodsTypechange()
    },
    handleClickCancle (row) {
      let i = null
      this.goodsInfo.forEach((item, index) => {
        if (item.hsCode === row.hsCode) {
          i = index
        }
      })
      this.goodsInfo.splice(i, 1)
    },
    checkdanger (val, flag) {
      // console.log('选择', val)
      this.checked = val
      if (this.checked) {
        this.goodsType = '危险品'
      } else if (flag) {
        this.goodsType = this.goodsType
      } else {
        this.goodsType = ''
      }
    },
    goodsTypechange () {
      if (this.goodsType === '危险品') {
        this.checkdanger(true)
      } else {
        this.checkdanger(false, 'flag')
      }
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
    handleClickInquiry (pathName, quoteNo) {
      this.$router.push({ name: pathName, params: { quoteNo: quoteNo } })
    },
    handleVisible (visible, request, optionsName) {
      this.loading = true
      if (visible.toString() === 'true') {
        visible = ''
      }
      request({ param: visible })
        .then(res => {
          if (res && res.msg === 'success') {
            this[optionsName] = res.data && (res.data.records || [])
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
    getOptions (optionsName) {
      return this[optionsName]
    },
    compareResulte (c1, c2) {
      return c1.some(item => {
        return item.shortName === c2
      })
    },
    handleClickSave () {
      if (this.userRoles.indexOf('AC_IMPORT_GLY') > -1 || this.userRoles.indexOf('AC_IMPORT_XS') > -1) {
        if (!this.DCCompCode) {
          this.$message.error('请选择直客公司')
          this.miss1 = true
          return
        } else if (!this.DCUserId) {
          this.$message.error('请选择直客操作')
          this.miss2 = true
          return
        }
      }
      this.goodsInfo.map(item => {
        item.goodsType = this.goodsType
        return item
      })
      const query = {
        ...this.formData,
        quoteVersion: this.quoteVersion,
        quoteNo: this.quoteNo,
        goodsInfo: this.goodsInfo,
        services: this.services.join(','),
        saveOrQuote: 'save'
      }
      this.mode = 'edit'
      if (this.delay) {
        this.delay = false
        if (this.userRoles.indexOf('AC_IMPORT_GLY') > -1 || this.userRoles.indexOf('AC_IMPORT_XS') > -1) {
          query.compCode = this.DCCompCode
          query.dcUserId = this.DCUserId
          // console.log('询价保存', query)
          this.handleSendInquiryMessage(query, postQuoteAc)
        } else {
          // console.log('询价保存', query)
          this.handleSendInquiryMessage(query, postQuote)
        }
      }
    },
    handleClickSearch () {
      if (this.userRoles.indexOf('AC_IMPORT_GLY') > -1 || this.userRoles.indexOf('AC_IMPORT_XS') > -1) {
        if (!this.DCCompCode) {
          this.$message.error('请选择直客公司')
          this.miss1 = true
          return
        } else if (!this.DCUserId) {
          this.$message.error('请选择直客操作')
          this.miss2 = true
          return
        }
      }
      if (!this.formData.shipBookTag || (this.formData.shipBookTag === 'y' && !this.formData.shipName)) {
        this.$message.error('是否订舱 | 船名航次 未填写')
        return
      } else if (!this.formData.originCountry) {
        this.$message.error('原产国 未填写')
        return
      } else if (!this.formData.targetPort) {
        this.$message.error('目的港 未填写')
        return
      } else if (this.formData.targetPort === '上海港' && !this.formData.targetPortArea) {
        this.$message.error('港区 未填写')
        return
      } else if (!this.formData.transferWay) {
        this.$message.error('运输方式 未填写')
        return
      } else if (this.formData.transferWay === 'fcl' && !this.formData.cont20gp && !this.formData.cont40gp && !this.formData.cont40hq) {
        this.$message.error('箱型箱量 未填写')
        return
      } else if (!this.formData.count) {
        this.$message.error('产品数量 未填写')
        return
      } else if (!this.formData.units || !this.formData.packageType || !this.formData.grossWeight || !this.formData.volume) {
        this.$message.error('件数 | 包装种类 | 毛重(KGS) | 体积(CBM) 未填写')
        return
      } else if (!this.formData.goodsValue || !this.formData.currency) {
        this.$message.error('货值 | 币种')
        return
      } else if (!this.formData.custDeclareWay || !this.formData.tradeTerms) {
        this.$message.error('成交条款 | 监管方式未填写')
        return
      } else if (!this.formData.addressAll) {
        this.$message.error('送货地址未填写')
        return
      } else if (this.formData.townList.length > 0 && !this.formData.town) {
        // console.log(this.formData.townList)
        this.$message.error('镇不能为空')
        return
      } else if (this.compareResulte(this.searchColumns[8].searchGroup[1].dataItem[1].options, this.formData.custDeclareWay)) {
        this.$message.error('业务描述 未填写')
        return
      } else if (this.goodsInfo.length <= 0) {
        this.$message.error('询价信息需要录入品名')
        return
      } else if (!this.goodsType) {
        this.$message.error('产品类别为必选项')
        return
      }
      this.goodsInfo.map(item => {
        item.goodsType = this.goodsType
        return item
      })
      const query = {
        ...this.formData,
        quoteVersion: this.quoteVersion,
        quoteNo: this.quoteNo ? this.quoteNo : '',
        goodsInfo: this.goodsInfo,
        services: this.services.join(','),
        saveOrQuote: 'quote'
      }
      this.mode = 'add'
      if (this.delay) {
        this.delay = false
        if (this.userRoles.indexOf('AC_IMPORT_GLY') > -1 || this.userRoles.indexOf('AC_IMPORT_XS') > -1) {
          query.compCode = this.DCCompCode
          query.dcUserId = this.DCUserId
          // console.log('询价', query)
          this.handleSendInquiryMessage(query, postQuoteAc)
        } else {
          this.handleSendInquiryMessage(query, postQuote)
        }
      }
    },
    handleSendInquiryMessage (query, request) {
      request(query)
        .then(res => {
          if (res && res.msg === 'success') {
            let quoteNo = res.data
            if (this.mode === 'add') {
              this.$router.push({ name: 'importQuote', params: { quoteNo, status: '已报价' } })
            } else if (this.mode === 'edit') {
              this.$router.push({ name: 'importInquiryList' })
            }
            this.delay = true
          }
          if (res && res.msg === 'fail') {
            this.delay = true
            this.$message.error(res.verror)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchDCInfo (val) {
      if (val !== false) {
        this.infoParams = {
          param: val
        }
      }
      getQuoteDcInfo(this.infoParams)
        .then(res => {
          if (res && res.msg === 'success') {
            // console.log(res)
            this.DCComList = res.data && (res.data.records || [])
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    handleSelect (val) {
      if (!val) {
        this.miss1 = true
        return
      } else {
        this.miss2 = false
      }
      this.DCUserId = ''
      this.DCComList.forEach(item => {
        if (item.compCode === val) {
          this.DCComUserList = item.users || []
        }
      })
    },
    handleSelectUser (val) {
      if (!val) {
        this.miss2 = true
      } else {
        this.miss2 = false
      }
    }
  },
  mounted () {
    this.quoteNo = this.$route.query.quoteNo
    // console.log('询价号', this.quoteNo)
    if (this.quoteNo) {
      this.mode = 'edit'
      this.requestData(this.quoteNo)
    }
    this.getCustDeclareWay()
  },
  watch: {
    // checked: {
    //   handler (nv, ov) {
    //     if (nv) {
    //       this.goodsType = '危险品'
    //     } else {
    //       this.goodsType = ''
    //     }
    //   },
    //   immediate: true
    // },
    goodsInfo: {
      handler (nv, ov) {
        if (nv.length === 0) {
          this.checked = false
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    // VDistpicker,
    // OrderPagination,
    // SIdentify,
    searchBox,
    hscodeView
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~styles/variable';
.import-inquiry
  width: 100%;
  background: #F0F2F5;
  height: auto;
  box-sizing: border-box;
  min-width: 1100px;
  padding: 0px 0px 30px;
  .section
    width: 100%;
    height: auto;
    background: $color-background;
    margin-bottom: 14px;
    .service
      display: flex;
      align-items: center;
      .title-h4
        margin-right: 10px;
    .title
      box-sizing: border-box;
      padding: 20px;
      border-bottom: 1px solid #f0f2f5;
      .title-tips
        display: flex;
        align-items: center;
        .title-h4
          font-size: 14px;
          font-weight: bold;
          color: #353535;
          margin-right: 10px;
      .title-edit
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
        align-items: center;
        .dcdesc span
          font-size: 14px;
          margin-left: 20px;
          line-height: 30px;
      .title-btn
        width: 98px;
        height: 30px;
        border-radius: 15px;
        background: #F0F2F5;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .btn-icon
          width: 16px;
          height: 16px;
          background: url('./img/lishi.png') no-repeat center / 100%;
          margin-right: 10px;
        .btn-p
          font-size: 12px;
          color: #353535;
          font-weight: 500;
          line-height: 16px;
          border-bottom: 1px solid #353535;
      .title-p
        font-size: 12px;
        font-weight: 500;
        color: #FBB03B;
    .section-content
      box-sizing: border-box;
      padding: 0 20px;
      width: 100%;
      overflow: hidden;
      .checkbox
        margin: 30px 0;
        .ye
          display: block;
          color: #fbb03b;
          font-size: 12px;
          text-align: center;
          position: absolute;
          left: -15px;
        >>> .el-checkbox
          margin-right: 22px;
          .el-checkbox__label
            font-size: 12px;
            color: #353535;
        >>>.red
          .el-checkbox__label
            color: #F56C6C;
        >>>.yellow
          .el-checkbox__label
            color: #406CAD;
      .section-table
        width: 100%;
        padding-bottom: 30px;
        .section-table-con, >>>.el-table th
          padding: 0;
          .cell-head
            vertical-align: middle;
        >>>.cell-header-star
          margin-left: 8px;
          font-size: 14px;
          font-weight: bold;
          color: #F56C6C;
        >>>.cell-header-tips
          margin-left: 14px;
          font-weight: 500;
          color: #F56C6C;
        >>>.el-table th>.cell
          color: #7a7e85;
          font-size: 12px;
        .normal
          margin: 20px auto 30px;
          img
            display: block;
            margin: 0 auto 20px;
          p
            font-size: 12px;
            font-weight: 500;
            color: #D3D3D3;
            text-align: center;
        .danger-goods
          .goodsCas
            color #353535
          .goodsNane
            color #aaa
        .btn-detail
          color: #FBB03B;
          font-size: 12px;
          font-weight: 500;
        .btn-del
          font-size: 12px;
          color: #F56C6C;
          font-weight: 500;
</style>
