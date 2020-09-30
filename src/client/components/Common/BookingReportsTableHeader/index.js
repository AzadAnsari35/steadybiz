import React from 'react';
import CachedIcon from '@material-ui/icons/Cached';

import { MultiSelect, IconWithBackground } from 'Widgets/';

import './style.scss';

const BookingReportsTableHeader = (props) => {
  const {
    defaultFieldOptions,
    fieldsOptions,
    officeName,
    officeId,
    onSelectChange,
    handleFieldReset,
  } = props;
  return (
    <div className="BookingReportsTableHeader ">
      <div className="BookingReportsTableHeader-officeDetail d-flex justify-content-between align-items-center pb-28">
        <div className="font-primary-semibold-18">
          <span className="BookingReportsTableHeader-officeDetail__officeName">
            {officeName}{' '}
          </span>
          <span className="BookingReportsTableHeader-officeDetail__officeDisplayId">
            [ {officeId} ]
          </span>
        </div>
        <div className="BookingReportsTableHeader-officeDetail__right font-primary-semibold-16 d-flex">
          <div className="pr-10">
            <MultiSelect
              id="fieldSelection"
              name="fieldSelection"
              placeholder="Fields Selection"
              options={fieldsOptions}
              defaultValue={defaultFieldOptions}
              showBorder
              changeStyle
              width="auto"
              isSearchable
              useReactHookForm={false}
              isMulti
              showValue={false}
              hideMultiValueSelection
              onSelectChange={onSelectChange}
              isClearable={false}
            />
          </div>

          <IconWithBackground
            bgColor="#74D3DC33"
            showCursor
            onClick={handleFieldReset}
          >
            <CachedIcon style={{ color: '#74D3DC' }} />
          </IconWithBackground>
        </div>
      </div>
    </div>
  );
};

export default BookingReportsTableHeader;
