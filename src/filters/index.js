import { timeFomatter1 } from 'utils/utils'
export default {
  reContCounts (v) {
    let str = ''
    if (v) {
      v = JSON.parse(v)
      for (let key in v) {
        if (v.hasOwnProperty(key)) {
          str += v[key] + '*' + key + '+'
        }
      }
      return str.substr(0, str.length - 1)
    }
  },
  formatTime (v) {
    if (v && v !== ' ') {
      return timeFomatter1(v)
    } else {
      return ''
    }
  },
  formatContCounts (v) {
    let str = ''
    for (let key in v) {
      if (key === 'cont20Gp' || key === 'cont40Gp' || key === 'cont40Hq') {
        if (v[key]) {
          str += v[key] + '*' + key.substr(4, key.length) + '+'
        }
      }
    }
    return str.substr(0, str.length - 1)
  }
}
