<template>
  <div class="progress-info-wrapper">
    <span class="progress-title">订单进度详情</span>
    <div class="content-wrapper">
      <template v-if="transportType === 'ocean'">
        <template v-if="viewMode === 'edit'">
          <div class="cw-info" v-if="stepName !== '已提箱' && stepName !== '已收报关资料'">
            <span class="cw-info-label">当前状态：</span>
            <span>{{nodeDescpDisp}}</span>
          </div>
          <template v-if="stepName === '已提箱'">
            <div v-if="nodeObj.editFlag" class="cw-info">
              <span class="cw-info-label">当前状态：</span>
              <el-select v-model="ytx" placeholder="请选择" @change="handleSelectChange">
                <el-option label="请选择" value=""></el-option>
                <el-option label="车队已提箱" value="车队已提箱"></el-option>
              </el-select>
            </div>
            <div v-else class="cw-info">
              <span class="cw-info-label">当前状态：</span>
              <span>{{nodeDescpDisp}}</span>
            </div>
            <div class="ocean-edit-tx">
              <div class="fl">
                <div v-if="nodeObj.editFlag" class="clearfix" style="width: 380px;">
                  <span class="fl">车牌号码/箱号/封号：</span>
                  <div class="oet-content fl">
                    <ul v-for="(c, i) in chepai" :key="i" class="select-group">
                      <li class="sg-item"><el-input v-model="c.cphm" placeholder="车牌号码" @blur="handleSaveTruck($event, i)" style="width: 95px"></el-input></li>
                      <li class="sg-item"><el-input v-model="c.xh" placeholder="箱号" @blur="handleSaveTruck($event, i)" style="width: 95px"></el-input></li>
                      <li class="sg-item"><el-input v-model="c.fh" placeholder="封号" @blur="handleSaveTruck($event, i)" style="width: 95px"></el-input></li>
                      <li class="sg-item sgi-map-icon">
                        <img class="fl" src="./img/car-anchor.png" @click="handleShowCarMap(c.cphm)">
                      </li>
                      <li class="sg-item sgi-btn">
                        <el-button v-if="i === 0" @click="handleAddNewChePai" type="text" icon="el-icon-plus"></el-button>
                        <el-button v-if="i > 0" @click="handleRemoveChePai(i)" type="text" icon="el-icon-minus"></el-button>
                      </li>
                    </ul>
                  </div>
