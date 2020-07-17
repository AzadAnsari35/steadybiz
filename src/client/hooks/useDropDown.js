import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonAction from 'Actions/';

const useDropDown = (_endpoint, stateName, _data = null) => {
  const [dropDownItems, setad] = useState([]);
  const stateList = useSelector((state) => state[stateName]);
  const dispatch = useDispatch();
  useEffect(() => {
    const dispatchAction = async () => {
      await dispatch(commonAction(_endpoint, _data));
    };
    dispatchAction();
  }, []);

  useEffect(() => {
    if (stateList.items !== undefined && stateList.items.status) {
      const dropDownParam = _endpoint.dropDownParam;
      //console.log(dropDownParam);
      stateList.items.data.data.forEach((name) => {
        dropDownItems.push({
          label: name[dropDownParam.label],
          value: name[dropDownParam.value],
        });
      });
    }
    //console.log('abc', dropDownItems);
  }, [stateList.items != undefined]);

  return { dropDownItems };
};
export default useDropDown;
