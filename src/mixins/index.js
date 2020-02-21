import orderTable from 'components/order-table/order-table'
import filters from '@/filters'
import { timeFomatter } from 'utils/utils'
import OrderPagination from 'components/pagination/pagination'
import searchForm from 'components/search-form/search-form'
export default {
  data () {
    return {
      loading: false,
      total: 0
    }
  },
  methods: {
    handleClickSearch (params) {
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          if (Object.prototype.toString.call(params[key]) === '[object Date]') {
            params[key] = timeFomatter(params[key], 'yyyy-MM-dd') || ''
          }
          if (key === 'invoiceFlag' || key === 'chargeOffFlag') {
            this.orderParams[key] = params[key] ? params[key] : false
          } else {
            this.orderParams[key] = params[key] ? params[key] : ''
          }
          window.sessionStorage.setItem(key, params[key])
        }
      }
      // this.orderParams = deepCopy(this.orderParams)
      if (params.searchClicked) {
        this.orderParams.page = 1
        this.getOrder(this.orderParams)
      } else {
        this.getOrder(this.orderParams)
      }
    },
    formatTime (row, column, value) {
      return filters.formatTime(value)
    },
    formatContCounts (value) {
      return filters.formatContCounts(value)
    },
    formatEmptyValue (val) {
      if (val === null || val === undefined) {
        return ''
      }
      return val
    }
  },
  components: {
    orderTable,
    OrderPagination,
    searchForm
  },
  watch: {
    orderParams: {
      handler (ov, nv) {
        if (!nv) {
          this.getOrder(this.orderParams)
        } else {
          this.getOrder(nv)
        }
      },
      immediate: false,
      deep: true
    }
  }
}
