import React from 'react';

import { MultiSelect } from 'Widgets/';

import './style.scss';

const BookingReportsTableHeader = (props) => {
  const {
    defaultFieldOptions,
    fieldsOptions,
    officeName,
    officeId,
    onSelectChange,
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
        <div className="BookingReportsTableHeader-officeDetail__right font-primary-semibold-16">
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
      </div>
    </div>
  );
};

export default BookingReportsTableHeader;
