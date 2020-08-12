import React, { useState } from 'react';
import Slider from '@material-ui/core/Slider';

import {
  convertMinutesIntoHoursAndMinutes,
  applyCommaToPrice,
} from 'Helpers/global';

import { Text } from 'Widgets';

import './style.scss';

const RangeSlider = (props) => {
  const { isTime, isPrice, prefix, range, suffix, parentCallback } = props;
  const [value, setValue] = useState(range);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    parentCallback(newValue);
  };
  // const handleDragEnd = () => {
  //   parentCallback(value);
  // };
  return (
    <div className="RangeSlider">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        min={range[0]}
        max={range[1]}
      />
      <div className="RangeSlider-values d-flex justify-content-between">
        {!isTime ? (
          <>
            <Text
              className="text-primary-medium-14"
              text={`${prefix ? prefix : ''} ${
                !isPrice ? value[0] : applyCommaToPrice(value[0])
              } ${suffix ? suffix : ''}`}
            />
            <Text
              className="text-primary-medium-14"
              text={`${prefix ? prefix : ''} ${
                !isPrice ? value[1] : applyCommaToPrice(value[1])
              } ${suffix ? suffix : ''}`}
            />
          </>
        ) : (
          <>
            {value.map((item, index) => (
              <div key={index}>
                <span>{convertMinutesIntoHoursAndMinutes(item)}</span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RangeSlider;
