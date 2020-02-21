<template>
  <div class="upload-info clearfix">
    <div class="ui-title1">
      <div class="title-btn"><span class="btn-icon1" :class="{'btn-icon-active': BGfid}"></span><p class="btn-p" @click="handleDownload('isBGStep')">报关单下载</p></div>
      <div class="title-btn"><span class="btn-icon1" :class="{'btn-icon-active': DZSDfid}"></span><p class="btn-p" @click="handleDownload('isDZSDStep')">电子税单下载</p></div>
    </div>
    <div class="ui-title">
      <h4 class="title-h4">上传附件</h4>
      <div class="title-item">
        <span class="item-span">已审核通过：</span>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          popper-class="tg-tips">
          <div class="tips">{{format(received)}}</div>
          <span slot="reference" class="item-color1">{{format(received)}}</span>
        </el-popover>
      </div>
      <div class="title-item">
        <span class="item-span">缺件：</span>
        <el-popover
          placement="top-start"
          width="200"
          trigger="hover"
          popper-class="tg-tips">
          <div class="tips">{{format(needed)}}</div>
          <span slot="reference" class="item-color2">{{format(needed)}}</span>
        </el-popover>
      </div>
    </div>
    <div class="upload-content">
      <div class="ui-wrapper clearfix" v-if="!fileExist">
        <el-upload
          ref="acUpload"
          drag
          action=""
          :on-change="sendFile"
          multiple
          :auto-upload="false"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div style="clear:both"></div>
      </div>
      <div class="ui-attachment-wrapper clearfix" v-if="fileExist">
        <div class="attach-upload-wrapper">
          <el-upload
            ref="dcUpload"
            drag
            action=""
            multiple
            :on-change="sendFile"
            :auto-upload="false"
            :show-file-list="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <div class="attachment-list">
          <el-table :data="attachmentList" class="attachment-table" border :row-style="{ height: '50px' }">
            <el-table-column type="index" label="SN" width="50"></el-table-column>
            <el-table-column label="文件名">
              <template slot-scope="scope">
                <el-badge :is-dot="scope.row.readTag === 'N'" class="item">
                  <div class="attachment-line" v-if="isEdit" @dblclick="handleDblclickEdit(scope.row)">
                    <el-input v-if="scope.row.edit" v-model="scope.row.fileName" @blur="handleCancelEdit(scope.row)" @change="handleSaveEdit(scope.row)"></el-input>
                    <template v-else>
                      <el-tooltip placement="top">
                        <div slot="content">{{scope.row.name}}</div>
                        <p class="text">{{scope.row.name}}</p>
                      </el-tooltip>
                    </template>
                    <a class="downLoad" @click="handleDownloadAttachment(scope.row, scope.row.name)"></a>
                  </div>
                  <div class="attachment-line" v-else>
                    <template>
                      <el-tooltip placement="top">
                        <div slot="content">{{scope.row.name}}</div>
                        <p class="text">{{scope.row.name}}</p>
                      </el-tooltip>
                    </template>
                    <a class="downLoad" @click="handleDownloadAttachment(scope.row, scope.row.name)"></a>
                  </div>
                </el-badge>
              </template>
            </el-table-column>
            <el-table-column prop="uploadTimeStr" label="上传时间"></el-table-column>
            <el-table-column prop="uploaderName" label="上传人"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="remark">
        <div class="remark-title">留言板</div>
        <div class="remark-content">
          <div class="remark-box" :class="{'padding': isEdit || isRemark}">
            <div class="remark-section" v-if="!(isEdit || isRemark) && remarkList.length < 1">暂时没有您的留言~</div>
            <div class="remark-section" v-for="(item, index) in remarkList" :key="index">
              <div class="section-con">{{item.msg}}</div>
              <div class="section-time">{{item.sendTime}}</div>
            </div>
          </div>
          <div class="remark-input" v-if="(isEdit || isRemark) && roles.length !== 0">
            <el-input v-model="msg" @keyup.enter.native="handleSendRemark"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="ui-line">
      <div class="ui-href" @click="handleShowCheckList">文件参考及核对</div>
      <div class="ui-upload" v-if="fileExist">
        <span class="ui-icon"  @click="handleDownloadAll"></span>
        <span class="ui-text">批量下载</span>
      </div>
      <div class="ui-pages" v-if="fileExist">
        <el-pagination
          background
          @current-change="paginationChange"
          :current-page="currentPage"
          :page-size="params.size"
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { putAttachName, uploadAttach, getAttachList, downloadAttachAll, downloadAttach, deleteAttach } from 'api/import'
import { leavingAMessage, downLoadNodeFid, getleavingAMessage } from 'api/order'
export default {
  name: 'upload-info',
  data () {
    return {
      attachmentList: [],
      fileExist: false,
      formData: {
        file: null
      },
      remarkList: [],
      total: 0,
      currentPage: 1,
      params: {
        page: 1,
        size: 6
      },
      isEdit: false,
      isRemark: false,
      msg: ''
    }
  },
  props: {
    quoteNo: String,
    pNodeSeq: Number,
    roles: Array,
    needed: [String, Number],
    received: [String, Number],
    BGfid: String,
    DZSDfid: String,
    DZSDname: String,
    BGname: String
  },
  mounted () {
  },
  methods: {
    format (str) {
      if (str) {
        return str.split(';').join(', ').slice(0, -2)
      }
    },
    handleDblclickEdit (row) {
      row.edit = true
    },
    handleShowCheckList () {
      this.handleCheckQuoteNo()
      this.$emit('click-show')
    },
    handleCheckQuoteNo () {
      this.$parent.handleCheckQuoteNo(this.quoteNo)
    },
    handleCancelEdit (row) {
      row.edit = false
    },
    handleSaveEdit (row) {
      // console.log(1111)
      const param = {
        attachId: row.attachId,
        fileName: row.fileName + row.extension,
        quoteNo: this.quoteNo
      }
      putAttachName(param)
        .then(res => {
          if (res.msg === 'success') {
            this.fetchAttachment()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSendRemark () {
      const param = {
        msg: this.msg,
        quoteNo: this.quoteNo
      }
      leavingAMessage(param)
        .then(res => {
          if (res.msg === 'success') {
            this.msg = ''
            this.fetchRemark()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handlerOnExceed () {
      this.$message.warning('每次允许上传一个附件')
    },
    sendFile (file, fileList) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传文件大小不能超过 5MB!')
        return
      }
      this.handleCheckQuoteNo()
      let formData = new FormData()
      // console.log(file)
      formData.append('file', file ? file.raw : '')
      // console.log(formData)
      uploadAttach(this.quoteNo, formData)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('上传成功')
            if (this.$refs.dcUpload) {
              this.$refs.dcUpload.clearFiles()
            } else {
              this.$refs.acUpload.clearFiles()
            }
            this.fetchAttachment()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
            if (this.$refs.dcUpload) {
              this.$refs.dcUpload.clearFiles()
            } else {
              this.$refs.acUpload.clearFiles()
            }
          }
        })
        .catch(error => {
          this.$message.error(String(error))
          console.log(error)
        })
    },
    paginationChange (page) {
      this.currentPage = page
      this.params.page = page
    },
    fetchAttachment () {
      this.handleCheckQuoteNo()
      getAttachList(this.quoteNo, this.params)
        .then(res => {
          if (res.msg === 'success') {
            let attachmentList = (res.data && res.data.records) || []
            this.total = res.data.total
            if (attachmentList.length > 0) {
              this.fileExist = true
            } else {
              this.fileExist = false
            }
            this.attachmentList = attachmentList.map(item => {
              item.edit = false
              if (item.name) {
                const index = item.name.lastIndexOf('.')
                item.fileName = item.name.substr(0, index)
                item.extension = item.name.substr(index)
              }
              return item
            })
            this.total = res.data.total
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDownloadAll () {
      this.handleCheckQuoteNo()
      downloadAttachAll(this.quoteNo)
        .then(res => {
          this.fetchAttachment()
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', `${this.quoteNo}.zip`)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }).catch(error => {
          console.log(error)
        })
    },
    handleDownload (type) {
      let fid = ''
      let filename = ''
      if (type === 'isBGStep' && this.BGfid) {
        fid = this.BGfid
        filename = this.BGname
      } else if (type === 'isDZSDStep' && this.DZSDfid) {
        fid = this.DZSDfid
        filename = this.DZSDname
      } else {
        this.$message.warning('暂时还没有资料可以下载~')
        return
      }
      downLoadNodeFid(this.quoteNo, fid)
        .then(res => {
          // this.fetchAttachment()
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
        }).catch(error => {
          console.log(error)
        })
    },
    handleDownloadAttachment (row, fileName) {
      const param = {
        attachId: row.attachId,
        readTag: row.readTag
      }
      downloadAttach(this.quoteNo, param)
        .then(res => {
          this.fetchAttachment()
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
    },
    fetchRemark () {
      getleavingAMessage({ quoteNo: this.quoteNo })
        .then(res => {
          if (res.msg === 'success') {
            let remarkList = res.data && (res.data.records || [])
            this.remarkList = remarkList.map(item => {
              if (item.sendTime) {
                item.sendTime = new Date().toLocaleDateString() + '' + new Date(item.sendTime).toLocaleTimeString()
              }
              return item
            })
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleDeleteAttachment (row) {
      deleteAttach(this.quoteNo, { attachId: row.attachId })
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('删除成功')
            this.fetchAttachment()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  watch: {
    params: {
      handler (nv) {
        if (this.quoteNo) {
          this.fetchAttachment()
        }
      },
      immediate: true,
      deep: true
    },
    quoteNo: {
      handler (nv) {
        if (this.quoteNo) {
          this.fetchAttachment()
          this.fetchRemark()
          const editList = ['AC_IMPORT_GLY', 'AC_IMPORT_DOC', 'AC_IMPORT_DZ', 'AC_GLY']
          this.isEdit = editList.some(item => {
            return this.roles.indexOf(item) > -1
          })
          this.isRemark = this.roles.indexOf('AC_IMPORT_KF') > -1 || this.roles.indexOf('AC_IMPORT_CZ') > -1
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus"  rel="stylesheet/stylus">
@import "~styles/variable"
.upload-info
  margin 0
  .ui-title1
    padding 20px
    display flex
    align-items center
    border-bottom 1px solid #f0f2f5
    .title-btn
      width 98px
      height 30px
      margin-right 20px
      border-radius 15px
      background #F0F2F5
      display flex
      align-items center
      justify-content center
      cursor pointer
      min-width 100px
      .btn-icon1
        min-width 14px
        height 14px
        background url('./img/download-grey.png')no-repeat center/100%
        margin-right 6px
      .btn-icon-active
        background url('./img/download-active.png')no-repeat center/100%
      .btn-p
        font-size 12px
        color #353535
        font-weight 500
        line-height 16px
        border-bottom 1px solid #353535
  .ui-title
    padding 20px
    display flex
    align-items center
    margin-bottom 30px
    .title-h4
      font-size 14px
      font-weight bold
      color #353535
      width 28%
    .title-item
      width 28%
      margin-left 8%
      display flex
      align-items center
      .item-span
        font-size 12px
        color #353535
        font-weight 500
        min-width 40px
        padding 0 8px
      .item-color1
        display block
        width 140px
        font-size 12px
        color #406CAD
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      .item-color2
        display block
        width 140px
        font-size 12px
        color #F56C6C
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
  .upload-content
    display flex
  .ui-wrapper
    flex 1
    position: relative
    .ui-instruction
      width: 260px
      display:inline-block
      float: left
      margin-left: 12px
    .ui-pic
      display:inline-block
      float: left
    .el-upload-dragger .el-icon-upload
      margin: 0
    .el-upload
      width: 100%
      padding 0 0 0 20px
      box-sizing border-box
      height: 340px;
      margin: auto;
      .el-upload-dragger
        height: 100%
        width: 100%
        display flex
        align-items center
        justify-content center
        .el-upload__text
          margin-left 14px
        .el-upload__text em
          color #FBB03B
  .ui-attachment-wrapper
    padding 0 0 0 20px
    flex 1
    .attach-upload-wrapper
      width: 30%;
      display: inline-block;
      float: left;
      padding-right: 14px
      box-sizing: border-box
      .el-upload
        width: 100%
        .el-upload-dragger
          height: 340px
          width: 100%
          .el-icon-upload
            margin-top: 132px
          .el-upload__text em
            color #FBB03B
    .attachment-list
      width: 70%
      display:inline-block
      float:left
      height: 340px
      display flex
      .el-badge
        display block
        .el-badge__content.is-fixed.is-dot
          right 2px
          top -3px
      .attachment-line
        display flex
        align-items center
        justify-content space-between
        .text
          width 80%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
      .downLoad
        width 16px
        min-width 16px
        height 14px
        cursor pointer
        margin-left 10px
        background url('./img/download2.png')no-repeat center/100%
      .btn-del
        color #F56C6C
      .attachment-table
        flex 2
        .cell
          overflow visible
      .el-table__body
        height 100%
  .remark
    flex 1
    max-width 270px
    height 338px
    margin-right 20px
    border 1px solid #f0f2f5
    border-left 0
    .remark-title
      font-size 12px
      height 24px
      line-height 24px
      padding 8px 10px
      color #414141
      font-weight bold
      border-bottom 1px solid #f0f2f5
    .remark-content
      font-size 12px
      height 298px
      position relative
      color #6f6f6f
      .remark-box
        padding 10px
        height 100%
        box-sizing border-box
        overflow-y scroll
      .padding
        padding-bottom 50px
      .remark-section
        margin-bottom 6px
        border-bottom 1px dotted #f0f2f5
        .section-con
          line-height 20px
        .section-time
          line-height 20px
          text-align right
      .remark-input
        position absolute
        background #fff
        padding-bottom 10px
        bottom 1px
        left 10px
        right 10px
  .ui-line
    display flex
    align-items center
    padding 20px
    .ui-href
      width 30%
      font-size 12px
      color #FBB03B
      font-weight 500
      text-decoration underline
      cursor pointer
    .ui-upload
      flex 1
      display flex
      align-items center
      .ui-icon
        width 14px
        height 16px
        cursor pointer
        background url('./img/download.png') no-repeat center/100%
      .ui-text
        font-size 12px
        color #353535
        font-weight 500
        margin-left 14px
    .ui-pages
      .el-pagination
        margin-top 0
</style>
