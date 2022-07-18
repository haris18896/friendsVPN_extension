import {
  GET_VPN_SERVER_COUNTRIES_FAILURE,
  GET_VPN_SERVER_COUNTRIES_INIT,
  GET_VPN_SERVER_COUNTRIES_SUCCESS
} from '../../action/actionTypes/servers';

export const vpnServerCountriesReducer = (state = { countries: [] }, action) => {
  switch (action.type) {
    case GET_VPN_SERVER_COUNTRIES_INIT:
      return { ...state, loading: true };
    case GET_VPN_SERVER_COUNTRIES_SUCCESS:
      return { ...state, loading: false, countries: action.payload.countries };
    case GET_VPN_SERVER_COUNTRIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
