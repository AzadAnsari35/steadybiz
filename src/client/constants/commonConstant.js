export const HttpVerbsConstant = {
  GET: 0,
  POST: 1,
  PUT: 2,
  DELETE: 3,
};

export const dropDownParam = {
  countries: { label: 'countryname', value: 'countryCode' },
  cities: { label: 'cityName', value: 'cityCode' },
  countriesDialCode: {
    label: 'countryname',
    value: 'countryIsdCode',
    subValue: 'countryCode',
  },
  airlines: { label: 'airlineName', value: 'airlineCode' },
  objectStatuses: { label: 'objectStatusDesc', value: 'objectStatusId' },
  paymentModes: {
    label: 'creditLimitPaymentModeDesc',
    value: 'creditLimitPaymentModeId',
  },
};

export const titles = [
  { label: 'Mr', value: 'Mr' },
  { label: 'Mrs', value: 'Mrs' },
];

export const numberOfUsers = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  { label: '10', value: 10 },
];

export const officeType = [
  { label: 'Branch', value: 'B' },
  { label: 'Own', value: 'O' },
];

export const officeChannel = [
  { label: 'Sub Agency', value: 'SA' },
  { label: 'Agency', value: 'AG' },
];

export const securityGroups = [
  { label: 'Admin', value: 'Admin' },
  { label: 'Account', value: 'Account' },
];

export const loaderTypes = {
  primary: 'primary',
  linearProgress: 'linearProgress',
};

export const PAYMENT_MODE = [
  {
    ptID: '1',
    ptName: 'CreditLimit',
  },
];

export const TITLES = {
  ADT: [
    {
      label: 'Mr',
      value: 'Mr',
    },
    {
      label: 'Ms',
      value: 'Ms',
    },
    {
      label: 'Mrs',
      value: 'Mrs',
    },
  ],
  CHD: [
    {
      label: 'Mstr',
      value: 'Mstr',
    },
    {
      label: 'Miss',
      value: 'Miss',
    },
  ],
  INF: [
    {
      label: 'Mstr',
      value: 'MI',
    },
    {
      label: 'Miss',
      value: 'FI',
    },
  ],
};

export const TIME_LIMITS_LIST = [
  { label: '00:00', value: '00:00' },
  { label: '01:00', value: '01:00' },
  { label: '02:00', value: '02:00' },
  { label: '03:00', value: '03:00' },
  { label: '04:00', value: '04:00' },
  { label: '05:00', value: '05:00' },
  { label: '06:00', value: '06:00' },
  { label: '07:00', value: '07:00' },
  { label: '08:00', value: '08:00' },
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
  { label: '23:00', value: '23:00' },
];
export const PNR_STATUS = [
  { label: 'Hold', value: 'HOLD_PNR' },
  { label: 'Confirmed', value: 'BOOKED' },
  { label: 'Failed', value: 'FAILED_PNR' },
  { label: 'Rebooked', value: 'REBOOKED' },
  { label: 'Cancelled', value: 'PNR_CANCELLED' },
  { label: 'Ticket Void', value: 'TICKET_VOID' },
  { label: 'Refunded', value: 'REFUNDED' },
];
export const PNR_TYPE = [
  { value: '', label: 'Sabre' },
  { value: 'AP', label: 'Airline' },
];
export const BOOKING_CATEGORY = [
  { value: 'P', label: 'PNR' },
  { value: 'B', label: 'Booking' },
];
export const SEARCH_DATE_TYPE = [
  { value: 'T', label: 'Travel' },
  { value: 'B', label: 'Booking' },
];
export const OFFICE_CHANNEL = [
  { value: 'AG', label: 'Agency' },
  { value: 'SA', label: 'Sub Agency' },
];
export const SERVICE_TYPE = [{ value: 'FL', label: 'Flight' }];
export const DEALS_SOURCE = [
  { value: 'EA-1-0', label: 'only Aggregator' },
  { value: 'EG-0-1', label: 'only GDS' },
  { value: 'EA-1-1', label: 'both Aggregator & GDS' },
];
export const STATUS_LIST = [
  { value: '1', label: 'Active' },
  { value: '0', label: 'In-Active' },
];
