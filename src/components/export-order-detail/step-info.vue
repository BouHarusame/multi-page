<template>
  <div class="step-info-wrapper">
    <!-- flag: 是否完成标记， true表示已完成 -->
    <el-steps :active="activeStep" align-center>
      <template v-for="(item, index) in stepsList">
        <el-step
          :key="index"
          :title="item.nodeDescp"
          :status="item.status"
          :class="[{'wait-class': item.wait}, {'current-wait': item.currentWait},{'current-finish': item.currentFinish}, {'finish-class': item.finish}, {'default-class': item.default}, {'current-default': item.currentDefault}]"
          @click.native="handleClickStep(item.nodeSeq)">
        </el-step>
      </template>
    </el-steps>
  </div>
</template>

<script>
// import {deepCopy} from 'common/js/utils'
// import { $http } from 'api/http'
export default {
  name: 'step-info',
  data () {
    return {
      stepsList: [],
      activeStep: -1
    }
  },
  props: {
    pStepList: Array,
    pActiveStep: Number,
    pDefaultNode: Number
  },
  mounted () {
  },
  methods: {
    handleClickStep (index) {
      this.$emit('on-click-node', index)
    },
    handleStepNodeClass (stepsList, clickedNode) {
      stepsList.forEach(item => {
        // 初始化class的默认样式
        item.wait = false
        item.current = false
        item.finish = false
        item.default = false
        item.currentWait = false
        item.currentFinish = false
        item.currentDefault = false
        if (item.status === 'wait') { // 未完成 非选中状态
          item.wait = true
        } else if (item.status === 'finish') { // 完成 非选中状态
          item.finish = true
        }
        if (item.nodeSeq === this.pDefaultNode) { //  设置默认节点的非选中状态
          item.default = true
        }
        if (item.nodeSeq === this.pDefaultNode) { // 当前为默认节点
          if (this.pActiveStep === this.pDefaultNode) { // 默认节点为选中状态
            item['default'] = false
            item['currentDefault'] = (item.status === 'current-default')
          }
        } else { // 非默认节点的选中状态
          item['currentWait'] = (item.status === 'current-wait')
          item['currentFinish'] = (item.status === 'current-finish')
        }
      })
    }
  },
  watch: {
    pStepList: {
      handler (nv) {
        this.stepsList = this.pStepList
        // this.handleStepNodeClass(this.stepsList, false)
      },
      immediate: true
    },
    pActiveStep: {
      handler (nv) {
        this.activeStep = nv
        this.stepsList = this.pStepList
        this.handleStepNodeClass(this.stepsList, true)
      }
    }
  }
}
</script>

<style lang="stylus">
.step-info-wrapper
  margin: 10px
</style>
