import config from "./index";
import { actionTypeConstant, commonConstant } from "Constants/";
export default {
  flights: {
    flightRevalidate: {
      url: config.api.url + "/flights/flightRevalidate",
      isAuth: true,
    },
    flightSelect: {
      url: config.api.url + "/flights/flightSelect",
      isAuth: true,
    },
  },
  user: {
    login: {
      url: config.api.url + "/user/login",
      isAuth: false,
      httpVerb: commonConstant.HttpVerbsConstant.POST,
      actionType: actionTypeConstant.users.signIn,
    },
  },
};
