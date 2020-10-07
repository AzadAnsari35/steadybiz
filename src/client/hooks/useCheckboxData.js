import { useState, useCallback } from 'react';

const useCheckboxData = (initialValue = []) => {
  const [checkboxData, setCheckboxData] = useState(initialValue);

  const handleCheckbox = useCallback((value) => {
    // console.log('value', value);
    let data = [...checkboxData];
    // console.log('data before', data);
    if (!data.includes(value)) {
      Array.isArray(value) ? (data = [...value]) : data.push(value);
    } else {
      data = Array.isArray(value)
        ? data.filter((item, i) => value.indexOf(item) > -1)
        : data.filter((item) => item !== value);
    }
    setCheckboxData(data);
  });

  return [checkboxData, handleCheckbox];
};

export default useCheckboxData;
