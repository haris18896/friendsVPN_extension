// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import debounce from 'lodash.debounce';
import { createWrapper } from 'next-redux-wrapper';
import { batchedSubscribe } from 'redux-batched-subscribe';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { vpnServerCountriesReducer } from './reducer/servers';
import { anonymousLoginReducer, getCustomerProfileReducer, loginReducer } from './reducer/Auth/authReducer';

const rootReducer = combineReducers({
  auth: loginReducer,
  anonymous: anonymousLoginReducer,
  profile: getCustomerProfileReducer,
  servers: vpnServerCountriesReducer
});

const preloadedState = {
  auth: {
    inProcess: false,
    success: false,
    error: null
  },
  anonymous: {
    deviceId: ''
  },
  profile: {
    name: 'User Name',
    email: 'User Email'
  }
};

const debounceNotify = debounce(notify => notify());

export const store = configureStore({
  preloadedState,
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([thunk]),
  enhancers: [batchedSubscribe(debounceNotify)],
  devTools: process.env.NODE_ENV !== 'production',
  serializableCheck: false
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
