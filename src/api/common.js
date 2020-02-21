// 与swagger 公共服务对应
import { $http } from '@/utils/http'
//  菜单list
export function getMenuList () {
  return $http({
    url: '/menu/list',
    method: 'get'
  })
}
// 注册
export function postRegister (data) {
  return $http({
    url: '/register/info',
    method: 'post',
    data: data
  })
}
