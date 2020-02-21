import { getQuotePortQuery, getSuperviseMethod } from 'api/import'
export const TYPE_OF_METHODS = {
  Air: '空运',
  Ocean: '海运',
  Truck: '陆运',
  Rail: '铁路'
}
export const TYPE_OF_SHIPMENT = {
  LCL: '海运拼箱',
  FCL: '海运整箱',
  TRAILER: '拖车',
  AIR: '空运'
}

export const MODES_OF_TRANSPORT = [{
  label: '进口拼箱',
  value: 'lcl'
}, {
  label: '进口整箱',
  value: 'fcl'
}, {
  label: '进口空运',
  value: 'air'
}]
export const MODES_OF_TRANSPORTAREA = [{
  label: '洋山港',
  value: 'YS'
}, {
  label: '外高桥港',
  value: 'WG'
}, {
  label: '浦东机场',
  value: 'PDJC'
}, {
  label: '虹桥机场',
  value: 'HQJC'
}, {
  label: '吴淞港',
  value: 'WS'
}]
export const CUSTOMS_WAY = [
  {
    label: '一般贸易',
    value: '一般贸易'
  }, {
    label: '暂时进出口',
    value: '暂时进出口'
  }, {
    label: '退运',
    value: '退运'
  },
  {
    label: '其他',
    value: '其他'
  }
]
export const TRADING_TERMS = [{
  label: 'CIF',
  value: 'CIF'
}, {
  label: 'EXW',
  value: 'EXW'
}, {
  label: 'FOB',
  value: 'FOB'
}, {
  label: 'CNF',
  value: 'CNF'
}]
export const MODES_OF_STATUS = [
  {
    label: '已报价',
    value: 'quoted'
  },
  {
    label: '待询价',
    value: 'draft'
  },
  {
    label: '已下单',
    value: 'ordered'
  }
]
export const IMPORT_INQUIRY_SEARCH_SHORT = [{
  type: 'input',
  text: '询价编号',
  prop: 'quoteNo'
}, {
  type: 'select',
  text: '目的港',
  filterable: true,
  optionsName: 'targetPort',
  request: getQuotePortQuery,
  remote: true,
  formatValue (cc) {
    return cc.targetPort
  },
  formatLabel (cc) {
    return cc.targetPort
  },
  prop: 'targetPort'
}]
export const originData = [
  {
    label: 'shipBookTag',
    value: '是否订舱',
    key: ''
  },
  {
    label: 'shipInfo',
    value: '船名航次',
    key: ''
  },
  {
    label: 'originCountry',
    value: '原产国',
    key: ''
  },
  {
    label: 'targetPort',
    value: '目的港及港区',
    key: ''
  },
  {
    label: 'transferWay',
    value: '运输方式',
    key: ''
  },
  {
    label: 'cont',
    cont1: 'cont20gp',
    cont2: 'cont40gp',
    cont3: 'cont40hq',
    value: '箱型箱量',
    key: ''
  },
  {
    label: 'count',
    value: '产品数量',
    key: ''
  },
  {
    label: 'units',
    value: '件数及包装类型',
    key: ''
  },
  {
    label: 'grossWeight',
    value: '毛重',
    key: ''
  },
  {
    label: 'volume',
    value: '体积',
    key: ''
  },
  {
    label: 'currency',
    value: '货值币种',
    key: ''
  },
  {
    label: 'addr',
    province: 'province',
    city: 'city',
    region: 'region',
    town: 'town',
    address: 'address',
    value: '送货地址',
    key: ''
  },
  {
    label: 'tradeTerms',
    value: '成交条款',
    key: ''
  },
  {
    label: 'custDeclareWay',
    value: '监管方式',
    key: ''
  },
  {
    label: 'remark',
    value: '备注',
    key: ''
  },
  {
    label: 'buzDesc',
    value: '业务描述',
    key: ''
  }
]
export const IMPORT_INQUIRY_SEARCH = [
  {
    type: 'input',
    text: '询价编号',
    prop: 'quoteNo'
  },
  {
    type: 'select',
    text: '目的港',
    filterable: true,
    optionsName: 'targetPort',
    request: getQuotePortQuery,
    remote: true,
    formatValue (cc) {
      return cc.targetPort
    },
    formatLabel (cc) {
      return cc.targetPort
    },
    prop: 'targetPort'
  },
  {
    type: 'select',
    text: '状态',
    dataItem: MODES_OF_STATUS,
    prop: 'status',
    className: 'transferWay'
  },
  {
    type: 'select',
    text: '运输方式',
    dataItem: MODES_OF_TRANSPORT,
    prop: 'transferWay',
    className: 'transferWay'
  },
  {
    type: 'select',
    text: '监管方式',
    filterable: true,
    group: true,
    optionsName: 'superviseMethod',
    request: getSuperviseMethod,
    remote: true,
    formatValue (cc) {
      return cc.shortName
    },
    formatLabel (cc) {
      return cc.shortName
    },
    prop: 'superviseMethod'
  },
  {
    type: 'select',
    text: '成交条款',
    dataItem: TRADING_TERMS,
    prop: 'tradeTerms',
    className: 'transferWay'
  }
]
export const IMPORT_INQUIRY_SEARCH_ADMIN = [
  {
    type: 'input',
    text: '询价编号',
    prop: 'quoteNo'
  },
  {
    type: 'select',
    text: '目的港',
    filterable: true,
    optionsName: 'targetPort',
    request: getQuotePortQuery,
    remote: true,
    formatValue (cc) {
      return cc.targetPort
    },
    formatLabel (cc) {
      return cc.targetPort
    },
    prop: 'targetPort'
  },
  {
    type: 'select',
    text: '运输方式',
    dataItem: MODES_OF_TRANSPORT,
    prop: 'transferWay',
    className: 'transferWay'
  },
  {
    type: 'select',
    text: '监管方式',
    filterable: true,
    group: true,
    optionsName: 'superviseMethod',
    request: getSuperviseMethod,
    remote: true,
    formatValue (cc) {
      return cc.shortName
    },
    formatLabel (cc) {
      return cc.shortName
    },
    prop: 'superviseMethod'
  },
  {
    type: 'select',
    text: '成交条款',
    dataItem: TRADING_TERMS,
    prop: 'tradeTerms',
    className: 'transferWay'
  },
  {
    type: 'input',
    text: '公司名称',
    prop: 'compName'
  }
]
export const GOODS_CATEGORY = [
  {
    label: '普货',
    value: '普货'
  }, {
    label: '预包装食品',
    value: '预包装食品'
  }, {
    label: '化妆品',
    value: '化妆品'
  }, {
    label: '危险品',
    value: '危险品'
  },
  {
    label: '其他',
    value: '其他'
  }
]
export const CURRENCY = [
  {
    label: '美元',
    value: '1316',
    symbol: '$'
  },
  {
    label: '欧元',
    value: '1326',
    symbol: '€'
  },
  {
    label: '日元',
    value: '1323',
    symbol: '¤'
  },
  {
    label: '英镑',
    value: '1314',
    symbol: '£'
  },
  {
    label: '港币',
    value: '1315',
    symbol: '¤'
  },
  {
    label: '澳元',
    value: '1325',
    symbol: '¤'
  },
  {
    label: '人民币',
    value: '0001',
    symbol: '￥'
  },
  {
    label: '瑞士法郎',
    value: '1317',
    symbol: '¤'
  },
  // {
  //   label: '德国马克',
  //   value: '1318',
  //   symbol: '¤'
  // },
  // {
  //   label: '法国法郎',
  //   value: '1319',
  //   symbol: '¤'
  // },
  {
    label: '新加坡元',
    value: '1375',
    symbol: '¤'
  },
  {
    label: '瑞典克朗',
    value: '1320',
    symbol: '¤'
  },
  {
    label: '丹麦克朗',
    value: '1321',
    symbol: '¤'
  },
  {
    label: '挪威克朗',
    value: '1322',
    symbol: '¤'
  },
  {
    label: '加拿大元',
    value: '1324',
    symbol: '¤'
  },
  {
    label: '澳门元',
    value: '1327',
    symbol: '¤'
  },
  {
    label: '菲律宾比索',
    value: '1328',
    symbol: '¤'
  },
  {
    label: '泰国铢',
    value: '1329',
    symbol: '¤'
  },
  {
    label: '新西兰元',
    value: '1330',
    symbol: '¤'
  },
  {
    label: '韩元',
    value: '1331',
    symbol: '₩'
  },
  {
    label: '卢布',
    value: '1843',
    symbol: '¤'
  },
  {
    label: '林吉特',
    value: '2890',
    symbol: '¤'
  },
  {
    label: '新台币',
    value: '2895',
    symbol: '¤'
  },
  // {
  //   label: '西班牙比塞塔',
  //   value: '1370',
  //   symbol: '¤'
  // },
  // {
  //   label: '意大利里拉',
  //   value: '1371',
  //   symbol: '¤'
  // },
  // {
  //   label: '荷兰盾',
  //   value: '1372',
  //   symbol: '¤'
  // },
  // {
  //   label: '比利时法郎',
  //   value: '1373',
  //   symbol: '¤'
  // },
  // {
  //   label: '芬兰马克',
  //   value: '1374',
  //   symbol: '¤'
  // },
  {
    label: '印尼卢比',
    value: '3030',
    symbol: '¤'
  },
  {
    label: '巴西里亚尔',
    value: '3253',
    symbol: '¤'
  },
  {
    label: '阿联酋迪拉姆',
    value: '3899',
    symbol: '¤'
  },
  {
    label: '印度卢比',
    value: '3900',
    symbol: '¤'
  },
  {
    label: '南非兰特',
    value: '3901',
    symbol: '¤'
  },
  {
    label: '沙特里亚尔',
    value: '4418',
    symbol: '¤'
  },
  {
    label: '土耳其里拉',
    value: '4560',
    symbol: '¤'
  }
]
export const STATUS_LIST = [{
  value: '已录单',
  label: '已录单'
}, {
  value: '待确认',
  label: '待确认'
}, {
  value: '已确认',
  label: '已确认'
}, {
  value: '已同步',
  label: '已同步'
}, {
  value: '待对账',
  label: '待对账'
}, {
  value: '已对账',
  label: '已对账'
}, {
  value: '未付款',
  label: '未付款'
}, {
  value: '已付款',
  label: '已付款'
}]
export const ROLE_AC_LIST = [
  {
    label: 'AC_GLY',
    value: 'AnyCase 管理员'
  },
  {
    label: 'AC_SW',
    value: '商务'
  },
  {
    label: 'AC_KF',
    value: '客服'
  },
  {
    label: 'AC_DZ',
    value: '单证'
  },
  {
    label: 'AC_CZ',
    value: '操作'
  },
  {
    label: 'AC_CW',
    value: '财务'
  }
]
export const COMPANY_LIST = [
  // {
  //   value: '',
  //   label: '请选择'
  // },
  {
    value: '1',
    label: '11100（acb COMPANY）'
  },
  {
    value: '2',
    label: '111110（b COMPANY）'
  }
]

