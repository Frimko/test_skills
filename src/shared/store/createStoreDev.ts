import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import callAPIMiddleware from 'utils/callAPIMiddleware';

import rootReducer from '../reducers/index';

const configureStore = () => {
  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  // @ts-ignore
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  const middlewares = [
    thunkMiddleware,
    callAPIMiddleware,
  ];

  return composeEnhancers(
    applyMiddleware(...middlewares),
  )(createStore)(rootReducer);
};

export default configureStore;
