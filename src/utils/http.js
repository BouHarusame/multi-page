import request from '@/utils/request'
import axios from 'axios'
import NProgress from 'nprogress'

export function $http (params) {
  NProgress.start()
  return request({
    ...params
  }).then((data) => {
    NProgress.done()
    return Promise.resolve(data)
  }).catch((error) => {
    NProgress.done()
    return Promise.reject(error)
  })
}

export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  return url ? url.substring(1) : ''
}

export function httpDownload (type, url, data) {
  if (type.toLowerCase() === 'get' && !!data) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  }
  return request({
    method: type.toLowerCase(),
    url,
    data,
    responseType: 'blob'
  })
}

export function $fetchFromJSONFile (jsonFile, type) {
  let requesturl = 'https://www.anycase.cn/data/ac2/portal/' + jsonFile
  if (type) {
    requesturl = 'https://www.anycase.cn/data/ac2/mini/' + jsonFile
  }
  // let requesturl = HOST + '/data/ac2/portal/' + jsonFile
  // console.log(requesturl)
  return axios.get(requesturl)
    .then((res) => {
      return Promise.resolve(res.data)
    }).catch(error => {
      return Promise.reject(error)
    })
}
