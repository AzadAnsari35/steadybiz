import routes from './routes';
import { isDevelopment } from 'Helpers/utils';
export const refreshRoutes = (path) => {
  //console.log(path);
  const common = routes.common;
  const flight = routes.flight;
  const transaction = routes.transaction;
  const agency = routes.agency;
  //console.log(location.search);
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
    case agency.registration.toUpperCase():
      return agency.registration + location.search;
  }
  return isDevelopment() ? path + location.search : flight.search;
};
