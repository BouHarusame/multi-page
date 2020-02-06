import { homePC } from './homePC'

export const baseRoute = [
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['clientViews/login/login'], resolve)
    }
  },
  // {
  //   path: '/register',
  //   name: 'register',
  //   component: resolve => {
  //     require(['portal-pages/register/register'], resolve)
  //   },
  //   meta: {
  //     parentName: 'home'
  //   }
  // },
  // {
  //   path: '*',
  //   name: 'The404Error',
  //   component: resolve => {
  //     require(['views/The404Page/The404Page'], resolve)
  //   }
  // },
  // // 询价费用说明页面
  // {
  //   path: '/wgInstruction',
  //   name: 'wgInstruction',
  //   component: resolve => {
  //     require(['components/instruction/wgInstruction'], resolve)
  //   }
  // },
  // {
  //   path: '/ysInstruction',
  //   name: 'ysInstruction',
  //   component: resolve => {
  //     require(['components/instruction/ysInstruction'], resolve)
  //   }
  // },
  // {
  //   path: '/bgInstruction',
  //   name: 'bgInstruction',
  //   component: resolve => {
  //     require(['components/instruction/bgInstruction'], resolve)
  //   }
  // },
  ...homePC
]
