const state = {
  toggleAside: false,
  menuName: '',
  navMenus: []
}
const mutations = {
  SET_TOGGLE_ASIDE (state, toggleAside) {
    state.toggleAside = toggleAside
  },
  SET_MENU_NAME (state, menuName) {
    state.menuName = menuName
  },
  SET_NAV_MENUS (state, navMenus) {
    state.navMenus = navMenus
  }
}
const actions = {
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
