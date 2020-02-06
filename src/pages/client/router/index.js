import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
// import { $http } from 'utils/http'
import { getLocalStorage } from 'utils/utils'

import store from '../store/store'
// import * as types from '../store/mutation-types'
import { baseRoute } from './baseRoute'
// import { consoleAC } from './consoleAC'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [...baseRoute],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  const routeName = to.name.toLowerCase()
  const routeHomeName = to.meta.parentName ? to.meta.parentName.toLowerCase() : ''
  let isMobile = window.sessionStorage.getItem('isMobile')
  if (routeName === 'login' || routeName === 'home' || routeHomeName === 'home') {
    if (/ipad/i.test(navigator.userAgent)) {
      // ipad 登录，跳转到PC主页
      isMobile = false
      window.sessionStorage.removeItem('dpr')
      window.sessionStorage.removeItem('isMobile')
    } else if (/mobile/i.test(navigator.userAgent)) {
      // 手机端登录，获取dpr，跳转到手机主页
      window.sessionStorage.removeItem('dpr')
      if (window.devicePixelRatio) {
        window.sessionStorage.setItem('dpr', window.devicePixelRatio)
        window.sessionStorage.setItem('isMobile', 'Y')
      }
      router.push({ path: '/mobileHome' })
    }
    next()
    return
  }
  // // 测试使用，在mobilehome切换设备刷新页面 重新获取dpr
  // if (routeName === 'mobilehome') {
  //   window.sessionStorage.removeItem('dpr')
  //   if (window.devicePixelRatio) {
  //     window.sessionStorage.setItem('dpr', window.devicePixelRatio)
  //   }
  // }
  // 手机端不去获取token，直接跳转
  if (isMobile === 'Y') {
    next()
    return
  }
  const token = getLocalStorage('dr_token')
  const roles = getLocalStorage('dr_roles')
  if (!token || !roles) {
    router.push({ path: '/login' })
  }
  // $http('get', '/shiro/token/validate?token=' + token).then(res => {
  //   if (res.msg === 'success') {
  //     next()
  //   } else {
  //     window.localStorage.removeItem('dr_token')
  //     window.localStorage.removeItem('dr_roles')
  //     window.sessionStorage.clear()
  //     router.push({ path: '/login' })
  //   }
  // }).catch(() => {
  //   window.localStorage.removeItem('dr_token')
  //   window.localStorage.removeItem('dr_roles')
  //   window.sessionStorage.clear()
  //   router.push({ path: '/login' })
  // })
  next(...to)
})
// 路由匹配的回调函数
router.afterEach(to => {
  // 设置当前激活的菜单项
  NProgress.done()
  if (!to.name) {
    return
  }
  const routeName = to.name.toLowerCase()
  if (routeName !== 'login' && routeName !== 'The404Error') {
    store.dispatch('fetchNewMsgCount')
    store.dispatch('fetchUnreadInquiryCount')
  }
  if (routeName === 'about-us' || routeName === 'solution' || routeName === 'platform' || routeName === 'industry' || routeName === 'serve') {
    window.scrollTo(0, 0)
  }
  // store.commit(types.SET_ACTIVE_MENU_INDEX, routeName)
})
export default router
