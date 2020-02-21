// 对应 swagger 数据服务
import { $http } from '@/utils/http'

// 获取货车定位
export function truckLocation (params) {
  return $http({
    url: '/location/truck',
    method: 'get',
    params: params
  })
}
// 获取船舶定位
export function shipLocation (params) {
  return $http({
    url: '/location/ship',
    method: 'get',
    params: params
  })
}
