
import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import { customersReducer } from 'ui/pages/formikTest/redux';

const rootReducer = combineReducers({ customers: customersReducer });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