export const STATEMENT_STATUS = [
  {
    value: '未发送',
    label: '未发送'
  },
  {
    value: '待对账',
    label: '待对账'
  },
  {
    value: '已对账',
    label: '已对账'
  },
  {
    value: '未收款',
    label: '未收款'
  },
  {
    value: '已收款',
    label: '已收款'
  }
]

export const STATEMENT_COMPANY = [
  {
    value: '',
    label: '请选择'
  },
  {
    value: '企业A',
    label: '企业A'
  },
  {
    value: '企业B',
    label: '企业B'
  }
]

export const CUSTOMER_STATEMENT_STATUS = [
  {
    value: '',
    label: '全部'
  },
  {
    value: '待对账',
    label: '待对账'
  },
  {
    value: '已对账',
    label: '已对账'
  },
  {
    value: '未付款',
    label: '未付款'
  },
  {
    value: '已付款',
    label: '已付款'
  }
]

export const DETAIL_INFO_STEPS = [
  { title: '打单完成' },
  { title: '订舱完成' },
  { title: '海关舱单已发送' },
  { title: '箱已进港' },
  { title: '报关已结束' },
  { title: '港区已放关' },
  { title: '箱已装船' },
  { title: '船已启航' },
  { title: '提单已签发' }
]

export const SHARK_EXPENSE_STATUS_LIST = [{
  value: '',
  label: '全部'
}, {
  value: '已录单',
  label: '已录单'
}, {
  value: '待确认',
  label: '待确认'
}, {
  value: '已确认',
  label: '已确认'
}]

