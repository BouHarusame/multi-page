// 对应swagger登录用户
import { $http } from '@/utils/http'

// 登录
export function login (data) {
  return $http({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getInfo () {
  return $http({
    url: '/user/info',
    method: 'get'
  })
}
// 获取用户角色
export function getRoles (token) {
  return $http({
    url: '/user/roles',
    method: 'get',
    params: { token }
  })
}
// 切换当前用户角色
export function switchRole (roleId) {
  return $http({
    url: '/user/roles',
    method: 'put',
    data: { roleId }
  })
}
// 修改用户信息
export function changeUserInfo (data) {
  return $http({
    url: '/user/changeuserinfo',
    method: 'post',
    data: data
  })
}
// 修改用户密码
export function changePwd (data) {
  return $http({
    url: '/user/changepwd',
    method: 'post',
    data: data
  })
}
// 获取用户头像
export function getAvatars () {
  return $http({
    url: '/user/avatars',
    method: 'get'
  })
}
// 更换系统提供用户头像
export function putAvatars (data) {
  return $http({
    url: '/user/avatar',
    method: 'put',
    data: data
  })
}
// 用户自定义头像
export function postAvatars (data) {
  return $http({
    url: '/user/avatar',
    method: 'post',
    data: data
  })
}
