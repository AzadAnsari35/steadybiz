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
    viewOffice: '/Office/View-Office',
    createOffice: '/Office/Create-Office',
    updateOffice: '/Office/Update-Office',
    searchUserGroup: '/Office/User/Search-Group',
    updateUserGroup: '/Office/User/Update-Group',
    searchOfficeUser: '/Office/User/Search-User',
    createOfficeUser: '/Office/User/Create-User',
    viewOfficeUser: '/Office/User/View-User',
    updateOfficeUser: '/Office/User/Update-User',
    manageUserProfile: '/Office/User/Manage-Profile',
    changePassword: '/Office/User/Change-Password',
    forgotPassword: '/Office/User/Forgot-Password',
    searchCreditLimit: '/Office/Search-Credit-Limit',
    creditLimitBalance: '/Office/Credit-Limit-Balance',
    manageCreditLimit: '/Office/Manage-Credit-Limit',
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
    viewPNR: '/Transaction/View-PNR',
  },
};

export default routes;
