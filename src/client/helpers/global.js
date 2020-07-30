import moment from "moment";
import { passengers, priceFractionDigit } from "Constants/flight.constant";

String.prototype.replaceArray = function (find, replace) {
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
};

export const changeDateFormat = (date, dateFormat = "dddd, MMM DD") => {
  return moment(date, "YYYY-MM-DD").format(dateFormat);
};

export const convertIntoTime = (timeInString) => {
  let timeArr, hours, min, sec;
  timeArr = timeInString.split(':');
  hours = timeArr[0] + 'h';
  timeArr[1] && (min = timeArr[1] + 'm');
  timeArr[2] && (sec = timeArr[2] + 's');

  if (!sec && min) return hours + ' ' + min;
  if (!min) return hours;
  return hours + ' ' + min + ' ' + sec;
};

export const extractTime = (timeGMT) => {
  return timeGMT.substring(0, 5);
};

export const applyCommaToPrice = (price) => {
  return price.toLocaleString('en-IN');
};

export const countriesDialCodeFormatter = (data) => {
  let dropDownItems = [];
  data.map((curData) => {
    dropDownItems.push({
      label: curData.countryname,
      value: `${curData.countryCode} (${curData.countryIsdCode})`,
    });
  });

  return dropDownItems;
};

export const getFormattedPrice = (price) => {
	return price.toFixed(priceFractionDigit);
};

export const getPassengerTypeName = (ptc, isUppercase = false) => {
	const passengerTypeName = passengers.find((passenger) => passenger.PTC === ptc).NAME;
	if (isUppercase) {
		return passengerTypeName.toUpperCase();
	}
	return passengerTypeName;
};

// Method to calculate flight duration e.g. (Input => ["3:30", "1:15", "7:25"], Output => "12h 10m")
export const calculateTotalDuration = durationsArr => {
  let hours = 0, minutes = 0;
  durationsArr.map(duration => {
    const hour = Number(duration.split(":")[0]);
    const min = Number(duration.split(":")[1]);
    hours += hour;
    minutes += min;
  });
  hours += Math.floor(minutes/60);
  minutes %= 60;
  const totalDuration = `${String(hours).length > 1 ? hours : `0${hours}`}h ${minutes}m`;
  
  return totalDuration;
};

export const getDataFromRedux = key => {
  return !!key.items && key.items.status && !!key.items.data && key.items.data;
};

export const addDurations = durations => {
  let totalHours = 0, totalMin = 0;
  durations.forEach(duration => {
    totalHours += parseInt(duration.split(":")[0]);
    totalMin += parseInt(duration.split(":")[1]);
  });
  totalHours += Math.floor(totalMin / 60);
  totalMin %= 60;
  return `${totalHours}:${totalMin}`;
};

export const calculateDurationInMinutes = duration => {
  const splittedDuration = duration.split(":");
  const hours = Number(splittedDuration[0]), minutes = Number(splittedDuration[1]);
  return ((hours * 60) + minutes);
};

/** Converts minutes to hours and minutes format
 * Input => 200
 * Output => 03:20hrs
 */
export const convertMinutesIntoHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60), min = minutes % 60;

  return `${`${String(hours).length > 1 ? "" : "0"}${hours}:`}${`${String(min).length > 1 
    ? "" : "0"}${min}`}hrs`;
};

export const getRange = (value, min, max) => {
  if (min > value) {
    min = value;
  } else if (max < value) {
    max = value;
  }
  return [min, max];
};
