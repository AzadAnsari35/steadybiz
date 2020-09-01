const securityOptionConstant = {
  office: {
    searchUser: {
      securityNumber: 20,
    },
    createUser: {
      securityNumber: 18,
    },
    updateUser: {
      securityNumber: 5,
    },
    viewUser: {
      securityNumber: 8,
    },
    searchOffice: {
      securityNumber: 14,
    },
    viewOffice: {
      securityNumber: 15,
    },
    createOffice: {
      securityNumber: 11,
    },
    updateOffice: {
      securityNumber: 16,
    },
    changePassword: {
      securityNumber: 17,
    },
    createSecurityGroup: {
      securityNumber: 13,
    },

    searchSecurityGroup: {
      securityNumber: 12,
    },
    viewSecurityGroup: {
      securityNumber: 1,
    },

    updateSecurityGroup: {
      securityNumber: 7,
    },
    manageProfile: {
      securityNumber: 19,
    },
  },
  flights: {
    flightSearch: {
      securityNumber: 2,
    },
    selectFlight: {
      securityNumber: 51,
    },
    fareRules: {
      securityNumber: 52,
    },
    createOrder: {
      securityNumber: 6,
    },
    issueTicket: {
      securityNumber: 3,
    },
  },
  transaction: {
    searchOrder: { securityNumber: 9 },
    viewOrder: { securityNumber: 10 },
    viewBooking: { securityNumber: 4 },
  },
};
export default securityOptionConstant;
