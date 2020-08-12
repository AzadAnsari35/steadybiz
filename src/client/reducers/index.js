import { combineReducers } from 'redux';

import { actionTypeConstant } from 'Constants/';
import { reducerState, createFilteredReducer } from './commonReducer';

// export default combineReducers({
//     listData: demoListReducer

// });

const rootReducer = combineReducers({
  loaderStatus: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.loader.loaderStatus
  ),
  toastStatus: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.toast.toastStatus
  ),
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
  flightSelect: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.flightSelect
  ),
  passengerInformationData: createFilteredReducer(
    reducerState,
    (action) =>
      action.type === actionTypeConstant.common.passengerInformationData
  ),
  transaction: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.transaction
  ),
  overrideSelectedOption: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.override.selectedOption
  ),
  usersSignIn: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.users.signIn
  ),
  getInstantCreditLimit: createFilteredReducer(
    reducerState,
    (action) =>
      action.type === actionTypeConstant.creditLimit.getInstantCreditlimit
  ),
  masterCountries: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.countries
  ),
  masterCities: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.cities
  ),
  masterSettlementPlans: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.settlementPlans
  ),
  masterObjectStatuses: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.objectStatuses
  ),

  searchOffice: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.searchOffice
  ),
  searchUser: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.searchUser
  ),
  masterAirlines: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.airlines
  ),
});
export default rootReducer;
