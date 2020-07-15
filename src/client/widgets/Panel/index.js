import React, { Fragment } from "react";

import Card from "Widgets/Card";
import Text from "Widgets/Text";
import ExpandArrow from "Widgets/ExpandArrow";

import "./style.scss";

const Panel = (props) => {
  const {
    addExtraMargin,
    cardClassName = "",
    id,
    title,
    panelHeaderIcon,
    panelIconMarginLeft,
    showHeaderContent,
    headerContent,
    headerText,
    expand,
    children,
    noPadding,
    hidePanelAction = false,
    headerActionContent,
    onClick,
    alwaysOpen = false,
  } = props;

  return (
    <Card
      className={cardClassName}
      title={title}
      addPadding={false}
      addExtraMargin={addExtraMargin}
    >
      <div className="Panel">
        <div
          className={`Panel-header d-flex align-items-center ${
            !!expand ? "box-shadow-ternary" : ""
          }`}
        >
          <div
            className={`Panel-header__icon ${!!expand ? "" : "rounded"} ${
              !!panelIconMarginLeft ? "" : "justify-content-center"
            }`}
          >
            <span className="icon">{panelHeaderIcon}</span>
          </div>
          <div className="Panel-header__content d-flex align-items-center">
            {!!showHeaderContent ? (
              headerContent
            ) : (
              <Text
                text={headerText}
                className="Panel-header__title font-primary-medium-22"
              />
            )}
          </div>

          {!alwaysOpen && (
            <div className="Panel-header__action ml-auto d-flex">
              {hidePanelAction ? (
                <Fragment>
                  {!!headerActionContent && headerActionContent}
                </Fragment>
              ) : (
                <Fragment>
                  <Text
                    className="Panel-header__action-title font-primary-medium-16 text-capitalize d-flex align-items-center mr-10"
                    text={title}
                  />
                  <ExpandArrow expand={expand} onClick={() => onClick(id)} />
                </Fragment>
              )}
            </div>
          )}
        </div>
        <div
          className={`Panel-body ${expand ? "d-block" : "d-none"} ${
            !!noPadding ? "p-0" : ""
          }`}
        >
          {children}
        </div>
      </div>
    </Card>
  );
};

export default Panel;
