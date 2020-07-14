import React from "react";
import Link from "Widgets/Link";

import "./style.scss";

const Card = (props) => {
  const {
    addPadding = true,
    addExtraMargin = false,
    cardContainerClassName,
    children,
    className,
    link,
    title,
  } = props;

  return (
    <div className={`card mb-32 ${!!className ? className : ""}`}>
      {title && (
        <div
          className={`card-title ${!!link ? "" : "card-margin"} ${
            !!addExtraMargin ? "card-extraMargin" : ""
          }`}
        >
          {title}
        </div>
      )}
      {link && <Link className="card-margin text-align-right" text={link} />}
      <div
        className={`card-container box-shadow-primary ${
          !!addPadding ? "padded" : ""
        } ${!!cardContainerClassName ? cardContainerClassName : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
