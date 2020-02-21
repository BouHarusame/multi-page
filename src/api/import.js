// 对应 swagger AC3.0 进口清关
import { $http } from '@/utils/http'
// AC客服更新上传核对标记
export function putAttachCheck (data) {
  return $http({
    url: '/import/attach/check',
    method: 'put',
    data: data
  })
}
// 直客拿取参考清单/ac拿取确认清单
export function getAttachCheckList (quoteNo) {
  return $http({
    url: `/import/attach/${quoteNo}/check/list`,
    method: 'get'
  })
}
// 修改文件名
export function putAttachName (data) {
  return $http({
    url: `/import/attach/name`,
    method: 'put',
    data: data
  })
}
// 进口订单详情页上传附件
export function uploadAttach (quoteNo, data) {
  return $http({
    url: `/import/attach/${quoteNo}`,
    method: 'post',
    data: data
  })
}
// 进口订单详情页下载附件
export function downloadAttach (quoteNo, params) {
  return $http({
    url: `/import/attach/${quoteNo}`,
    method: 'get',
    params: params
  })
}
// 查看JobNo相关附件
export function getAttachList (quoteNo, params) {
  return $http({
    url: `/import/attach/${quoteNo}/list`,
    method: 'get',
    params: params
  })
}
// 批量下载所有订单关联的所有附件
export function downloadAttachAll (quoteNo) {
  return $http({
    url: `/import/attach/all/${quoteNo}`,
    method: 'get',
    responseType: 'blob'
  })
}
// 删除附件
export function deleteAttach (quoteNo, data) {
  return $http({
    url: `/import/attach/${quoteNo}`,
    method: 'delete',
    data: data
  })
}
// 直客询价
export function postQuote (data) {
  return $http({
    url: `/import/quote`,
    method: 'post',
    data: data
  })
}

// ac代直客询价
export function postQuoteAc (data) {
  return $http({
    url: `/import/quote/ac`,
    method: 'post',
    data: data
  })
}

// 获取指定地区拖车地址
export function getTruckAddrTown (params) {
  return $http({
    url: '/import/quote/addr/town',
    method: 'get',
    params: params
  })
}
// 成本测算
export function CostCalculate (data) {
  return $http({
    url: '/import/quote/cost/calculate',
    method: 'post',
    data: data
  })
}
// 获取原产国
export function getQuoteCountry (params) {
  return $http({
    url: `/import/quote/country`,
    method: 'get',
    params: params
  })
}
// 进入成本测算页面访问接口
export function getQuoteCost (quoteNo) {
  return $http({
    url: `/import/quote/cost/${quoteNo}`,
    method: 'get'
  })
}
// 通过信息查询危险品
export function getQuoteDanger (params) {
  return $http({
    url: `/import/quote/danger`,
    method: 'get',
    params: params
  })
}
// ac代直客询价页面获取直客信息
export function getQuoteDcInfo (params) {
  return $http({
    url: `/import/quote/dc/info`,
    method: 'get',
    params: params
  })
}
// 获取询价草稿
export function getQuoteDraft (quoteNo) {
  return $http({
    url: `/import/quote/draft/${quoteNo}`,
    method: 'get'
  })
}

// 拿取历史地址
export function getQuoteHisAddr () {
  return $http({
    url: `/import/quote/his/addr`,
    method: 'get'
  })
}

// 查询HSCode之前检查是否需要输入验证码
export function validCode () {
  return $http({
    url: `/import/quote/hs/validCode`,
    method: 'get'
  })
}
// 提交验证码
export function postValidCode (data) {
  return $http({
    url: `/import/quote/hs/validCode`,
    method: 'post',
    data: data
  })
}
// 通过货物名称查询hs信息
export function getHsName (params) {
  return $http({
    url: `/import/quote/hs/name`,
    method: 'get',
    params: params
  })
}
// 通过货物名称查询hs信息
export function getHsCode (params) {
  return $http({
    url: `/import/quote/hs/code`,
    method: 'get',
    params: params
  })
}
// 直客获取询价列表
export function getQuoteList (params) {
  return $http({
    url: `/import/quote/list`,
    method: 'get',
    params: params
  })
}
// 直客看完报价后下单
export function postQuoteOrder (data) {
  return $http({
    url: `/import/quote/order`,
    method: 'post',
    data: data
  })
}
// 获取港口列表
export function getQuotePortQuery (params) {
  return $http({
    url: `/import/quote/portQuery`,
    method: 'get',
    params: params
  })
}
// 查询实时汇率
export function getQuoteRate (params) {
  return $http({
    url: `/import/quote/rate`,
    method: 'get',
    params: params
  })
}
// 报检特殊单证详情
export function getSuperviseSpecial (params) {
  return $http({
    url: `/import/quote/supervise/special`,
    method: 'get',
    params: params
  })
}
// 获取检疫方式
export function getSuperviseQuarantine (params) {
  return $http({
    url: `/import/quote/supervise/quarantine`,
    method: 'get',
    params: params
  })
}
// 获取监管条件
export function getSuperviseConditione (params) {
  return $http({
    url: `/import/quote/supervise/condition`,
    method: 'get',
    params: params
  })
}
// 获取监管方式
export function getSuperviseMethod () {
  return $http({
    url: `/import/quote/supervise/method`,
    method: 'get'
  })
}
// 获取监管方式
export function getQuoteQuoteNo (quoteNo) {
  return $http({
    url: `/import/quote/${quoteNo}`,
    method: 'get'
  })
}
