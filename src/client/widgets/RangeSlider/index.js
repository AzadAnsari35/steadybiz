import React, { useEffect, useState, useRef } from 'react';
import Slider from '@material-ui/core/Slider';

import {
  convertMinutesIntoHoursAndMinutes,
  applyCommaToPrice,
} from 'Helpers/global';

import { Text } from 'Widgets';

import './style.scss';

const RangeSlider = (props) => {
  const {
    isTime,
    isPrice,
    prefix,
    range,
    suffix,
    parentCallback,
    isResetFilter,
  } = props;
  const firstPageUpdate = useRef(true);
  const [value, setValue] = useState(range);

  useEffect(() => {
    //setValue(resetValue);
    if (firstPageUpdate.current) {
      firstPageUpdate.current = false;
      return;
    }
    setValue(range);
    //console.log(resetValue);
  }, [isResetFilter]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // parentCallback(newValue);
  };
  // const handleDragStop = () => {
  //   console.log(value);
  //   parentCallback(value);
  // };
  return (
    <div className="RangeSlider">
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={() => parentCallback(value)}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        min={range[0]}
        max={range[1]}
      />
      <div className="RangeSlider-values d-flex justify-content-between">
        {!isTime ? (
          <>
            <Text
              className="font-primary-medium-14"
              text={`${prefix ? prefix : ''} ${
                !isPrice ? value[0] : applyCommaToPrice(value[0])
              } ${suffix ? suffix : ''}`}
            />
            <Text
              className="font-primary-medium-14"
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
