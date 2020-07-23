import { combineReducers } from 'redux';

import { actionTypeConstant } from 'Constants/';
import { reducerState, createFilteredReducer } from './commonReducer';

// export default combineReducers({
//     listData: demoListReducer

// });

const rootReducer = combineReducers({
  overrideSearchResult: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.override.searchResult
  ),
  flightSearchInput: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.flightSearchInput
  ),
  flightSearch: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.flightSearch
  ),
  usersSignIn: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.users.signIn
  ),
  masterCountries: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.countries
  ),
});
export default rootReducer;
