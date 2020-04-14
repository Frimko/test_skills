import { createSelector } from 'reselect';

// eslint-disable-next-line import/no-cycle
import { AppState } from 'shared/reducers';

import { TableStateType } from './reducers/table.reducer';

export const customersItemsSelector = (state: AppState): TableStateType => state.customers.table;

export const getError = createSelector(
  customersItemsSelector,
  (table) => table.errorText,
);
export const byId = createSelector(
  customersItemsSelector,
  (table) => table.items.byId,
);

export const ids = createSelector(
  customersItemsSelector,
  (table) => table.items.ids,
);

export const items = createSelector(
  ids,
  byId,
  // eslint-disable-next-line no-shadow
  (ids, byId) => ids.map(id => byId[id]),
);

export const curPage = createSelector(
  customersItemsSelector,
  (customers) => customers.curPage,
);

export const isLoading = createSelector(
  customersItemsSelector,
  (customers) => customers.isLoading,
);

export const pagesCount = createSelector(
  customersItemsSelector,
  (customers) => customers.pageCount,
);
