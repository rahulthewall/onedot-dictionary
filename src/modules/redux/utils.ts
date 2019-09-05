import { compose } from 'redux';

type ComposeFunction = typeof compose;

/* Extend the window interface */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: ComposeFunction;
  }
}

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export { composeEnhancers };
