import { MAIN_SERVICE_URL } from './consts/index'

const apiEndPoints = {
  typeJWT: 'JWT',
  typeBearer: 'Bearer',
  loginEndpoint: `${MAIN_SERVICE_URL}/vpn/customer/loginCustomer`,
  getCustomerProfile: `${MAIN_SERVICE_URL}/vpn/customer/getCustomerProfile`,
  getVPNServerCountriesEndPoint: `${MAIN_SERVICE_URL}/vpn/vpn/getVPNServerCountries`,
  loginAnonymousCustomerEndPoint: `${MAIN_SERVICE_URL}/vpn/customer/loginAnonymousCustomer`,
  // getIPAddressEndPoint: `https://geolocation-db.com/json/86f5f280-f4eb-11ec-8676-4f4388bc6daa`,
}

export default apiEndPoints
