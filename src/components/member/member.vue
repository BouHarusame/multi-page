<template>
  <div class="member">
    <div class="table-bar">
      <div class="fr search-bar">
        <input placeholder="输入姓名/手机号"
               v-model="member"
               class="el-input__inner search-input"
               @keyup.enter="filterMember">
        <i class="el-icon-search filter-search-btn"
           @click="filterMember"></i>
      </div>
      <!-- <router-link to="/setting/useradd" class="add-btn el-button">新增员工</router-link> -->
      <el-button class="search-btn"
                 @click="handleClickAdd()">新增员工</el-button>
    </div>
    <div class="table-cont">
      <div class="member-list">
        <el-table
                  header-cell-class-name="table-header"
                  :data="memberList"
                  :loading="loading"
                  max-height="660"
                  :highlight-current-row="true">
          <el-table-column label="姓名"
                           prop="username"></el-table-column>
          <el-table-column label="手机号"
                           prop="mobile"></el-table-column>
          <el-table-column label="职位">
            <template slot-scope="scope">
              <p>{{scope.row.userRoleDescp}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           fixed="right"
                           width="150">
            <template slot-scope="scope">
              <!-- <el-button type="text"
                         size="mini"
                         @click="handleClickEdit(scope.row)">编辑</el-button>
              <el-button type="text"
                         size="mini"
                         class="del-btn"
                         @click="handleClickDel(scope.row.userId)">删除</el-button> -->
              <i class="el-icon-edit tbl-edit" @click="handleClickEdit(scope.row)"></i>
              <i class="el-icon-delete tbl-delete" @click="handleClickDel(scope.row.userId)"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false"
               @open="handleDialogOpen" @close="handleDialogClose"
               :title="title"
               top="27px"
               width="682px">
      <el-form label-width="120px" header-cell-class-name="table-header">
        <el-form-item label="姓名：">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="密码："
                      v-if="mode === 'add'">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="职位权限：">
          <el-checkbox-group v-model="formData.userRole">
            <el-checkbox v-for="role in roleList" :key="role.roleId" :label="role.roleId">{{role.roleDescp}}</el-checkbox>
          </el-checkbox-group>
          <!-- <el-radio-group v-model="formData.userRole"
                          @change="handleUserRoleChange">
            <el-radio label="MEMB">操作</el-radio>
            <el-radio label="FIN">财务</el-radio>
            <span v-if="role === 'AC_GLY'"
                  style="margin-left: 30px;">
              <el-radio label="DANZH">单证</el-radio>
              <el-radio label="BUSI">商务</el-radio>
              <el-radio label="PROF">客服</el-radio>
            </span>
            <span v-if="role.indexOf('AC') > -1">
              <el-radio label="PORTAL" style="margin-left: 30px;">门户运维</el-radio>
            </span>
          </el-radio-group> -->
        </el-form-item>
        <!-- <el-form-item label="工作组：" v-show="role === 'SHARK_ADMIN' && formData.userRole === 'MEMB'">
          <el-select v-model="formData.groupId" filterable style="width:100%">
            <el-option v-for="item in userGroupList" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer">
        <div v-if="mode === 'add'"
             style="text-align: center">
          <el-button type="warning"
                     @click="addUser">保存</el-button>
        </div>
        <div v-else>
          <el-button type="warning"
                     @click="handleClickSave">保存</el-button>
          <el-button @click="handleClickCancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getUserList, deleteUser, editUser, getUserRoles, newAddUser } from 'api/setting'
import { deepCopy } from 'utils/utils'
const MEMBER_ROLE_LIST = {
  MEMB: '操作',
  FIN: '财务',
  DANZH: '单证',
  BUSI: '商务',
  PROF: '客服',
  PORTAL: '门户运维'
}
export default {
  name: 'Member',
  data () {
    return {
      memberList: [],
      dialogVisible: false,
      member: '',
      formData: {},
      orderList: [],
      userGroupList: [],
      title: '',
      mode: '',
      roleList: [],
      loading: false,
      cloneData: null
    }
  },
  mounted () {
    this._getMemberList()
  },
  methods: {
    _getMemberList () {
      getUserList()
        .then(res => {
          if (res.msg === 'success') {
            this.memberList = res.data.records
            this.cloneData = JSON.parse(JSON.stringify(this.memberList))
            // this.$emit('member-count', this.memberList.length)
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(error => {
          if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            this.$message.error('身份验证失败，请重新登录')
            setTimeout(() => {
              this.$router.push('/login')
            }, 1500)
          }
        })
    },
    deleteMember (userId) {
      deleteUser(userId)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('删除成功')
            this.currentIndex = null
            this.delDialog = false
            this._getMemberList()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          if (error.status === 403 || error.status === 401) {
            this.$message.error('身份验证失败，请重新登录')
            this.$router.push('/login')
          }
        })
    },
    saveEditMember () {
      const data = {
        userId: this.formData.userId,
        mobile: this.formData.mobile,
        userRole: this.formData.userRole.join(','),
        email: this.formData.email,
        username: this.formData.username
      }
      editUser(data)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('保存成功')
            this.handleClickCancel()
            this._getMemberList()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        })
        .catch(error => {
          if (error.status === 403 || error.status === 401) {
            this.$message.error('身份验证失败，请重新登录')
            this.$router.push('/login')
          }
        })
    },
    handleClickAdd () {
      this.formData = {
        username: '',
        mobile: '',
        email: '',
        password: '',
        userRole: [],
        groupId: ''
      }
      this.title = '新增员工'
      this.dialogVisible = true
      this.mode = 'add'
      // if (this.role === 'SHARK_ADMIN' || this.role === 'SHARK_PROFESSOR') {
      //   this.fetchUserGroup()
      // }
    },
    handleClickEdit (row) {
      this.title = '编辑员工'
      this.dialogVisible = true
      this.mode = 'edit'
      this.formData = JSON.parse(JSON.stringify(row))
      console.log(this.formData)
      this.formData.userRole = this.formData.userRole.split(',')
    },
    handleUserRoleChange (value) {
      if (value !== 'MEMB') {
        this.formData.groupId = ''
      }
    },
    valid () {
      if (!this.formData.username) {
        this.$message.error('请填写姓名')
        return false
      }
      if (!this.formData.mobile) {
        this.$message.error('请填写手机号')
        return false
      }
      if (!this.formData.email) {
        this.$message.error('请填写邮箱')
        return false
      }
      if (!this.formData.password) {
        this.$message.error('请填写密码')
        return false
      }
      if (!this.formData.userRole) {
        this.$message.error('请选择职位')
        return false
      }
      return true
    },
    handleDialogOpen () {
      getUserRoles()
        .then(res => {
          if (res.msg === 'success') {
            this.roleList = res.data.records
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(error => {
          console.error(error)
        })
    },
    handleDialogClose () {

    },
    addUser () {
      if (!this.valid()) {
        return
      }
      this.params = deepCopy(this.formData)
      this.params.userRole = this.params.userRole.join(',')
      newAddUser(this.params)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('添加成功')
            this.dialogVisible = false
            this._getMemberList()
          }
          if (res.msg === 'fail') {
            this.$message.error(res.verror)
          }
        }).catch(error => {
          console.error(error)
        })
    },
    handleClickSave () {
      this.saveEditMember()
    },
    handleClickCancel () {
      this.dialogVisible = false
    },
    handleClickDel (id) {
      this.$confirm('确认删除该员工?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMember(id)
      }).catch(() => {
        this.dialogVisible = false
      })
    },
    filterMember () {
      if (this.member === '') {
        this.memberList = this.cloneData
      } else {
        this.memberList = this.cloneData.filter(item => {
          return item.username.indexOf(this.member) > -1 || item.mobile.indexOf(this.member) > -1
        })
      }
    }
  },
  filters: {
    formatRole (v) {
      return MEMBER_ROLE_LIST[v]
    }
  }
}
</script>
<style lang="stylus">
.fr
  float: right
