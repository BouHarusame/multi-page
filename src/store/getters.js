const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userRoles: state => state.user.userRoles,
  toggleAside: state => state.menu.toggleAside,
  menuName: state => state.menu.menuName,
  navMenus: state => state.menu.navMenus
}
export default getters
