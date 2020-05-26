import _omit from 'lodash/omit';

import * as api from 'api';

import * as types from '../customers.actionTypes';
import { Actions } from '../customers.actions';

export type TableStateType = {
  items: {
    byId: {
      [key: string]: api.GetAllItemsReturnItemType
    },
    ids: number[],
  },
  isLoading: boolean,
  pageCount: number,
  curPage: number,
  errorText: null | string,
};

const initialState: TableStateType = {
  items: {
    byId: {},
    ids: [],
  },
  isLoading: false,
  pageCount: 0,
  curPage: 0,
  errorText: null,
};

export default (state = initialState, action: Actions): TableStateType => {
  switch (action.type) {
    case types.SELECT_CUSTOMERS:
      return {
        ...state,
        errorText: null,
        isLoading: true,
        curPage: action.payload.page,
      };
    case types.SELECT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: action.payload.items,
        curPage: action.payload.page,
      };
    case types.SET_ITEM_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items: {
          ids: [
            ...state.items.ids,
            action.payload.item.id,
          ],
          byId: {
            ...state.items.byId,
            [action.payload.item.id]: action.payload.item,
          },
        },
      };
    case types.EDIT_ITEM_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items: {
          ...state.items,
          byId: {
            ...state.items.byId,
            [action.payload.id]: action.payload,
          },
        },
      };
    case types.DELETE_ITEM_CUSTOMERS_SUCCESS:
      return {
        ...state,
        items: {
          byId: _omit(state.items.byId, action.payload.id),
          ids: state.items.ids.filter(id => id !== action.payload.id),
        },
      };
    case types.EDIT_ITEM_CUSTOMERS:
    case types.SELECT_CUSTOMERS_FAILURE:
      return {
        ...state,
        isLoading: false,
      };


    default:
      return state;
  }
};

/*
export default createReducer({
  [fetch]: (state, payload) => ({
    ...state,
    ...payload,
    curPage: payload,
  }),
  [fetched]: (state, payload) => ({
    ...state,
    ...payload,
    errorText: null,
  }),
  [fetchError]: (state, payload) => ({
    ...state,
    errorText: payload,
  }),
  [deleteItemError]: (state, payload) => ({
    ...state,
    errorText: payload,
  }),
  [deleteItemSuccess]: (state, payload) => {
    const ids = state.items.ids.filter(item => {
      return item !== payload.id;
    });
    delete state.items.byId[payload.id];
    return {
      ...state,
      errorText: null,
      items: {
        ...state.items,
        byId: state.items.byId,
        ids,
      },
    };
  },
  [editItemTable]: (state, payload) => {
    return {
      ...state,
      items: {
        ...state.items,
        byId: {
          ...state.items.byId,
          [payload.id]: payload.data,
        },
      },
    };
  },
}, initialState);
*/