export const SHARK_STATEMENT_STATUS_LIST = [{
  value: '',
  label: '全部'
}, {
  value: '未发送',
  label: '未发送'
}, {
  value: '待对账',
  label: '待对账'
}, {
  value: '已对账',
  label: '已对账'
}, {
  value: '未收款',
  label: '未收款'
}, {
  value: '已收款',
  label: '已收款'
}]

export const CUSTOMER_EXPENSE_STATUS_LIST = [{
  value: '',
  label: '全部'
}, {
  value: '待确认',
  label: '待确认'
}, {
  value: '已确认',
  label: '已确认'
}]

export const FENCE_FENCE_PLACE = {
  'pack': '装箱点',
  'port': '港口'
}

export const SUPPLIER_TYPE = {
  'TRUCKING': '车队',
  'FREIGHT': '货代'
}

export const TYPE_OF_ADDRESS = ['收货地址', '发货地址', '装/拆箱门点']

export const ENQUIRY_SHIPPING_DAYS = ['一', '二', '三', '四', '五', '六', '日']

export const ENQUIRY_SEARCH_COMPANY = ['MAERSK', 'CMA', 'COSCO', 'ANYCASE']

export const ENQUIRY_SHOW_DAYS = {
  '一': '周一',
  '二': '周二',
  '三': '周三',
  '四': '周四',
  '五': '周五',
  '六': '周六',
  '日': '周日',
  '1': '周一',
  '2': '周二',
  '3': '周三',
  '4': '周四',
  '5': '周五',
  '6': '周六',
  '7': '周日'
}

