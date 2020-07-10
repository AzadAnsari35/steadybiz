import config from "Config/";
export const displayImage = (name, path = "images") => {
  return "/public/assets/" + path + "/" + name;
};
export const isLogin = () => {
  return true;
};
export const isDevelopment = () => {
  return config.mode.environment !== "production";
};
