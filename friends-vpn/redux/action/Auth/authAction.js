import jwt_decode from 'jwt-decode'
import useJwt from '../../../jwt/jwtService'
import {
  USER_LOGGED_IN_INIT,
  USER_LOGGED_IN_SUCCESS,
  USER_LOGGED_IN_FAILURE,
  LOGOUT_SUCCESS,
  SET_LOGGED_IN_USER,
} from '../actionTypes/Auth'

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })
export const initiateLogin = () => ({ type: USER_LOGGED_IN_INIT })
export const loginSuccess = data => ({ type: USER_LOGGED_IN_SUCCESS, payload: data })
export const loginFailed = data => ({ type: USER_LOGGED_IN_FAILURE, payload: data })

export const handleLogin = data => {
  return async dispatch => {
    dispatch(initiateLogin())
    try {
      const response = await useJwt.login(data)
      if (response?.data) {
        const { token } = response.data
        useJwt.setToken(token)
        const decoded = jwt_decode(token)

        dispatch(loginSuccess(decoded))
        dispatch({ type: SET_LOGGED_IN_USER, payload: decoded })
      }
    } catch (err) {
      if (err.response) {
        dispatch(loginFailed(err.response.data))
      }
    }
  }
}

export const handleLogout = () => {
  return dispatch => {
    localStorage.removeItem('accessToken')
    dispatch(logoutSuccess())
  }
}
