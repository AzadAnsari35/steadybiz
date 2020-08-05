import config from './index';
import { actionTypeConstant, commonConstant } from 'Constants/';
export default {
  flights: {
    flightSearchResult: {
      actionType: actionTypeConstant.override.searchResult,
      actualActionType: 'flights.flightSearchResult',
    },
    flightRevalidate: {
      url: config.api.url + '/flights/flightRevalidate',
      isAuth: true,
    },
    flightSelect: {
      url: config.api.url + '/flights/flightSelect',
      isAuth: true,
    },
    flightSearch: {
      url: config.api.url + '/api/v1/flights/flightSearch',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.flights.flightSearch,
    },
  },
  user: {
    login: {
      url: config.api.url + '/api/v1/user/login',
      isAuth: false,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.users.signIn,
    },
  },
  master: {
    countries: {
      url: config.api.url + '/api/v1/master/countries',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.countries,
    },
    objectStatuses: {
      url: config.api.url + '/api/v1/master/objectstatuses',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.objectStatuses,
    },
    airlines: {
      url: config.api.url + '/api/v1/master/airlines',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.airlines,
      reducerName: 'masterAirlines',
    },
  },

  office: {
    searchUser: {
      url: config.api.url + '/api/v1/offices/user/searchUser',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.office.searchUser,
      actualActionType: actionTypeConstant.office.searchUser,
    },
    createUser: {
      url: config.api.url + '/api/v1/offices/user/createUser',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
    updateUser: {
      url: config.api.url + '/api/v1/offices/user/updateUser',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.override.selectedOption,
      actualActionType: actionTypeConstant.office.updateUser,
    },
    viewUser: {
      url: config.api.url + '/api/v1/offices/user/viewUser/',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.override.selectedOption,
      actualActionType: actionTypeConstant.office.viewUser,
    },
    searchOffice: {
      url: config.api.url + '/api/v1/offices/searchOffice',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.office.searchOffice,
    },
    viewOffice: {
      url: config.api.url + '/api/v1/offices/viewOffice',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
    createOffice: {
      url: config.api.url + '/api/v1/offices',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
    updateOffice: {
      url: config.api.url + '/api/v1/offices',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.PUT,
    },
  },

  creditLimit: {
    getInstantCreditlimit: {
      url: config.api.url + '/api/v1/creditLimit/getInstantCreditlimit',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.creditLimit.getInstantCreditlimit,
    },
  },
};
