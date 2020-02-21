// 对应 swagger 订单
import { $http } from '@/utils/http'

// 客服查看客户的【下单信息】
export function getOrderInfo (jobNo) {
  return $http({
    url: `/order/ac/info/${jobNo}`,
    method: 'get'
  })
}
// 直客获取出口订单列表
export function getOrderList (data) {
  return $http({
    url: '/order/dc/list',
    method: 'get',
    params: data
  })
}

// 立即下单
export function postOrderQuick (data) {
  return $http({
    url: '/order/dc/quick',
    method: 'post',
    data: data
  })
}

// 获取业务类型
export function getYwList () {
  return $http({
    url: '/yw/list',
    method: 'get'
  })
}
// 获取订单节点列表
export function getNodeInfo (jobNo) {
  return $http({
    url: `/order/node/${jobNo}`,
    method: 'get'
  })
}
// 获取订单详情
export function getOrderDetail (jobNo) {
  return $http({
    url: `/order/detail/${jobNo}`,
    method: 'get'
  })
}
// 获取订单附件
export function getOrderAttachs (jobNo) {
  return $http({
    url: `/order/detail/${jobNo}/attachs`,
    method: 'get'
  })
}
// 上传订单附件
export function postOrderAttachs (jobNo, data) {
  return $http({
    url: `/order/detail/${jobNo}/attach`,
    method: 'post',
    data: data
  })
}
// 需要关联的AC/KT业务编号
export function connectJobNo (jobNo, params) {
  return $http({
    url: `/order/ac/jobNo/${jobNo}`,
    method: 'get',
    params: params
  })
}
// 客服修改AC业务编号
export function changeJobNo (data) {
  return $http({
    url: `/order/ac/jobNo`,
    method: 'post',
    data: data
  })
}
// 获取订单相关的信息
export function getTodoMsg () {
  return $http({
    url: `/order/ac/todo/frequent`,
    method: 'get'
  })
}
// AC客服发送待办事宜给直客
export function sendTodo (data) {
  return $http({
    url: `/order/ac/todo`,
    method: 'post',
    data: data
  })
}
// AC客服获取未处理待办事宜
export function getAcTodo (params) {
  return $http({
    url: `/order/ac/todo`,
    method: 'get',
    params: params
  })
}
// 直客获取未处理待办事宜
export function getDcTodo (params) {
  return $http({
    url: `/order/dc/todo`,
    method: 'get',
    params: params
  })
}
// 下载节点附件
export function downLoadNodeFid (jobNo, fid) {
  return $http({
    url: `/order/node/${jobNo}/fid/${fid}`,
    method: 'get',
    responseType: 'blob'
  })
}
// 下载某一个附件
export function downLoadOneFid (jobNo, params) {
  return $http({
    url: `/order/detail/${jobNo}/attach`,
    method: 'get',
    params: params,
    responseType: 'blob'
  })
}
// 删除附件
export function deleteAttach (jobNo, params) {
  return $http({
    url: `/order/detail/${jobNo}/attach`,
    method: 'delete',
    params: params
  })
}
// 更新订单节点
export function putNode (jobNo, data) {
  return $http({
    url: `/order/node/${jobNo}`,
    method: 'put',
    data: data
  })
}

// 以下对应swaggerAC3.0进口清关（订单部分）

// 订单列表获取车辆信息
export function getTransferMsg (quoteNo) {
  return $http({
    url: `/import/order/transfer/${quoteNo}`,
    method: 'get'
  })
}
// 再来一单
export function orderQuick (data) {
  return $http({
    url: `/import/order/quick`,
    method: 'post',
    data: data
  })
}
// 获取进口订单列表
export function getImportOrderlist (params) {
  return $http({
    url: `/import/order/list`,
    method: 'get',
    params: params
  })
}
// 获取公司名称列表
export function getOrderCompList (params) {
  return $http({
    url: `/import/order/comp`,
    method: 'get',
    params: params
  })
}
// 直客获取询价信息
export function getQuoteNo (quoteNo) {
  return $http({
    url: `/import/order/info/${quoteNo}`,
    method: 'get'
  })
}
// 获取进口订单详情
export function getImportOrderDetail (quoteNo) {
  return $http({
    url: `/import/order/detail/${quoteNo}`,
    method: 'get'
  })
}
// 关联进口订单
export function connectImportJobNo (data) {
  return $http({
    url: `/import/order/jobNo/bind`,
    method: 'post',
    data: data
  })
}
// 获取订单节点
export function getImportOrderNode (quoteNo) {
  return $http({
    url: `/import/order/node/${quoteNo}`,
    method: 'get'
  })
}
// 检查quoteNo是否更换过
export function checkChangeQuoteNo (quoteNo) {
  return $http({
    url: `/import/order/detail/check/${quoteNo}`,
    method: 'get'
  })
}
// 进口订单详情页留言
export function leavingAMessage (data) {
  return $http({
    url: `/import/order/message`,
    method: 'post',
    data: data
  })
}
// 进口订单详情页留言
export function getleavingAMessage (params) {
  return $http({
    url: `/import/order/message`,
    method: 'get',
    params: params
  })
}