export const ENQUIRY_TRAILER_START_PORT = [
  {
    value: 'SHANGHAI',
    label: '上海'
  }
]

export const ENQUIRY_TRAILER_DOCK_SH = [
  {
    value: 'YS',
    label: '洋山'
  },
  {
    value: 'WGQ',
    label: '外高桥'
  },
  {
    value: 'WS',
    label: '吴淞'
  },
  {
    value: 'LJ',
    label: '罗泾'
  }
]

export const ENQUIRY_TRAILER_DOCK_SZ = [
  {
    value: '盐田',
    label: '盐田'
  },
  {
    value: '蛇口',
    label: '蛇口'
  }
]

// 宁波
export const ENQUIRY_TRAILER_DOCK_NB = [
  {
    value: '梅山',
    label: '梅山'
  },
  {
    value: '远东',
    label: '远东'
  },
  {
    value: '四期',
    label: '四期'
  },
  {
    value: '大榭',
    label: '大榭'
  },
  {
    value: '北仑',
    label: '北仑'
  }
]
// 青岛
export const ENQUIRY_TRAILER_DOCK_QD = [
  {
    value: '前湾',
    label: '前湾'
  }
]

export const COUSTOMER_EXPENSE_DETAILCOLUMNS_LIST = [
  {
    label: '收费项目',
    prop: 'name'
  },
  {
    label: '单价',
    prop: 'price',
    class: 'text-right'
  },
  {
    label: '数量',
    prop: 'count',
    class: 'text-right'
  },
  {
    label: '单位',
    prop: 'unit'
  },
  {
    label: '金额',
    prop: 'subtotal',
    class: 'text-right'
  },
  {
    label: '备注',
    prop: 'remarks'
  }
]

