export const HttpVerbsConstant = {
  GET: 0,
  POST: 1,
  PUT: 2,
  DELETE: 3,
};

export const dropDownParam = {
  countries: { label: 'countryname', value: 'countryCode' },
  countriesDialCode: {
    label: 'countryname',
    value: 'countryIsdCode',
    subValue: 'countryCode',
  },
  objectStatuses: { label: 'objectStatusDesc', value: 'objectStatusId' },
};

export const titles = [
  { label: 'Mr', value: 'Mr' },
  { label: 'Mrs', value: 'Mrs' },
];

export const numberOfUsers = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '10', value: '10' },
];

export const loaderTypes = {
  primary: 'primary',
  linearProgress: 'linearProgress',
};
