// 对应 swagger 设置
import { $http } from '@/utils/http'

// 箱讯/直客 查看员工列表
export function getUserList () {
  return $http({
    url: '/manage/user/list',
    method: 'get'
  })
}
// 箱讯/直客 删除员工
export function deleteUser (userId) {
  return $http({
    url: `/manage/user/${userId}`,
    method: 'delete'
  })
}
// 箱讯/直客 编辑员工
export function editUser (data) {
  return $http({
    url: `/manage/user`,
    method: 'put',
    data: data
  })
}
// 箱讯管理员/直客管理员 - 新增员工-获取角色列表
export function getUserRoles () {
  return $http({
    url: `/manage/user/roles`,
    method: 'get'
  })
}
// 箱讯/直客 新增员工
export function newAddUser (data) {
  return $http({
    url: `/manage/user`,
    method: 'post',
    data: data
  })
}
