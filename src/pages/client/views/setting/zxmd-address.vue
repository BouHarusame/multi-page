<template>
  <div class="zxmd-address">
     <div class="clearfix">
      <div class="search">
        <el-input v-model="searchList.name" clearable class="search-input" placeholder="请输入装箱门点或者地址"></el-input>
        <el-button type="warning" @click="handleClickQuery()">查询</el-button>
        <el-button type="warning" @click="handleClickAdd()">新增</el-button>
      </div>
     <el-table :data="partnerList" header-cell-class-name="table-header" class="tble-content"
      highlight-current-row @cell-click="handleCurrentChange">
      <el-table-column prop="zxmdCode" label="门点名称"></el-table-column>
      <el-table-column prop="zxmdAddr" label="装箱地址"></el-table-column>
      <el-table-column prop="zxmdPerson" label="装箱联系人"></el-table-column>
      <el-table-column prop="zxmdMobile" label="电话" ></el-table-column>
      <el-table-column prop="zxmdRemarks" label="备注"></el-table-column>
      <el-table-column prop="signTime" label="操作">
        <template slot-scope="scope">
          <el-button type="warning"  @click="handleClickEdit(scope.row)">修改</el-button>
          <el-button type="warning" class="guest-btn"  @click="handleChangePartner(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
     <el-dialog :close-on-click-modal="false" append-to-body custom-class="customer-dialog" :visible.sync="addVisible"  top="27px" width="682px"  @close="handleDialogClose">
      <el-form label-width="120px">
        <el-form-item label="装箱联系人">
          <el-input v-model="formData.zxmdPerson"></el-input>
        </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="formData.zxmdMobile"></el-input>
          </el-form-item>
          <el-form-item label="门点名称">
            <el-input v-model="formData.zxmdCode"></el-input>
          </el-form-item>
        <el-form-item label="装箱地址">
          <el-input v-model="formData.zxmdAddr"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input height="200px" v-model="formData.zxmdRemarks"></el-input>
        </el-form-item>
       </el-form>
      <div slot="footer" class="xx_dialog_footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="warning" @click="handleClickSave()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTruckZxmds, postTruckZxmds, putTruckZxmds, deleteTruckZxmds } from 'api/truck'
export default {
  name: 'zxmdAddress',
  components: {},
  props: {},
  data () {
    return {
      searchList: {
        name: '',
        partnerType: '',
        activeTag: 'A'
      },
      partnerList: [],
      addVisible: false,
      formData: {
        zxmdAddr: '',
        zxmdCode: '',
        zxmdMobile: '',
        zxmdPerson: '',
        zxmdRemarks: ''
      },
      mode: 'add',
      id: ''
    }
  },
  methods: {
    handleCurrentChange (row, column, cell, event) {

    },
    // 查询接口
    Querydoors (param) {
      getTruckZxmds(param)
        .then(res => {
          if (res.msg === 'success') {
            this.partnerList = res.data.records
          }
        }).catch(error => {
          console.error(error)
        })
    },
    handleClickQuery () {
      let param = {
        param: this.searchList.name
      }
      this.Querydoors(param)
    },
    handleClickAdd () {
      this.addVisible = true
      this.mode = 'add'
    },
    handleDialogClose () {
      this.partnerId = ''
      this.formData = {}
      this.masterInfo = []
    },
    // 新增页面的数据信息
    handleClickApp () {
      let param = {
        zxmdAddr: this.formData.zxmdAddr,
        zxmdCode: this.formData.zxmdCode,
        zxmdMobile: this.formData.zxmdMobile,
        zxmdPerson: this.formData.zxmdPerson,
        zxmdRemarks: this.formData.zxmdRemarks
      }
      postTruckZxmds(param).then(res => {
        if (res.msg === 'success') {
          this.$message.success('新增成功')
          this.Querydoors()
        }
      }).catch(error => {
        console.error(error)
      })
    },
    handleClickSave () {
      if (this.mode === 'edit') {
        let param = {
          id: this.id,
          zxmdAddr: this.formData.zxmdAddr,
          zxmdCode: this.formData.zxmdCode,
          zxmdMobile: this.formData.zxmdMobile,
          zxmdPerson: this.formData.zxmdPerson,
          zxmdRemarks: this.formData.zxmdRemarks
        }
        this.handleChangePSD(param)
      } else {
        this.handleClickApp()
      }
      this.addVisible = false
    },
    // 删除请求信息接口
    handleClickdelete (id) {
      deleteTruckZxmds(id)
        .then(res => {
          if (res.msg === 'success') {
            this.$message.success('删除成功')
            this.Querydoors()
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    handleChangePartner (row) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleClickdelete(row.id)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleClickEdit (row) {
      this.addVisible = true
      this.formData = row
      this.mode = 'edit'
      this.id = row.id
    },
    handleChangePSD (param) {
      putTruckZxmds(param).then(res => {
        this.$message.success('修改成功')
        this.Querydoors()
      })
    }
  },
  mounted () {
    this.Querydoors()
  }
}
</script>
<style lang="stylus" scoped>
.zxmd-address
  .search
    line-height 40px
  .add-item-btn
    padding: 0;
    width: 110px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f67340;
    color: #fff;
    border-radius: 4px;
    margin-bottom: 20px
  .search-input
    width: 200px
    height: 30px
>>>.customer-dialog
    height auto
</style>
