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
  const token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJ1c2VySWRcIjpcIjc5NGQ2ZDAzLTM2N2EtNDk1OS04NDBlLTY0Mzk0NzcxMjM1OFwiLFwib2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJyb290T2ZJZFwiOlwiOWNhZTU0YzYtYmI1Zi00NWEzLWEzNTQtZDAxOGVjN2E0NDk4XCIsXCJwYXJlbnRPZklkXCI6XCI5Y2FlNTRjNi1iYjVmLTQ1YTMtYTM1NC1kMDE4ZWM3YTQ0OThcIixcImlzTWFzdGVyXCI6dHJ1ZSxcImZ1bmN0aW9uR3JvdXBzXCI6W119IiwiZXhwIjoxNTk1NTI2MTQyLCJpYXQiOjE1OTU0Mzk3NDJ9.v55hnqenTasRO54FP35xGhn6uog-73FwF20cIioQxu7_ZSxTR1XTv0e8a19xfjtozppYhUIS7HQr3tNRLRFQkA';
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
export const selectedItem=(searchResult,rowNumber)=>
{
  return searchResult.items!=null? searchResult.items.data.data[rowNumber-1]:null;
}