import { persistor, store } from './redux/store'

persistor.subscribe(() => {
  console.log('State changed with: ', store?.getState())
})
