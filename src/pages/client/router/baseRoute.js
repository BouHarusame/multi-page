import { homePC } from './homePC'
let basePath = process.env.NODE_ENV === 'development' ? '/client' : ''
console.log(basePath)
export const baseRoute = [
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['clientViews/login/login'], resolve)
    }
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => {
      require(['clientViews/home-pages/register/register'], resolve)
    },
    meta: {
      parentName: 'home'
    }
  },
  {
    path: '*',
    name: 'The404Error',
    component: resolve => {
      require(['clientViews/404Error/404Error'], resolve)
    }
  },
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
