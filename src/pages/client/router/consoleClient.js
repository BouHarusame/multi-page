export const consoleClient = [
  {
    path: '/',
    component: resolve => {
      require(['clientViews/index/index'], resolve)
    },
    children: [
      { // 修改密码
        path: '/cpwd',
        name: 'cpwd',
        component: resolve => {
          require(['clientViews/changePassword/changePassword'], resolve)
        }
      },
      { // 代办事宜
        path: '/toDoList',
        name: 'toDoList',
        component: resolve => {
          require(['clientViews/to-do-list/to-do-list'], resolve)
        },
        meta: { icon: 'toDoList' }
      },
      { // 出口订单
        path: '/order',
        name: 'order',
        component: resolve => {
          require(['clientViews/order/export/order-list/order-list'], resolve)
        },
        meta: { icon: 'order' }
      },
      { // 出口订单详情
        path: '/exportOrderDetail/:jobNo',
        name: 'exportOrderDetail',
        component: resolve => {
          require(['clientViews/order/export/order-detail/order-detail'], resolve)
        },
        meta: { icon: 'order' }
      },
      { // 进口订单
        path: '/importOrder',
        name: 'importOrder',
        component: resolve => {
          require(['clientViews/order/import/order-list/order-list'], resolve)
        },
        meta: { icon: 'order' }
      },
      { // 进口订单详情
        path: '/importOrderDetail/:quoteNo',
        name: 'importOrderDetail',
        component: resolve => {
          require(['clientViews/order/import/order-detail/order-detail'], resolve)
        },
        meta: { icon: 'importOrder' }
      },
      { // 拖车（同行）详情页
        path: '/truckOrderDetail/:jobNo',
        name: 'truckOrderDetail',
        component: resolve => {
          require(['clientViews/order/truck/truck-order-detail.vue'], resolve)
        },
        meta: { icon: 'truckOrderDetail' }
      },
      // 拖车（同行）列表頁
      {
        path: '/trailerOrder',
        name: 'trailerOrder',
        component: resolve => {
          require(['clientViews/order/truck/truck-order.vue'], resolve)
        },
        meta: { icon: 'truckOrderTrailer' }
      },
      { // 拖车询价
        path: '/trailer',
        name: 'trailer',
        component: resolve => {
          require(['clientViews/enquiry/truck/trailer-inquiry'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 拖车同行询价
        path: '/trailerColleague',
        name: 'trailerColleague',
        component: resolve => {
          require(['clientViews/enquiry/truck/trailer-colleague'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 拖车同行询价确认
        path: '/trailerConfirm',
        name: 'trailerConfirm',
        component: resolve => {
          require(['clientViews/enquiry/truck/trailer-inquiry-confirm'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 拖车同行带询价
        path: '/trailerDraft',
        name: 'trailerDraft',
        component: resolve => {
          require(['clientViews/enquiry/truck/trailer-draft'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 海運整箱
        path: '/oceanflc',
        name: 'oceanflc',
        component: resolve => {
          require(['clientViews/enquiry/ocean/fcl-inquiry'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 海運拼箱
        path: '/oceanlcl',
        name: 'oceanlcl',
        component: resolve => {
          require(['clientViews/enquiry/ocean/lcl-inquiry'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 空運询价
        path: '/air',
        name: 'air',
        component: resolve => {
          require(['clientViews/enquiry/air/air-inquiry'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 进口清关
        path: '/import',
        name: 'import',
        component: resolve => {
          require(['clientViews/enquiry/import/import-inquiry.vue'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 进口询价列表
        path: '/importInquiryList',
        name: 'importInquiryList',
        component: resolve => {
          require(['clientViews/enquiry/import/import-inquiry-list.vue'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 进口询价详情
        path: '/importQuote/:quoteNo',
        name: 'importQuote',
        component: resolve => {
          require(['clientViews/enquiry/import/import-quote.vue'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 成本测算
        path: '/costCalculation/:quoteNo',
        name: 'costCalculation',
        component: resolve => {
          require(['clientViews/enquiry/import/cost-calculation.vue'], resolve)
        },
        meta: { icon: 'enquiry' }
      },
      { // 费用
        path: '/customerExpense',
        name: 'customerExpense',
        component: resolve => {
          require(['clientViews/expense/customer-expense'], resolve)
        },
        children: [
          {
            path: '/customerExpense/:jobNo',
            name: 'customerExpense1',
            component: resolve => {
              require(['clientViews/expense/customer-expense'], resolve)
            }
          }
        ],
        meta: { icon: 'customerExpense' }
      },
      { // 对账单
        path: '/customerStatement',
        name: 'customerStatement',
        component: resolve => {
          require(['clientViews/statement/customer-statement'], resolve)
        },
        children: [
          {
            path: '/customerStatement/:jobNo',
            name: 'customerStatement1',
            component: resolve => {
              require(['clientViews/statement/customer-statement'], resolve)
            }
          }
        ],
        meta: { icon: 'customerStatement' }
      },
      { // 员工管理
        path: '/member',
        name: 'member',
        component: resolve => {
          require(['clientViews/setting/member'], resolve)
        },
        meta: { icon: 'member' }
      },
      { // 拖车地址维护
        path: '/zxmdAddress',
        name: 'zxmdAddress',
        component: resolve => {
          require(['clientViews/setting/zxmd-address'], resolve)
        },
        meta: { icon: 'zxmd' }
      },
      { // 专家支持
        path: '/proSupport',
        name: 'proSupport',
        component: resolve => {
          require(['clientViews/support/support'], resolve)
        },
        meta: { icon: 'proSupport' }
      }
    ]
  }
]
