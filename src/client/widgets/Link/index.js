import React from "react";

import "./style.scss";

const Link = (props) => {
  const { className, text, ...rest } = props;

  return (
    <div
      className={`Link font-primary-medium-16-1 cursor-pointer ${
        !!className ? className : ""
      }`}
      {...rest}
    >
      {/* <Text className="Link-text" text={`[ ${text} ]`} /> */}
      <span className="Link-brackets">[</span>
      <span className="Link-text">{text}</span>
      <span className="Link-brackets">]</span>
    </div>
  );
};

export default Link;
