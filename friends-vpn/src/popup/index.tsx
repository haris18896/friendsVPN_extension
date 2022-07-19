import IndexPage from '../pages/index';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import { Provider } from "react-redux"
import { persistor, store } from '~redux/Store'
import { PersistGate } from "@plasmohq/redux-persist/integration/react"


function IndexPopup() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexPage />
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup