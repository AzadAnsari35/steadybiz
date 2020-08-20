const viewOrder ={
    "status": true,
    "data": {
        "version": "19.2",
        "sourcePnr": "MXCQUV",
        "orderNo": "OKT0000000131",
        "originDestinations": {
            "originDestination": [
                {
                    "departure": {
                        "airportCode": "DXB",
                        "date": "2020-09-10T19:10:00+04:00",
                        "time": null
                    },
                    "arrival": {
                        "airportCode": "BAH",
                        "time": null
                    },
                    "calendarDates": null
                },
                {
                    "departure": {
                        "airportCode": "BAH",
                        "date": "2020-09-11T13:45:00+03:00",
                        "time": null
                    },
                    "arrival": {
                        "airportCode": "DXB",
                        "time": null
                    },
                    "calendarDates": null
                }
            ]
        },
        "customerDetails": {
            "billingDetails": {
                "type": "D",
                "companyName": "",
                "firsName": "sdfds",
                "lastName": "dsfddfds",
                "address1": "",
                "address2": "",
                "street": "flights",
                "country": "",
                "city": "",
                "pinCode": "",
                "gstNo": "",
                "vatNo": ""
            },
            "customerDetailList": [
                {
                    "contactInfo": {
                        "countryCode": "7",
                        "cityCode": "",
                        "phone": "23432432",
                        "phoneUseType": "M",
                        "email": "aa@aa.com"
                    },
                    "passengerInfo": {
                        "title": "Ms",
                        "firstName": "sdfds",
                        "lastName": "dsfddfds",
                        "gender": "F",
                        "nationality": "",
                        "dateOfBirth": "2008-09-03",
                        "passengerType": "ADT",
                        "infant": false
                    }
                }
            ],
            "contactInfo": {
                "countryCode": "7",
                "cityCode": "",
                "phone": "23432432",
                "phoneUseType": "M",
                "email": "aa@aa.com"
            }
        },
        "airPrices": [
            {
                "priceComparison": {
                    "amountReturned": "1245",
                    "amountSpecified": "1245.0"
                },
                "priceQuote": {
                    "miscInformation": {
                        "baggageInfo": {
                            "subCodeProperties": [
                                {
                                    "ancillaryFeeGroupCode": "BG",
                                    "ancillaryService": {
                                        "text": "CARRY ON HAND BAGGAGE",
                                        "subGroupCode": "CY"
                                    },
                                    "bookingMethod": null,
                                    "commercialNameofBaggageItemType": "CARRYON HAND BAGGAGE ALLOWANCE",
                                    "descriptionOne": null,
                                    "descriptionTwo": null,
                                    "extendedSubCodeKey": "0LNABGF",
                                    "rfic": null,
                                    "sizeWeightInfo": null,
                                    "solutionSequenceNmbr": 1,
                                    "rph": 1,
                                    "ssrcode": null,
                                    "emdtype": "4"
                                },
                                {
                                    "ancillaryFeeGroupCode": "BG",
                                    "ancillaryService": null,
                                    "bookingMethod": null,
                                    "commercialNameofBaggageItemType": "FREE BAGGAGE ALLOWANCE",
                                    "descriptionOne": null,
                                    "descriptionTwo": null,
                                    "extendedSubCodeKey": "0DFAAGF",
                                    "rfic": null,
                                    "sizeWeightInfo": null,
                                    "solutionSequenceNmbr": 1,
                                    "rph": 2,
                                    "ssrcode": null,
                                    "emdtype": "4"
                                },
                                {
                                    "ancillaryFeeGroupCode": "BG",
                                    "ancillaryService": null,
                                    "bookingMethod": null,
                                    "commercialNameofBaggageItemType": "CHECKED BAGGAGE 1X23KG",
                                    "descriptionOne": {
                                        "text": "UP TO 50 POUNDS/23 KILOGRAMS",
                                        "code": "23"
                                    },
                                    "descriptionTwo": {
                                        "text": "UP TO 62 LINEAR INCHES/158 LINEAR CENTIMETERS",
                                        "code": "6U"
                                    },
                                    "extendedSubCodeKey": "0GOACGF",
                                    "rfic": "C",
                                    "sizeWeightInfo": {
                                        "maximumSizeInAlternate": {
                                            "value": "158",
                                            "units": "C"
                                        },
                                        "maximumSize": {
                                            "value": "62",
                                            "units": "I"
                                        },
                                        "maximumWeightInAlternate": {
                                            "value": "23",
                                            "units": "K"
                                        },
                                        "maximumWeight": {
                                            "value": "50",
                                            "units": "L"
                                        },
                                        "minimumSizeInAlternate": null,
                                        "minimumSize": null,
                                        "minimumWeightInAlternate": null,
                                        "minimumWeight": null
                                    },
                                    "solutionSequenceNmbr": 1,
                                    "rph": 3,
                                    "ssrcode": "XBAG",
                                    "emdtype": "2"
                                }
                            ]
                        },
                        "headerInformation": [
                            {
                                "bargainFinder": null,
                                "departureDate": "2020-09-10T00:00:00.000+0000",
                                "divideParty": [],
                                "lastTicketingDate": null,
                                "text": [
                                    "VALIDATING CARRIER SPECIFIED - GF",
                                    "CAT 15 SALES RESTRICTIONS FREE TEXT FOUND - VERIFY RULES",
                                    "BAG ALLOWANCE     -DXBBAH-02P/GF/EACH PIECE UP TO 50 POUNDS/23",
                                    "KILOGRAMS AND UP TO 62 LINEAR INCHES/158 LINEAR CENTIMETERS",
                                    "BAG ALLOWANCE     -BAHDXB-02P/GF/EACH PIECE UP TO 50 POUNDS/23",
                                    "KILOGRAMS AND UP TO 62 LINEAR INCHES/158 LINEAR CENTIMETERS",
                                    "CARRY ON ALLOWANCE",
                                    "DXBBAH BAHDXB-06KG/GF",
                                    "ADDITIONAL ALLOWANCES AND/OR DISCOUNTS MAY APPLY DEPENDING ON",
                                    "FLYER-SPECIFIC FACTORS /E.G. FREQUENT FLYER STATUS/MILITARY/",
                                    "CREDIT CARD FORM OF PAYMENT/EARLY PURCHASE OVER INTERNET,ETC./"
                                ],
                                "validatingCarrier": {
                                    "code": "GF"
                                },
                                "solutionSequenceNmbr": "1"
                            }
                        ],
                        "solutionInformation": [
                            {
                                "baseFareCurrencyCode": "AED",
                                "currencyCode": "AED",
                                "grandTotalBaseFareAmount": null,
                                "grandTotalEquivFareAmount": "730",
                                "grandTotalTaxes": "515",
                                "requiresRebook": "false",
                                "segmentNumber": [],
                                "serviceFeeCurrency": null,
                                "text": [],
                                "ticketNumber": "0",
                                "totalAmount": "1245",
                                "totalServiceFeeAmount": null,
                                "totalServiceTax": null,
                                "solutionSequenceNmbr": "1"
                            }
                        ],
                        "optionalCharges": [],
                        "validatingCarrier": [
                            {
                                "settlementMethod": "BSP",
                                "ticket": [
                                    {
                                        "interlineAgreement": [],
                                        "type": "ETKTREQ",
                                        "carrierCode": "GF",
                                        "validatingCarrierType": "Default"
                                    }
                                ],
                                "newValidatingProcess": true,
                                "solutionSequenceNmbr": "1",
                                "ietcheckedValidatingCarrier": []
                            }
                        ]
                    },
                    "pricedItinerary": {
                        "airItineraryPricingInfo": [
                            {
                                "agencyCommission": [],
                                "ancillaryFees": [],
                                "baggageProvisions": [
                                    {
                                        "associations": {
                                            "carrierCode": [
                                                {
                                                    "value": "GF",
                                                    "rph": 1
                                                }
                                            ],
                                            "countForSegmentAssociatedID": "1",
                                            "departureDate": [
                                                {
                                                    "value": "2020-09-10",
                                                    "rph": 1
                                                }
                                            ],
                                            "destinationLocation": [
                                                {
                                                    "locationCode": "BAH",
                                                    "rph": 1
                                                }
                                            ],
                                            "flightNumber": [
                                                {
                                                    "value": "509",
                                                    "rph": 1
                                                }
                                            ],
                                            "originLocation": [
                                                {
                                                    "locationCode": "DXB",
                                                    "rph": 1
                                                }
                                            ],
                                            "resBookDesigCode": [
                                                {
                                                    "value": "H",
                                                    "rph": 1
                                                }
                                            ],
                                            "statusCode": [
                                                {
                                                    "value": "SS",
                                                    "rph": 1
                                                }
                                            ],
                                            "pnrsegment": [
                                                {
                                                    "value": "2",
                                                    "rph": 1
                                                }
                                            ]
                                        },
                                        "carrierWhoseBaggageProvisionsApply": "GF",
                                        "commissionable": null,
                                        "feeApplicationIndicator": null,
                                        "feeNotGuaranteedIndicator": null,
                                        "firstOccurrence": null,
                                        "interlineable": null,
                                        "lastOccurrence": null,
                                        "noChargeNotAvailableIndicator": null,
                                        "numPiecesBDI": "2",
                                        "numPiecesITR": [
                                            "2"
                                        ],
                                        "passengerType": null,
                                        "priceInformation": null,
                                        "provisionType": "A",
                                        "refundForm": null,
                                        "refundReissue": null,
                                        "simultaneousTicketIndicator": null,
                                        "subCodeInfo": {
                                            "subCodeForAllowance": [
                                                {
                                                    "value": "0GOACGF",
                                                    "rph": 1
                                                }
                                            ],
                                            "subCodeForChargesOthers": "0DFAAGF"
                                        },
                                        "weightLimit": null,
                                        "rph": "1",
                                        "fqtvcarrierFiledTierLevel": null
                                    },
                                    {
                                        "associations": {
                                            "carrierCode": [
                                                {
                                                    "value": "GF",
                                                    "rph": 1
                                                }
                                            ],
                                            "countForSegmentAssociatedID": "1",
                                            "departureDate": [
                                                {
                                                    "value": "2020-09-11",
                                                    "rph": 1
                                                }
                                            ],
                                            "destinationLocation": [
                                                {
                                                    "locationCode": "DXB",
                                                    "rph": 1
                                                }
                                            ],
                                            "flightNumber": [
                                                {
                                                    "value": "506",
                                                    "rph": 1
                                                }
                                            ],
                                            "originLocation": [
                                                {
                                                    "locationCode": "BAH",
                                                    "rph": 1
                                                }
                                            ],
                                            "resBookDesigCode": [
                                                {
                                                    "value": "H",
                                                    "rph": 1
                                                }
                                            ],
                                            "statusCode": [
                                                {
                                                    "value": "SS",
                                                    "rph": 1
                                                }
                                            ],
                                            "pnrsegment": [
                                                {
                                                    "value": "3",
                                                    "rph": 1
                                                }
                                            ]
                                        },
                                        "carrierWhoseBaggageProvisionsApply": "GF",
                                        "commissionable": null,
                                        "feeApplicationIndicator": null,
                                        "feeNotGuaranteedIndicator": null,
                                        "firstOccurrence": null,
                                        "interlineable": null,
                                        "lastOccurrence": null,
                                        "noChargeNotAvailableIndicator": null,
                                        "numPiecesBDI": "2",
                                        "numPiecesITR": [
                                            "2"
                                        ],
                                        "passengerType": null,
                                        "priceInformation": null,
                                        "provisionType": "A",
                                        "refundForm": null,
                                        "refundReissue": null,
                                        "simultaneousTicketIndicator": null,
                                        "subCodeInfo": {
                                            "subCodeForAllowance": [
                                                {
                                                    "value": "0GOACGF",
                                                    "rph": 1
                                                }
                                            ],
                                            "subCodeForChargesOthers": "0DFAAGF"
                                        },
                                        "weightLimit": null,
                                        "rph": "2",
                                        "fqtvcarrierFiledTierLevel": null
                                    },
                                    {
                                        "associations": {
                                            "carrierCode": [
                                                {
                                                    "value": "GF",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "GF",
                                                    "rph": 2
                                                }
                                            ],
                                            "countForSegmentAssociatedID": "2",
                                            "departureDate": [
                                                {
                                                    "value": "2020-09-10",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "2020-09-11",
                                                    "rph": 2
                                                }
                                            ],
                                            "destinationLocation": [
                                                {
                                                    "locationCode": "BAH",
                                                    "rph": 1
                                                },
                                                {
                                                    "locationCode": "DXB",
                                                    "rph": 2
                                                }
                                            ],
                                            "flightNumber": [
                                                {
                                                    "value": "509",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "506",
                                                    "rph": 2
                                                }
                                            ],
                                            "originLocation": [
                                                {
                                                    "locationCode": "DXB",
                                                    "rph": 1
                                                },
                                                {
                                                    "locationCode": "BAH",
                                                    "rph": 2
                                                }
                                            ],
                                            "resBookDesigCode": [
                                                {
                                                    "value": "H",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "H",
                                                    "rph": 2
                                                }
                                            ],
                                            "statusCode": [
                                                {
                                                    "value": "SS",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "SS",
                                                    "rph": 2
                                                }
                                            ],
                                            "pnrsegment": [
                                                {
                                                    "value": "2",
                                                    "rph": 1
                                                },
                                                {
                                                    "value": "3",
                                                    "rph": 2
                                                }
                                            ]
                                        },
                                        "carrierWhoseBaggageProvisionsApply": "GF",
                                        "commissionable": null,
                                        "feeApplicationIndicator": null,
                                        "feeNotGuaranteedIndicator": null,
                                        "firstOccurrence": null,
                                        "interlineable": null,
                                        "lastOccurrence": null,
                                        "noChargeNotAvailableIndicator": null,
                                        "numPiecesBDI": null,
                                        "numPiecesITR": [],
                                        "passengerType": null,
                                        "priceInformation": null,
                                        "provisionType": "B",
                                        "refundForm": null,
                                        "refundReissue": null,
                                        "simultaneousTicketIndicator": null,
                                        "subCodeInfo": {
                                            "subCodeForAllowance": [],
                                            "subCodeForChargesOthers": "0LNABGF"
                                        },
                                        "weightLimit": {
                                            "value": "6",
                                            "units": "K"
                                        },
                                        "rph": "3",
                                        "fqtvcarrierFiledTierLevel": null
                                    }
                                ],
                                "fareCalculation": {
                                    "text": "DXB GF BAH92.57GF DXB92.57Q DXBDXB13.00NUC198.14END ROE3.67275"
                                },
                                "fareCalculationBreakdown": [
                                    {
                                        "branch": {
                                            "pcc": "7MQJ",
                                            "countryOfShipRegistry": null,
                                            "firstJointCarrier": "GF",
                                            "secondJointCarrier": null,
                                            "iataauthorizedCarrier": null
                                        },
                                        "departureR": null,
                                        "fareBasis": {
                                            "code": "HRASAE",
                                            "contractNumber": null,
                                            "corporateID": null,
                                            "inclusiveTour": null,
                                            "fareAmount": "92.57",
                                            "farePassengerType": "ADT",
                                            "fareType": "P",
                                            "filingCarrier": "GF",
                                            "globalInd": "EH",
                                            "tripTypeInd": "R",
                                            "market": "DXBBAH",
                                            "surfaceSegment": null,
                                            "ticketDesignator": null,
                                            "cabin": "Y"
                                        },
                                        "freeBaggageAllowance": "PC002",
                                        "mileage": null,
                                        "ruleCategoryIndicator": [
                                            "4",
                                            "5",
                                            "7",
                                            "8",
                                            "9",
                                            "10",
                                            "11",
                                            "12",
                                            "15",
                                            "16",
                                            "18"
                                        ],
                                        "surcharges": [
                                            {
                                                "value": "13.00",
                                                "ind": "Q",
                                                "type": "UNK"
                                            }
                                        ],
                                        "stopoverCharge": null
                                    },
                                    {
                                        "branch": {
                                            "pcc": "7MQJ",
                                            "countryOfShipRegistry": null,
                                            "firstJointCarrier": "GF",
                                            "secondJointCarrier": null,
                                            "iataauthorizedCarrier": null
                                        },
                                        "departureR": null,
                                        "fareBasis": {
                                            "code": "HRASAE",
                                            "contractNumber": null,
                                            "corporateID": null,
                                            "inclusiveTour": null,
                                            "fareAmount": "92.57",
                                            "farePassengerType": "ADT",
                                            "fareType": "P",
                                            "filingCarrier": "GF",
                                            "globalInd": "EH",
                                            "tripTypeInd": "R",
                                            "market": "DXBBAH",
                                            "surfaceSegment": null,
                                            "ticketDesignator": null,
                                            "cabin": "Y"
                                        },
                                        "freeBaggageAllowance": "PC002",
                                        "mileage": null,
                                        "ruleCategoryIndicator": [
                                            "4",
                                            "5",
                                            "7",
                                            "8",
                                            "9",
                                            "10",
                                            "11",
                                            "12",
                                            "15",
                                            "16",
                                            "18"
                                        ],
                                        "surcharges": [],
                                        "stopoverCharge": null
                                    }
                                ],
                                "itinTotalFare": {
                                    "baggageInfo": {
                                        "nonUSDOTDisclosure": {
                                            "text": [
                                                "BAG ALLOWANCE     -DXBBAH-02P/GF/EACH PIECE UP TO 50 POUNDS/23",
                                                "KILOGRAMS AND UP TO 62 LINEAR INCHES/158 LINEAR CENTIMETERS",
                                                "BAG ALLOWANCE     -BAHDXB-02P/GF/EACH PIECE UP TO 50 POUNDS/23",
                                                "KILOGRAMS AND UP TO 62 LINEAR INCHES/158 LINEAR CENTIMETERS",
                                                "CARRY ON ALLOWANCE",
                                                "DXBBAH BAHDXB-06KG/GF",
                                                "ADDITIONAL ALLOWANCES AND/OR DISCOUNTS MAY APPLY DEPENDING ON",
                                                "FLYER-SPECIFIC FACTORS /E.G. FREQUENT FLYER STATUS/MILITARY/",
                                                "CREDIT CARD FORM OF PAYMENT/EARLY PURCHASE OVER INTERNET,ETC./"
                                            ]
                                        },
                                        "usdotdisclosure": null
                                    },
                                    "baseFare": {
                                        "amount": "730",
                                        "currencyCode": "AED"
                                    },
                                    "commission": null,
                                    "construction": {
                                        "amount": "198.14",
                                        "currencyCode": "NUC",
                                        "rateOfExchange": "3.672750"
                                    },
                                    "discountTypeMessage": null,
                                    "endorsements": {
                                        "text": [
                                            "RES CHG AND/NOSHOW FEES APPLY/NON END/VALID ON GF ONLY"
                                        ]
                                    },
                                    "equivFare": null,
                                    "privateFare": null,
                                    "taxes": {
                                        "tax": [
                                            {
                                                "amount": "75",
                                                "taxCode": "AE4",
                                                "taxName": "PASSENGER SERVICE CHARGE INTER",
                                                "ticketingTaxCode": "AE"
                                            },
                                            {
                                                "amount": "5",
                                                "taxCode": "TP",
                                                "taxName": "PASSENGER SECURITY AND SAFETY",
                                                "ticketingTaxCode": "TP"
                                            },
                                            {
                                                "amount": "10",
                                                "taxCode": "ZR",
                                                "taxName": "INTERNATIONAL ADVANCED PASSENG",
                                                "ticketingTaxCode": "ZR"
                                            },
                                            {
                                                "amount": "40",
                                                "taxCode": "YRI",
                                                "taxName": "SERVICE FEE - CARRIER-IMPOSED",
                                                "ticketingTaxCode": "YR"
                                            },
                                            {
                                                "amount": "270",
                                                "taxCode": "YQF",
                                                "taxName": "SERVICE FEE - CARRIER-IMPOSED",
                                                "ticketingTaxCode": "YQ"
                                            },
                                            {
                                                "amount": "35",
                                                "taxCode": "F62",
                                                "taxName": "PASSENGER FACILITIES CHARGE",
                                                "ticketingTaxCode": "F6"
                                            },
                                            {
                                                "amount": "70",
                                                "taxCode": "BH",
                                                "taxName": "PASSENGER SERVICE FEE  INTERNA",
                                                "ticketingTaxCode": "BH"
                                            },
                                            {
                                                "amount": "10",
                                                "taxCode": "HM",
                                                "taxName": "PASSENGER FACILITY FEE",
                                                "ticketingTaxCode": "HM"
                                            }
                                        ],
                                        "totalAmount": "515"
                                    },
                                    "totalFare": {
                                        "amount": "1245",
                                        "currencyCode": "AED"
                                    },
                                    "warnings": null,
                                    "sellingFareData": [],
                                    "nonRefundableInd": "O"
                                },
                                "passengerTypeQuantity": {
                                    "code": "ADT",
                                    "quantity": "1"
                                },
                                "retailerRules": [],
                                "specificPenalty": [],
                                "ticketingFees": [],
                                "solutionSequenceNmbr": "1",
                                "ptcfareBreakdown": [
                                    {
                                        "brandedFareInformation": null,
                                        "cabin": "Y",
                                        "fareBasis": {
                                            "code": "HRASAE",
                                            "contractNumber": null,
                                            "corporateID": null,
                                            "fareAmount": "92.57",
                                            "farePassengerType": "ADT",
                                            "fareType": "P",
                                            "filingCarrier": "GF",
                                            "globalInd": "EH",
                                            "market": "DXBBAH",
                                            "surfaceSegment": null,
                                            "ticketDesignator": null
                                        },
                                        "freeBaggageAllowance": "PC002",
                                        "surcharges": [
                                            {
                                                "value": "13.00",
                                                "ind": "Q",
                                                "type": "UNK"
                                            }
                                        ]
                                    },
                                    {
                                        "brandedFareInformation": null,
                                        "cabin": "Y",
                                        "fareBasis": {
                                            "code": "HRASAE",
                                            "contractNumber": null,
                                            "corporateID": null,
                                            "fareAmount": "92.57",
                                            "farePassengerType": "ADT",
                                            "fareType": "P",
                                            "filingCarrier": "GF",
                                            "globalInd": "EH",
                                            "market": "DXBBAH",
                                            "surfaceSegment": null,
                                            "ticketDesignator": null
                                        },
                                        "freeBaggageAllowance": "PC002",
                                        "surcharges": []
                                    }
                                ]
                            }
                        ],
                        "alternativePricing": "false",
                        "currencyCode": "AED",
                        "multiTicket": false,
                        "multiTicketShortText": null,
                        "serviceFeeAmount": null,
                        "serviceFeeCurrencyCode": null,
                        "serviceFeeTax": null,
                        "totalAmount": "1245"
                    }
                }
            }
        ],
        "outboundItinerary": {
            "sourcePnr": "MXCQUV",
            "flightItineraryId": 10038,
            "itinerarySourceCode": "1S",
            "itinerarySourceName": "Sabre",
            "itineraryPCC": "7MQJ",
            "flightSegments": [
                {
                    "flightSegments": 1,
                    "stopCount": 0,
                    "flightSegmentDirection": "Outbound",
                    "departureAirport": "DXB",
                    "arrivalAirport": "BAH",
                    "dateTime": "2020-09-10T19:10:00+04:00",
                    "flightSegmentGroup": [
                        {
                            "bookingClass": "H",
                            "cabinClass": "Y",
                            "seatsAvailable": 9,
                            "baggageInformation": {
                                "checkInBaggage": {
                                    "noOfPieces": 2,
                                    "weight": 0,
                                    "unit": null,
                                    "description": null
                                },
                                "cabinBaggage": {
                                    "noOfPieces": 1,
                                    "weight": 7,
                                    "unit": "kg",
                                    "description": null
                                }
                            },
                            "validityDates": null,
                            "marriageGroup": "O",
                            "status": "HK",
                            "noOfPassenger": "001",
                            "marriageGroupInd": null,
                            "marriageGroupSequence": null,
                            "airlinePnr": "ZJQLRM",
                            "milesFlown": "0302",
                            "operatingClassOfService": "H",
                            "marketingClassOfService": "H",
                            "changeOfGauge": false,
                            "validatingCarrier": "GF",
                            "airlineDetails": {
                                "marketingAirline": "GF",
                                "marketingFlightNumber": 509,
                                "operatingAirline": "GF",
                                "operatingFlightNumber": 509,
                                "equipmentTypeDescription": "320"
                            },
                            "arrivalDetails": {
                                "airportCode": "BAH",
                                "airportName": "Bahrain International",
                                "cityCode": "BAH",
                                "cityName": "Manama",
                                "countryCode": "BH",
                                "countryName": "Bahrain",
                                "time": "19:30:00+03:00",
                                "date": "2020-09-10",
                                "day": 0,
                                "terminal": null,
                                "nightFlight": null,
                                "flightDuration": "1:20",
                                "layOverTime": null
                            },
                            "departureDetails": {
                                "airportCode": "DXB",
                                "terminal": "1",
                                "airportName": "Dubai",
                                "cityCode": "DXB",
                                "cityName": "Dubai",
                                "countryCode": "AE",
                                "countryName": "United Arab Emirates",
                                "date": "2020-09-10",
                                "time": "19:10:00+04:00"
                            },
                            "eticket": true
                        }
                    ]
                },
                {
                    "flightSegments": 2,
                    "stopCount": 0,
                    "flightSegmentDirection": "Inbound",
                    "departureAirport": "BAH",
                    "arrivalAirport": "DXB",
                    "dateTime": "2020-09-11T13:45:00+03:00",
                    "flightSegmentGroup": [
                        {
                            "bookingClass": "H",
                            "cabinClass": "Y",
                            "seatsAvailable": 9,
                            "baggageInformation": {
                                "checkInBaggage": {
                                    "noOfPieces": 2,
                                    "weight": 0,
                                    "unit": null,
                                    "description": null
                                },
                                "cabinBaggage": {
                                    "noOfPieces": 1,
                                    "weight": 7,
                                    "unit": "kg",
                                    "description": null
                                }
                            },
                            "validityDates": null,
                            "marriageGroup": "O",
                            "status": "NN",
                            "noOfPassenger": "001",
                            "marriageGroupInd": null,
                            "marriageGroupSequence": null,
                            "airlinePnr": null,
                            "milesFlown": null,
                            "operatingClassOfService": null,
                            "marketingClassOfService": null,
                            "changeOfGauge": null,
                            "validatingCarrier": null,
                            "airlineDetails": {
                                "marketingAirline": "GF",
                                "marketingFlightNumber": 506,
                                "operatingAirline": "GF",
                                "operatingFlightNumber": 506,
                                "equipmentTypeDescription": "320"
                            },
                            "arrivalDetails": {
                                "airportCode": "DXB",
                                "airportName": "Dubai",
                                "cityCode": "DXB",
                                "cityName": "Dubai",
                                "countryCode": "AE",
                                "countryName": "United Arab Emirates",
                                "time": "16:10:00+04:00",
                                "date": "2020-09-11",
                                "day": 0,
                                "terminal": "1",
                                "nightFlight": null,
                                "flightDuration": "1:25",
                                "layOverTime": null
                            },
                            "departureDetails": {
                                "airportCode": "BAH",
                                "terminal": null,
                                "airportName": "Bahrain International",
                                "cityCode": "BAH",
                                "cityName": "Manama",
                                "countryCode": "BH",
                                "countryName": "Bahrain",
                                "date": "2020-09-11",
                                "time": "13:45:00+03:00"
                            },
                            "eticket": true
                        }
                    ]
                }
            ],
            "totalfareDetails": {
                "fareDetails": [
                    {
                        "ptc": "ADT",
                        "count": 1,
                        "baseFare": 730,
                        "currenyCode": "AED",
                        "penalties": [
                            {
                                "type": "Exchange",
                                "applicability": "Before",
                                "changeable": true,
                                "refundable": null,
                                "amount": 220,
                                "currency": "AED",
                                "cat16Info": null,
                                "conditionsApply": null
                            },
                            {
                                "type": "Exchange",
                                "applicability": "After",
                                "changeable": true,
                                "refundable": null,
                                "amount": 220,
                                "currency": "AED",
                                "cat16Info": null,
                                "conditionsApply": null
                            },
                            {
                                "type": "Refund",
                                "applicability": "Before",
                                "changeable": null,
                                "refundable": true,
                                "amount": 370,
                                "currency": "AED",
                                "cat16Info": true,
                                "conditionsApply": null
                            },
                            {
                                "type": "Refund",
                                "applicability": "After",
                                "changeable": null,
                                "refundable": true,
                                "amount": 370,
                                "currency": "AED",
                                "cat16Info": true,
                                "conditionsApply": null
                            }
                        ],
                        "fareBasisCode": [
                            "HRASAE",
                            "HRASAE"
                        ],
                        "taxDetails": [
                            {
                                "taxcode": "AE4",
                                "taxdescription": "PASSENGER SERVICE CHARGE INTERNATIONAL",
                                "taxAmount": 75,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "TP",
                                "taxdescription": "PASSENGER SECURITY AND SAFETY FEE",
                                "taxAmount": 5,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "ZR",
                                "taxdescription": "INTERNATIONAL ADVANCED PASSENGER INFORMATION FEE ARRIVALS",
                                "taxAmount": 10,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "YRI",
                                "taxdescription": "SERVICE FEE - CARRIER-IMPOSED MISC",
                                "taxAmount": 40,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "YQF",
                                "taxdescription": "SERVICE FEE - CARRIER-IMPOSED FUEL",
                                "taxAmount": 270,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "F62",
                                "taxdescription": "PASSENGER FACILITIES CHARGE",
                                "taxAmount": 35,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "BH",
                                "taxdescription": "PASSENGER SERVICE FEE  INTERNATIONAL",
                                "taxAmount": 70,
                                "taxCurrency": "AED"
                            },
                            {
                                "taxcode": "HM",
                                "taxdescription": "PASSENGER FACILITY FEE",
                                "taxAmount": 10,
                                "taxCurrency": "AED"
                            }
                        ]
                    }
                ],
                "baseFareTotal": 730,
                "taxTotal": 515,
                "localTaxPercentage": 0,
                "localTaxAmount": 0,
                "totalAmount": 1245,
                "totalAmountCurrency": "AED",
                "fareBasisCode": "HRASAE",
                "fareRule": null,
                "fareCategory": null,
                "fareRefundable": true,
                "fareRules": null,
                "validatingCarrier": "GF",
                "cabinClassCode": null,
                "cabinClassName": null,
                "seatsAvailable": null,
                "dealCode": null,
                "commissionPercentage": 0,
                "commissionAmount": 0
            }
        },
        "bookingDate": 1597653680369,
        "bookingStatus": "HOLD_PNR",
        "dateTimeCreated": 1597653673598,
        "dateTimeUpdated": 1597653680369,
        "pnrRetrieved": false,
        "pnrCancelled": false,
        "cancellationDateTime": 1597707000000
    }
}
export default viewOrder;