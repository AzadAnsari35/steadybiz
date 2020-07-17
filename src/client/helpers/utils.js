import config from 'Config/';
import endpoint from 'Config/endpoint';
export const displayImage = (name, path = 'images') => {
  return '/public/assets/' + path + '/' + name;
};
export const isLogin = () => {
  return true;
};
export const isDevelopment = () => {
  return config.mode.environment !== 'production';
};
export const showError = (exception, errorMessage) => {
  errorMessage(exception.message);
};
export const getItemFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const appendHeader = (endpoint) => {
  //const token =getItemFromLocalStorage('userToken');
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcIjc5NGQ2ZDAzLTM2N2EtNDk1OS04NDBlLTY0Mzk0NzcxMjM1OFwiLFwib2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJyb290T2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJwYXJlbnRPZklkXCI6XCI5Y2FlNTRjNi1iYjVmLTQ1YTMtYTM1NC1kMDE4ZWM3YTQ0OThcIixcImlzTWFzdGVyXCI6dHJ1ZSxcImZ1bmN0aW9uR3JvdXBzXCI6W119IiwiZXhwIjoxNTk1MDY3MzQ3LCJpYXQiOjE1OTQ5ODA5NDd9.Fvio96Klms_kBkuT4dRMoeCNTFGh_zeLloVfTuER13Wvz6uJEisyA61Z2tsLZ0HNf8u2jslZx60p0bE2b0NxEw';
  return {
    'Content-Type': 'application/json',
    ...(endpoint.isAuth && { Authorization: `Bearer ${token}` }),
  };
};
export const checkError = (apiResponse) => {
  if (!apiResponse.items.success) {
    alert(apiResponse.items.error);
    return apiResponse.items.error.message;
  } else return '';
};
