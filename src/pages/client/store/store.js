import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import user from '@/store/modules/user'
import menu from '@/store/modules/menu'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    user,
    menu
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
