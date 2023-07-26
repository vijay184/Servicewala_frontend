// src/store/index.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import requestStatusReducer from './reducers/requestStatusReducer';

const rootReducer = combineReducers({
  requestStatus: requestStatusReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

