import React from "react";
import "./style.scss";

const Avatar = (props) => {
  const { classes = "", children } = props;

  return (
    <div className={`Avatar font-primary-medium-24 ${classes ? classes : ""}`}>
      {children}
    </div>
  );
};

export default Avatar;
