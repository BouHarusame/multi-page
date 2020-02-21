const state = {
  toggleAside: false,
  passRoute: false,
  menuName: '',
  navMenus: [],
  activeMenuIndex: '',
  draftCount: null
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
  },
  SET_ACTIVE_MENU_INDEX (state, activeMenuIndex) {
    state.activeMenuIndex = activeMenuIndex
  },
  SET_PASS_ROUTE (state, passRoute) {
    state.passRoute = passRoute
  },
  SET_DRAFT_COUNT (state, draftCount) {
    state.draftCount = draftCount
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
