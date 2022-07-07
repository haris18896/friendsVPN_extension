/* eslint-disable react-hooks/exhaustive-deps */
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import jwt_decode from 'jwt-decode'
import useJwt from '../jwt/jwtService'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

import { Provider } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Suspense, useEffect } from 'react'

import { wrapper, store } from '../redux/store'
import { SET_ANONYMOUS_LOGGED_IN_USER, SET_LOGGED_IN_USER, USER_LOGGED_IN_SUCCESS } from '../redux/action/actionTypes/Auth'
import { CookiesProvider } from 'react-cookie'

NProgress.configure({ showSpinner: false })

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const fpPromise = FingerprintJS.load()

    fpPromise
      .then(fp => fp.get())
      .then(result => {
        const visitor = result.visitorId
        localStorage.setItem('visitor', visitor)
      })
  }, [])

  useEffect(() => {
    if (useJwt.getToken()) {
      const token = useJwt.getToken()
      const decode = jwt_decode(token)
      dispatch({ type: SET_LOGGED_IN_USER, payload: decode })
      dispatch({ type: USER_LOGGED_IN_SUCCESS, payload: decode })
    } else if (useJwt.getAnonymousToken()) {
      const token = useJwt.getAnonymousToken()
      const decode = jwt_decode(token)
      dispatch({ type: SET_ANONYMOUS_LOGGED_IN_USER, payload: decode })
    }
  }, [])

  Router.events.on('routeChangeStart', url => {
    NProgress.start(url)
  })
  Router.events.on('routeChangeComplete', url => {
    NProgress.done(url)
  })

  return (
    <ErrorBoundary fallback={'ErrorFallback'}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Provider store={store}>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </Provider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default wrapper.withRedux(MyApp)
