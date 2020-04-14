import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { useMount } from 'react-use';

import { AppState } from 'shared/reducers';
import Page from 'ui/layouts/page';

import { customersActions, customersSelectors } from './redux';
import Table from './table';


type GetAllItemsReturnItemType = {
  id: number,
  name: string,
  address: string,
  phone: string,
  createdAt: string,
  updatedAt: string,
};

const FormikTest: React.FC = () => {
  const dispatch = useDispatch();

  useMount(() => dispatch(customersActions.getAllItems()));
  const items: GetAllItemsReturnItemType[] = useSelector((state: AppState) => customersSelectors.items(state));
  const curPage = useSelector((state: AppState) => customersSelectors.curPage(state));
  const isLoading = useSelector((state: AppState) => customersSelectors.isLoading(state));

  const handleChangePage = (page: number) => dispatch(customersActions.getAllItems({ page }));

  return (
    <Page title="FormikTest">
      <Table
        items={items}
        onAdd={console.log}
        isLoading={isLoading}
        page={curPage}
        onChangePage={handleChangePage}
      />
    </Page>
  );
};

export default FormikTest;
