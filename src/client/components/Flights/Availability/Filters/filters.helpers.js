import moment from 'moment';
const returnItem = (name, item) => {
  switch (name) {
    case 'airlines':
      return item.flightSegments[0].flightSegmentGroup[0].airlineDetails
        .marketingAirline;
    case 'fareType':
      return item.totalfareDetails.fareRefundable;
    case 'oDeptAirport':
      return item.flightSegments[0].departureAirport;
    case 'oArrAirport':
      return item.flightSegments[0].arrivalAirport;
    case 'rDeptAirport':
      return item.flightSegments[1].departureAirport;
    case 'rArrAirport':
      return item.flightSegments[1].arrivalAirport;
    case 'oStops':
      return item.flightSegments[0].stopCount;
    case 'rStops':
      return item.flightSegments[1].stopCount;
    case 'oDeptFlightSlots':
      return item.flightSegments[0].flightSegmentGroup[0].departureDetails.time.split(
        ':'
      );
    case 'oArrFlightSlots':
      return item.flightSegments[0].flightSegmentGroup[
        item.flightSegments[0].flightSegmentGroup.length - 1
      ].arrivalDetails.time.split(':');
    case 'rDeptFlightSlots':
      return item.flightSegments[1].flightSegmentGroup[0].departureDetails.time.split(
        ':'
      );
    case 'rArrFlightSlots':
      return item.flightSegments[1].flightSegmentGroup[
        item.flightSegments[1].flightSegmentGroup.length - 1
      ].arrivalDetails.time.split(':');
  }
};
const returnRangeSliderItem = (name, item, rangeSlider) => {
  switch (name) {
    case 'newPriceRange':
      return (
        item.totalfareDetails.totalAmount <= rangeSlider[1] &&
        item.totalfareDetails.totalAmount >= rangeSlider[0]
      );
  }
};
export const returnRangeFilterData = (rangeSlider, listArray, keyName) => {
  if (rangeSlider.length > 0) {
    const data = listArray.filter((item) => {
      return returnRangeSliderItem(keyName, item, rangeSlider);
    });
    return data;
  }
  return listArray;
};
export const returnFilterData = (searchItem, listArray, keyName) => {
  if (searchItem.length > 0) {
    const data = listArray.filter((item) => {
      return searchItem.includes(returnItem(keyName, item));
    });
    return data;
  }
  return listArray;
};
export const returnFilterArray = (list, keyName) => {
  let returnList = [];
  list.map((item) => {
    const data = item.split('-');
    if (data[0] === keyName) returnList.push(data[1]);
  });
  return returnList;
};
export const returnFilterTimeSlot = (searchItem, list, keyName) => {
  if (searchItem.length > 0) {
    return list.filter(function (t) {
      return searchItem.some((o) => {
        const range = o.split('_');
        const timeRange = returnItem(keyName, t);
        const min = +timeRange[0] * 60 + +timeRange[1];

        return min <= parseInt(range[1]) && min >= parseInt(range[0]);
      });
    });
  }
  return list;
};
export const returnSortArray = (list, sortType, sortOrder) => {
  console.log('sss',sortType);
  //sortType='duration';
  return list.sort(function (a, b) {
    var x = a.totalfareDetails.totalAmount,
      y = b.totalfareDetails.totalAmount;
      
    switch (sortType) {
      case 'airline': {
        x =
          a.flightSegments[0].flightSegmentGroup[0].airlineDetails
            .marketingAirline;
        y =
          b.flightSegments[0].flightSegmentGroup[0].airlineDetails
            .marketingAirline;
        break;
      }
      case 'departure': {
        x = moment(a.flightSegments[0].dateTime).format('X');
        y = moment(b.flightSegments[0].dateTime).format('X');

        break;
      }
      case 'arrival': {
        
      x = moment(
          a.flightSegments[0].flightSegmentGroup[
            a.flightSegments[0].flightSegmentGroup.length - 1
          ].arrivalDetails.date +'T'+
            a.flightSegments[0].flightSegmentGroup[
              a.flightSegments[0].flightSegmentGroup.length - 1
            ].arrivalDetails.time
        ).format('X');
      
 y = moment(
          b.flightSegments[0].flightSegmentGroup[
            b.flightSegments[0].flightSegmentGroup.length - 1
          ].arrivalDetails.date +'T'+
            b.flightSegments[0].flightSegmentGroup[
              b.flightSegments[0].flightSegmentGroup.length - 1
            ].arrivalDetails.time
        ).format('X');
        
        break;
      }
      case 'duration': {
        const aTimeRange = a.flightSegments[0].flightSegmentGroup[0].arrivalDetails.flightDuration.split(
          ':'
        );
        const bTimeRange = b.flightSegments[0].flightSegmentGroup[0].arrivalDetails.flightDuration.split(
          ':'
        );

        x = +aTimeRange[0] * 60 + +aTimeRange[1];
        y = +bTimeRange[0] * 60 + +bTimeRange[1];
        //console.log(x);
      }
    }
    // if (currentSort == 'HotelName') {
    //     x = a[currentSort].toUpperCase();
    //     y = b[currentSort].toUpperCase();
    // }
    let modifier = -1;
    if (sortOrder === 'asc') modifier = 1;
    if (x < y) return -1 * modifier;
    if (x > y) return 1 * modifier;
    return 0;
  });
};
