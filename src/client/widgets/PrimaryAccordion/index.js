import React from 'react';

import colors from 'Constants/colors';
import useToggle from 'Client/hooks/useToggle';

import ArrowIcon from 'Widgets/Icons/ArrowIcon';
import Text from 'Widgets/Text/index';

import './style.scss';

const PrimaryAccordion = (props) => {
  const { children, text, defaultOpen } = props;
  const [open, setOpen] = useToggle(defaultOpen);

  return (
    <div className="PrimaryAccordion width-100">
      <div
        className={`PrimaryAccordion-header d-flex justify-content-between align-items-center cursor-pointer ${
          !open ? 'mb-0' : ''
        }`}
        onClick={setOpen}
      >
        <Text className="font-primary-semibold" text={text} />
        <ArrowIcon
          size={12}
          color={colors.black}
          orientation={open ? -90 : 90}
        />
      </div>
      {open && <div className="PrimaryAccordion-content">{children}</div>}
    </div>
  );
};

export default PrimaryAccordion;
