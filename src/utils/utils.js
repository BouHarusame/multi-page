export function getLocalStorage (key) {
  let val = window.localStorage.getItem(key)
  if (val) {
    return val
  } else {
    return ''
  }
}
export function timeFomatter1 (time) {
  if (!time || time === ' ') return
  if (time === '暂无成交' || time === '无限期') return time
  let formatArr = time.split('')
  let format
  let year = '20' + formatArr[0] + formatArr[1]
  let month = formatArr[2] + formatArr[3]
  let date = formatArr[4] + formatArr[5]
  format = year + '/' + month + '/' + date
  return format
}
export function timeFomatter (time, format, dateFlag) {
  let date = new Date(time)
  var o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  if (dateFlag) {
    return format
  }
  return new Date(format).getTime()
}
export function time (data) {
  var year = data.getFullYear()
  var month = data.getMonth() + 1
  var date = data.getDate()
  var hour = data.getHours()
  var minute = data.getMinutes()
  var second = data.getSeconds()
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}
export function subtotalFee (data) {
  if (data.currency === 'USD') {
    return '$ ' + data.price + '*' + data.itemCount + ' =' + ' $ ' + data.subtotal
  } else {
    return '￥ ' + data.price + '*' + data.itemCount + ' =' + ' ￥ ' + data.subtotal
  }
}
export function typeOf (data) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(data)]
}

export function deepCopy (data) {
  const t = typeOf(data)
  let o
  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }
  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

// module functions declaration
export function formatNameEN (value) {
  if (value) {
    // const arr = value.split('(')
    // return arr[0]
    const position = value.lastIndexOf('(')
    if (position === -1) {
      return value
    } else {
      return value.substring(0, position)
    }
  }
}

export function formatNameENForParkPort (value) {
  if (value) {
    const position = value.lastIndexOf('(')
    if (position === -1) {
      return value
    } else {
      return value.substring(0, position)
    }
  }
}
export function formatNameCN (value) {
  if (value) {
    // const arr = value.split('(')
    // return arr[1] ? arr[1].replace(')', '') : arr[0]
    const startPosition = value.lastIndexOf('(')
    const endPosition = value.lastIndexOf(')')
    if (startPosition > -1 && endPosition > -1) {
      return value.substring(startPosition + 1, endPosition)
    } else {
      return value
    }
  }
}
export function debounce (fn, delay = 300) { // 默认300毫秒
  var timer
  return function () {
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args) // this 指向vue
    }, delay)
  }
}
export function formatTab (v) {
  return v && v.replace(/\n/g, '<br/>')
}
export function formatKangTaiTab (v) {
  return v && v.replace(/\r\n/g, '\n') && v.replace(/\n/g, '<br/>')
}

export function getTime (time) {
  let nowDate = new Date().getTime()
  let date = Math.floor((nowDate - new Date(time).getTime()) / 1000)
  if (date > 0) {
    let day = Math.floor(date / 86400)
    let hour = Math.floor(date % 86400 / 3600)
    let minute = Math.floor(date % 86400 % 3600 / 60)
    return { day, hour, minute }
  }
}

export function roleType (role, type) {
  if (typeof role === 'string') {
    return role.indexOf(type) !== -1
  } else {
    return role.some(item => {
      return item.indexOf(type) !== -1
    })
  }
}
