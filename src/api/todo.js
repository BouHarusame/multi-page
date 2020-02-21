// 对应 swagger 待办事宜
import { $http } from '@/utils/http'
// 更新一条代办事宜
export function putMsgOne (data) {
  return $http({
    url: '/msg/one',
    method: 'put',
    data: data
  })
}
// 批量更新待办事宜为【已处理】
export function putMsgBatch (data) {
  return $http({
    url: '/msg/batch',
    method: 'put',
    data: data
  })
}
// 查看【已处理】待办事宜
export function getMsgDone (params) {
  return $http({
    url: '/msg/done',
    method: 'get',
    params: params
  })
}
// 查看【未处理】待办事宜
export function getMsgToDo (params) {
  return $http({
    url: '/msg/todo',
    method: 'get',
    params: params
  })
}
