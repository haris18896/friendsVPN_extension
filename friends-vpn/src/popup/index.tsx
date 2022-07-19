import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import { Provider } from "react-redux"
import { persistor, store } from '~redux/Store'
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { MemoryRouter } from "react-router-dom"
import { Routing } from '../routes'

function IndexPopup() {

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