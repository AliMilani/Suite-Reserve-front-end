import { createStore } from 'vuex'
import { setDarkMode } from '../assets/js/init'
import axios from 'axios'
import authToken from '../assets/js/authToken'

export default createStore({
  state: {
    userInfo: {},
    reservationInfo: {
      personalInfo: {
        mobile_number: '',
        phone_number: '',
        sheba_number: '',
        address: ''
      },
      companions: [],
      reservedTime: {
        startDate: '',
        endDate: ''
      },
      room: []
    },
    isAuthenticated: true,
    token: '',
    darkMode: false
  },
  getters: {},
  mutations: {
    login(state, token) {
      state.isAuthenticated = true
      state.token = token
      localStorage.setItem('token', token)
      axios.defaults.headers.common['x-access-token'] = `${token}`
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
      axios.defaults.headers.common['x-access-token'] = ''
    },
    getMode(state) {
      if (
        localStorage.theme == 'true' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        state.darkMode = true
      } else {
        state.darkMode = false
      }
      setDarkMode(state.darkMode)
    },
    setMode(state, mode) {
      localStorage.setItem('theme', mode)
      state.darkMode = mode
      setDarkMode(mode)
    },
    updatePersonalInfo(state, info) {
      state.reservationInfo.personalInfo = info
    },
    updateCompanions(state, info) {
      state.reservationInfo.companions = info
    },
    updateReservedTime(state, info) {
      state.reservationInfo.reservedTime = info
    },
    updateRoom(state, info) {
      state.reservationInfo.room = info
    }
  },
  actions: {
    onStart(context) {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common['x-access-token'] = `${token}`

      if (token) {
        authToken(token)
          .then((res) => {
            if (res.valid) context.commit('login', token)
            else context.commit('logout')
          })
          .catch((err) => {
            context.commit('logout')
            console.log(err)
          })
      } else {
        context.commit('logout')
      }
    },
    setTokenHeadder() {
      const token = localStorage.getItem('token')
      axios.defaults.headers.common['x-access-token'] = `${token}`
    }
  },
  modules: {}
})
