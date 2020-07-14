import config from "Config/";
import endpoint from "Config/endpoint";
export const displayImage = (name, path = "images") => {
  return "/public/assets/" + path + "/" + name;
};
export const isLogin = () => {
  return true;
};
export const isDevelopment = () => {
  return config.mode.environment !== "production";
};
export const showError = (exception,errorMessage)=>
{
  errorMessage(exception.message);
};
export const getItemFromLocalStorage = (key) => {
	return localStorage.getItem(key);
};
export const appendHeader =(endpoint) =>
{
  const token =getItemFromLocalStorage('userToken');
  return {
    'Content-Type': 'application/json',
    ...(endpoint.auth && { Authorization: `Bearer ${token}` })
  };
}
export const checkError=(apiResponse) =>
{
  if (!apiResponse.items.success)
  {
    return apiResponse.items.data.message;
  }
  else
    return "";
}