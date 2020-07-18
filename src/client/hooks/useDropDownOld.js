import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commonAction from 'Actions/';
import endpoint from 'Config/endpoint';
// eslint-disable-next-line no-unused-vars
// const bindDropDown = (items, value, label) => {
//   //   console.log(items.items);
//   //console.log('dsfs', items);
//   //   return [{ value: '', label: 'loading...' }];
//   if (items === undefined) {
//     return [{ value: '', label: 'loading...' }];
//   }

//   let optionItems = items.data.data.map(function (item) {
//     return { value: item[value], label: item[label] };
//   });
//   // console.log('dfsddfds', optionItems);
//   return optionItems;
// };
const useDropDown = () => {
  const [itemss, setItems] = useState([]);
  const countryList = useSelector((state) => state['masterCountries']);
  const dispatch = useDispatch();
  useEffect(() => {
    //  console.log(dropDownList);
    const mycom = async () => {
      await dispatch(commonAction(endpoint.master.countries, null));
    };
    mycom();
  }, []);
  useEffect(() => {
    if (countryList.items !== undefined && countryList.items.status) {
      //   let abc = countryList.items.data.data.map((name) => ({
      //     label: name.countryCode,
      //     value: name.countryCode,
      //   }));
      countryList.items.data.data.forEach((country) => {
        itemss.push({
          label: country.countryCode,
          value: country.countryCode,
        });
      });
    }

    //  setItems(bindDropDown(countryList.items, 'countryCode', 'countryname'));
    console.log('hi', itemss);
  }, [countryList.items != undefined]);
  return { itemss };
};
export default useDropDown;
