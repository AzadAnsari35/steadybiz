import config from 'Config/';

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
export const setItemToStorage = (key, value, storageType = 1) => {
  if (storageType === 1) sessionStorage.setItem(key, value);
  else localStorage.setItem(key, value);
};
export const getItemFromStorage = (key, storageType = 1) => {
  let item = '';
  if (storageType === 1) {
    item = sessionStorage.getItem(key);
  } else {
    item = sessionStorage.getItem(key);
  }

  return item;
};
export const appendHeader = (endpoint) => {
  //const token =getItemFromLocalStorage('userToken');
  const token = getItemFromStorage('userToken');
  //'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcIjc5NGQ2ZDAzLTM2N2EtNDk1OS04NDBlLTY0Mzk0NzcxMjM1OFwiLFwib2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJyb290T2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJwYXJlbnRPZklkXCI6XCI5Y2FlNTRjNi1iYjVmLTQ1YTMtYTM1NC1kMDE4ZWM3YTQ0OThcIixcImlzTWFzdGVyXCI6dHJ1ZSxcImZ1bmN0aW9uR3JvdXBzXCI6W119IiwiZXhwIjoxNTk0OTcxNjQwLCJpYXQiOjE1OTQ4ODUyNDB9.jLxH_aX-2Q3bZn_qXnNaJfWymtluYlm48Wu7_wk1VTlqCZr8Gs78lRzLFHRDyiCTdx19ewR-hmXW7BnEcQy6FQ';
  return {
    'Content-Type': 'application/json',
    ...(endpoint.isAuth && { Authorization: `Bearer ${token}` }),
  };
};
export const checkError = (apiResponse) => {
  if (!apiResponse.status) {
    return apiResponse.error.message;
  } else return '';
};
