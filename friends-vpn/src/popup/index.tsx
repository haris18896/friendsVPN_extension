
import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { Provider } from "react-redux"

import { persistor, store } from "../../redux/store"

import MyApp from '../pages/_app'
function IndexPopup() {
  return  (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyApp />
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup
