export const regex = {
  email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  name: /^[a-z|A-Z]+(?: [a-z|A-Z]+)*$/,
  number: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9 ]+$/,
};
