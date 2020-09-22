import routes from './routes';

export const refreshRoutes = (path) => {
  //console.log(path);
  const common = routes.common;
  const flight = routes.flight;
  const transaction = routes.transaction;
  //console.log('hi', path.toUpperCase() === transaction.viewPNR.toUpperCase());
  //return transaction.searchOrder;
  switch (path.toUpperCase()) {
    case common.passengerInformation.toUpperCase():
      return flight.search;
    case transaction.viewBooking.toUpperCase():
    case transaction.issueTicket.toUpperCase():
    case transaction.viewPNR.toUpperCase():
    case transaction.viewOrder.toUpperCase():
    case transaction.cancelPNR.toUpperCase():
      //console.log('hii');
      return transaction.searchOrder;
    case transaction.searchOrder:
      return transaction.searchOrder;
  }
  return;
};
