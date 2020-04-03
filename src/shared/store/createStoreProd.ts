import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import callAPIMiddleware from 'utils/callAPIMiddleware';

import rootReducer from '../reducers/index';

export default function create() {
  const middlewares = [
    thunkMiddleware,
    callAPIMiddleware,
  ];

  return compose(
    applyMiddleware(...middlewares),
  )(createStore)(rootReducer);
}
