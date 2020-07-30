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
  },

  office: {
    searchUser: {
      url: config.api.url + '/api/v1/offices/user/searchUser',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.override.searchResult,
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
