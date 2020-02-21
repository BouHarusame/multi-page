let basePath = process.env.NODE_ENV === 'development' ? '/client' : ''
export const homePC = [
  // 电脑端门户首页路由
  {
    path: '/',
    name: 'home',
    // alias: '/client',
    component: resolve => {
      require(['clientViews/home-pages/home-page/home-page'], resolve)
    }
  },
  {
    path: basePath + '/business',
    name: 'business',
    component: resolve => {
      require(['clientViews/home-pages/business-page/business-page'], resolve)
    },
    meta: {
      parentName: 'home'
    }
  },
  {
    path: basePath + '/increment',
    name: 'increment',
    component: resolve => {
      require(['clientViews/home-pages/increment-page/increment-page'], resolve)
    },
    meta: {
      parentName: 'home'
    }
  },
  {
    path: basePath + '/serve',
    name: 'serve',
    component: resolve => {
      require(['clientViews/home-pages/serve-page/serve-page'], resolve)
    },
    meta: {
      parentName: 'home'
    }
  },
  {
    path: basePath + '/company',
    name: 'company',
    component: resolve => {
      require(['clientViews/home-pages/company-page/company-page'], resolve)
    },
    meta: {
      parentName: 'home'
    }
  }
]
