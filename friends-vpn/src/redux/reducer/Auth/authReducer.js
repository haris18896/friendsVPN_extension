import {
  CLEAR_LOGIN_STATE,
  LOGOUT_SUCCESS,
  USER_LOGGED_IN_FAILURE,
  USER_LOGGED_IN_INIT,
  GET_CUSTOMER_PROFILE_FAILURE,
  GET_CUSTOMER_PROFILE_INIT,
  GET_CUSTOMER_PROFILE_SUCCESS,
  USER_LOGGED_IN_SUCCESS,
  ANONYMOUS_LOGIN_INITIATED,
  ANONYMOUS_LOGIN_SUCCESS,
  ANONYMOUS_LOGIN_FAILURE,
  CLEAR_PROFILE_DATA,
} from '../../action/actionTypes/Auth'

const initialState = { name: '', email: '' }

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGGED_IN_INIT:
      return { inProcess: true }
    case USER_LOGGED_IN_SUCCESS:
      return { ...state, inProcess: false, success: true, msg: 'Sign In Successful!' }
    case USER_LOGGED_IN_FAILURE:
      return { ...state, inProcess: false, error: action.payload }
    case CLEAR_LOGIN_STATE:
      return {}
    case LOGOUT_SUCCESS:
      return {}
    default:
      return state
  }
}

export const anonymousLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ANONYMOUS_LOGIN_INITIATED:
      return { inProcess: true }
    case ANONYMOUS_LOGIN_SUCCESS:
      return { ...state, inProcess: false, Anonymous: true }
    case ANONYMOUS_LOGIN_FAILURE:
      return { ...state, inProcess: false, error: action.payload }
    default:
      return state
  }
}

export const getCustomerProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMER_PROFILE_INIT:
      return { inProcess: true }
    case GET_CUSTOMER_PROFILE_SUCCESS:
      return { ...state, inProcess: false, profile: action.payload.profile }
    case GET_CUSTOMER_PROFILE_FAILURE:
      return { ...state, inProcess: false, error: action.payload }

    case CLEAR_PROFILE_DATA:
      return { ...state, profile: {} }
    default:
      return state
  }
}
