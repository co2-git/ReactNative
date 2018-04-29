import {combineReducers, createStore} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['appsInView'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

export default createStore(persistedReducer);
