import jwt_decode from 'jwt-decode';
import useJwt from '../../../jwt/jwtService';
import { ANONYMOUS_LOGIN_FAILURE, ANONYMOUS_LOGIN_INITIATED, ANONYMOUS_LOGIN_SUCCESS } from '../actionTypes/Auth';

export const initiateAnonymousLogin = () => ({ type: ANONYMOUS_LOGIN_INITIATED });
export const anonymousLoginSuccess = deviceId => ({ type: ANONYMOUS_LOGIN_SUCCESS, deviceId });
export const anonymousLoginFailure = error => ({ type: ANONYMOUS_LOGIN_FAILURE, error });

export const handleAnonymousLogin = data => {
  return async dispatch => {
    dispatch(initiateAnonymousLogin());
    try {
      const response = await useJwt.anonymousLogin(data);
      if (response?.data) {
        const { token } = response.data;
        localStorage.setItem('AnonymousToken', token);
        const decoded = jwt_decode(token);

        dispatch(anonymousLoginSuccess(decoded));
      }
    } catch (err) {
      if (err.response) {
        dispatch(anonymousLoginFailure(err.response.data));
      }
    }
  };
};
