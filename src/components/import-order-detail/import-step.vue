<template>
  <div class="step-info">
    <!-- flag: 是否完成标记， true表示已完成 -->
    <el-steps align-center>
      <template v-for="(item, index) in pStepList">
        <el-step
          :key="index"
          icon="icon-span"
          :status="item.status">
          <template slot="title">
            <div slot="reference" v-if="!item.nodeDescpDisp">
                {{item.nodeDescp}}
              </div>
            <el-popover
              v-else
              placement="top-start"
              width="200"
              trigger="hover"
              popper-class="tg-tips">
              <div class="tips">{{item.nodeStatus}} {{formatTime(item.nodeDescpDisp)}}</div>
              <div slot="reference">
                {{item.nodeDescp}}
              </div>
            </el-popover>
          </template>
        </el-step>
      </template>
    </el-steps>
  </div>
</template>

<script>
import { timeFomatter1 } from 'utils/utils'
export default {
  name: 'step-info',
  data () {
    return {
    }
  },
  props: {
    pStepList: Array,
    pActiveStep: Number
  },
  mounted () {
  },
  methods: {
    formatTime (date) {
      return timeFomatter1(date)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "~styles/variable"
.step-info
  margin: 10px
  >>>.el-step.is-horizontal
    .el-step__title
      font-size 12px
      font-weight 500
      color #353535
    .el-step__icon.is-icon
      width 14px
      height 14px
      .icon-span
        width 100%
        height 100%
        border 1px solid #406CAD
        border-radius 50%
        box-sizing border-box
    .el-step__line
      background #fff
      height 1px
      top 8px
      border-top 1px dashed #406CAD
    .el-step__head.is-finish
      .el-step__icon.is-icon
        .icon-span
          background #406CAD
      .el-step__line
        border-top 1px solid #406CAD
</style>