<!--                   <el-button @click="handleAddNewChePai" type="text" icon="el-icon-plus" class="ocean-edit-tx-btn fl"></el-button> -->
                </div>
                <div v-else class="clearfix">
                  <span class="fl" style="margin-top: 5px;">车牌号码/箱号/封号：</span>
                  <div class="fl">
                    <p v-for="(citem, cindex) in chepai" :key="cindex">
                      <span>{{citem.cphm}}</span><span v-if="showCarIconAndMap">/</span>
                      <span>{{citem.xh}}</span><span v-if="showCarIconAndMap">/</span>
                      <span>{{citem.fh}}</span>
                      <img src="./img/car-anchor.png" @click="handleShowCarMap(citem.cphm)" v-if="showCarIconAndMap">
                    </p>
                  </div>
                </div>
                <!-- 附件 -->
                <div class="attachment-wrapper">
                  <span class="attachment-title">附件列表：</span>
                  <ul class="attachment-list">
                    <li v-for="(citem, cindex) in nodeObj.attachList" :key="cindex" @click="handleDownloadAttachment(citem.fid, citem.name)" class="attachment-item">
                      {{citem.name}}
                    </li>
                  </ul>
                </div>
              </div>
              <!--右侧地图 -->
              <div>
                <div class="fr" style="width: 130px; height: 140px;">
                <china-car-thumbnail :pThumbnailCarName="thumbnailCarName" @click.native="hadndleShowCarMapAll" v-if="showCarIconAndMap"></china-car-thumbnail>
              </div>
              </div>
            </div>
          </template>
          <template v-if="stepName === '已收报关资料'">
            <div v-if="nodeObj.editFlag" class="cw-info">
              <span class="cw-info-label">当前状态：</span>
              <el-select v-model="ysbgzl" placeholder="请选择" @change="handleSelectChange">
                <el-option label="请选择" value=""></el-option>
                <el-option label="报关中" value="报关中"></el-option>
              </el-select>
            </div>
            <div v-else class="cw-info">
              <span class="cw-info-label">当前状态：</span>
              <span>{{nodeDescpDisp}}</span>
            </div>
          </template>
          <template v-if="stepName === '订舱完成' || stepName === '箱已进港' || stepName === '报关已结束' || stepName === '港区已放关' || stepName === '箱已装船' || stepName === '箱已装船' || stepName === '船已启航' || stepName === '提单已确认' || stepName === '提单已签发'">
            <div class="cw-info">
              <p class="cw-info-p" v-for="(citem, cindex) in nodeObj.jsonData" :key="cindex">
                <span>{{citem.label}}</span>
                <span>：</span>
                <span>{{citem.descp}}</span>
                <!-- <span v-if="citem.label === '进港时间'">{{citem.descp | formatTime('YYMMdd')}}</span> -->
              </p>
            </div>
          </template>
          <!-- attachment list -->
          <template v-if="stepName === '订舱完成' || stepName === '已收报关资料' || stepName === '报关已结束' || stepName === '提单已确认' || stepName === '提单已签发'">
            <div class="attachment-wrapper">
              <span class="attachment-title">附件列表：</span>
              <ul class="attachment-list">
                <li v-for="(citem, cindex) in nodeObj.attachList" :key="cindex" @click="handleDownloadAttachment(citem.fid, citem.name)" class="attachment-item">
                  {{citem.name}}
                </li>
              </ul>
            </div>
          </template>
        </template>
        <!-- 直客 -->
        <template v-else>
          <div class="cw-info">
            <span class="cw-info-label">当前状态：</span>
            <span>{{nodeDescpDisp}}</span>
          </div>
          <!-- 直客已提箱 -->
          <template v-if="stepName === '已提箱'">
            <div class="cw-info clearfix">
              <div class="fl"> <!--左侧车厢信息和attachment -->
                <div class="clearfix">
                  <span class="fl" style="margin-top: 5px;">车牌号码/箱号/封号：</span>
                  <div class="fl">
                    <p v-for="(citem, cindex) in chepai" :key="cindex">
                      <span>{{citem.cphm}}</span><span v-if="showCarIconAndMap">/</span>
                      <span>{{citem.xh}}</span><span v-if="showCarIconAndMap">/</span>
                      <span>{{citem.fh}}</span>
                      <img src="./img/car-anchor.png" @click="handleShowCarMap(citem.cphm)" v-if="showCarIconAndMap">
                    </p>
                  </div>
                </div>
                <div class="attachment-wrapper">
                  <span class="attachment-title">附件列表：</span>
                  <ul class="attachment-list">
                    <li v-for="(citem, cindex) in nodeObj.attachList" :key="cindex" @click="handleDownloadAttachment(citem.fid, citem.name)" class="attachment-item">
                      {{citem.name}}
                    </li>
                  </ul>
                </div>
              </div>
              <!--右侧地图 -->
              <div class="fr" style="width: 130px; height: 140px;">
                <china-car-thumbnail :pThumbnailCarName="thumbnailCarName" @click.native="hadndleShowCarMapAll" v-if="showCarIconAndMap"></china-car-thumbnail>
              </div>
            </div>
          </template>
          <!-- other -->
          <template v-else>
            <div class="cw-info">
              <p class="cw-info-p" v-for="(citem, cindex) in nodeObj.jsonData" :key="cindex">
                <span>{{citem.label}}</span>
                <span v-if="citem.label">：</span>
                <span>{{citem.descp}}</span>
              </p>
            </div>
          </template>
          <!-- attachment list -->
          <template v-if="stepName === '订舱完成' || stepName === '已收报关资料' || stepName === '报关已结束' || stepName === '提单已确认' || stepName === '提单已签发'">
            <div class="attachment-wrapper">
              <span class="attachment-title">附件列表：</span>
              <ul class="attachment-list">
                <li v-for="(citem, cindex) in nodeObj.attachList" :key="cindex" @click="handleDownloadAttachment(citem.fid, citem.name)" class="attachment-item">
                  {{citem.name}}
                </li>
              </ul>
            </div>
          </template>
        </template>
      </template>
    </div>
    <!-- ocean finish -->

    <!-- air start -->
    <template v-if="transportType === 'air'">
      <template v-if="viewMode === 'edit'">
        <div>
          <span>当前状态：</span>
          <el-select v-model="air6"></el-select>
        </div>
        <template v-if="stepName === '主单'">
          <div>
            <span>主单号：</span>
            <el-input v-model="air3"></el-input>
          </div>
        </template>
        <template v-if="stepName === '分单'">
          <div>
            <span>分单号：</span>
            <el-input v-model="air3"></el-input>
          </div>
        </template>
        <template v-if="stepName === '报关'">
          <div>
            <span>送抵时间：</span>
            <span>送抵时间</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div>
          <span>当前状态：</span>
          <span>{{nodeDescpDisp}}</span>
        </div>
        <!-- others -->
        <template v-if="stepName === '主单'">
          <div>
            <span>主单号：</span>
            <span>主单号</span>
          </div>
        </template>
        <template v-if="stepName === '分单'">
          <div>
            <span>分单号：</span>
            <span>分单号</span>
          </div>
        </template>
        <template v-if="stepName === '报关'">
          <div>
            <span>送抵时间：</span>
            <span>送抵时间</span>
          </div>
        </template>
        <!-- attachment list -->
        <template v-if="stepName === '订舱' || stepName === '进仓' || stepName === '报关'">
          <div class="attachment-wrapper">
            <span class="attachment-title">附件列表：</span>
            <ul class="attachment-list">
              <li>packing list.pdf</li>
              <li>申报要素.pdf</li>
            </ul>
          </div>
        </template>
      </template><!-- air finish -->
    </template>
    <!-- 卡车大地图 -->
    <el-dialog
      :visible.sync="dialogVisible"
      title="卡车查询"
      width="90%"
    >
      <div>
        <china-car :pAllCarNames="allCarNames"></china-car>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deepCopy, timeFomatter } from 'utils/utils'
