import { PersistGate } from "@plasmohq/redux-persist/integration/react"
import { Provider } from "react-redux"

import { CounterView } from "./counter"
import { persistor, store } from "./redux/store"

function Options() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CounterView />
      </PersistGate>
    </Provider>
  )
}

export default Options