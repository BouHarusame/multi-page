<template>
  <div class="to-do-list">
    <div class="message"
         v-if="!loading">
      <div class="message-menu">
        <ul class="menu-list">
          <li v-for="item in menuList"
              :key="item.id"
              :class="{'active': active === item.name}"
              @click="handleClickMesssage(item.name, item.type)">{{item.name}}
            <el-badge :value="compute(item.count)"
                      v-if="!show"
                      type="info"
                      class="item"></el-badge>
          </li>
        </ul>
      </div>
      <div class="message-content">
        <div class="message-badge"
             @click="handlClickAllBadge">批量标记已处理</div>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="未处理"
                       name="first">
            <div class="content-item"
                 v-for="(item, index) in todoList"
                 :key="index"
                 @click.stop="detail(item)">
              <p>{{item.msgContent}}</p>
              <p>
                <span>{{item.time}}</span>
                <b>{{item.messageType}}消息</b>
              </p>
              <div class="badge"
                   @click.stop="handlClickBadge(item.id)">标记为已处理</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已处理"
                       name="second">
            <div class="content-item"
                 v-for="(item, index) in oldTodoList"
                 :key="index"
                 v-show="show"
                 @click="detail(item)">
              <p>{{item.msgContent}}</p>
              <p>
                <span>{{item.time}}</span>
                <b>{{item.messageType}}消息</b>
              </p>
            </div>
            <div class="page-wrap">
              <!-- <OrderPagination styleType="border"
                               :total="total"
                               :size="todoParams.size"
                               v-model="todoParams.page"
                               :pageName="pageName"
                               prevText="上一页"
                               nextText="下一页" /> -->
            </div>
          </el-tab-pane>
           <el-dialog :title="orderType"
                         :visible.sync="dialogVisible"
                         :show-close="false"
                         width="800px"
                         v-if="userRoles.indexOf('AC_KF') > -1">
                <div class="content">
                  <ul>
                    <li v-for="item in orderInfoItem" :key="item.label"><span>{{item.label}}: </span><span v-html="item.descp"></span></li>
                  </ul>
                </div>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button type="primary"
                             @click.stop="detailForKF">查看订单详情</el-button>
                  <el-button type="primary"
                             @click="handleClickHide">关闭</el-button>
                </span>
              </el-dialog>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { putMsgBatch, putMsgOne, getMsgDone, getMsgToDo } from 'api/todo'
import { getOrderInfo } from 'api/order'
import { mapGetters, mapMutations } from 'vuex'
import { MESSAGE_TEXT } from 'assets/constant'
import { getTime, roleType } from 'utils/utils'
// import OrderPagination from 'components/pagination/pagination'
const PAGE = 'todoList'
export default {
  data () {
    return {
      jobNoForKeFu: '',
      pathNameForKeFu: '',
      intervalRefresh: null,
      activeName: 'first',
      dcustom: false,
      multipleSelection: [],
      loading: true,
      show: false,
      todoList: [],
      messageList: [],
      menuList: [],
      active: '全部',
      activeType: '',
      oldTodoList: [],
      orderType: '',
      orderInfoItem: [],
      msgType: [{
        label: 'order',
        messageType: '订单',
        value: ['detailInfo', 'detailInfo']
      },
      {
        label: 'stmt',
        messageType: '账单',
        value: ['acStatement', 'customerStatement']
      },
      {
        label: 'quote',
        messageType: '进口',
        value: ['importOrderDetail', 'importOrderDetail']
      },
      {
        label: 'fee',
        messageType: '费用',
        value: ['acExpense', 'customerExpense']
      }],
      total: 0,
      todoParams: {
        page: 1,
        size: 12
      },
      dialogVisible: false,
      pageName: PAGE
    }
  },
  computed: {
    ...mapGetters(['userRoles'])
  },
  created () {
    this.dcustom = roleType(this.userRoles, 'DC')
  },
  methods: {
    ...mapMutations('menu', {
      setMenuName: 'SET_MENU_NAME'
    }),
    refreshData () {
      this.getToDoList()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSubmit () {
      console.log(this.multipleSelection)
    },
    compute (value) {
      if (value) return value
      return ''
    },
    handleClickMesssage (name, type) {
      this.active = name
      this.activeType = type
      if (this.activeName === 'first') {
        this.todoList = this.messageList.filter(item => {
          if (type) {
            return item.msgType === type
          } else {
            return item
          }
        })
      } else {
        this.todoParams.msgType = this.activeType
        this.getOldToDoList(this.todoParams)
      }
    },
    handlClickAllBadge () {
      if (this.activeName === 'first') {
        putMsgBatch(this.activeType)
          .then(res => {
            if (res && res.msg === 'success') {
              this.$message.success('操作成功')
              this.getToDoList(this.activeType)
            }
            if (res && res.msg === 'fail') {
              this.$message.error(res.verror)
            }
          })
          .catch(error => {
            throw Error(error)
          })
      }
    },
    handleClickHide () {
      this.dialogVisible = false
    },
    handlClickBadge (id) {
      let param = { id }
      putMsgOne(param)
        .then(res => {
          if (res && res.msg === 'success') {
            this.$message.success('操作成功')
            this.getToDoList(this.activeType)
          }
          if (res && res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          throw Error(error)
        })
    },
    handleClick (tab) {
      if (tab.label === '已处理') {
        this.todoParams.msgType = this.activeType
        this.getOldToDoList(this.todoParams)
        this.show = true
      } else {
        this.show = false
      }
    },
    detail (row) {
      if (roleType(this.userRoles, 'AC_KF') && row.messageType === '订单') {
        if (row.msgUrl === 'import') {
          const menuName = '进口订单'
          row.pathName = 'importOrderDetail'
          window.sessionStorage.setItem('menuName', menuName)
          this.setMenuName(menuName)
          this.$router.push({ name: row.pathName, params: { quoteNo: row.msgRefId } })
          return
        }
        if (row.msgRefId || row.msgRefId != null) {
          this.dialogVisible = true
          this.jobNoForKeFu = row.msgRefId
          this.pathNameForKeFu = row.pathName
          this.getOrderInfoKefu(row.msgRefId)
        }
      } else {
        let menuName = ''
        if (row.msgUrl) {
          if (row.msgUrl === 'import') {
            menuName = '进口订单'
            row.pathName = 'importOrderDetail'
            row.params = { quoteNo: row.msgRefId }
          } else if (row.msgUrl === 'quote') {
            menuName = '询价详情'
            row.pathName = 'importQuote'
            row.params = { quoteNo: row.msgRefId, order: true }
          } else if (row.msgUrl === 'offer') {
            menuName = '报价详情'
            row.pathName = 'importQuoteDetail'
            row.params = { quoteNo: row.msgRefId }
          }
        } else {
          if (row.messageType === '订单') {
            menuName = '出口' + row.messageType
          } else {
            menuName = row.messageType
          }
          row.params = { jobNo: row.msgRefId }
        }
        window.sessionStorage.setItem('menuName', menuName)
        this.setMenuName(menuName)
        this.$router.push({ name: row.pathName, params: row.params })
      }
    },
    detailForKF () {
      let menuName = '出口订单'
      window.sessionStorage.setItem('menuName', menuName)
      this.setMenuName(menuName)
      this.$router.push({ name: this.pathNameForKeFu, params: { jobNo: this.jobNoForKeFu } })
    },
    getOrderInfoKefu (jobNo) {
      getOrderInfo(jobNo)
        .then(res => {
          if (res.msg === 'success') {
            this.orderInfoItem = (res.data && res.data.items) || []
            this.orderType = res.data.orderType
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getOldToDoList (params) {
      getMsgDone(params)
        .then(res => {
          if (res.msg === 'success') {
            let oldTodoList = (res.data && res.data.records) || []
            this.total = (res.data && res.data.total) || 0
            oldTodoList.forEach(item => {
              this.getResult(item)
            })
            this.oldTodoList = oldTodoList
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getToDoList (params) {
      getMsgToDo(params)
        .then(res => {
          if (res.msg === 'success') {
            let todoList = (res.data && res.data.records) || []
            this.menuList = (res.data && res.data.typeCountList) || []
            todoList.forEach(item => {
              this.getResult(item)
            })
            this.messageList = todoList
            this.todoList = todoList
            this.loading = false
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },
    getResult (item) {
      if (item.msgType) {
        this.msgType.forEach(ele => {
          if (ele.label === item.msgType) {
            if (this.dcustom) {
              item.pathName = ele.value[1]
            } else {
              item.pathName = ele.value[0]
            }
            item.messageType = ele.messageType
            item.time = this.showTime(getTime(item.msgTime))
          }
        })
      }
    },
    showTime (time) {
      let { day, hour, minute } = time
      let hours = day * 24 + hour
      if (hours > 24) return day + MESSAGE_TEXT[3]
      if (hours >= 1) return hours + MESSAGE_TEXT[2]
      if (minute >= 5) return minute + MESSAGE_TEXT[1]
      return MESSAGE_TEXT[0]
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalRefresh)
    this.intervalRefresh = null
  },
  mounted () {
    this.getToDoList()
    this.intervalRefresh = setInterval(this.refreshData, 1000 * 60 * 2)
  },
  components: {
    // OrderPagination
  },
  watch: {
    todoParams: {
      handler (nv, ov) {
        if (!nv || !ov) {
          // this.getOldToDoList(this.todoParams)
        } else {
          this.getOldToDoList(nv)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~styles/variable'
.to-do-list
  .message
    display flex
    justify-content space-between
    .message-menu
      width 150px
      padding 10px 0px
      .menu-all
        padding-left 10px
        font-weight bold
      .menu-list
        border 1px solid $border-color-light-grey
        border-bottom 0
        li
          line-height 40px
          height 40px
          overflow hidden
          font-weight bold
          cursor pointer
          padding 0 15px
          color $font-color-grey
          border-bottom 1px solid $border-color-light-grey
          font-size $font-size-medium
          &.active
            background #fafafa
            color $font-color-black
            font-size $font-size-medium
        .item
          float right
          padding-top 5px
    .message-content
      width calc(100% - 170px)
      position relative
      .message-badge
        position absolute
        top 8px
        right 0
        z-index 98
        padding 10px 20px
        border 0
        background $color-yellow-background
        font-size $font-size-small
        cursor pointer
        color #fff
        border-radius 5px
        &:hover
          color $font-color-black
      .content-item
        width 100%
        padding 5px 10px
        border-bottom 1px solid $border-color-light-grey
        cursor pointer
        box-sizing border-box
        position relative
        &:hover
          .badge
            display block
        p
          font-size $font-size-medium
          line-height 26px
          color $font-color-black
          padding-right 140px
          span
            font-size $font-size-small
            margin-right 10px
            color $font-color-grey
          b
            font-size $font-size-small
            font-weight normal
            color $font-color-black
        .badge
          display none
          border 1px solid $border-color-light-grey
          padding 10px 25px
          position absolute
          top 10px
          right 1px
          font-size $font-size-small
          color $color-yellow-background
          border 1px solid $color-yellow-background
          border-radius 5px
          background #FEF7EB
          &:hover
            color $font-color-black
      .content
        ul
          display flex
          justify-content space-between
          align-items center
          flex-wrap wrap
          li
            width 220px
            height 55px
            font-size 14px
            text-align center
            overflow hidden
            span
              display block
              float left
              margin-left 5px
              text-align left
              line-height 16px
</style>
