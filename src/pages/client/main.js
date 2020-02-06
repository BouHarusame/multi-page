import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
import 'nprogress/nprogress.css'
import 'animate.css'
import '@/styles/index.styl'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false
Vue.prototype.$loading = ElementUI.Loading.service
Vue.prototype.$confirm = ElementUI.MessageBox.confirm
Vue.prototype.$prompt = ElementUI.MessageBox.prompt
Vue.prototype.$message = ElementUI.Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
