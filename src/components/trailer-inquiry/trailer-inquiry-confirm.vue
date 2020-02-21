<template>
  <div class='trailer-inquiry-confirm'>
    <div class="confirm-up">
      <div class="title">仅限出口</div>
      <div class="form">
        <el-form :model="setTruckForm" :rules="rules" ref="setTruckForm" label-width="110px" class="form-setting">
          <el-form-item label="港口" required style="margin-bottom:0">
            <el-form-item prop="startPort">
              <el-select v-model="setTruckForm.startPort" placeholder="请选择起运港">
                <el-option v-for="item in startPortOption" :label="item.label" :key="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="startHarbor">
              <el-select v-model="setTruckForm.startHarbor" placeholder="请选择码头">
                <el-option v-for="item in startHarborOption" :label="item.label" :key="item.value" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form-item>
          <el-form-item label="主提单号" prop="billNo" required>
            <el-input v-model="setTruckForm.billNo"></el-input>
          </el-form-item>
          <el-form-item label="分单号" v-for="(item, index) in setTruckForm.subBillNos" :key="index">
            <el-input v-model="item.billNo"></el-input>
            <i class="el-icon-delete btn-plus" v-if="setTruckForm.subBillNos.length > 0 && index === setTruckForm.subBillNos.length - 1" @click="deleteRowBillNo(index)"></i>
            <span class="el-icon-plus btn-plus" v-if="index === setTruckForm.subBillNos.length - 1" @click="handleAddSubBillNo"></span>
          </el-form-item>
          <el-form-item label="船公司">
            <el-input v-model="setTruckForm.shipCompany"></el-input>
          </el-form-item>
          <el-form-item label="船名航次" required>
            <el-form-item prop="shipName">
              <el-input v-model="setTruckForm.shipName"></el-input>
            </el-form-item>
            <el-form-item prop="vesselNo">
              <el-input v-model="setTruckForm.vesselNo" class="last-input"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="中转港">
            <el-autocomplete class="inline-input" v-model="setTruckForm.transitPort" :fetch-suggestions="querySearch" placeholder="请出入要提示的内容" @select="handleSelect" :debounce="300" :trigger-on-focus="true" style="width: 100%"></el-autocomplete>
          </el-form-item>
          <el-form-item label="目的港" required prop="targetPort">
            <el-autocomplete class="inline-input" v-model="setTruckForm.targetPort" :fetch-suggestions="querySearch" placeholder="请出入要提示的内容" @select="handleSelect" :debounce="300" :trigger-on-focus="true" style="width: 100%"></el-autocomplete>
          </el-form-item>
          <el-form-item label="自有业务编号" v-for="(item, index) in setTruckForm.customerNos" :key="item + index">
            <el-input v-model="item.customerNo"></el-input>
            <i class="el-icon-delete btn-plus" v-if="setTruckForm.customerNos.length > 0 && index === setTruckForm.customerNos.length - 1" @click="deleteRowElection(index)"></i>
            <span class="el-icon-plus btn-plus" v-if="index === setTruckForm.customerNos.length - 1" @click="handleAddCustomerNo"></span>
          </el-form-item>
          <el-form-item label="总件数">
            <el-input v-model="setTruckForm.totalCount"></el-input>
          </el-form-item>
          <el-form-item label="总毛重 (KGS)">
            <el-input v-model="setTruckForm.totalWeight"></el-input>
          </el-form-item>
          <el-form-item label="总体积 (CBM)">
            <el-input v-model="setTruckForm.totalVolumn"></el-input>
          </el-form-item>
          <el-form-item label="箱型箱量" required>
            <number-box :curVal="setTruckForm.cont20gp" :unit="unit1" :edit="true" @onChange="handleChangeVal1" />
            <number-box :curVal="setTruckForm.cont40gp" :unit="unit2" :edit="true" @onChange="handleChangeVal2" />
            <number-box :curVal="setTruckForm.cont40hq" :unit="unit3" :edit="true" @onChange="handleChangeVal3" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="confirm-down">
      <tree-table :boxList="boxList" :showBtn="showBtn" ref="treeTable" @on-add="handleAdd" @on-dele="handleDelete" @on-delete="handleDeleteZxmdList" @on-plus="handlePlusZxmdList" @on-select="handleSelectZxmdList" @on-save="handleRowSave" @on-edit="handleRowEdit" @on-change="handleChangeBoxType"></tree-table>
      <el-form :model="setTruckForm" :rules="rules" ref="setTruckForm" label-width="180px" class="form-content">
        <el-form-item label="请补充做箱要求" prop="orderRemark ">
          <el-input type="textarea" :rows="2" v-model="setTruckForm.orderRemark"></el-input>
        </el-form-item>
        <el-form-item label="委托">
          <el-radio-group class="radio-group" v-model="setTruckForm.wt">
            <el-radio label="wtyt">委托预提</el-radio>
            <el-radio label="wtyj">委托预进</el-radio>
            <el-radio label="wtzlzx">委托暂落重箱</el-radio>
            <el-radio label="cbzz">船边直装</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="等通知放设备单" required prop="sbdFlag">
          <el-radio v-model="setTruckForm.sbdFlag" label="Y">是</el-radio>
          <el-radio v-model="setTruckForm.sbdFlag" label="N">否</el-radio>
        </el-form-item>
        <el-form-item label="截单时间" required>
          <div class="line">
            <el-form-item prop="jdTimeDate">
              <el-date-picker v-model="setTruckForm.jdTimeDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="jdTime">
              <el-time-picker v-model="setTruckForm.jdTime" value-format="hh:mm:ss" placeholder="任意时间点">
              </el-time-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="船公司内部截关截港时间" required>
          <el-date-picker v-model="setTruckForm.jgTimeDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-time-picker v-model="setTruckForm.jgTime" value-format="HH:mm:ss" placeholder="任意时间点">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="SOC箱" required prop="socFlag">
          <el-radio v-model="setTruckForm.socFlag" label="Y">是</el-radio>
          <el-radio v-model="setTruckForm.socFlag" label="N">否</el-radio>
          <el-input type="textarea" v-if="setTruckForm.socFlag === 'Y'" :rows="2" v-model="setTruckForm.socDescp" placeholder="请对SOC箱描述"></el-input>
        </el-form-item>
        <el-form-item label="是否需要过磅" required prop="gbFlag">
          <el-radio-group class="radio-group" v-model="setTruckForm.gbFlag">
            <el-radio label="NIL">不需要过磅</el-radio>
            <el-radio label="JCKX">进厂空箱过磅</el-radio>
            <el-radio label="CCZX">出厂重箱过磅</el-radio>
            <el-radio label="GCFJ">工厂附近过磅</el-radio>
            <el-radio label="GQ">港区过磅</el-radio>
            <el-radio label="WYQ">过磅地点无要求</el-radio>
            <el-radio label="OTHER">其他</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click.native="handleClickSave">保存</el-button>
        <el-button type="primary" @click.native="handleClickSubmit">提交订单</el-button>
      </div>
    </div>
    <el-dialog title="请输入地址" @close="handleClose" :visible.sync="dialogSelectVisible">
      <el-select v-model="zxmdAddrValue" value-key="zxmdAddr" multiple placeholder="请选择地址" style="width: 400px">
        <el-option v-for="(addr, i) in zxdAddrList" :key="i" :label="addr.zxmdAddr" :value="addr.zxmdAddr">
          <div class="addr-div">
            <span style="float: left" class="person">{{ addr.zxmdPerson }}</span>
            <span style="float: ringt">{{ addr.zxmdMobile }}</span>
          </div>
          <div class="addr-div">
            <span style="float: left">{{ addr.zxmdCode }}</span>
            <span style="float: ringt">{{ addr.zxmdAddr }}</span>
          </div>
        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleConfirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ENQUIRY_TRAILER_START_PORT, ENQUIRY_TRAILER_DOCK_SH } from 'assets/constant'
