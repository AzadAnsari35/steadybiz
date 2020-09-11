import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction } from 'Actions/';
import { bindDropDown } from 'Helpers/global';

const useDropDown = (
  _endpoint,
  dropDownParam,
  stateName,
  customDropdownFunction = false,
  _data = null
) => {
  const [dropDownItems, setDropDownItems] = useState([]);
  const stateList = useSelector(
    (state) => state[_endpoint.reducerName ? _endpoint.reducerName : stateName]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const dispatchAction = async () => {
      await dispatch(commonAction(_endpoint, _data));
    };
    dispatchAction();
  }, []);

  useEffect(() => {
    if (stateList.items !== undefined && stateList.items.status) {
      console.log(stateList.items);
      if (customDropdownFunction) {
        setDropDownItems(customDropdownFunction(stateList.items.data.data));
      } else {
        setDropDownItems(
          bindDropDown(
            stateList.items.data.data,
            dropDownParam.label,
            dropDownParam.value
          )
        );
      }
    }
    //console.log('abc', dropDownItems);
  }, [stateList.items != undefined]);

  return { dropDownItems };
};
export default useDropDown;
