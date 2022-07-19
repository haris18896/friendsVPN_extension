import {useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'

import FingerprintJS from '@fingerprintjs/fingerprintjs'

import { Routing } from '../routes'
import { Provider } from "react-redux"
import { persistor, store } from '~redux/Store'
import { MemoryRouter } from "react-router-dom"
import { PersistGate } from "@plasmohq/redux-persist/integration/react"


function IndexPopup() {
  useEffect(() => {
    const fpPromise = FingerprintJS.load()
    fpPromise
      .then(fp => fp.get())
      .then(result => {
        const visitor = result.visitorId
        localStorage.setItem('visitor', visitor)
      })
  }, [])

  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MemoryRouter>
          <Routing />
        </MemoryRouter>
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup