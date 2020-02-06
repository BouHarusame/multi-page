const base = window.location.hostname
// const HOST_DEV = 'http://192.168.10.253:7001/api'
const HOST_DEV = 'http://www.roadshare.com:7001/api'
// const HOST_DEV = 'http://www.roadshare.com:8888/api'
const HOST_PROD = '/api'
let FINAL_HOST
if (base === 'localhost') {
  FINAL_HOST = HOST_DEV
} else {
  FINAL_HOST = HOST_PROD
}
export const HOST = FINAL_HOST
