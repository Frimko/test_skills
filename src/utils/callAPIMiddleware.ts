import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import merge from 'lodash/merge';
import { AxiosRequestConfig } from 'axios';
import { Middleware } from 'redux';

import API from './API';
import invariant from './invariant';

type CallAPIFunc = () => Promise<({ data: any })>;
type Config = { url: string } & AxiosRequestConfig;

type Funct = (data: any) => any;

export type CallAPIMiddlewareAction = {
  types: [any, any, any],
  callAPI: CallAPIFunc | Config,
  payload?: Object,
  parseResponse?: Funct,
  cancelPrevRequest?: boolean,
  onSuccess?: (payload: {} | any) => void,
  onError?: (error: Error) => void,
};


type CallAPIRequestReturnType<T, P extends Object> = {
  type: T,
  payload: P
};

type CallAPISuccessReturnType<T, P extends Object, GParseResponseReturn> = {
  type: T,
  payload: P & GParseResponseReturn
};

type CallAPIFailureTypeReturnType<T, P extends Object> = {
  type: T,
  payload: {
    error: string,
  } & P,
  error: Error,
};

/**
 * @param GTypes - массив типов экшнов
 * @param GPayload - payload
 * @param GParseResponseReturn - возвращеное значение parseResponse
 */
export type CallAPIActionType<
  GTypes extends Array<any>,
  GPayload extends Object,
  GParseResponseReturn
  > =
  CallAPIRequestReturnType<GTypes[0], GPayload>
  | CallAPISuccessReturnType<GTypes[1], GPayload, GParseResponseReturn>
  | CallAPIFailureTypeReturnType<GTypes[3], GPayload>;

const callAPIMiddleware: Middleware = ({ dispatch }) => (next) =>
  async (action: CallAPIMiddlewareAction) => {
    if (!action.types) {
      return next(action as any);
    }

    const {
      types,
      callAPI,
      payload = {},
      parseResponse = (r: any) => r,
      cancelPrevRequest = false,
      onSuccess,
      onError,
    } = action;

    invariant(isFunction(parseResponse), 'parseResponse — функция');

    invariant(
      Array.isArray(types)
        && types.length === 3
        && types.every(type => isString(type)),
      'types — массив из трёх строк',
    );

    invariant(
      // @ts-ignore
      isFunction(callAPI) || (callAPI.url && callAPI.method),
      'callAPI — функция, возвращающая Promise или объект с полями url и method',
    );

    const [requestType, successType, failureType] = types;

    if (!isFunction(callAPI) && !!callAPI.url && cancelPrevRequest) {
      API.cancelRequest({ url: callAPI.url });
    }

    dispatch({
      type: requestType,
      payload,
    });

    const request = !isFunction(callAPI) ? () => API.request(callAPI) : callAPI;

    try {
      const response = await request();
      const successAction = merge(
        { payload: { ...payload } },
        {
          type: successType,
          payload: parseResponse(response.data) || {},
        },
      );

      if (onSuccess) {
        onSuccess(successAction.payload);
      }

      dispatch(successAction);

      return successAction.payload;
    } catch (error) {
      if (API.isCancel(error)) {
        return { canceled: true };
      }

        console.error(error.message); // eslint-disable-line

      if (onError) {
        onError(error);
      }

      dispatch({
        type: failureType,
        payload: {
          error: error.message,
          ...payload,
        },
        error,
      });

      return { error };
    }
  };

export default callAPIMiddleware;