export const AC_EXPENSE_DETAILCOLUMNS_LIST = [
  {
    label: '收费项目',
    prop: 'name'
  },
  {
    label: '单价',
    prop: 'price',
    class: 'text-right'
  },
  {
    label: '数量',
    prop: 'count',
    class: 'text-right'
  },
  {
    label: '单位',
    prop: 'unit'
  },
  {
    label: '金额',
    prop: 'subtotal',
    class: 'text-right'
  },
  {
    label: '备注',
    prop: ''
  }
]
export const BUZRANGE_LIST = [{
  label: '昨天业务',
  value: '0'
},
{
  label: '今日业务',
  value: '1'
},
{
  label: '当月业务',
  value: '2'
}]
export const AUDITSTATUS_LIST = [{
  label: '已审核',
  value: 'true'
},
{
  label: '未审核',
  value: 'false'
}]
export const MESSAGE_TEXT = ['刚刚', '分钟前', '小时前', '天前']
export const SELECT_LIST = [{
  label: '是',
  value: 'true'
},
{
  label: '否',
  value: 'false'
}]

// 首页设置
// 服务 - 出口服务
export const SERVE_MY_SLIDES = [
  { image_url: 'https://www.anycase.cn/data/ac2/my_hyzx.png', title: '海运整箱', picName: 'my_hyzx.png', name: 'my_hyzx' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_szys.png', title: '散杂运输', picName: 'my_szys.png', name: 'my_szys' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_hypx.png', title: '海运拼箱', picName: 'my_hypx.png', name: 'my_hypx' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_gjtl.png', title: '国际铁路', picName: 'my_gjtl.png', name: 'my_gjtl' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_kyjck.png', title: '空运进出口', picName: 'my_kyjck.png', name: 'my_kyjck' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_gntl.png', title: '国内铁路', picName: 'my_gntl.png', name: 'my_gntl' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_bgtc.png', title: '报关拖车', picName: 'my_bgtc.png', name: 'my_bgtc' },
  { image_url: 'https://www.anycase.cn/data/ac2/my_ccfw.png', title: '仓储服务', picName: 'my_ccfw.png', name: 'my_ccfw' }
]

export const SERVE_MY_MENU = {
  'my_hyzx': '海运整箱',
  'my_hypx': '海运拼箱',
  'my_kyjck': '空运进出口',
  'my_bgtc': '报关拖车',
  'my_szys': '散杂运输',
  'my_gjtl': '国际铁路',
  'my_gntl': '国内铁路',
  'my_ccfw': '仓储服务'
}

