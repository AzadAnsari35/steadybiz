const routes = {
  home: 'Home',

  user: {
    signIn: '/User/SignIn',
    signOut: '/User/SignOut',
    resetPassword: '/User/Reset-Password',
  },

  common: {
    passengerInformation: '/Common/Passenger-Info',
  },

  agency: {
    searchAgency: '/Agency/Search-Agency',
    viewAgency: '/Agency/View-Agency',
    createAgency: '/Agency/Create-Agency',
    updateAgency: '/Agency/Update-Agency',
    searchDeals: '/Agency/Search-Deals',
    createDeal: '/Agency/Create-Deal',
    viewDeal: '/Agency/View-Deal',
    modifyDeal: '/Agency/Update-Deal',
    dealHistory: '/Agency/Deal-History',
  },

  office: {
    registration: '/Office/Registration',
    searchOffice: '/Office/Search-Office',
    viewOffice: '/Office/View-Office',
    createOffice: '/Office/Create-Office',
    updateOffice: '/Office/Update-Office',
    searchUserGroup: '/Office/User/Search-Group',
    updateUserGroup: '/Office/User/Update-Group',
    searchSecurityGroup: '/Office/User/Search-Group',
    createSecurityGroup: '/Office/User/Create-Group',
    viewSecurityGroup: '/Office/User/View-Group',
    updateSecurityGroup: '/Office/User/Update-Group',
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
