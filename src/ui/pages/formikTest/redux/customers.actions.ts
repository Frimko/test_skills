import * as api from 'api';
import { CallAPIActionType, CallAPIMiddlewareAction } from 'utils/callAPIMiddleware';
import normalizeList, { NLReturnObject } from 'utils/normalizeList';

import * as types from './customers.actionTypes';

export type Actions = GetAllItemsTypes;

export type GetAllItemsTypes = CallAPIActionType<[
  typeof types.SELECT_CUSTOMERS,
  typeof types.SELECT_CUSTOMERS_SUCCESS,
  typeof types.SELECT_CUSTOMERS_FAILURE
],
{ page: number },
{ items: NLReturnObject<Pick<api.GetAllItemsReturnType, 'items'>> }>;

export const getAllItems = ({ page = 0 }: { page?: number } = {}): CallAPIMiddlewareAction => ({
  types: [
    types.SELECT_CUSTOMERS,
    types.SELECT_CUSTOMERS_SUCCESS,
    types.SELECT_CUSTOMERS_FAILURE,
  ],
  callAPI: () => api.getAllItems(page),
  payload: { page },
  parseResponse: (data: api.GetAllItemsReturnType) => ({ items: normalizeList(data.items) }),
  // parseResponse: transforms.getModelsResponse,
  cancelPrevRequest: true,
});


/*
export const getAllItems = (type) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = CUSTOMERS_FETCH_REQUEST_SUCCESS
            break;
        case 'products':
            dispatchType = PRODUCTS_FETCH_REQUEST_SUCCESS
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return (dispatch) => {
        dispatch(showSpinner);
        api.getAllItems(type)
            .then(({data}) => {
                dispatch({
                    type: dispatchType,
                    payload: data
                })
            })
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(hideSpinner)
            })
    }
}

export const deleteItem = (type, id) => {
    return (dispatch) => {
        api.deleteItem(type, id)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
            })
    }
}

export const showUpdateModal = (type, fields, id) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = SHOW_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = SHOW_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {
        type: dispatchType,
        fields: fields,
        id: id,
        isUpdateType: true
    }
}
export const showAddModal = (type, fields) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = SHOW_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = SHOW_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {
        type: dispatchType,
        fields: fields,
        isUpdateType: false
    }
}

export const hideModal = (type) => {
    let dispatchType;
    switch (type) {
        case 'customers':
            dispatchType = HIDE_CUSTOMERS_MODAL
            break;
        case 'products':
            dispatchType = HIDE_PRODUCTS_MODAL
            break;
        default:
            dispatchType = FETCH_REQUEST_FAILURE
            break;
    }
    return {type: dispatchType}
}

export const addCustomer = (data) => {
    let type = 'customers';
    return (dispatch) => {
        api.setCustomer(data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}
export const updateCustomer = (id, data) => {
    let type = 'customers';
    return (dispatch) => {
        api.updateCustomer(id, data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}

export const addProduct = (data) => {
    let type = 'products';
    return (dispatch) => {
        api.setProduct(data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
}
export const updateProduct = (id, data) => {
    let type = 'products';
    return (dispatch) => {
        api.updateProduct(id, data)
            .catch((result) => {
                dispatch({
                    type: FETCH_REQUEST_FAILURE,
                    payload: result
                })
            })
            .then(() => {
                dispatch(getAllItems(type));
                dispatch(hideModal(type));
            })
    }
} */
