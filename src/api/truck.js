// 对应 swagger 客户(同行)拖车询价下单
import { $http } from '@/utils/http'

// 根据地址片段，搜索详细地址
export function getTruckAddrQuery (params) {
  return $http({
    url: `/customer/truck/addr/query`,
    method: 'get',
    params: params
  })
}

// 拖车询价保存草稿, 有draft就更新
export function putTruckDraft (data) {
  return $http({
    url: '/customer/truck/draft',
    method: 'put',
    data: data
  })
}
// 拖车询价草稿List
export function getTruckDrafts () {
  return $http({
    url: '/customer/truck/drafts',
    method: 'get'
  })
}
// 客户(同行)拖车订单列表
export function getTruckDraftsCount () {
  return $http({
    url: '/customer/truck/drafts/count',
    method: 'get'
  })
}
// 拖车询价查看某一个草稿
export function getTruckDraft (draftId) {
  return $http({
    url: `/customer/truck/draft/${draftId}`,
    method: 'get'
  })
}
// 拖车询价Delete草稿
export function deleteTruckDraft (draftId) {
  return $http({
    url: `/customer/truck/draft/${draftId}`,
    method: 'delete'
  })
}
// 拖车询价下单, 有draft就带上draftId
export function postTruckOrder (data) {
  return $http({
    url: '/customer/truck/order',
    method: 'post',
    data: data
  })
}
// 客户(同行)拖车订单列表
export function getTruckOrderList (params) {
  return $http({
    url: '/customer/truck/orders',
    method: 'get',
    params: params
  })
}
// 目的港autoComplete
export function getTruckPortQuery (params) {
  return $http({
    url: '/customer/truck/port/query',
    method: 'get',
    params: params
  })
}
// 客户(同行)拖车订单列表
export function getTruckLocation (params) {
  return $http({
    url: '/customer/truck/location',
    method: 'get',
    params: params
  })
}

// 客户(同行)拖车订单详情
export function getTruckOrderDetail (jobNo) {
  return $http({
    url: `/customer/truck/order/${jobNo}`,
    method: 'get'
  })
}
// 新建装箱门点(仅限同行)
export function postTruckZxmds (data) {
  return $http({
    url: `/customer/truck/zxmd`,
    method: 'post',
    data: data
  })
}
// 更新装箱门点(仅限同行)
export function putTruckZxmds (data) {
  return $http({
    url: `/customer/truck/zxmd`,
    method: 'put',
    data: data
  })
}
// 删除装箱门点(仅限同行)
export function deleteTruckZxmds (id) {
  return $http({
    url: `/customer/truck/zxmd/${id}`,
    method: 'delete'
  })
}
// 根据当前用户查询装箱门点列表(仅限同行)
export function getTruckZxmds () {
  return $http({
    url: `/customer/truck/zxmds`,
    method: 'get'
  })
}
// 装箱门点历史(仅限同行)
export function getTruckZxmdsHistory () {
  return $http({
    url: `/customer/truck/zxmds/history`,
    method: 'get'
  })
}
