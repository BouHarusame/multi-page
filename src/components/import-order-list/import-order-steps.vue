<template>
<div class="el-steps-wrapper">
  <el-steps direction="vertical" :active="1">
    <el-step icon="icon1" v-if="false">
      <template slot="title">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="本田技研工业株式会社" name="1">
            <div></div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-step>
    <el-step icon="icon2">
      <template slot="title">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="transferInfoResult.shipName" name="2">
            <div></div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-step>
    <el-step icon="icon2">
      <template slot="title">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="上海港" name="3">
            <div></div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-step>
    <el-step icon="icon1">
      <template slot="title">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="transferInfoResult.compName" name="4">
            <div></div>
          </el-collapse-item>
        </el-collapse>
      </template>
    </el-step>
  </el-steps>
</div>
</template>

<script>
export default {
  props: {
    transferInfoResult: {
      type: Object,
      defaulte: {}
    }
  },
  data () {
    return {
      activeNames: ['2']
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang='stylus' scoped>
.el-steps-wrapper
  width 100%
  >>>.el-step__head
    width 31px
  >>>.el-step.is-vertical .el-step__line
    left 15px
    &:before
      content: ''
      position absolute
      top 60%
  >>>.el-collapse, >>>.el-collapse-item__wrap
    border 0
  >>>.el-collapse-item__header
    border 0
    height 30px
    line-height 30px
    color #353535 !important
    font-size 14px
    font-weight 800
    .is-active
      color #353535 !important
  >>>.el-collapse-item__arrow
    line-height 30px
  >>>.icon1
    width 18px
    height 16px
    margin 0 auto
    background url('./img/cangku.png')no-repeat center / 100%
  >>>.icon2
    width 18px
    height 16px
    margin 0 auto
    background url('./img/gangkou.png')no-repeat center / 100%
  >>>.el-step.is-vertical
    .el-step__icon
      width 31px
      height 30px
      border-radius 50%
      border 1px solid #96A2B7
    .el-step__main
      min-height 90px
    .is-finish
      border-color #406CAD
      .el-step__icon
        border 1px solid #406CAD
      .icon1
        background url('./img/cangku_active.png')no-repeat center / 100%
      .icon2
        background url('./img/gangkou_active.png')no-repeat center / 100%
  >>>.el-step.is-vertical
    &:nth-child(2), &:nth-child(3)
      .el-step__line
        &:before
          width 16px
          height 14px
          left -8px
          background #ffffff url('./img/tuoche.png')no-repeat center / 100%
      .is-finish
        .el-step__line
          &:before
            background #ffffff url('./img/tuoche_active.png')no-repeat center / 100%
    &:nth-child(1)
      .el-step__line
        &:before
          width 24px
          height 18px
          left -12px
          background #ffffff url('./img/chuan.png')no-repeat center / 100%
      .is-finish
        .el-step__line
          &:before
            background #ffffff url('./img/chuan_active.png')no-repeat center / 100%
    &:last-child
      .el-step__main
        min-height 30px
</style>
