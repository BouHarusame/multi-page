<template>
  <div class="wrapper">
    <el-table ref="multipleTable" :data="boxList" style="width: 100%">
      <el-table-column label="提单号" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.mode === 'edit'">
            <el-select v-model="scope.row.billNo" multiple placeholder="请选择提单号" style="width: 160px">
              <el-option v-for="(billNo, i) in scope.row.billNosList" :key="i" :label="billNo.billNo" :value="billNo.billNo">
              </el-option>
            </el-select>
          </template>
          <template v-else>
            <div v-if="scope.row.billNos">{{scope.row.billNos}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="箱型" align="center" width="140">
        <template slot-scope="scope">
          <template v-if="scope.row.mode === 'edit'">
            <el-select v-model="scope.row.boxType" @change="(val) => {handleChangeType(val, scope.$index)}" placeholder="请选择箱型" style="width: 120px">
              <el-option v-for="boxType in scope.row.boxTypeList" :key="boxType.type" :label="boxType.type" :disabled="boxType.disabled" :value="boxType.type">
              </el-option>
            </el-select>
          </template>
          <template v-else>
          <div v-if="scope.row.boxType">{{scope.row.boxType}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="箱量" align="center" width="140">
        <template slot-scope="scope">
          <template v-if="scope.row.mode === 'edit'">
            <el-input-number v-model="scope.row.boxCount" :min="1" :max="scope.row.maxBoxNum" label="请输入箱量"></el-input-number>
          </template>
          <template v-else>
            <div v-if="scope.row.boxCount">{{scope.row.boxCount}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column align="center" label="做箱日期" width="240">
        <template slot-scope="scope">
          <template v-if="scope.row.mode === 'edit'">
            <el-date-picker v-model="scope.row.boxDate" type="datetime" placeholder="选择做箱日期时间"></el-date-picker>
          </template>
          <template v-else>
            <div>{{scope.row.boxDate ? new Date(Number(scope.row.boxDate)).toLocaleDateString() : ''}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="装箱门点-简称" width="120">
        <template slot-scope="scope">
          <div class="line" v-for="(item, index) in scope.row.zxmdList" :key="index">
            <template v-if="scope.row.mode === 'edit'">
              <el-input v-model="item.zxmdCode" class="line-input" placeholder="装箱门点-简称"></el-input>
            </template>
            <template v-else>
              <div v-if="item.zxmdCode">{{item.zxmdCode}}</div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="装箱地址" align="center" width="180">
        <template slot-scope="scope">
          <div class="line" v-for="(item, index) in scope.row.zxmdList" :key="index">
            <template v-if="scope.row.mode === 'edit'">
              <el-input v-model="item.zxmdAddr"  class="line-input" placeholder="装箱地址"></el-input>
            </template>
            <template v-else>
              <div v-if="item.zxmdAddr">{{item.zxmdAddr}}</div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="装箱联系人(电话)" align="center" width="380">
        <template slot-scope="scope">
          <div class="line" v-for="(item, index) in scope.row.zxmdList" :key="index">
            <template v-if="scope.row.mode === 'edit'">
              <div class="line-input">
                <el-input v-model="item.zxmdPerson" placeholder="装箱联系人"></el-input>
                <el-input v-model="item.zxmdMobile" placeholder="联系人电话"></el-input>
                <i class="el-icon-delete btn-plus" @click="handleDelete(scope.$index, index)"></i>
                <span class="el-icon-plus btn-plus" @click="handlePlus(scope.$index)"></span>
                <span class="el-icon-zoom-in btn" v-if="index === scope.row.zxmdList.length -1" @click="handleSelect(scope.$index)"><small class="btn-small">选择地址</small></span>
              </div>
            </template>
            <template v-else>
              <div v-if="item.zxmdPerson ||item.zxmdMobile">{{item.zxmdPerson}}{{item.zxmdMobile ? `(${item.zxmdMobile})`: ''}}</div>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="zxyq" align="center" label="装箱要求" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row.mode === 'edit'">
             <el-input height="200px" v-model="scope.row.zxyq" placeholder="装箱要求"></el-input>
          </template>
          <template v-else>
            <div v-if="scope.row.zxyq">{{scope.row.zxyq}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <div class="line-btn">
            <el-button @click="handleSave(scope.$index)">保存</el-button>
            <el-button @click="handleEdit(scope.$index)">编辑</el-button>
            <el-button @click="handleDele(scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn" @click="handleAdd" v-if="showBtn"><span class="el-icon-plus"></span><span>分配剩余箱型</span></div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    boxList: Array,
    showBtn: Boolean
  },
  data () {
    return {
    }
  },
  methods: {
    handleAdd () {
      this.$emit('on-add')
    },
    handleDelete (rowIndex, index) {
      this.$emit('on-delete', { rowIndex, index })
    },
    handlePlus (rowIndex) {
      this.$emit('on-plus', rowIndex)
    },
    handleSelect (rowIndex) {
      this.$emit('on-select', rowIndex)
    },
    handleSave (rowIndex) {
      this.$emit('on-save', rowIndex)
    },
    handleEdit (rowIndex) {
      this.$emit('on-edit', rowIndex)
    },
    handleChangeType (val, rowIndex) {
      this.$emit('on-change', { val, rowIndex })
    },
    handleDele (rowIndex) {
      this.$emit('on-dele', rowIndex)
    }
  },
  mounted () {
  }
}
</script>
<style lang="stylus" scoped>
.add-btn {
    height: 48px;
    border: 1px dashed #108EE9;
    border-radius: 6px;
    text-align: center;
    line-height: 48px;
    color: #108EE9;
    cursor: pointer;
  }
.line-input
  display flex
  align-items center
  margin-bottom 5px
  .el-input
    width 116px
    margin-right 4px
  i.btn-plus {
    color: #108EE9;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }
  span.btn-plus {
    color: #108EE9;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    margin: 0 4px;
  }
  .btn {
    color: rgb(16, 142, 233);
    font-size: 16px;
    .btn-small {
      font-size: 14px;
      position: relative;
      top: -2px;
    }
  }
.line-btn
  display flex
  align-items center
  .el-button
    background #E6A23C
    border 0
    color #ffffff
.grey {
  color: #ccc;
}
</style>
