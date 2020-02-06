export default {
  update: function (el) {
    el.onkeypress = function (e) {
      var code = e.charCode
      if (code !== 0) {
        if (!String.fromCharCode(code).match(/[A-Za-z]/)) {
          return false
        }
      }
    }
    el.addEventListener('textInput', function (e) {
      e.target.value = e.target.value.replace(/[^A-Za-z]/g, '')
    })
    el.onkeyup = function (e) {
      e.target.value = e.target.value.replace(/[^A-Za-z]/g, '')
    }
  }
}
