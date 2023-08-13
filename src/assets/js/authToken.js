import jwt_decode from 'jwt-decode'
import store from '../../store'

const getTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000)
}

export default (token) => {
  return new Promise((resolve, reject) => {
    let decodeJWT

    try {
      decodeJWT = jwt_decode(token)
    } catch (er) {
      reject({ valid: false, msg: 'Invalid Token' })
    }
    store.state.userInfo = {
      id: decodeJWT.id
    }

    let nowDate = getTimestampInSeconds()
    if (nowDate > decodeJWT?.exp) {
      reject({ valid: false, msg: 'Expired Token' })
    } else {
      resolve({ valid: true, msg: 'Valid Token' })
    }
  })
}
