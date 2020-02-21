<!--  -->
<template>
  <div class='query-table'>
    <el-table :header-cell-style="{ background: '#3D5476'}" :data="truckOrderList" style="width: 100%">
      <el-table-column min-width="200px" label="起运地/目的地">
        <template slot-scope="scope">
          <div class="row-first">
            <div class="icon">
              <!-- <svg class="icon-img" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1" width="36px" height="22px">
              <g transform="matrix(1 0 0 1 -220 -568 )">
                <path d="M 11.2083333333333 19.40625  C 11.7361111111111 19.0104166666667  12 18.5416666666667  12 18  C 12 17.4583333333333  11.7361111111111 16.9895833333333  11.2083333333333 16.59375  C 10.6805555555556 16.1979166666667  10.0555555555556 16  9.33333333333333 16  C 8.61111111111111 16  7.98611111111111 16.1979166666667  7.45833333333333 16.59375  C 6.93055555555555 16.9895833333333  6.66666666666667 17.4583333333333  6.66666666666667 18  C 6.66666666666667 18.5416666666667  6.93055555555555 19.0104166666667  7.45833333333333 19.40625  C 7.98611111111111 19.8020833333333  8.61111111111111 20  9.33333333333333 20  C 10.0555555555556 20  10.6805555555556 19.8020833333333  11.2083333333333 19.40625  Z M 4 9.53125  L 4 10  L 12 10  L 12 6  L 8.70833333333333 6  C 8.52777777777778 6  8.375 6.046875  8.25 6.140625  L 4.1875 9.1875  C 4.0625 9.28125  4 9.39583333333333  4 9.53125  Z M 29.875 19.40625  C 30.4027777777778 19.0104166666667  30.6666666666667 18.5416666666667  30.6666666666667 18  C 30.6666666666667 17.4583333333333  30.4027777777778 16.9895833333333  29.875 16.59375  C 29.3472222222222 16.1979166666667  28.7222222222222 16  28 16  C 27.2777777777778 16  26.6527777777778 16.1979166666667  26.125 16.59375  C 25.5972222222222 16.9895833333333  25.3333333333333 17.4583333333333  25.3333333333333 18  C 25.3333333333333 18.5416666666667  25.5972222222222 19.0104166666667  26.125 19.40625  C 26.6527777777778 19.8020833333333  27.2777777777778 20  28 20  C 28.7222222222222 20  29.3472222222222 19.8020833333333  29.875 19.40625  Z M 35.6041666666667 0.296875000000001  C 35.8680555555556 0.494791666666664  36 0.729166666666665  36 0.999999999999999  L 36 17  C 36 17.15625  35.9722222222222 17.2942708333333  35.9166666666667 17.4140625  C 35.8611111111111 17.5338541666667  35.7673611111111 17.6302083333333  35.6354166666667 17.703125  C 35.5034722222222 17.7760416666667  35.3888888888889 17.8359375  35.2916666666667 17.8828125  C 35.1944444444445 17.9296875  35.03125 17.9609375  34.8020833333333 17.9765625  C 34.5729166666667 17.9921875  34.4166666666667 18.0026041666667  34.3333333333333 18.0078125  C 34.25 18.0130208333333  34.0729166666667 18.0130208333333  33.8020833333333 18.0078125  C 33.53125 18.0026041666667  33.375 18  33.3333333333333 18  C 33.3333333333333 19.1041666666667  32.8125 20.046875  31.7708333333333 20.828125  C 30.7291666666667 21.609375  29.4722222222222 22  28 22  C 26.5277777777778 22  25.2708333333333 21.609375  24.2291666666667 20.828125  C 23.1875 20.046875  22.6666666666667 19.1041666666667  22.6666666666667 18  L 14.6666666666667 18  C 14.6666666666667 19.1041666666667  14.1458333333333 20.046875  13.1041666666667 20.828125  C 12.0625 21.609375  10.8055555555556 22  9.33333333333333 22  C 7.86111111111111 22  6.60416666666667 21.609375  5.5625 20.828125  C 4.52083333333333 20.046875  4 19.1041666666667  4 18  L 2.66666666666667 18  C 2.625 18  2.46875 18.0026041666667  2.19791666666667 18.0078125  C 1.92708333333333 18.0130208333333  1.75 18.0130208333333  1.66666666666667 18.0078125  C 1.58333333333333 18.0026041666667  1.42708333333333 17.9921875  1.19791666666667 17.9765625  C 0.96875 17.9609375  0.805555555555556 17.9296875  0.708333333333333 17.8828125  C 0.611111111111111 17.8359375  0.496527777777778 17.7760416666667  0.364583333333333 17.703125  C 0.232638888888889 17.6302083333333  0.138888888888889 17.5338541666667  0.0833333333333333 17.4140625  C 0.027777777777778 17.2942708333333  0 17.15625  0 17  C 0 16.7291666666667  0.131944444444445 16.4947916666667  0.395833333333333 16.296875  C 0.659722222222223 16.0989583333333  0.972222222222223 16  1.33333333333333 16  L 1.33333333333333 11  C 1.33333333333333 10.9166666666667  1.32986111111111 10.734375  1.32291666666667 10.453125  C 1.31597222222222 10.171875  1.31597222222222 9.97395833333333  1.32291666666667 9.859375  C 1.32986111111111 9.74479166666666  1.34722222222222 9.56510416666666  1.375 9.3203125  C 1.40277777777778 9.07552083333333  1.44791666666667 8.8828125  1.51041666666667 8.7421875  C 1.57291666666667 8.6015625  1.67013888888889 8.44270833333333  1.80208333333333 8.265625  C 1.93402777777778 8.08854166666667  2.09027777777778 7.93229166666667  2.27083333333333 7.796875  L 6.39583333333333 4.703125  C 6.65972222222222 4.50520833333333  7.01041666666667 4.33854166666667  7.44791666666667 4.203125  C 7.88541666666667 4.06770833333333  8.29166666666667 4  8.66666666666667 4  L 12 4  L 12 0.999999999999999  C 12 0.729166666666665  12.1319444444444 0.494791666666664  12.3958333333333 0.296875000000001  C 12.6597222222222 0.0989583333333313  12.9722222222222 0  13.3333333333333 0  L 34.6666666666667 0  C 35.0277777777778 0  35.3402777777778 0.0989583333333313  35.6041666666667 0.296875000000001  Z " fill-rule="nonzero" fill="#000000" stroke="none" transform="matrix(1 0 0 1 220 568 )"/>
              </g>
            </svg> -->
              <img src="./img/12@2x.png" alt="" class="icon-img">
            </div>
            <div class="addr">
              <div class="addr-up">{{scope.row.city ? scope.row.city : ''}}{{scope.row.region ? ' - ' + scope.row.region : ''}}{{scope.row.town ? ' - ' + scope.row.town : ''}}</div>
              <div class="addr-down">{{scope.row.startPort ? scope.row.startPort : ''}}{{scope.row.dockName ? ' - ' + scope.row.dockName : ''}}</div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="运费">
        <template slot-scope="scope">
          <div class="line">
            <div class="disable">
              <span v-if="scope.row.fee20">【拖车费(20'GP)】<span class="red">￥{{scope.row.fee20}}</span>&nbsp;<small v-if="scope.row.cont20gp">(￥{{scope.row.fee20}}× {{scope.row.cont20gp}}箱)</small> <small v-else>（ 0 ）</small></span>
            </div>
            <div class="disable">
              <span v-if="scope.row.fee40">【拖车费(40'GP)】<span class="red">￥{{scope.row.fee40}}</span>&nbsp;<small v-if="scope.row.cont40gp">(￥{{scope.row.fee40}}× {{scope.row.cont40gp}}箱)</small> <small v-else>（ 0 ）</small></span>
            </div>
            <div class="disable">
              <span v-if="scope.row.fee40">【拖车费(40'HQ)】<span class="red">￥{{scope.row.fee40}}</span>&nbsp;<small v-if="scope.row.cont40hq">(￥{{scope.row.fee40}}× {{scope.row.cont40hq}}箱)</small> <small v-else>（ 0 ）</small></span>
            </div>
          </div>
          <!-- <div class="line">
          <span>协议价</span><div class="disable">{{scope.row.price1}}</div>
        </div>
        <div class="line">
          <span>现金价</span><div class="disable">{{scope.row.price2}}</div>
        </div>
        <div class="line">
          <span>箱讯白条</span><div class="disable">{{scope.row.price3}}</div>
        </div> -->
        </template>
      </el-table-column>
      <el-table-column v-if="showCustFee" min-width="200px" label="报关费">
        <template slot-scope="scope">
          <div class="line">
            <div class="disable center" style="width:200px">报关费: <span class="red">￥{{scope.row.feeCust}}</span></div>
          </div>
          <div class="line">
            <div class="disable center" style="width:200px">联单费: <span class="red">￥{{scope.row.feeDoc}}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px" label="总费用" align="center">
        <template slot-scope="scope">
          <div class="text">拖车总金额: <span class="red">￥{{scope.row.subtotal}}</span></div>
          <div class="text" v-if="showCustFee">报关预估金额: <span class="red">￥{{scope.row.feeCust + scope.row.feeDoc}}</span></div>
          <el-button @click="handleClickOrder(scope.row)">立即下单</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    truckOrderList: Array,
    showCustFee: Boolean
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleClickOrder (row) {
      this.$emit('onOrder', row)
    }
  },
  created () {

  },
  mounted () {
  }
}
</script>
<style lang='stylus' scoped>
// @import url(); 引入公共css类
.query-table {
  width: 100%;

  .row-first {
    display: flex;
    align-items: center;
    padding: 20px 0;

    .icon {
      width: 30px;
      height: 100px;
      position: relative;
      margin: 0 30px;

      .icon-img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0px;
      }
    }

    .addr {
      .addr-up {
        margin-bottom: 65px;
      }
    }
  }

  .line {
    align-items: center;
    margin: 10px 0;

    span {
      width: 52px;
      margin-right: 5px;
    }
  }

  .red {
    color: #f56c6c;
  }

  .disable {
    width: 320px;
    margin-bottom: 5px;
    padding: 0px 30px;
    text-align: left;
    border: 1px solid rgba(251, 176, 59, 0.5);
    color: #626262;
    border-radius: 6px;
  }

  .text {
    margin: 20px 0;
  }
}

>>>.el-table th>.cell {
  color: #fff;
}

.center {
  text-align: center !important;
}
</style>
