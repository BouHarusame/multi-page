<template>
  <div class="connect-us-content content">
    <div class="connect-us-box add-animation">
      <h4>联系我们</h4>
      <div class="connect-content">
        <h5>总部</h5>
        <div class="line">
          <p>上海市杨浦区隆昌路588号2号楼10层/16层/21层</p>
          <p>F.10/F.16/F.21, Bldg.2, No.588 Long Chang Rd., Shanghai, China</p>
        </div>
        <div class="line">
          <p><span>Tel  ：400-1567-881</span><span>Web：www.anycase.cn</span></p>
          <p>Mail：market@xiangxuntrack.com</p>
        </div>
        <h5 class="section">分部</h5>
        <div class="line">
          <p>上海市宝山区双城路宝莲城9号楼2004-1室</p>
          <p>Room 2004-1, Bldg.9, Baoliancheng, Shuangcheng Rd., Baoshan District, Shanghai</p>
        </div>
        <div class="line">
          <p>江苏省苏州市常熟市虞山镇海虞北路 72-4 号</p>
          <p>No.72-4, North Haiyu Rd., Yushan Dist. Changshu, Suzhou</p>
        </div>
        <div class="btn"  @click="openDialog(59534)">联系在线客服</div>
      </div>
    </div>
  </div>
</template>

<script>
import sha1 from 'js-sha1'
export default {
  components: {},
  props: {},
  data () {
    return {
    }
  },
  methods: {
    openDialog (id) {
      let height = 600
      let width = 500
      let iTop = window.screen.availHeight - height - 40
      let iLeft = window.screen.availWidth - width - 20
      let nonce = Date.now() + ''
      let timestamp = Date.now() + ''
      let signature = sha1('nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.mobile + '&3d030c2ac013877aebaeaf6637e5b83a')
      signature = signature.toUpperCase()
      window.open('https://xiangxuntrack.udesk.cn/im_client/?web_plugin_id=' + id + '&nonce=' + nonce + '&timestamp=' + timestamp + '&web_token=' + this.mobile + '&signature=' + signature, 'CNN_WindowName', 'location=no,status=no,scrollvars=no,width=' + width + ',height=' + height + ',left=' + iLeft + ',top=' + iTop)
    }
  },
  mounted () {}
}
</script>
<style lang="stylus" scoped>
.connect-us-content
  width 100%
  overflow hidden
  .connect-us-box
    margin 200px auto 350px
    width 1000px
    opacity 0
    h4
      font-size 32px
      color #000000
      position relative
      height 60px
      line-height 40px
      &:after
        content: ''
        position absolute
        bottom 0
        left 0
        width 100%
        height 0
        border-bottom 2px solid #FED900
    .connect-content
      margin 40px 0
      h5
        font-size 18px
        color #000000
      .section
        margin-top 80px
      .line
        font-size 14px
        color #000000
        line-height 20px
        margin-top 40px
        span
          margin-right 80px
      .btn
        width:208px
        height:49px
        background:rgba(254,217,0,1)
        box-shadow:0px 12px 9px 0px rgba(33,26,4,0.4)
        border-radius:6px
        font-size 16px
        color #000000
        font-weight bold
        text-align center
        line-height 49px
        margin: 40px 0 0 794px
        cursor pointer
</style>
