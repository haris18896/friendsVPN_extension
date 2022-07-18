import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import Router from 'next/router'
import NProgress from 'nprogress'

import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { wrapper, store } from '../redux/store'
import { useDispatch } from 'react-redux'
import React, { useEffect, Suspense } from 'react'

import FingerprintJS from '@fingerprintjs/fingerprintjs'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

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
