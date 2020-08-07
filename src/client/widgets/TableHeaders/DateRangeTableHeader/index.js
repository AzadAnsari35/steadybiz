import React from 'react';
import DatePicker from 'Widgets/DatePicker';
import IconWithBackground from 'Widgets/IconWithBackground';
import SearchIcon from '@material-ui/icons/Search';

import colors from 'Constants/colors';

const DateRangeTableHeader = (props) => {
  const { handleDates, dates, control } = props;
  // const { dateFrom, dateTo } = dates;
  return (
    <div className="d-flex justify-content-between align-items-center pb-30">
      <div className="font-primary-semibold-18">CREDIT LIMIT HISTORY</div>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center pr-30">
          <span className="font-primary-medium-14 pr-12">Date From:</span>
          <DatePicker name="dateFrom" disableFutureDates control={control} />
        </div>
        <div className="d-flex align-items-center pr-30">
          <span className="font-primary-medium-14 pr-12">Date To:</span>
          <DatePicker name="dateTo" disableFutureDates control={control} />
        </div>
        <IconWithBackground className="px-6" bgColor={colors.gulfBlue}>
          <SearchIcon style={{ color: colors.white }} />
        </IconWithBackground>
      </div>
    </div>
  );
};

export default DateRangeTableHeader;
