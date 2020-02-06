import request from '@/utils/request'

// 登录
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}
// 获取用户角色
export function getRoles (token) {
  return request({
    url: '/user/roles',
    method: 'get',
    params: { token }
  })
}
// 切换当前用户角色
export function switchRole (roleId) {
  return request({
    url: '/user/roles',
    method: 'put',
    data: { roleId }
  })
}
