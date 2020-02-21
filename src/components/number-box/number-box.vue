<template>
  <div class="number-box">
    <!-- 此处为“减号”标志的图片 -->
    <template v-if="numVal <= 0">
      <div class="number-init" @click="handleShow">{{unit.substr(0)}}</div>
    </template>
    <template v-else>
      <div class="number-input">
        <div class="minus" @click="handleMinus">-</div>
        <div class="number-container">
          <input v-model="numVal" v-focus="autofocus" v-limit class="input" @change="handleChange" @blur="handleCheck">
          <div class="unit" @click="handleFocus">{{unit}}</div>
        </div>
        <div class="add" @click="handleAdd">+</div>
      </div>
    </template>
  </div>
</template>

<script>
import limit from '@/directives/limit'
export default {
  props: {
    curVal: [Number, String],
    unit: String,
    edit: Boolean
  },
  data () {
    return {
      numVal: 0,
      autofocus: false
    }
  },
  watch: {
    curVal: {
      handler (nv) {
        this.numVal = nv
      },
      immediate: true
    }
  },
  mounted () {
    // console.log('curVal', this.curVal)
    this.numVal = this.curVal
  },
  methods: {
    handleCheck () {
      this.$emit('blur')
    },
    handleShow () {
      if (!this.edit) return
      this.numVal = 1
      this.handleChange()
    },
    handleFocus () {
      // console.log(1111)
      this.autofocus = !this.autofocus
    },
    handleMinus () {
      this.numVal = this.numVal - 1
      this.$emit('onChange', this.numVal)
    },
    handleAdd () {
      this.numVal = this.numVal + 1
      this.$emit('onChange', this.numVal)
    },
    handleChange () {
      // console.log(this.numVal)
      this.$emit('onChange', this.numVal)
    }
  },
  directives: {
    limit: limit,
    focus: {
      update: function (el) {
        el.focus()
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.number-box
  width 90%
  display flex
  justify-content space-between
  align-items center
  overflow hidden
  &:nth-child(n+2)
    margin-left 2%
  .number-init
    width 100%
    height 28px
    border 1px solid #E5E5E5
    border-radius 5px
    font-size 12px
    color #D3D3D3
    text-align center
    line-height 28px
  .number-input
    display flex
    justify-content space-between
    align-items center
    border 1px solid #FBB03B
    border-radius 5px
    font-size 12px
    width 100%
  .minus, .add
    min-width 16px
    width 20%
    height 28px
    font-size 16px
    color #FBB03B
    text-align center
    line-height 26px
    cursor pointer
  .number-container
    flex 1px
    border-left 1px solid #FBB03B
    border-right 1px solid #FBB03B
    display flex
    padding 0 4%
    box-sizing border-box
    width 60%
    .input
      width 56%
      border 0
      font-size 12px
      color #353535
      line-height 28px
      height 28px
      text-align center
      background: transparent;
      &:focus
       border 0
       outline 0
    .unit
      width 60px
      height 28px
      font-size 12px
      color #353535
      color #666
      line-height 28px
</style>
