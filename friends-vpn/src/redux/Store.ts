import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, RESYNC, persistReducer, persistStore } from '@plasmohq/redux-persist'
import { Storage } from '@plasmohq/storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import { localStorage } from 'redux-persist-webextension-storage'
import { vpnServerCountriesReducer } from './reducer/servers'
import { anonymousLoginReducer, getCustomerProfileReducer, loginReducer } from './reducer/Auth/authReducer'

const rootReducer = combineReducers({
  auth: loginReducer,
  anonymous: anonymousLoginReducer,
  profile: getCustomerProfileReducer,
  servers: vpnServerCountriesReducer,
})

const persistConfig = {
  key: 'root',
  version: 1,
  storage: localStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, RESYNC],
      },
    }).concat([thunk]),
})
export const persistor = persistStore(store)

// This is what makes Redux sync properly with multiple pages
// Open your extension's options page and popup to see it in action
new Storage().watch({
  [`persist:${persistConfig.key}`]: () => {
    persistor.resync()
  },
})
