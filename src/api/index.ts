import api from 'utils/API';
import { AxiosPromise } from 'axios';

/* const endpoint = 'http://localhost:8000/api/';

const publicApi = {
  baseURL: endpoint,
  timeout: 5000,
}; */


type GetAllItemsReturnItemType = {
  id: number,
  name: string,
  address: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};
export type GetAllItemsReturnType = {
  items: GetAllItemsReturnItemType[],
  pages: number
};

export const getAllItems = (page: number): AxiosPromise<GetAllItemsReturnType> =>
  api.get({ url: `customers?page=${page}` });


export const getItem = (id: number) => api.get({ url: `/customers/${id}` });
export const deleteItem = (id: number) => api.delete({ url: `/customers/${id}` });

type CustomerParams = { name: string, address: string, phone: string };

export const addCustomer = ({
  name, address, phone,
}: CustomerParams) => api.post({
  url: '/customers',
  params: {
    name, address, phone,
  },
});

export const updateCustomer = (id: number, {
  name, address, phone,
}: CustomerParams) => api.put({
  url: `/customers/${id}`,
  params: {
    name, address, phone,
  },
});
