import { login, getRoles, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {},
    userRoles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USER_ROLES: (state, userRoles) => {
    state.userRoles = userRoles
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { client, mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ client, mobile, password }).then(response => {
        if (response.msg === 'success') {
          commit('SET_TOKEN', response.data.token)
          setToken(response.data.token)
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        console.log(response)
        if (!response.data) {
          let error = 'Verification failed, please Login again.'
          reject(error)
        }
        commit('SET_USER_INFO', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user roles
  getRoles ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles(state.token).then(response => {
        if (!response.data) {
          let error = 'Verification failed, please Login again.'
          reject(error)
        }
        commit('SET_USER_ROLES', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      // resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
