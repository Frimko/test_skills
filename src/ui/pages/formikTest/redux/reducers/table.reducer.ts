import * as types from '../customers.actionTypes';
import { Actions } from '../customers.actions';

export type TableStateType = {
  items: {
    byId: {
      [key: string]: any
    },
    ids: string[],
  },
  pageCount: number,
  curPage: number,
  errorText: null | string,
};

const initialState: TableStateType = {
  items: {
    byId: {},
    ids: [],
  },
  pageCount: 0,
  curPage: 0,
  errorText: null,
};

export default (state = initialState, action: Actions): TableStateType => {
  switch (action.type) {
    case types.SELECT_CUSTOMERS:
      return {
        ...state,
        ...action.payload,
        curPage: action.payload.page,
      };

      /*
    case types.SET_TAGS_AND_META_SUCCESS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          overview: {
            ...state[payload.id].overview,
            tags: payload.tags,
            user_meta: payload.user_meta,
          },
        },
      };

    case types.CREATE_MODEL_SUCCESS:
      return {
        ...state,
        [payload.id]: payload,
      };

    case types.DELETE_MODEL_SUCCESS:
      return omit(state, payload.id);

    case types.EDIT_MODEL_SUCCESS:
    case types.GET_MODEL_OVERVIEW_SUCCESS:
    case types.GET_MODEL_DETAILS_SUCCESS:
    case types.EDIT_MODEL_DETAILS_SUCCESS:
      return {
        ...state,
        [payload.id]: {
          ...state[payload.id],
          ...payload,
        },
      };

    case types.GET_MODEL_TRAINING_SUCCESS:
      return {
        ...state,
        [payload.model.id]: {
          ...state[payload.model.id],
          ...payload.model,
        },
      };
*/

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
