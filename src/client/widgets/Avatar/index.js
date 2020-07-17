import React from 'react';
import './style.scss';

const Avatar = (props) => {
  const { className = '', children, size = '40px' } = props;

  return (
    <div
      className={`Avatar font-primary-medium-24 ${className ? className : ''}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
};

export default Avatar;
