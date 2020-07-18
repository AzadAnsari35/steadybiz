import React from 'react';

import './style.scss';

const Tag = (props) => {
  const { className, isSuccess, text } = props;

  return (
    <div
      className={
        `Tag ${!!isSuccess ? "green" : "red"} font-primary-semibold-14 text-uppercase ${!!className ? className : ''}`
      }
    >
      {text}
    </div>
  )
};

export default Tag;
