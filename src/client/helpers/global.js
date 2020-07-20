import moment from "moment";

String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  for (var i = 0; i < find.length; i++) {   
    replaceString = replaceString.replace(find[i], replace[i]);
  }  
  return replaceString;
};

export const changeDateFormat = (date) => {
  return moment(date, "YYYY-MM-DD").format("dddd, MMM DD");
};

export const convertIntoTime = (timeInString) => {
  let timeArr, hours, min, sec;
  timeArr = timeInString.split(":");
  hours = timeArr[0] + "h";
  timeArr[1] && (min = timeArr[1] + "m");
  timeArr[2] && (sec = timeArr[2] + "s");

  if (!sec && min) return hours + " " + min;
  if (!min) return hours;
  return hours + " " + min + " " + sec;
};

export const extractTime = (timeGMT) => {
  return timeGMT.substring(0, 5);
};

export const applyCommaToPrice = (price) => {
  return price.toLocaleString("en-IN");
};
