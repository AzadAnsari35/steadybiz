import config from './index';
import { actionTypeConstant, commonConstant } from 'Constants/';
export default {
  flights: {
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
      httpVerb: commonConstant.HttpVerbsConstant.GET,
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
    },
  },
};
