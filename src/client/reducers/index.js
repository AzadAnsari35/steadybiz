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
  overrideSelectedOption: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.override.selectedOption
  ),
  usersSignIn: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.users.signIn
  ),
  masterCountries: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.countries
  ),
  masterObjectStatuses: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.objectStatuses
  ),
});
export default rootReducer;