// 服务 - 进口服务
export const SERVE_JIN_SLIDES = [
  { image_url: 'https://www.anycase.cn/data/ac2/jin_jkhyzx.png', title: '进口海运整箱', picName: 'jin_jkhyzx.png', name: 'jin_jkhyzx' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_jkqg.png', title: '进口清关', picName: 'jin_jkqg.png', name: 'jin_jkqg' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_jkhypx.png', title: '进口海运拼箱', picName: 'jin_jkhypx.png', name: 'jin_jkhypx' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_ccgljps.png', title: '仓储管理及配送', picName: 'jin_ccgljps.png', name: 'jin_ccgljps' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_jkky.png', title: '进口空运', picName: 'jin_jkky.png', name: 'jin_jkky' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_more.png', title: '', picName: 'jin_more.png', name: 'jin_more' },
  { image_url: 'https://www.anycase.cn/data/ac2/jin_jkkj.png', title: '进口快件', picName: 'jin_jkkj.png', name: 'jin_jkkj' }
]

export const SERVE_JIN_MENU = {
  'jin_jkhyzx': '进口海运整箱',
  'jin_jkhypx': '进口海运拼箱',
  'jin_jkky': '进口空运',
  'jin_jkkj': '进口快件',
  'jin_jkqg': '进口清关',
  'jin_ccgljps': '仓储管理及配送'
}

// 服务 - 保税服务
export const SERVE_BAO_SLIDES = [
  { image_url: 'https://www.anycase.cn/data/ac2/bao_bsqqg.png', title: '保税区清关', picName: 'bao_bsqqg.png', name: 'bao_bsqqg' },
  { image_url: 'https://www.anycase.cn/data/ac2/bao_bsqwl.png', title: '保税区物流', picName: 'bao_bsqwl.png', name: 'bao_bsqwl' },
  { image_url: 'https://www.anycase.cn/data/ac2/bao_bsqcpsfw.png', title: '保税仓储配送服务', picName: 'bao_bsqcpsfw.png', name: 'bao_bsqcpsfw' },
  { image_url: 'https://www.anycase.cn/data/ac2/bao_more.png', title: '', picName: 'bao_more.png', name: 'bao_more' }
]

export const SERVE_BAO_MENU = {
  'bao_bsqqg': '保税区清关',
  'bao_bsqwl': '保税区物流',
  'bao_bsqcpsfw': '保税仓储配送服务'
}

// 服务 - 特色服务
export const SERVE_TE_SLIDES = [
  { image_url: 'https://www.anycase.cn/data/ac2/te_lcx.png', title: '冷藏箱', picName: 'te_lcx.png', name: 'te_lcx' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_szh.png', title: '散杂货', picName: 'te_szh.png', name: 'te_szh' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_zdj.png', title: '重大件', picName: 'te_zdj.png', name: 'te_zdj' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_srwp.png', title: '私人物品', picName: 'te_srwp.png', name: 'te_srwp' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_tzx.png', title: '特种箱', picName: 'te_tzx.png', name: 'te_tzx' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_zhwl.png', title: '展会物流', picName: 'te_zhwl.png', name: 'te_zhwl' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_wxp.png', title: '危险品', picName: 'te_wxp.png', name: 'te_wxp' },
  { image_url: 'https://www.anycase.cn/data/ac2/te_cw.png', title: '宠物', picName: 'te_cw.png', name: 'te_cw' }
]

export const SERVE_TE_MENU = {
  'te_lcx': '冷藏箱',
  'te_zdj': '重大件',
  'te_tzx': '特种箱',
  'te_wxp': '危险品',
  'te_szh': '散杂货',
  'te_srwp': '私人物品',
  'te_zhwl': '展会物流',
  'te_cw': '宠物'
}
// 行业
export const INDUSTRY_SLIDES = [
  { image_url: 'https://www.anycase.cn/data/ac2/fu_fzl.png', title: '服装类', picName: 'fu_fzl.png', name: 'fu_fzl' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_cl.png', title: '车辆', picName: 'fu_cl.png', name: 'fu_cl' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_znzz.png', title: '智能制造', picName: 'fu_znzz.png', name: 'fu_znzz' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_spyl.png', title: '食品饮料', picName: 'fu_spyl.png', name: 'fu_spyl' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_hghy.png', title: '化工行业', picName: 'fu_hghy.png', name: 'fu_hghy' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_kwck.png', title: '矿物采矿', picName: 'fu_kwck.png', name: 'fu_kwck' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_ncp.png', title: '农产品', picName: 'fu_ncp.png', name: 'fu_ncp' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_zzl.png', title: '纸张类', picName: 'fu_zzl.png', name: 'fu_zzl' },
  { image_url: 'https://www.anycase.cn/data/ac2/fu_xjcp.png', title: '橡胶产品/塑料类', picName: 'fu_xjcp.png', name: 'fu_xjcp' }
]

export const INDUSTRY_MENU = {
  'fu_fzl': '服装类',
  'fu_znzz': '智能制造',
  'fu_hghy': '化工行业',
  'fu_ncp': '农产品',
  'fu_cl': '车辆',
  'fu_spyl': '食品饮料',
  'fu_kwck': '矿物采矿',
  'fu_zzl': '纸张类',
  'fu_xjcp': '橡胶产品或塑料类'
}

// 通过点击右侧的menu寻找对应的json文件
export const JSON_MAPPING = {
  '服务': 'fw', // 服务
  // 出口服务
  '海运整箱': 'fw-hyzx',
  '海运拼箱': 'fw-hypx',
  '空运进出口': 'fw-kyjck',
  '报关拖车': 'fw-bgtc',
  '散杂运输': 'fw-szys',
  '国际铁路': 'fw-gjtl',
  '国内铁路': 'fw-gntl',
  '仓储服务': 'fw-ccfw',
  // 进口服务
  '进口海运整箱': 'jin-jkhyzx',
  '进口海运拼箱': 'jin-jkhypx',
  '进口空运': 'jin-jkky',
  '进口快件': 'jin-jkkj',
  '进口清关': 'jin-jkqg',
  '仓储管理及配送': 'jin-ccgljps',
  // 保税服务
  '保税区清关': 'bao-bsqqg',
  '保税区物流': 'bao-bsqwl',
  '保税仓储配送服务': 'bao-bsqcpsfw',
  // 特色服务
  '冷藏箱': 'fw-lcx',
  '重大件': 'fw-zdj',
  '特种箱': 'fw-tzx',
  '危险品': 'fw-wxp',
  '散杂货': 'fw-szh',
  '私人物品': 'fw-srwp',
  '展会物流': 'fw-zhwl',
  '宠物': 'fw-cw',
  // 行业
  '车辆': 'hy-cl',
  '服装类': 'hy-fzl',
  '化工行业': 'hy-hghy',
  '矿物采矿': 'hy-kwck',
  '农产品': 'hy-ncp',
  '食品饮料': 'hy-spyl',
  '橡胶产品或塑料类': 'hy-xjcphsll',
  '智能制造': 'hy-znzz',
  '纸张类': 'hy-zzl',
  //  解决方案
  '大数据服务': 'jjfa-dsjfw',
  '供应链金融服务': 'jjfa-gyljrfw',
  '物联网服务': 'jjfa-wlwfw',
  '物贸及关务专业咨询': 'jjfa-wmjgwzyzx',
  '保险服务': 'jjfa-bxfw',
  '物流防损标签': 'fa-wlfsbq'
}
// 解决方案菜单
export const SOLUTION_MENU = {
  'fa-dsjfw': '大数据服务',
  'fa-gyljrfw': '供应链金融服务',
  'fa-wlwfw': '物联网服务',
  'fa-wmjgwzyzx': '物贸及关务专业咨询',
  'fa-bxfw': '保险服务',
  'fa-wlfsbq': '物流防损标签'
}
export const ABOUT_MENU = {
  'company': '公司简介',
  'news': '新闻动态',
  'join': '招贤纳士',
  'connect': '联系我们'
}
export const NAV_MENU_TITLE = {
  about: '关于我们',
  solution: '解决方案',
  industry: '行业',
  // serve: ['我的服务', '特色服务']
  serve: ['出口服务', '进口服务', '保税服务', '特色服务']
}
export const DEPARTMENTLIST = [{
  value: '产品部',
  label: '产品部'
}, {
  value: '技术部',
  label: '技术部'
}, {
  value: '客服部',
  label: '客服部'
}, {
  value: '商务部',
  label: '商务部'
}, {
  value: '销售部',
  label: '销售部'
}, {
  value: '操作部',
  label: '操作部'
}, {
  value: '综合部',
  label: '综合部'
}]
export const COMPANYADDRESS = [
  {
    label: '上海',
    value: '上海'
  },
  {
    label: '苏州常熟',
    value: '苏州常熟'
  }
]
