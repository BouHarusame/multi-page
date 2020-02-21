// 对应 swagger 财务
import { $http } from '@/utils/http'

// AC查询进口订单费用
export function getAcImportOrderFee (params) {
  return $http({
    url: '/fee/ac/import/order',
    method: 'get',
    params: params
  })
}

// AC获取出口订单费用
/*
  params: {
    jobNo,  必传
    params
  }
**/
export function getAcOrderFee (params) {
  return $http({
    url: '/fee/ac/order',
    method: 'get',
    params: params
  })
}
// AC发送费用给直客
export function sendFee (data) {
  return $http({
    url: '/fee/ac/send',
    method: 'post',
    data: data
  })
}
// 直客获取出口订单费用
export function getDcOrderFee (params) {
  return $http({
    url: '/fee/dc/order',
    method: 'get',
    params: params
  })
}

// 直客确认费用
export function confirmFee (data) {
  return $http({
    url: '/fee/dc/confirm',
    method: 'post',
    data: data
  })
}
// 直客确认费用
export function getFeeDcList (params) {
  return $http({
    url: '/fee/dc/list',
    method: 'get',
    params: params
  })
}

// 直客查询进口订单费用
export function getDcImportOrderFee (params) {
  return $http({
    url: '/fee/dc/import/order',
    method: 'get',
    params: params
  })
}

// 查看账单List
export function getStmtList (params) {
  return $http({
    url: '/stmt/list',
    method: 'get',
    params: params
  })
}

// 直客确认账单
export function stmtDcConfirm (data) {
  return $http({
    url: '/stmt/dc/confirm',
    method: 'post',
    data: data
  })
}
