
export default {
  data () {
    return {
    }
  },
  methods: {
    getOffsetTop (offset, h = 0) {
      let offsetTop = offset.top + offset.height
      if (offsetTop < h) {
        return true
      } else {
        return false
      }
    }
  }
}
