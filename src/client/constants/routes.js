const routes = {
  home: 'Home',

  user: {
    signIn: '/User/SignIn',
    signOut: '/User/SignOut',
  },

  common: {
    passengerInformation: '/Common/Passenger-Info',
  },
  office: {
    registration: '/Office/Registration',
    searchOffice: '/Office/Search-Office',
    updateOffice: '/Office/Update-Office',
    searchUserGroup: '/Office/User/Search-Group',
    updateUserGroup: '/Office/User/Update-Group',
    searchOfficeUser: '/Office/Search-User',
    createOfficeUser: '/Office/User/Create-User',
    viewOfficeUser: '/Office/User/View-User',
    updateOfficeUser: '/Office/User/Update-User',
    changePassword: '/Office/User/Change-Password',
    forgotPassword: '/Office/User/Forgot-Password',
    searchCreditLimit: '/Office/Search-Credit-Limit',
    creditLimitBalance: '/Office/Credit-Limit-Balance',
    updateCreditLimit: '/Office/Update-Credit-Limit',
    creditLimitHistory: '/Office/Credit-Limit-History',
    creditLimitBreakup: '/Office/Credit-Limit-Breakup',
  },
  flight: {
    search: '/Flight/Search',
    availability: '/Flight/Availability',
  },
  transaction: {
    searchOrder: '/Transaction/Search-Order',
    viewOrder: '/Transaction/View-Order',
    updateOrder: '/Transaction/Update-Order',
    issueTicket: '/Transaction/Issue-Ticket',
    viewBooking: '/Transaction/View-Booking',
  },
};

export default routes;
