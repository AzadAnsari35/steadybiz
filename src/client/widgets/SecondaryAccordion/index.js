import React from 'react';

import colors from 'Constants/colors';
import useToggle from 'Hooks/useToggle';

import ArrowIcon from 'Widgets/Icons/ArrowIcon';
import Text from 'Widgets/Text/index';

import './style.scss';

const SecondaryAccordion = (props) => {
  const {
    children,
    text,
    defaultOpen,
    className,
    headerClass,
    showAccordian = true,
  } = props;
  const [open, setOpen] = useToggle(defaultOpen);

  return showAccordian ? (
    <div className={`SecondaryAccordion ${className ? className : ''}`}>
      <div
        className={`SecondaryAccordion-header font-primary-semibold-20 d-flex justify-content-between align-items-center  cursor-pointer ${
          !open ? 'mb-0' : ''
        } ${headerClass ? headerClass : ''}`}
        onClick={setOpen}
      >
        {text}
        <div className="SecondaryAccordion-header__icon d-flex justify-content-center align-items-center">
          <ArrowIcon
            size={16}
            color={colors.royalBlue}
            orientation={open ? -90 : 90}
          />
        </div>
      </div>
      {open && <div className="SecondaryAccordion-content">{children}</div>}
    </div>
  ) : (
    <>{children}</>
  );
};

export default SecondaryAccordion;
