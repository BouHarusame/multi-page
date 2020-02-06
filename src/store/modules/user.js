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
  // user login
  login ({ commit }, userInfo) {
    const { client, mobile, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ client, mobile, password }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          let error = 'Verification failed, please Login again.'
          reject(error)
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user roles
  getRoles ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getRoles(state.token).then(response => {
        const { data } = response
        if (!data) {
          let error = 'Verification failed, please Login again.'
          reject(error)
        }
        const { name, avatar } = data
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
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
