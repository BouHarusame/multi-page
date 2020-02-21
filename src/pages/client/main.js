import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store/store'
import mapboxgl from 'mapbox-gl'
import 'normalize.css/normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import 'swiper/dist/css/swiper.css'
import '@/styles/index.styl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'area-linkage-vue/dist/index.css'
import { pcaa } from 'area-data-vue'
import AreaLinkageVue from 'area-linkage-vue'

Vue.use(AreaLinkageVue)
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$pcaa = pcaa
// 设置mapbox 语言为中文
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
