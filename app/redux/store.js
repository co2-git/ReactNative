import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers(reducers));

// export default createStore(combineReducers(reducers));

export default createStore(persistedReducer);