import { putNode, downLoadNodeFid } from 'api/order'
import ChinaCar from 'components/detail-map/china-car'
import ChinaCarThumbnail from 'components/detail-map/china-car-thumbnail'
// import * as filters from '@/filters'
export default {
  name: 'progress-info',
  data () {
    return {
      ocean1: '',
      ytx: '',
      ysbgzl: '',
      air1: '',
      air2: '',
      air3: '',
      chepai: [{
        cphm: '',
        xh: '',
        fh: ''
      }],
      showCarIconAndMap: false,
      thumbnailCarName: '',
      allCarNames: [],
      dialogVisible: false,
      billNo: '', // 提单号
      shipVessel: '', // 船名航次
      contInTime: '', // 进港时间
      custClearanceDoneTime: '', // 结束时间
      harborPassTime: '', // 放关时间
      contOnShipTime: '', // 装船时间
      shipLeaveTime: '', // 离港时间
      nodeDescpDisp: '',
      transportType: '',
      stepName: '',
      viewMode: '',
      nodeObj: {},
      nodeSeq: 0,
      jobNo: ''
    }
  },
  props: {
    'pTransportType': String, // 海运 空运
    'pStepName': String, // 节点
    'pViewMode': String, // 查看模式 编辑模式
    'pNodeObj': Object
  },
  filters: {
    formatTime (v, format = 'yyyy-MM-dd hh:mm') {
      if (v && v !== '') {
        return timeFomatter(v, format)
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.jobNo = this.$route.params.jobNo // 'SKYM18101006'
  },
  methods: {
    handleSelectChange (value) {
      this.chepai.forEach(item => {
        item.cphm = (item.cphm === undefined ? '' : item.cphm)
        item.xh = (item.xh === undefined ? '' : item.xh)
        item.fh = (item.fh === undefined ? '' : item.fh)
      })
      let obj = {
        nodeStatus: value,
        jsonData: JSON.stringify(this.chepai),
        seq: this.nodeSeq
      }
      this.handlePutNode(obj, true)
    },
    handleSaveTruck (event, index) {
      if (event && !event.target.value) {
        return
      }
      this.chepai.forEach(item => {
        item.cphm = (item.cphm === undefined ? '' : item.cphm)
        item.xh = (item.xh === undefined ? '' : item.xh)
        item.fh = (item.fh === undefined ? '' : item.fh)
      })
      let obj = {
        // compFlag: this.ytx,
        jsonData: JSON.stringify(this.chepai),
        seq: this.nodeSeq
      }
      this.handlePutNode(obj, false)
    },
    handlePutNode (data, flag) {
      putNode(this.jobNo, data)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('保存成功')
            if (flag) {
              this.$emit('on-save-success')
            } else {
              this.$emit('on-save-truck-success', this.chepai)
            }
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleAddNewChePai () {
      this.chepai.push({
        cphm: '',
        xh: '',
        fh: ''
      })
    },
    handleRemoveChePai (index) {
      this.chepai.splice(index, 1)
      this.handleSaveTruck(null, index)
    },
    handleShowCarMap (cphm) {
      if (!cphm) {
        this.$message.error('此记录无车牌号码可查询')
        return
      }
      this.thumbnailCarName = cphm
    },
    hadndleShowCarMapAll () {
      let tmpCarNames = []
      this.chepai.forEach(item => {
        if (item.cphm) {
          tmpCarNames.push(item.cphm)
        }
      })
      if (tmpCarNames.length === 0) {
        this.$message.info('无车牌记录可查询')
        return
      } else {
        this.allCarNames = tmpCarNames
      }
      this.dialogVisible = true
    },
    handleDownloadAttachment (fid, fileName) {
      downLoadNodeFid(this.jobNo, fid)
        .then(res => {
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)

          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }).catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    ChinaCar,
    ChinaCarThumbnail
  },
  watch: {
    pNodeObj: {
      handler (nv) {
        this.chepai = []
        const tmpNodeObj = deepCopy(nv)
        if (tmpNodeObj.nodeSeq === 30) {
          if (tmpNodeObj.jsonData) {
            let tmpJsonData = tmpNodeObj.jsonData
            tmpJsonData.forEach(item => {
              this.chepai.push({
                cphm: item.cphm,
                xh: item.xh,
                fh: item.fh
              })
            })
            this.chepai.forEach(item => {
              if (item.cphm || item.xh || item.fh) {
                this.showCarIconAndMap = true
              }
            })
          }
          this.ytx = tmpNodeObj.nodeStatus
        }
        this.nodeObj = tmpNodeObj
        this.stepName = tmpNodeObj.nodeDescpDisp
        this.nodeSeq = tmpNodeObj.nodeSeq
        if (this.pTransportType === 'ocean') {
          this.nodeDescpDisp = tmpNodeObj.nodeDescpDisp
          this.transportType = this.pTransportType
          this.viewMode = this.pViewMode
          this.stepName = this.pStepName
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="stylus">
@import "~styles/variable"
.progress-info-wrapper
  width: 100%
  .progress-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    color: $font-color-black
    font-weight: bold
    padding-left: 10px
  .content-wrapper
    padding: 10px
    height: 158px
    overflow: scroll
    .cw-info
      padding: 10px 10px 10px 0
      .cw-info-label
        display: inline-block;
        line-height: 40px
      .cw-info-p
        padding-top: 5px
  .ocean-edit-tx
    position: relative
    margin-top: 10px
    .oet-content
      display: inline-block
      // width: 90%
      min-width: 385px
      margin-top: 10px
    .ocean-edit-tx-btn
      position: absolute
      top: 23px
      left: 350px
      font-size: 18px
    .select-group
      font-size: 0
      .sg-item
        box-sizing: border-box
        padding-right: 10px
        display: inline-block
        // width: 33%
        font-size: 14px
        margin-bottom: 10px
      .sgi-map-icon
        height: 30px
        line-height: 30px
        vertical-align: bottom
      .sgi-btn
        padding-left: 10px
  .attachment-wrapper
    margin-top: 20px
    .attachment-title
      display: inline-block
      vertical-align: top
    .attachment-list
      display: inline-block
      .attachment-item
        cursor: pointer
        text-decoration: underline
  .el-dialog__body
    padding-top: 0px
</style>
