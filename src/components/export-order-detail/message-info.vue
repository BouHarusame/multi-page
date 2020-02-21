<template>
  <div class="message-info-wrapper">
    <span class="mi-title" v-if="isAC">发送提示信息给客户</span>
    <span class="mi-title" v-if="isDC">提示信息</span>
    <div class="mi-ac-content" v-if="isAC">
      <span class="mac-title">提示信息：</span>
      <el-autocomplete class="inline-input"
        v-model="message"
        :fetch-suggestions="querySearch"
        placeholder="请出入要提示的内容"
        @select="handleSelect"
        :debounce="300"
        :trigger-on-focus="false"
        style="width: 300px"
      ></el-autocomplete>
     <!--  <el-input v-model="message" placeholder="请出入要提示的内容" style="width: 300px"></el-input> -->
      <el-button class="search-btn" size="small" @click="handleSendMessage">发送一个提醒</el-button>
      <ul class="todo-list-ul">
        <li :key="c.id" v-for="c in acTodoMessageList">
          <span class="todo-list-li" :title="c.msgContent">{{c.msgContent}}</span>
          <el-button class="revert-search-btn" size="small" @click="handleMessageDone(c.id)" style="display:inline-block;">标记为已处理</el-button>
        </li>
      </ul>
    </div>
    <div class="mi-dc-content" v-if="isDC">
      <!-- <span>提示信息：请尽快上传报关资料</span>
      <el-button type="success" size="small">标记为已处理</el-button> -->
      <ul class="todo-list-ul">
        <li :key="c.id" v-for="c in dcTodoMessageList">
          <span class="todo-list-li" :title="c.msgContent">{{c.msgContent}}</span>
          <el-button type="success" size="small" @click="handleMessageDone(c.id)" style="display:inline-block;">标记为已处理</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { putMsgOne } from 'api/todo'
import { getTodoMsg, sendTodo, getAcTodo, getDcTodo } from 'api/order'
import { mapGetters } from 'vuex'
import { roleType } from 'utils/utils'
export default {
  name: 'message-info',
  data () {
    return {
      message: '',
      acTodoMessageList: [],
      dcTodoMessageList: [],
      isDC: false,
      isAC: false
    }
  },
  props: {
    pJobNo: String
  },
  mounted () {
    this.isDC = roleType(this.userRoles, 'DC')
    this.isAC = roleType(this.userRoles, 'AC')
  },
  methods: {
    createFilter (queryString) {
      return (msg) => {
        return (msg.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    querySearch (queryString, cb) {
      getTodoMsg()
        .then(res => {
          if (res.msg === 'success') {
            let tmpData = []
            res.data.records.map(item => {
              let option = {}
              option.name = item
              option.value = item
              tmpData.push(option)
            })
            let result = queryString ? tmpData.filter(this.createFilter(queryString)) : tmpData
            cb(result)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSelect (item) {
      // console.log(item)
    },
    handleSendMessage () {
      if (!this.message) {
        this.$message.error('请输入提示信息')
        return
      }
      let addTodoParam = {
        jobNo: this.pJobNo,
        todoItem: this.message
      }
      sendTodo(addTodoParam)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('发送成功')
            this.message = ''
            this.fetchACTodoMessage()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchACTodoMessage () {
      getAcTodo({
        jobNo: this.pJobNo
      })
        .then(res => {
          if (res.msg === 'success') {
            this.acTodoMessageList = res.data.records
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchDCTodoMessage () {
      getDcTodo({
        jobNo: this.pJobNo
      })
        .then(res => {
          if (res.msg === 'success') {
            this.dcTodoMessageList = res.data.records
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleMessageDone (msgId) {
      let params = {
        id: msgId
      }
      putMsgOne(params)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('更新成功')
            if (roleType(this.userRoles, 'AC')) {
              this.fetchACTodoMessage()
            } else {
              this.fetchDCTodoMessage()
            }
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
  computed: {
    ...mapGetters(['userRoles'])
  },
  watch: {
    pJobNo: {
      handler (nv) {
        if (roleType(this.userRoles, 'AC')) {
          this.fetchACTodoMessage()
        } else {
          this.fetchDCTodoMessage()
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="stylus">
@import "~styles/variable"
.message-info-wrapper
  .mi-title
    display: block
    height: 45px
    line-height: 45px
    border-bottom: 1px solid $border-color-light-grey
    color: $font-color-black
    font-weight: bold
    padding-left: 10px
  .mi-ac-content
    padding: 10px 10px
    height: 158px
    overflow: scroll
  .todo-list-ul
    margin: 10px
  .todo-list-li
    display: inline-block
    width: 300px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    margin-top: 10px
</style>