.member
  font-size: 16px
  .add-item-btn
    padding: 0
    width: 110px
    height: 40px
    line-height: 40px
    text-align: center
    background: #f67340
    color: #fff
    border-radius: 4px
    margin-bottom: 20px
  .table-cont
    display: flex
    justify-content: flex-between
    margin-top: 20px
    width: 100%
  .member-list
    width: 100%
    margin-right: 20px
    .tbl-edit
      color: #e6a23c
      cursor: pointer
    .tbl-delete
      color: #dc2f11
      cursor: pointer
      margin-left: 10px
  .el-tabs__header
    background: #fff
  .el-tabs__nav-wrap
    padding-left: 20px
  .del-btn
    color: #f67340
  .view-d
    color: #2f75ea
    padding: 0
  .tb-style01
    color: #222
    white-space: nowrap
  .tb-style02
    color: #2f75ea
  .el-checkbox
    margin-right 30px
    margin-left 0
  .search-bar
    position: relative
    .search-input
      padding-right: 43px
      height: 30px
      font-size: 14px
    .filter-search-btn
      position: absolute
      width: 34px
      height: 30px
      line-height: 30px
      // margin: 5px 2px 1px 7px
      text-align: center
      color: #ACA9A9
      font-size: 20px
      top: 0px
      right: 2px
      cursor: pointer
@media screen and (max-width: 976px)
  .setting
    .table-bar
      .search-bar
        display: none
    .table-cont
      display: block
      .member-list
        width: 100%
        margin-bottom: 20px
      .count-list
        width: 100%
</style>
