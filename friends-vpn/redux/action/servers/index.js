import useJwt from '../../../jwt/jwtService';
import {
  CLEAR_VPN_SERVER_COUNTRIES,
  GET_VPN_SERVER_COUNTRIES_FAILURE,
  GET_VPN_SERVER_COUNTRIES_INIT,
  GET_VPN_SERVER_COUNTRIES_SUCCESS
} from '../actionTypes/servers';

export const initiateServerCountriesList = () => ({ type: GET_VPN_SERVER_COUNTRIES_INIT });
export const getServerCountriesSuccess = data => ({ type: GET_VPN_SERVER_COUNTRIES_SUCCESS, payload: data });
export const getServerCountriesFailed = error => ({ type: GET_VPN_SERVER_COUNTRIES_FAILURE, payload: error });
export const clearServerCountries = () => ({ type: CLEAR_VPN_SERVER_COUNTRIES });

export const handleCountriesList = () => {
  return async dispatch => {
    dispatch(initiateServerCountriesList());
    try {
      const response = await useJwt.getVPNServerCountries();
      if (response) {
        dispatch(getServerCountriesSuccess(response.data));
      }
    } catch (err) {
      if (err.response) {
        dispatch(getServerCountriesFailed(err.response.data));
      }
    }
  };
};
