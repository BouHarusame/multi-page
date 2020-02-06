<template>
  <div class="join-us-content content">
    <div class="join-form add-animation">
      <div class="join-form-box">
        <h4 class="title">加入我们</h4>
        <div class="ti">在箱讯科技找到您的角色</div>
        <div class="line">
          <el-select v-model="acRecruitmentDepartment" placeholder="部门">
            <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="acRecruitmentWorkingPlace" placeholder="工作地址">
            <el-option
              v-for="item in companyAddress"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div class="btn" @click="fectchRecruitment">查找空缺</div>
        </div>
        <div class="email">
          请发送您的简历：market@anycase.cn
        </div>
        <div class="search-box" >
          <el-table
            v-if="tableData.length > 0"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="recruitmentPosition"
              label="职位"
              width="180">
            </el-table-column>
            <el-table-column
              prop="recruitmentDepartment"
              label="部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="recruitmentWorkingPlace"
              label="工作地址">
            </el-table-column>
            <el-table-column
              label=""
              width="180">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.show"
                  @click.native.prevent="showConnect(scope.$index, scope.row)"
                  type="text"
                  size="small">
                  联系HR  >
                </el-button>
                <div v-else>
                  <p class="p">{{scope.row.recruitmentHr}}</p>
                  <p class="p">{{scope.row.recruitmentHrMailbox }}</p>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="search-content" v-if="search && tableData.length === 0">
            我们找不到任何符合您搜索的内容<span>{{department}}</span>在<span>{{WorkingPlace}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="join-content add-animation">
      <div class="join-content-box">
        <div class="join-bt">
          <h4>应届毕业生招聘计划</h4>
          <p>实习生/储备干部</p>
        </div>
        <div class="join-xq">
          <div class="selection">
            <h4>校招岗位</h4>
            <ul>
              <li>• 应届毕业生，国际贸易、市场营销、物流专业优先；</li>
              <li>• 普通话标准，样貌精神，无工作经验要求；</li>
              <li>• 签订6-8个月实习合同，实习期满可转为正式员工。</li>
            </ul>
          </div>
          <div class="selection">
            <h4>培养方向</h4>
            <ul class="con">
              <li>产品部</li>
              <li>技术部</li>
              <li>客服部</li>
              <li>商务部</li>
              <li>操作部</li>
              <li>综合部</li>
            </ul>
          </div>
          <div class="selection">
            <h4>工作地区</h4>
            <ul class="con">
              <li>上海</li>
              <li>苏州</li>
              <li>全国各大口岸</li>
              <li>海外市场</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="join-bottom add-animation">
      <div class="join-bottom-box">
        <h4>关注“箱讯科技”公众号，了解更多</h4>
        <img src="../img/gongzhonghao.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { COMPANYADDRESS, DEPARTMENTLIST } from 'assets/constant'
import { $http } from 'utils/http'
export default {
  components: {},
  props: {},
  data () {
    return {
      departmentList: DEPARTMENTLIST,
      companyAddress: COMPANYADDRESS,
      tableData: [],
      acRecruitmentDepartment: '',
      department: '',
      WorkingPlace: '',
      acRecruitmentWorkingPlace: '',
      search: false
    }
  },
  methods: {
    showConnect (index, row) {
      row.show = true
    },
    fectchRecruitment () {
      if (!this.acRecruitmentDepartment) {
        this.$message.error('部门没有选')
        return
      }
      if (!this.acRecruitmentWorkingPlace) {
        this.$message.error('工作地点没有选')
        return
      }
      const params = {
        acRecruitmentDepartment: this.acRecruitmentDepartment,
        acRecruitmentWorkingPlace: this.acRecruitmentWorkingPlace
      }
      $http(
        {
          methods: 'get',
          url: '/acRecruitment/list',
          params
        })
        .then(res => {
          if (res.msg === 'success') {
            let tableData = res.data && (res.data.records || [])
            this.tableData = tableData.map(item => {
              item.show = false
              return item
            })
            this.search = true
            if (tableData.length === 0) {
              this.department = this.acRecruitmentDepartment
              this.WorkingPlace = this.acRecruitmentWorkingPlace
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
  mounted () {
    let dom = document.querySelectorAll('.join-form .el-icon-arrow-up')
    dom.forEach(item => {
      item.classList.add('el-icon-caret-top')
      item.classList.remove('el-icon-arrow-up')
    })
  }
}
</script>
<style lang="stylus" scoped>
.join-us-content
  width 100%
  transform translateY(-47px)
  .join-form
    padding 35px 0
    background #1E3F62
    overflow hidden
    opacity 0
    .join-form-box
      width 1000px
      margin 220px auto;
      .title
        font-size 32px
        color #FFFFFF
        text-align center
        margin-bottom 60px
      .ti
        font-size 16px
        color #ffffff
        margin-bottom 20px
      .line
        display flex
        align-items center
        justify-content space-between
        .el-select
          width 320px
        >>>.el-input__inner
          background #183350
          height 48px
          border-color #9DA7B6
          color #ffffff
        >>>.el-icon-caret-top
          color #FED900
        .btn
          font-size 16px
          font-weight bold
          color #000000
          text-align center
          line-height 48px
          height 48px
          width 126px
          border-radius 6px
          background #FED900
          cursor pointer
          box-shadow:0px 12px 9px 0px rgba(33,26,4,0.4)
      .email
        font-size 12px
        color #ffffff
        margin-top 12px
      .search-box
        margin-top 40px
        .search-content
          font-size 22px
          color #ffffff
          text-algin center
          height 150px
          line-height 150px
          span
            color #fed900
      .el-table, .el-table__expanded-cell
        background-color transparent
      >>> .el-table th, >>>.el-table tr
        background-color transparent
      >>>.el-table
        th >.cell
          color: #9DA7B6
        .cell
          color #FFFFFF
        .el-table__row:hover > td
          background #183350 !important
        .el-button--text, .p
          color #FED900FF
  .join-content
    width 100%
    height 854px
    background #FAFAFA
    overflow hidden
    opacity 0
    .join-content-box
      width 860px
      margin 180px auto
      display flex
      justify-content space-between
      .join-bt
        width 400px
        h4
          font-size 26px
          color #014DA1
          margin-bottom 20px
        p
          font-size 14px
          color #000000
      .join-xq
        flex 1
        margin-left 60px
        .selection
          margin-bottom 80px
          h4
            font-size 16px
            color #000000
            font-weight bold
            margin-bottom 12px
          ul
            li
              font-size 14px
              color #000000
              line-height 28px
          .con
            display flex
            flex-wrap wrap
            li
              margin-right 40px
  .join-bottom
    width 100%
    height 500px
    opacity 0
    .join-bottom-box
      width 1000px
      margin 150px auto
      h4
        font-size 32px
        color #000000
        text-align center
        margin-bottom 80px
      img
        width 240px
        height 240px
        margin 0 auto
        display block
</style>
