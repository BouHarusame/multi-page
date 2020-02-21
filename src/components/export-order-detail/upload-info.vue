<template>
  <div class="upload-info-wrapper clearfix">
    <span class="ui-title">上传附件</span>
    <div class="ui-wrapper clearfix" v-if="!fileExist">
      <el-upload
        ref="acUpload"
        drag
        action=""
        :on-change="sendFile"
        :limit="1"
        :auto-upload="false"
        :on-exceed="handlerOnExceed"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div style="clear:both"></div>
      <!-- <div class="ui-instruction">
        <ul>
          <li>1. 上传托书</li>
          <li>2. 上传报关资料</li>
          <li>3. 上传提单确认件</li>
          <li>4. 上传情况说明等相关资料</li>
          <li>5. 上传VGM/ENS/AMS/ISF/AFR等</li>
        </ul>
      </div>
      <div class="ui-pic">这里配图片讲解说明：自动化、智能化</div> -->
    </div>
    <div class="ui-attachment-wrapper clearfix" v-if="fileExist">
      <div class="attach-upload-wrapper">
        <el-upload
          ref="dcUpload"
          drag
          action=""
          :on-change="sendFile"
          :limit="1"
          :auto-upload="false"
          :on-exceed="handlerOnExceed"
          :show-file-list="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
      <div class="attachment-list">
        <el-table :data="attachmentList">
          <el-table-column type="index" label="SN" width="50"></el-table-column>
          <el-table-column label="文件名">
            <template slot-scope="scope">
              <!-- <a style="cursor: pointer" target="_blank" download :href="scope.row.url">{{scope.row.name}}</a> -->
              <a style="cursor: pointer;text-decoration:underline;" @click="handleDownloadAttachment(scope.row.attachId, scope.row.name)">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="uploadTimeStr" label="上传时间"></el-table-column>
          <el-table-column prop="uploaderName" label="上传人"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="handleDeleteAttachment(scope.row)">删除</el-button>
              <!-- <el-button class="attachs" size="mini" @click="handleAnalysis(scope.row.attachId)">{{scope.row.ocrStatus === 'IP' ? '解析中' : '解析'}}</el-button>
              <template v-if="scope.row.ocrStatus === 'SUCC'">
                <el-button type="success" size="mini" @click="checkResult(scope.row.attachId)">查看</el-button>
              </template>
              <template v-else-if="scope.row.ocrStatus === 'FAIL'">
                <el-button type="success" size="mini" class="ocrstatus">失败</el-button>
              </template>
              <el-button type="success" v-else size="mini" class="ocrstatus">查看</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { deepCopy } from 'utils/utils'
import { postOrderAttachs, downLoadOneFid, deleteAttach } from 'api/order'
export default {
  name: 'upload-info',
  data () {
    return {
      attachmentList: [],
      fileExist: false,
      formData: {
        file: null
      }
    }
  },
  props: {
    pAttachmentList: Array,
    pJobNo: String,
    pNodeSeq: Number
  },
  mounted () {
  },
  methods: {
    handlerOnExceed () {
      this.$message.warning('每次允许上传一个附件')
    },
    sendFile (file, fileList) {
      let formData = new FormData()
      formData.append('file', file ? file.raw : '')
      postOrderAttachs(this.pJobNo, formData)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('上传成功')
            if (this.$refs.dcUpload) {
              this.$refs.dcUpload.clearFiles()
            } else {
              this.$refs.acUpload.clearFiles()
            }
            this.$emit('on-upload-success')
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
          console.log(error)
        })
    },
    handleDownloadAttachment (attachId, fileName) {
      downLoadOneFid(this.pJobNo, { attachId })
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
    },
    handleDeleteAttachment (row) {
      deleteAttach(this.pJobNo, { attachId: row.attachId })
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('删除成功')
            this.$emit('on-delete-success')
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
    pAttachmentList: {
      handler (nv) {
        if (nv.length > 0) {
          this.attachmentList = deepCopy(nv)
          this.fileExist = true
        } else {
          this.fileExist = false
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
@import "~styles/variable"
.upload-info-wrapper
  .ui-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    color: $font-color-black
    font-weight: bold
    padding-left: 10px
  .ui-wrapper
    width: 100%
    height: 140px
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
      width: 90%
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100px;
      margin: auto;
    .el-upload-dragger
      height: 100%
      width: 100%
      .el-icon-upload
        padding-top: 10px
  .ui-attachment-wrapper
    .attach-upload-wrapper
      width: 30%;
      display: inline-block;
      float: left;
      padding: 10px;
      box-sizing: border-box
      .el-upload
        width: 100%
        .el-upload-dragger
          height: 200px
          width: 100%
          .el-icon-upload
            margin-top: 56px
    .attachment-list
      width: 70%
      display:inline-block
      float:left
      height: 200px
      overflow-y: scroll
      .attachs
        background #f6ab39
        border 1px solid #f6ab39
        color #fff
      .ocrstatus
        pointer-events none
        cursor default
        opacity 0.6
</style>
