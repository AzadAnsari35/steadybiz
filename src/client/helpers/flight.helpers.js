import { cabinClasses } from "Constants/flight.constant";

export const getCabinClassName = (code) => {
  return cabinClasses.map(
    (cabinclass) => cabinclass.CODE === code && cabinclass.NAME
  );
};