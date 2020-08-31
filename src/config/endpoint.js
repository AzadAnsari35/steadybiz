import config from './index';
import { actionTypeConstant, commonConstant } from 'Constants/';
export default {
  orders: {
    searchOrders: {
      url: config.api.url + '/api/v1/orders/searchOrder',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.orders.searchOrders,
      reducerName: 'ordersSearchOrders',
    },
    viewOrder: {
      url: config.api.url + '/api/v1/orders/viewOrder',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.transaction,
      reducerName: 'transaction',
    },
  },
  flights: {
    airportSuggestions: {
      url: config.api.url + '/api/v1/flights/airportSuggestions',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.flights.airportSuggestions,
      reducerName: 'airportSuggestions',
    },
    flightSearchResult: {
      actionType: actionTypeConstant.override.searchResult,
      actualActionType: 'flights.flightSearchResult',
    },
    flightRevalidate: {
      url: config.api.url + '/flights/flightRevalidate',
      isAuth: true,
    },
    flightSelect: {
      url: config.api.url + '/api/v1/flights/flightSelect',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.flights.flightSelect,
    },
    flightSearch: {
      url: config.api.url + '/api/v1/flights/flightSearch',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.flights.flightSearch,
    },
    fareRules: {
      url: config.api.url + '/api/v1/flights/fareRules',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.flights.fareRules,
      reducerName: 'fareRules',
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
      reducerName: 'masterCountries',
    },
    cities: {
      url: config.api.url + '/api/v1/master/cities',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.master.cities,
    },

    allCities: {
      url: config.api.url + '/api/v1/master/cities',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.allCities,
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
    settlementPlans: {
      url: config.api.url + '/api/v1/master/settlementplans',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.settlementPlans,
    },
    paymentModes: {
      url: config.api.url + '/api/v1/master/paymentmodes',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.master.paymentModes,
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
    changePassword: {
      url: config.api.url + '/api/v1/offices/user/changePassword',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
    createSecurityGroup: {
      url: config.api.url + '/api/v1/offices/securityGroup',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
    functionalGroups: {
      url: config.api.url + '/api/v1/offices/functionalGroupsList',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.GET,
      actionType: actionTypeConstant.office.functionalGroups,
    },

    searchSecurityGroup: {
      url: config.api.url + '/api/v1/offices/searchSecurityGroup',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.office.searchSecurityGroup,
    },
    securityGroupNameList: {
      url: config.api.url + '/api/v1/offices/securityGroupNameList',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.office.securityGroupNameList,
    },
  },

  creditLimit: {
    getInstantCreditlimit: {
      url: config.api.url + '/api/v1/creditLimit/getInstantCreditlimit',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.creditLimit.getInstantCreditlimit,
      reducerName: 'getInstantCreditLimit',
    },
    update: {
      url: config.api.url + '/api/v1/creditLimit/update',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
    },
  },
  transaction: {
    airprice: {
      url: config.api.url + '/api/v1/flights/airPrice',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.transaction,
      reducerName: 'transaction',
    },
    airTicketing: {
      url: config.api.url + '/api/v1/flights/airTicketing',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.transaction,
      reducerName: 'transaction',
    },
    airPriceAndTicketing: {
      url: config.api.url + '/api/v1/flights/airPriceAndTicketing',
      isAuth: true,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.transaction,
      reducerName: 'transaction',
    },
  },
};
