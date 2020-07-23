export const cabinClasses = [
  { ID: 1, NAME: "Economy", CODE: "Y" },
  { ID: 2, NAME: "Premium Economy", CODE: "P" },
  { ID: 3, NAME: "Business", CODE: "J" },
  { ID: 4, NAME: "First", CODE: "F" },
];

export const passengers = [
  {
    ID: 1,
    NAME: "Adult",
    SECONDARY_NAME: "Age (above 12 Yrs)",
    PTC: "ADT",
    COUNT: 1,
    ADDDISABLE: false,
    SUBDISABLE: true,
  },
  {
    ID: 2,
    NAME: "Child",
    SECONDARY_NAME: "Age (2 - 12 Yrs)",
    PTC: "CHD",
    COUNT: 0,
    ADDDISABLE: false,
    SUBDISABLE: true,
  },
  {
    ID: 3,
    NAME: "Infant",
    SECONDARY_NAME: "Age (below 12 Yrs)",
    PTC: "INF",
    COUNT: 0,
    ADDDISABLE: false,
    SUBDISABLE: true,
  },
];

export const priceFractionDigit = 2;