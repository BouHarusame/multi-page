// 对应 swagger 门户
import { $http } from '@/utils/http'
// 获取AC职位信息（加入我们）
export function getAcRecruitmentList (data) {
  return $http({
    url: '/acRecruitment/list',
    method: 'get',
    params: data
  })
}
// 获取ac新闻列表
export function getAcArticleList () {
  return $http({
    url: '/acArticle/list/v2',
    method: 'get'
  })
}
// 获取新闻详情
export function getAcArticleDetail (data) {
  return $http({
    url: '/acArticle/detail',
    method: 'get',
    params: data
  })
}
// 获取新闻类别
export function getAcArticleType () {
  return $http({
    url: '/acArticle/list/type',
    method: 'get'
  })
}
