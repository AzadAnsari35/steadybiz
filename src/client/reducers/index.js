import { combineReducers } from 'redux';

import { actionTypeConstant } from 'Constants/';
import { reducerState, createFilteredReducer } from './commonReducer';

// export default combineReducers({
//     listData: demoListReducer

// });
const commonType = (actionConstant) => {
  return createFilteredReducer(
    reducerState,
    (action) => action.type === actionConstant
  );
};
const rootReducer = combineReducers({
  // ordersSearchOrders: createFilteredReducer(
  //   reducerState,
  //   (action) => action.type === actionTypeConstant.orders.searchOrders
  // ),

  ordersSearchOrders: commonType(actionTypeConstant.orders.searchOrders),

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
  airportSuggestions: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.airportSuggestions
  ),
  flightSearchInput: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.flightSearchInput
  ),
  flightSearch: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.flightSearch
  ),
  fareRules: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.flights.fareRules
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

  creditLimitHistory: commonType(actionTypeConstant.office.creditLimitHistory),

  searchAgency: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.agency.searchAgency
  ),
  searchUser: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.searchUser
  ),
  masterAirlines: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.airlines
  ),
  funtionalGroups: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.functionalGroups
  ),
  searchSecurityGroup: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.searchSecurityGroup
  ),
  securityGroupNameList: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.office.securityGroupNameList
  ),
  masterPaymentModes: createFilteredReducer(
    reducerState,
    (action) => action.type === actionTypeConstant.master.paymentModes
  ),
});
export default rootReducer;
