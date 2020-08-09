const validateEmail = email => {
  const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EMAIL_REGEX.test(email);
};

const validateMobileNumber = number => {
  const MOBILE_NUMBER_REGEX = /^\d{7,15}$/;
  return MOBILE_NUMBER_REGEX.test(number);
};

const validateFirstName = name => {
  const FIRST_NAME_REGEX = /^[a-z|A-Z]+(?: [a-z|A-Z]+)*$/;
  return FIRST_NAME_REGEX.test(name);
};

const validateLastName = name => {
  const LAST_NAME_REGEX = /^[A-Za-z]+$/;
  return LAST_NAME_REGEX.test(name);
};

export {
  validateEmail,
  validateMobileNumber,
  validateFirstName,
  validateLastName,
};