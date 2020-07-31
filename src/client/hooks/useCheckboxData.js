import { useState, useCallback } from 'react';

const useCheckboxData = (initialValue = []) => {
  const [checkboxData, setCheckboxData] = useState(initialValue);

  const handleCheckbox = useCallback((value) => {
    let data = [...checkboxData];
    if (!data.includes(value)) {
      data.push(value);
    } else {
      data = data.filter(item => item !== value);
    }
    setCheckboxData(data);
  });

  return [checkboxData, handleCheckbox];
};

export default useCheckboxData;
