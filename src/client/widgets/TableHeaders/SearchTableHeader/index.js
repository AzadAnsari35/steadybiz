import React from 'react';
import { IconWithBackground, TextInput } from 'Widgets';
import SearchIcon from '@material-ui/icons/Search';

import colors from 'Constants/colors';

const SearchTableHeader = (props) => {
  const { register } = props;
  // const { dateFrom, dateTo } = dates;
  return (
    <div className="d-flex justify-content-between align-items-center pb-30">
      <div className="font-primary-semibold-18">
        CREDIT LIMIT BREAKUP DETAILS
      </div>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center pr-30">
          <span className="font-primary-medium-14 pr-12">Search:</span>
          <TextInput
            name="search"
            register={register}
            placeholder="Type Here.."
          />
        </div>
        <IconWithBackground className="px-6" bgColor={colors.gulfBlue}>
          <SearchIcon style={{ color: colors.white }} />
        </IconWithBackground>
      </div>
    </div>
  );
};

export default SearchTableHeader;
