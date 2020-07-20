import { useEffect, useState } from 'react';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';

const regEndpoint = () => {
  return useAsyncEndpoint((data, endpoint) => ({
    _endpoint: endpoint,
    data,
  }));
};
const useDropDownApi = (_endpoint, _data = null) => {
  const [stateList, setStateList] = regEndpoint();
  const [dropDownItems, setad] = useState([{ value: '', label: 'loading...' }]);
  useEffect(() => {
    //console.log(stateList);
    setStateList(_data, _endpoint);
  }, []);
  useEffect(() => {
    // console.log('hi');
    //console.log(stateList);
    if (stateList !== undefined && stateList.status) {
      const dropDownParam = _endpoint.dropDownParam;
      //console.log(dropDownParam);
      stateList.data.data.forEach((name) => {
        dropDownItems.push({
          label: name[dropDownParam.label],
          value: name[dropDownParam.value],
        });
      });
    }
    console.log('abc', dropDownItems);
  }, [stateList != null]);

  return { dropDownItems };
};
export default useDropDownApi;
