<template>
  <div class="order-pagination clearfix"
       :class="'order-pagination-' + styleType">
    <el-pagination class="hidden-xs-only xx-pagination"
                   style="float:right;margin-top:10px"
                   background
                   layout="prev, pager, next, slot , total"
                   :page-size="size"
                   :total="total"
                   @current-change="paginationChange"
                   :current-page="currentPage"

                   v-if="forceRefresh && total">
      <div class="pagination-slot">
        <i style="margin: 0 10px;">到第</i>
        <el-input style="height: 30px;line-height: 30px;"
                  v-model="page"
                  @change="handleJump"
                  debounce></el-input>
        <i style="margin: 0 10px;">页</i>
        <p @click="handleJump"
           class="jump-page">
          <i class="el-icon-d-arrow-right"></i>
        </p>
      </div>
    </el-pagination>
    <el-pagination class="hidden-sm-and-up xx-pagination"
                   style="float:right;margin-top:10px;margin-right:15px"
                   background
                   layout="total,jumper"
                   :page-size="size"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'OrderPagination',
  props: {
    total: Number,
    size: Number,
    value: Number,
    prevText: String,
    nextText: String,
    styleType: String,
    pageName: String
  },
  data () {
    return {
      currentPage: 1,
      page: '',
      forceRefresh: false
    }
  },
  created () {
    this.forceRefresh = false
    this.$nextTick(() => {
      this.forceRefresh = true
    })
  },
  beforeUpdate () {
    window.sessionStorage.setItem(this.pageName + 'currentPage', this.currentPage)
  },
  methods: {
    paginationChange (page) {
      this.currentPage = Number(window.sessionStorage.getItem(this.pageName + 'currentPage')) || 1
      // window.sessionStorage.setItem('currentPage', page)
      this.$emit('input', page)
    },
    handleJump () {
      if (this.page && ((this.page - 0) <= Math.ceil(this.total / this.size))) {
        // window.sessionStorage.setItem('currentPage', this.page)
        this.$emit('input', this.page - 0)
      }
    }
  },
  watch: {
    value: {
      handler (nv) {
        this.currentPage = nv
        // window.sessionStorage.setItem('currentPage', nv)
      },
      immediate: true
    }
  }
}
</script>
<style lang="stylus" scoped>
.order-pagination
  .pagination-slot
    font-size 12px !important
</style>
