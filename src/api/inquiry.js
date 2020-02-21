// 对应 swagger 询价
import { $http } from '@/utils/http'

// 整箱价格查询
export function getFclPrice (params) {
  return $http({
    url: `/inquiry/fcl/price`,
    method: 'get',
    params: params
  })
}
// [AC商务]更新一条报价
export function putFclPrice (data) {
  return $http({
    url: `/inquiry/fcl/price`,
    method: 'put',
    data: data
  })
}
// 整箱价格查询 > 起运港autoComplete
export function getFclStart (params) {
  return $http({
    url: `/inquiry/fcl/start`,
    method: 'get',
    params: params
  })
}
// 整箱价格查询 > 起运港autoComplete
export function getFclTarget (params) {
  return $http({
    url: `/inquiry/fcl/target`,
    method: 'get',
    params: params
  })
}
// 整箱附加费查询V2
export function getFclAdditional (params) {
  return $http({
    url: `/inquiry/fcl/additional/v2`,
    method: 'get',
    params: params
  })
}
// 整箱价格下单
export function postFclOrder (priceId, data) {
  return $http({
    url: `/inquiry/fcl/${priceId}/order`,
    method: 'post',
    data: data
  })
}
// 整箱预约订舱
export function postFclReserve (priceId, data) {
  return $http({
    url: `/inquiry/fcl/${priceId}/reserve`,
    method: 'post',
    data: data
  })
}
// 拼箱价格下单
export function postLclOrder (priceId, data) {
  return $http({
    url: `/inquiry/lcl/${priceId}/order`,
    method: 'post',
    data: data
  })
}
// 拼箱目的港收费列表
export function getFclPortFee (params) {
  return $http({
    url: `/inquiry/lcl/port/fee`,
    method: 'get',
    params: params
  })
}
// 拼箱价格查询
export function getLclPrice (params) {
  return $http({
    url: `/inquiry/lcl/price`,
    method: 'get',
    params: params
  })
}
// [AC商务]更新一条海运拼箱报价
export function putLclPrice (data) {
  return $http({
    url: `/inquiry/lcl/price`,
    method: 'put',
    data: data
  })
}
// 拼箱价格查询 > 起运港autoComplet
export function getLclStart (params) {
  return $http({
    url: `/inquiry/lcl/start`,
    method: 'get',
    params: params
  })
}
// 拼箱价格查询 > 起运港autoComplet
export function getLclTarget (params) {
  return $http({
    url: `/inquiry/lcl/target`,
    method: 'get',
    params: params
  })
}
// 询价热门港口查询(起运港/目的港)
export function getHotPort (params) {
  return $http({
    url: `/inquiry/port/hot`,
    method: 'get',
    params: params
  })
}

// 获取拖车地址选择
export function getTruckAddr () {
  return $http({
    url: '/inquiry/truck/addr/export',
    method: 'get'
  })
}
// 获取指定地区拖车地址
export function getTruckAddrImport () {
  return $http({
    url: '/inquiry/truck/addr/import',
    method: 'get'
  })
}

// 查询拖车价格
export function getTruckPrice (params) {
  return $http({
    url: '/inquiry/truck/price',
    method: 'get',
    params: params
  })
}
// 拖车下单
export function postTruckOrder (priceId, data) {
  return $http({
    url: `/inquiry/truck/${priceId}/order`,
    method: 'post',
    data: data
  })
}
