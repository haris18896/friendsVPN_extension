import useJwt from '../../../jwt/jwtService'

import {
  CLEAR_PROFILE_DATA,
  GET_CUSTOMER_PROFILE_FAILURE,
  GET_CUSTOMER_PROFILE_INIT,
  GET_CUSTOMER_PROFILE_SUCCESS,
} from '../actionTypes/Auth'

export const initiateGetProfile = () => ({ type: GET_CUSTOMER_PROFILE_INIT })
export const getProfileSuccess = data => ({ type: GET_CUSTOMER_PROFILE_SUCCESS, payload: data })
export const getProfileFailed = error => ({ type: GET_CUSTOMER_PROFILE_FAILURE, payload: error })
export const clearProfile = () => ({ type: CLEAR_PROFILE_DATA })

export const handleGetProfile = () => {
  return async dispatch => {
    dispatch(initiateGetProfile())
    try {
      const response = await useJwt.getProfile()
      if (response) {
        dispatch(getProfileSuccess(response.data))
      }
    } catch (err) {
      if (err.response) {
        dispatch(getProfileFailed(err.response.data))
      }
    }
  }
}
