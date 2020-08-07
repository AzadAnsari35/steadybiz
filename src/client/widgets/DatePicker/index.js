import React, { useState, useEffect } from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import Text from 'Widgets/Text';
import { displayImage } from 'Helpers/utils';
import { Controller } from 'react-hook-form';

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
    validation = '',
    control,
    name,
  } = props;
  // const [selectedDate, setSelectedDate] = React.useState(!!maxDate ? maxDate : new Date());
  //   const [selectedDate, setSelectedDate] = useState();

  //   useEffect(() => {
  //     setSelectedDate(value);
  //   }, [value]);

  //   const handleDateChange = (date) => {
  //     const formattedDate = moment(date).format('YYYY-MM-DDTHH:MM:SS');
  //     setSelectedDate(formattedDate);
  //     onChange(id, formattedDate);
  //   };

  return (
    <div className={`DatePicker ${!!hasError ? 'has-error' : ''}`}>
      {!!label && (
        <Text
          className="SelectField-label font-primary-medium-16"
          text={label}
        />
      )}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Controller
          as={
            <KeyboardDatePicker
              variant="inline"
              margin="normal"
              format="dd-MMM-yyyy"
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
              keyboardIcon={
                <img
                  className="date-icon"
                  alt="calendar"
                  src={!!icon ? icon : displayImage('calendar-grey.svg')}
                />
              }
            />
          }
          rules={validation}
          control={control}
          name={name}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
