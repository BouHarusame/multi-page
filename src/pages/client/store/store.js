import Vue from 'vue'
import Vuex from 'vuex'
import getters from '@/store/getters'
import user from '@/store/modules/user'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu
  },
  getters
})
