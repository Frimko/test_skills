/// <reference types="react-scripts" />

import reactRedux from 'react-redux';
import { AnyAction } from 'redux';
import { CallAPIMiddlewareAction } from 'utils/callAPIMiddleware';

type ActionType = AnyAction | CallAPIMiddlewareAction
type Dispatch = (action: ActionType) => Promise<any>;

declare module 'react-redux' {
  // export function useDispatch(): ActionType;
  export function useDispatch(): Dispatch;

  export default reactRedux;
}
