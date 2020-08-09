import { actionTypeConstant } from 'Constants/';

export default {
  flights: {
    flightSearchInput: {
      actionType: actionTypeConstant.flights.flightSearchInput,
      reducerName: 'flightSearchInput',
    },
    flightSelect: {
      actionType: actionTypeConstant.flights.flightSelect,
      reducerName: 'flightSelect',
    },
  },
  loader: {
    loaderStatus: {
      actionType: actionTypeConstant.loader.loaderStatus,
      reducerName: 'loaderStatus',
    },
  },
  toast: {
    toastStatus: {
      actionType: actionTypeConstant.toast.toastStatus,
      reducerName: 'toastStatus',
    },
  },
  common: {
    passengerInformationData: {
      actionType: actionTypeConstant.common.passengerInformationData,
      reducerName: 'passengerInformationData',
    },
  }
};
