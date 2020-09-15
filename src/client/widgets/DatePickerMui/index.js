import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardDatePicker,
  DatePicker as KeyboardDatePicker,
} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import moment from 'moment';

import { Image, Text } from 'Widgets';

import './style.scss';

const DatePicker = (props) => {
  const {
    disablePastDates = false,
    disableFutureDates = false,
    hasError = false,
    id,
    icon,
    label,
    value,
    minDate,
    maxDate,
    onChange,
  } = props;
  // const [selectedDate, setSelectedDate] = React.useState(!!maxDate ? maxDate : new Date());
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  const handleDateChange = (date) => {
    const formattedDate = moment(date).format('YYYY-MM-DDTHH:MM:SS');
    setSelectedDate(formattedDate);
    onChange(id, formattedDate);
  };

  return (
    <div className={`DatePickerMui ${!!hasError ? 'has-error' : ''}`}>
      {!!label && (
        <Text
          className="SelectField-label font-primary-medium-16"
          text={label}
        />
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          margin="normal"
          id={id}
          format="dd-MMM-yyyy"
          value={selectedDate || ''}
          autoOk
          disablePast={!!disablePastDates}
          disableFuture={!!disableFutureDates}
          minDate={
            !!minDate
              ? minDate
              : !!disablePastDates
              ? new Date()
              : new Date('1900-01-01')
          }
          maxDate={
            !!maxDate
              ? maxDate
              : !!disableFutureDates
              ? new Date()
              : new Date('2100-01-01')
          }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          //   keyboardIcon={
          //     <Image
          //       altText="calendar"
          //       className="date-icon"
          //       imgName="calendar-grey.svg"
          //       imgName={!!icon ? icon : 'calendar-grey.svg'}
          //     />
          //   }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Image
                  altText="calendar"
                  className="date-icon"
                  imgName="calendar-grey.svg"
                  imgName={!!icon ? icon : 'calendar-grey.svg'}
                />
              </InputAdornment>
            ),
          }}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
