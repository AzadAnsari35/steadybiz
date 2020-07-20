import React from "react";
import Slider from "@material-ui/core/Slider";

import Text from "Widgets/Text/index";

import "./style.scss";

const RangeSlider = props => {
  const { prefix, suffix } = props;
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="RangeSlider">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
      />
      <div className="RangeSlider-values d-flex justify-content-between">
        <Text className="text-primary-medium-14" text={`${!!prefix ? prefix : ""} ${value[0]} ${!!suffix ? suffix : ""}`} />
        <Text className="text-primary-medium-14" text={`${!!prefix ? prefix : ""} ${value[1]} ${!!suffix ? suffix : ""}`} />
      </div>
    </div>
  );
};

export default RangeSlider;
