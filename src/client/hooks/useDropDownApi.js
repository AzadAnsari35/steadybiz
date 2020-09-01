import { useEffect, useState } from 'react';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import { PNR_STATUS } from 'Constants/commonConstant';
const regEndpoint = () => {
  return useAsyncEndpoint((data, endpoint) => ({
    _endpoint: endpoint,
    data,
  }));
};
const useDropDownApi = (_endpoint, _data = null) => {
  const [stateList, setStateList] = regEndpoint();
  const [dropDownItems, setDropDownItems] = useState([]);

  useEffect(() => {
    //console.log(stateList);
    //console.log(_endpoint);
    setStateList(_data, _endpoint);
  }, []);
  useEffect(() => {
    // console.log('hi');
    //console.log(stateList);
    if (stateList !== null && stateList.status) {
      //const dropDownParam = _endpoint.dropDownParam;
      //console.log(dropDownParam);
      setDropDownItems(stateList.data);

      // stateList.data.forEach((name) => {
      //   dropDownItems.push({
      //     label: name.label,
      //     value: name.value,
      //   });
      // });
    }
  }, [stateList != null]);

  return { dropDownItems };
};
export default useDropDownApi;
