import { createStore } from 'redux';
// import { devToolsEnhancer } from "redux-devtools-extension";

import { rootReducer } from './rootReducer';
import { RootAction, RootState } from './types';

// rehydrate state on app start
const initialState = {};

// Fix window
declare let window: any;

// create store
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
