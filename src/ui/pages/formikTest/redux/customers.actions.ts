import * as api from 'api';
import { CallAPIActionType, CallAPIMiddlewareAction } from 'utils/callAPIMiddleware';
import normalizeList, { NLReturnObject } from 'utils/normalizeList';

import * as types from './customers.actionTypes';

export type GetAllItemsTypes = CallAPIActionType<[
  typeof types.SELECT_CUSTOMERS,
  typeof types.SELECT_CUSTOMERS_SUCCESS,
  typeof types.SELECT_CUSTOMERS_FAILURE
],
{ page: number },
{ items: NLReturnObject<api.GetAllItemsReturnItemType, number> }>;

export const getAllItems = ({ page = 0 }: { page?: number } = {}): CallAPIMiddlewareAction => ({
  types: [
    types.SELECT_CUSTOMERS,
    types.SELECT_CUSTOMERS_SUCCESS,
    types.SELECT_CUSTOMERS_FAILURE,
  ],
  callAPI: () => api.getAllItems(page),
  payload: { page },
  parseResponse: (data: api.GetAllItemsReturnType) => ({ items: normalizeList(data.items) }),
  cancelPrevRequest: true,
});

export type AddItemTypes = CallAPIActionType<[
  typeof types.SET_ITEM_CUSTOMERS,
  typeof types.SET_ITEM_CUSTOMERS_SUCCESS,
  typeof types.SET_ITEM_CUSTOMERS_FAILURE
],
{},
{ item: api.GetAllItemsReturnItemType }>;

export const addItem = (item: api.CustomerParams): CallAPIMiddlewareAction => ({
  types: [
    types.SET_ITEM_CUSTOMERS,
    types.SET_ITEM_CUSTOMERS_SUCCESS,
    types.SET_ITEM_CUSTOMERS_FAILURE,
  ],
  callAPI: () => api.addItem(item),
  parseResponse: (data: api.GetAllItemsReturnItemType) => ({ item: data }),
  cancelPrevRequest: true,
});

export type UpdateItemTypes = CallAPIActionType<[
  typeof types.EDIT_ITEM_CUSTOMERS,
  typeof types.EDIT_ITEM_CUSTOMERS_SUCCESS,
  typeof types.EDIT_ITEM_CUSTOMERS_FAILURE
],
{},
api.GetAllItemsReturnItemType>;

export const updateItem = (id: number, data: api.CustomerParams): CallAPIMiddlewareAction => ({
  types: [
    types.EDIT_ITEM_CUSTOMERS,
    types.EDIT_ITEM_CUSTOMERS_SUCCESS,
    types.EDIT_ITEM_CUSTOMERS_FAILURE,
  ],
  callAPI: () => api.updateItem(id, data),
  cancelPrevRequest: true,
});

export type DeleteItemTypes = CallAPIActionType<[
  typeof types.DELETE_ITEM_CUSTOMERS,
  typeof types.DELETE_ITEM_CUSTOMERS_SUCCESS,
  typeof types.DELETE_ITEM_CUSTOMERS_FAILURE
],
{ id: number }>;

export const deleteItem = (itemId: number): CallAPIMiddlewareAction => ({
  types: [
    types.DELETE_ITEM_CUSTOMERS,
    types.DELETE_ITEM_CUSTOMERS_SUCCESS,
    types.DELETE_ITEM_CUSTOMERS_FAILURE,
  ],
  callAPI: () => api.deleteItem(itemId),
  parseResponse: ({ id }: { id: number }) => ({ id }),
  cancelPrevRequest: true,
});


export type Actions = GetAllItemsTypes | UpdateItemTypes | AddItemTypes | DeleteItemTypes;
