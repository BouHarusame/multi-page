export default {
  update: function (el) {
    el.onkeypress = function (e) {
      var code = e.charCode
      if (code !== 0) {
        if (String.fromCharCode(code).match(/[\u4e00-\u9fa5]/)) {
          return false
        }
      }
    }
    el.addEventListener('textInput', function (e) {
      e.target.value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
    })
    el.onkeyup = function (e) {
      e.target.value = e.target.value.replace(/[\u4e00-\u9fa5]/g, '')
    }
  }
}
