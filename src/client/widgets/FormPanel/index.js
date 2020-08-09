import React from "react";
import { Grid } from "@material-ui/core";

import { ExpandArrow, Text } from "Widgets";

import "./style.scss";

// Closed, Opened, Opened and active
const FormPanel = (props) => {
  const { children, expand, hasError, id, isActive, text, onClick } = props;

  return (
    <div className={`FormPanel ${!!expand && !!isActive ? "active" : ""}`}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div
            className={
              `FormPanel-header d-flex justify-content-between align-items-center ${!expand ? "closed box-shadow-secondary" : "" } ${!expand && !!hasError ? "thin-red-border" : ""}`
            }
          >
            <Text
              className="font-primary-semibold-20"
              text={text}
            />
            <ExpandArrow
              isBordered={!expand}
              expand={expand}
              onClick={() => onClick(id)}
            />
          </div>
        </Grid>
      </Grid>
      {!!expand &&
        <div className="FormPanel-body">
          {children}
        </div>
      }
    </div>
  )
};

export default FormPanel;