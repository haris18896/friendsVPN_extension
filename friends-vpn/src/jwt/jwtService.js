import axios from 'axios'
import jwtDefaultConfig from './jwtDefaultConfig'

class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  isAlreadyFetchingAccessToken = false

  subscribers = []

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }

    axios.interceptors.request.use(
      config => {
        const accessToken = this.getToken()
        const anonymousToken = this.getAnonymousToken()
        if (accessToken) {
          config.headers.Authorization = `JWT ${localStorage.getItem('accessToken')}`
        } else if (anonymousToken) {
          config.headers.Authorization = `JWT ${localStorage.getItem('AnonymousToken')}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {
        const { response } = error

        if (response && response.status === 406) {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token) {
    localStorage.setItem('accessToken', token)
  }

  getToken() {
    return localStorage.getItem('accessToken')
  }

  getAnonymousToken() {
    return localStorage.getItem('AnonymousToken')
  }

  login(data) {
    return axios.post(this.jwtConfig.loginEndpoint, data)
  }

  anonymousLogin(data) {
    return axios.post(this.jwtConfig.loginAnonymousCustomerEndPoint, data)
  }

  getProfile() {
    return axios.get(this.jwtConfig.getCustomerProfile)
  }

  getVPNServerCountries() {
    let endpoint = `${this.jwtConfig.getVPNServerCountriesEndPoint}?protocol=auto`
    return axios.get(endpoint)
  }

  getIPAddress() {
    return axios.get(this.jwtConfig.getIPAddressEndPoint, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
      },
    })
  }
}

const useJwt = new JwtService({})

export default useJwt