import TreeTable from './components/tree-table'
import { deepCopy } from 'utils/utils'
import { getTruckPortQuery, getTruckZxmds, putTruckDraft, postTruckOrder, postTruckZxmds, getTruckDraft } from 'api/truck'
import NumberBox from 'components/number-box/number-box'
export default {
  name: 'trailer-inquiry-confirm',
  components: {
    TreeTable,
    NumberBox
  },
  data () {
    return {
      pickerOptions: { // 限制收货时间不让选择今天以前的
        disabledDate (time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      dialogSelectVisible: false,
      zxmdAddrValue: [],
      zxdAddrList: [],
      rowIndex: 0,
      zxmdIndex: 0,
      startPortOption: ENQUIRY_TRAILER_START_PORT,
      startHarborOption: ENQUIRY_TRAILER_DOCK_SH,
      selectaddr: false,
      Is20Push: false,
      Is4gPush: false,
      Is4hPush: false,
      showBtn: true,
      setTruckForm: {
        startPort: '',
        startHarbor: '',
        billNo: '',
        subBillNos: [{
          billNo: ''
        }],
        customerNos: [{
          customerNo: ''
        }],
        shipCompany: '',
        shipName: '',
        vesselNo: '',
        transitPort: '',
        targetPort: '',
        orderRemark: '',
        sbdFlag: '',
        jdTimeDate: '',
        jdTime: '',
        jgTimeDate: '',
        jgTime: '',
        socFlag: '',
        socDescp: '',
        gbFlag: '',
        totalCount: '',
        totalWeight: '',
        totalVolumn: '',
        wt: ''
      },
      unit1: 'x20GP',
      unit2: 'x40GP',
      unit3: 'x40HQ',
      boxList: [],
      initData: {},
      dialogVisible: false,
      distributionList: [
        {
          billNosList: [],
          billNo: [],
          boxType: '',
          boxTypeList: [],
          maxBoxNum: 1,
          boxNum: null,
          zxmdAddrValue: [],
          addAddressList: [{
            zxmdAddr: '',
            zxmdCode: '',
            zxmdMobile: '',
            zxmdPerson: '',
            zxmdRemarks: ''
          }],
          zxdAddrList: [],
          boxDate: '',
          zxyq: ''
        }
      ],
      distributionListSave: [],
      boxTypeNum: [],
      truckDrafts: {},
      clearance: true,
      rules: {
        startPort: [
          { required: true, message: '请选择起运港', trigger: 'blur' }
        ],
        startHarbor: [
          { required: true, message: '请选择港区', trigger: 'blur' }
        ],
        billNo: [
          { required: true, message: '请填写主提单号', trigger: 'blur' }
        ],
        shipName: [
          { required: true, message: '请填写船名', trigger: 'blur' }
        ],
        vesselNo: [
          { required: true, message: '请填写航次', trigger: 'blur' }
        ],
        targetPort: [
          { required: true, message: '请填写目的港', trigger: 'blur' }
        ],
        sbdFlag: [
          { required: true, message: '请选择等通知放设备单', trigger: 'blur' }
        ],
        jdTimeDate: [
          { required: true, message: '截单日期不能为空', trigger: 'blur' }
        ],
        jdTime: [
          { required: true, message: '截单时间不能为空', trigger: 'blur' }
        ],
        jgTimeDate: [
          { required: true, message: '船公司内部截关截港日期不能为空', trigger: 'blur' }
        ],
        jgTime: [
          { required: true, message: '船公司内部截关截港时间不能为空', trigger: 'blur' }
        ],
        socFlag: [
          { required: true, message: '请选择SOC箱', trigger: 'change' }
        ],
        gbFlag: [
          { required: true, message: '请选择是否需要过磅', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 添加分单号
    handleAddSubBillNo () {
      this.setTruckForm.subBillNos.push({
        billNo: ''
      })
    },
    // 添加自由业务编号
    handleAddCustomerNo () {
      this.setTruckForm.customerNos.push({
        customerNo: ''
      })
    },
    handleAddSubList (item) {
      item.addAddressList.push({
        zxmdAddr: '',
        zxmdCode: '',
        zxmdMobile: '',
        zxmdPerson: '',
        zxmdRemarks: ''
      })
    },
    handleChangeVal1 (val) {
      this.setTruckForm.cont20gp = val ? parseInt(val) : ''
    },
    handleChangeVal2 (val) {
      this.setTruckForm.cont40gp = val ? parseInt(val) : ''
    },
    handleChangeVal3 (val) {
      this.setTruckForm.cont40hq = val ? parseInt(val) : ''
    },
    // 点击删除自有业务编号
    deleteRowElection (index) {
      if (index > 0) { this.setTruckForm.customerNos.splice(index, 1) }
    },
    // 删除分单号
    deleteRowBillNo (index) {
      if (index > 0) { this.setTruckForm.subBillNos.splice(index, 1) }
    },
    deleteRowAddress (item, idx) {
      if (idx > 0) { item.addAddressList.splice(idx, 1) }
    },
    // 强制规则验证
    handleValidate () {
      if (!this.setTruckForm.startPort) {
        this.$message.error('请选择起运港')
        return true
      }
      if (!this.setTruckForm.startHarbor) {
        this.$message.error('请选择港区')
        return true
      }
      if (!this.setTruckForm.billNo) {
        this.$message.error('请填写主提单号')
        return true
      }
      if (!this.setTruckForm.shipName) {
        this.$message.error('请填写船名')
        return true
      }
      if (!this.setTruckForm.vesselNo) {
        this.$message.error('请填写航次')
        return true
      }
      if (!this.setTruckForm.targetPort) {
        this.$message.error('请填写目的港')
        return true
      }
      if (!this.setTruckForm.cont20gp && !this.setTruckForm.cont40gp && !this.setTruckForm.cont40hq) {
        this.$message.error('请填写箱型箱量')
        return true
      }
      return false
    },
    // 增加一行可编辑的做箱计划
    handleAdd () {
      // 验证
      if (this.handleValidate()) return
      const cont20gp = this.setTruckForm.cont20gp
      const cont40gp = this.setTruckForm.cont40gp
      const cont40hq = this.setTruckForm.cont40hq
      this.boxTypeNum.forEach((item, index) => {
        if (item.type === '20GP') {
          item.cont = cont20gp
          if (item.cont === '') {
            this.boxTypeNum.splice(index, 1)
            this.Is20Push = true
          }
        } else if (item.type === '40GP') {
          item.cont = cont40gp
          if (item.cont === '') {
            this.boxTypeNum.splice(index, 1)
            this.Is4gPush = true
          }
        } else if (item.type === '40HQ') {
          item.cont = cont40hq
          if (item.cont === '') {
            this.boxTypeNum.splice(index, 1)
            this.Is4hPush = true
          }
        }
      })
      this.boxTypeNum.forEach(ite => {
        if (cont20gp > 0) {
          if (ite.type !== '20GP' && this.Is20Push) {
            this.boxTypeNum.push({
              cont: cont20gp,
              type: '20GP'
            })
            this.Is20Push = false
          }
        }
        if (cont40gp > 0) {
          if (ite.type !== '40GP' && this.Is4gPush) {
            this.boxTypeNum.push({
              cont: cont40gp,
              type: '40GP'
            })
            this.Is4gPush = false
          }
        }
        if (cont40hq > 0) {
          if (ite.type !== '40HQ' && this.Is4hPush) {
            this.boxTypeNum.push({
              cont: cont40hq,
              type: '40HQ'
            })
            this.Is4hPush = false
          }
        }
      })
      console.log(this.setTruckForm)
      let subBillNos = this.setTruckForm.subBillNos.filter(item => {
        return item.billNo
      })
      let allCount = cont20gp + cont40gp + cont40hq
      if (allCount > this.boxList.length) {
        this.boxList.push({
          billNosList: [{ billNo: this.setTruckForm.billNo }, ...subBillNos],
          billNo: [this.setTruckForm.billNo],
          billNos: '',
          boxType: '',
          boxTypeList: this.boxTypeNum,
          maxBoxNum: 1,
          boxCount: 1,
          zxyq: '',
          mode: 'edit',
          zxmdList: [
            {
              zxmdCode: '',
              zxmdAddr: '',
              zxmdMobile: '',
              zxmdPerson: ''
            }
          ],
          zxmdAddrValue: [],
          boxDate: ''
        })
      }
      this.handleCheckDistributionCount()
    },
    handleCheckDistributionCount () {
      const cont20gp = this.setTruckForm.cont20gp
      const cont40gp = this.setTruckForm.cont40gp
      const cont40hq = this.setTruckForm.cont40hq
      let allCount = cont20gp + cont40gp + cont40hq
      if (allCount <= this.boxList.length) {
        this.showBtn = false
      } else {
        this.showBtn = true
      }
    },
    // 删除一行可以编辑的装箱地址
    handleDeleteZxmdList (data) {
      console.log(data)
      if (data.index === 0) return
      this.boxList[data.rowIndex].zxmdList.splice(data.index, 1)
    },
    // 增加一行可编辑的装箱地址
    handlePlusZxmdList (rowIndex) {
      this.boxList[rowIndex].zxmdList.push({
        zxmdCode: '',
        zxmdAddr: '',
        zxmdMobile: '',
        zxmdPerson: ''
      })
    },
    // 点击选择地址 记录对应表格中的index
    handleSelectZxmdList (rowIndex) {
      this.rowIndex = rowIndex
      this.dialogSelectVisible = true
    },
    handleCloseDialog () {
      this.dialogSelectVisible = false
    },
    // 确定选择装箱地址（关闭弹窗、将选中值插入对应行中）
    handleConfirmDialog () {
      let zxmdAddrValue = []
      this.boxList[this.rowIndex].zxmdList.forEach(item => {
        if (item.zxmdAddr) {
          zxmdAddrValue.push(item.zxmdAddr)
        }
      })
      this.boxList[this.rowIndex].zxmdAddrValue = [...this.zxmdAddrValue, ...zxmdAddrValue]
      let newAdd = this.zxdAddrList.filter(item => {
        return this.zxmdAddrValue.some(zxmd => {
          return zxmd === item.zxmdAddr
        })
      })
      let result = this.boxList[this.rowIndex].zxmdList.filter(item => {
        return item.zxmdCode || item.zxmdAddr || item.zxmdPerson || item.zxmdMobile
      })
      this.boxList[this.rowIndex].zxmdList = [...result, ...newAdd]
      this.dialogSelectVisible = false
    },
    // 更改表格某一行为保存模式
    handleRowSave (rowIndex) {
      this.boxList[rowIndex].mode = 'save'
      this.boxList[rowIndex].billNos = this.boxList[rowIndex].billNo.join(',')
    },
    // 更改表格某一行为编辑模式
    handleRowEdit (rowIndex) {
      console.log(this.boxList[rowIndex])
      this.boxList[rowIndex].mode = 'edit'
    },
    handleDelete (rowIndex) {
      console.log(this.boxList)
      this.boxList.splice(rowIndex, 1)
      this.showBtn = true
    },
    // 选择箱型获取对应最大箱量
    handleChangeBoxType (data) {
      console.log(data)
      this.boxTypeNum.forEach(item => {
        if (item.type === data.val) {
          this.boxList[data.rowIndex].maxBoxNum = item.cont
        }
      })
    },
    handleClose () {
      this.dialogSelectVisible = false
      this.zxmdAddrValue = []
    },
    // 获取装箱门店地址列表
    fetchTruckZxmd () {
      getTruckZxmds()
        .then(res => {
          if (res && res.msg === 'success') {
            this.zxdAddrList = res.data && (res.data.records || [])
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    // 处理询价下单/保存参数
    handleParseParams () {
      let queryParams = {
        ...this.initData,
        ...this.setTruckForm
      }
      let jdTimeDate = this.handleDateTransition(this.setTruckForm.jdTimeDate, true)
      let jdTime = this.handleDateTransition(this.setTruckForm.jdTime, false)
      queryParams.jdTime = jdTimeDate ? new Date(jdTimeDate + ' ' + jdTime).getTime() : ''
      let jgTimeDate = this.handleDateTransition(this.setTruckForm.jgTimeDate, true)
      let jgTime = this.handleDateTransition(this.setTruckForm.jgTime, false)
      queryParams.jgTime = jgTimeDate ? new Date(jgTimeDate + ' ' + jgTime).getTime() : ''
      queryParams.draftId = this.truckDrafts.draftId ? this.truckDrafts.draftId : ''
      let subBillNo = []
      let customerNo = []
      queryParams.subBillNos.forEach(item => {
        subBillNo.push(item.billNo)
      })
      queryParams.customerNos.forEach(item => {
        customerNo.push(item.customerNo)
      })
      queryParams.subBillNo = subBillNo.join(',')
      queryParams.customerNo = customerNo.join(',')
      queryParams.boxList = this.boxList
      return queryParams
    },
    // 日期处理
    handleDateTransition (date, flag) {
      let result = ''
      if (typeof date === 'string') {
        result = date
      } else {
        result = flag ? date.toLocaleDateString() : date.toTimeString()
      }
      return result
    },
    // 保存拖车询价
    handleClickSave () {
      let queryParams = this.handleParseParams()
      console.log(queryParams)
      putTruckDraft(queryParams)
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('保存成功')
            this.$router.push({ name: 'trailerDraft' })
            // this.$router.push({name: 't'})
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    // 下单必填项验证
    validityInquire (queryParams) {
      if (!queryParams.sbdFlag) {
        this.$message.error('请选择等通知放设备单')
        return true
      }
      if (!this.setTruckForm.jdTimeDate) {
        this.$message.error('截单时间日期不能为空')
        return true
      }
      if (!this.setTruckForm.jdTime) {
        this.$message.error('截单时间具体时间不能为空')
        return true
      }
      if (!this.setTruckForm.jgTimeDate) {
        this.$message.error('船公司内部截关截港日期不能为空')
        return true
      }
      if (!this.setTruckForm.jgTime) {
        this.$message.error('船公司内部截关截港时间不能为空')
        return true
      }
      if (!queryParams.socFlag) {
        this.$message.error('请选择SOC箱')
        return true
      }
      if (!queryParams.gbFlag) {
        this.$message.error('请选择是否需要过磅')
        return true
      }
      return false
    },
    // 拖车下单
    handleClickSubmit () {
      let queryParams = this.handleParseParams()
      console.log(queryParams)

      if (this.handleValidate()) return
      if (this.validityInquire(queryParams)) return
      postTruckOrder(queryParams)
        .then(res => {
          if (res && res.msg === 'success') {
            // let jobNo = res.data.jobNo
            this.$message.success('下单成功')
            let param = this.boxList
            param.forEach(item => {
              item.zxmdList.forEach(ite => {
                if (ite.zxmdAddr) {
                  this.handleClickApp(ite)
                }
              })
            })
            this.$router.push({ name: 'trailerOrder' })
            // if (this.clearance) {
            //   this.$router.push({ name: 'delegation', params: { jobNo } })
            // } else {
            //   this.$router.push({ name: 'trailerOrder' })
            // }
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    // 提交时后新增的那些数据
    handleClickApp (param) {
      postTruckZxmds(param)
        .then(res => {
        }).catch(error => {
          console.error(error)
        })
    },
    // 获取拖车草稿详情
    fetchTruckDraft (draftId) {
      getTruckDraft(draftId)
        .then(res => {
          if (res && res.msg === 'success') {
            this.truckDrafts = res.data || {}
            this.handleDraftInit()
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
        })
    },
    // 草稿数据初始化
    handleDraftInit () {
      this.initData = {
        priceId: this.truckDrafts.priceId,
        province: this.truckDrafts.province,
        city: this.truckDrafts.city,
        region: this.truckDrafts.region,
        town: this.truckDrafts.town,
        startPort: this.truckDrafts.startPort,
        custClear: this.truckDrafts.custClear,
        cont20gp: this.truckDrafts.cont20gp,
        cont40gp: this.truckDrafts.cont40gp,
        cont40hq: this.truckDrafts.cont40hq
      }
      let boxList = this.truckDrafts.boxList
      boxList.forEach(item => {
        item.mode = 'save'
      })
      this.boxList = deepCopy(boxList)
      console.log(this.boxList)

      this.getBoxTypeNum()
      // let totalXxxl = this.getBoxTypeCount()
      let subBillNos = [{
        billNo: ''
      }]
      let customerNos = [{
        customerNo: ''
      }]
      if (this.truckDrafts.subBillNo) {
        subBillNos = []
        this.truckDrafts.subBillNo.split(',').forEach(item => {
          subBillNos.push({
            billNo: item
          })
        })
      }
      if (this.truckDrafts.customerNo) {
        customerNos = []
        this.truckDrafts.customerNo.split(',').forEach(item => {
          customerNos.push({
            customerNo: item
          })
        })
      }
      this.setTruckForm = {
        startPort: this.truckDrafts.startPort,
        startHarbor: this.truckDrafts.startHarbor,
        billNo: this.truckDrafts.billNo,
        subBillNos: subBillNos,
        shipCompany: this.truckDrafts.shipCompany,
        shipName: this.truckDrafts.shipName,
        vesselNo: this.truckDrafts.vesselNo,
        transitPort: this.truckDrafts.transitPort,
        targetPort: this.truckDrafts.targetPort,
        customerNos: customerNos,
        orderRemark: this.truckDrafts.orderRemark,
        sbdFlag: this.truckDrafts.sbdFlag,
        jdTimeDate: this.truckDrafts.jdTime ? new Date(this.truckDrafts.jdTime) : '',
        jdTime: this.truckDrafts.jdTime ? new Date(this.truckDrafts.jdTime) : '',
        jgTimeDate: this.truckDrafts.jgTime ? new Date(this.truckDrafts.jgTime) : '',
        jgTime: this.truckDrafts.jgTime ? new Date(this.truckDrafts.jgTime) : '',
        socFlag: this.truckDrafts.socFlag,
        socDescp: this.truckDrafts.socDescp,
        gbFlag: this.truckDrafts.gbFlag,
        totalCount: this.truckDrafts.totalCount,
        totalWeight: this.truckDrafts.totalWeight,
        totalVolumn: this.truckDrafts.totalVolumn,
        cont20gp: this.truckDrafts.cont20gp,
        cont40gp: this.truckDrafts.cont40gp,
        cont40hq: this.truckDrafts.cont40hq,
        wt: this.truckDrafts.wt
      }
      this.handleCheckDistributionCount()
      this.selectaddr = true
    },
    // 获取箱子类型
    getBoxTypeNum () {
      if (this.initData.cont20gp) {
        this.boxTypeNum.push({
          type: '20GP',
          cont: this.initData.cont20gp
        })
      }
      if (this.initData.cont40gp) {
        this.boxTypeNum.push({
          type: '40GP',
          cont: this.initData.cont40gp
        })
      }
      if (this.initData.cont40hq) {
        this.boxTypeNum.push({
          type: '40HQ',
          cont: this.initData.cont40hq
        })
      }
    },
    // 拼接箱型箱量
    getBoxTypeCount () {
      let totalXxxl = ''
      this.boxTypeNum.forEach(item => {
        if (item.cont) {
          totalXxxl += item.cont + ' * ' + item.type + ' '
        }
      })
      return totalXxxl
    },
    // 目的港
    querySearch (queryString, cb) {
      getTruckPortQuery({ param: queryString })
        .then(res => {
          if (res.msg === 'success') {
            for (let i of res.data.records) {
              i.value = i.name
            }
            var list = res.data.records
            cb(list)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(err => {
          this.$message.error(err)
          console.log(err)
        })
    },
    handleSelect (val) {
      // this.handlDestination(val)
      // this.restaurants = this.destination
    }
  },
  mounted () {
    this.fetchTruckZxmd()
    if (this.$route.params.draftId) {
      sessionStorage.setItem('draftId', this.$route.params.draftId)
    } else if (this.$route.params.row) {
      sessionStorage.setItem('truckOrderInit', JSON.stringify(this.$route.params.row))
    }
    this.draftId = sessionStorage.getItem('draftId')
    if (this.draftId) {
      this.fetchTruckDraft(this.draftId)
    } else {
      this.initData = sessionStorage.getItem('truckOrderInit') ? JSON.parse(sessionStorage.getItem('truckOrderInit')) : []
      this.setTruckForm.startPort = this.initData.startPort
      this.setTruckForm.startHarbor = this.initData.dockName
      this.setTruckForm.cont20gp = this.initData.cont20gp
      this.setTruckForm.cont40gp = this.initData.cont40gp
      this.setTruckForm.cont40hq = this.initData.cont40hq
      this.clearance = this.initData.custClear
      this.getBoxTypeNum()
    }
  },
  beforeDestroy () {
    sessionStorage.setItem('draftId', '')
    sessionStorage.setItem('truckOrderInit', '')
  }
}
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.title {
  width: 120px;
  height: 32px;
  line-height: 32px;
  color: #ffffff;
  background: #F25C5C;
  border-radius: 6px;
  text-align: center;
  margin-bottom: 20px;
}

.form-setting {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .el-form-item {
    width: 28%;
    margin-left: 8%;

    &:nth-child(3n+1) {
      margin-left: 0;
    }

    &:last-child {
      width: 56%;
      margin-left: 0;
    }

    >>>.el-form-item__content {
      display: flex;
      align-items: center;

      .last-input {
        margin-left: 10px;
      }

      .btn-plus {
        margin-left: 10px;
        color: #108EE9;
        font-weight: bold;
        font-size: 20px;
        cursor: pointer;
      }

      .el-form-item {
        width: 100%;
        margin-left: 0;
      }
    }

    .el-select {
      flex: 1;
    }
  }
}

.confirm-down {
  width: 100%;

  .form-content {
    margin-top: 30px;

    .line {
      display: flex;
      align-items: center;

      .el-form-item {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
  }

  .btn-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    .el-button {
      &:last-child {
        margin-left: 20px;
      }
    }
  }
}

>>>.el-dialog__wrapper {
  .el-dialog {
    max-height: 570px;
    overflow: scroll;
  }

  .line {
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;

    .line-item {
      display: flex;
      align-items: center;

      span {
        width: 60px;
      }
    }

    .label {
      margin-right: 20px;
    }

    .radio-group {
      flex: 1;
    }
  }

  .btn-add {
    width: 100%;
    margin-top: 20px;
    font-size: 20px;
    height: 28px;
    border: 1px dashed #108EE9;
    border-radius: 6px;
    text-align: center;
    line-height: 28px;
    color: #108EE9;
    cursor: pointer;
  }

  .el-textarea {
    margin-top: 20px;
  }
}

.formData {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;

  .el-form-item--small.el-form-item {
    width: 18%;
  }

  i.btn-plus {
    position: absolute;
    right: -25px;
    color: #108EE9;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  span.btn-plus {
    position: absolute;
    right: -50px;
    color: #108EE9;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
  }

  .el-icon-plus:before {
    position: relative;
    top: 6px;
  }

  .el-icon-zoom-in:before {
    position: relative;
    top: 6px;
  }

  .el-icon-delete:before {
    position: relative;
    top: 6px;
  }

  .btn {
    position: absolute;
    right: -130px;

    .btn-small {
      font-size: 14px;
      position: relative;
      top: 3px;
    }
  }
}

.line-div {
  width: 100%;
  display: flex;
  align-items: center;

  .minute {
    width: 16%;
  }
}

.addr-div {
  display: inline-block;
  width: 49%;
  overflow: hidden;

  span {
    min-width: 50%;
  }

  .person {
    min-width: 30%;
  }
}
</style>
