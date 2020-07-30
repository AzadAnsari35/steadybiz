import { actionTypeConstant } from 'Constants/';

export default {
  flights: {
    flightSearchInput: {
      actionType: actionTypeConstant.flights.flightSearchInput,
      reducerName: "flightSearchInput",
    },
  },
  loader: {
    loaderStatus: {
      actionType: actionTypeConstant.loader.loaderStatus,
      reducerName: "loaderStatus",
    }
  }
};
