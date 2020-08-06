import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  SelectWithTextInput,
  MultiSelect,
  TextInput,
  Button,
  Text,
  TextWithTextInput,
  Toast,
} from 'Widgets';
import { useForm } from 'react-hook-form';
import { regex } from 'Helpers/validator';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
//import routes from 'Constants/routes';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam, titles } from 'Constants/commonConstant';
import { countriesDialCodeFormatter } from 'Helpers/global';
import { useSelector, useDispatch } from 'react-redux';
import endpoint from 'Config/endpoint';
import { utils } from 'Helpers';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { commonActionWithoutApi } from 'Actions';

import './style.scss';

const createEndpoint = () => {
  return useAsyncEndpoint((data, endpoint) => ({
    _endpoint: endpoint,
    data,
  }));
};

let defaultValues = {
  title: '',
  mobileDialCode: '',
  mobile: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  securityGroup: '',
  status: '',
};

const CreateUserForm = () => {
  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    'masterCountries',
    countriesDialCodeFormatter
  );

  const dispatch = useDispatch();

  const searchResult =
    useSelector((state) => state.searchOffice?.items?.data) || [];
  const [ofId, setOfId] = useState('');

  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    defaultValues,
  });

  const [createRes, postCreateRequest] = createEndpoint();

  const getOfficeDetail = () => {
    const selectedOffice = utils.getItemFromStorage('selectedOffice') || '';
    console.log('selectedOffice', selectedOffice);

    if (selectedOffice) {
      let selectedItem = searchResult.data[selectedOffice] || {};
      console.log('selectedcreate', selectedItem);

      setOfId(selectedItem.ofId);
      reset({
        officeId: selectedItem.officeId,
        officeName: selectedItem.officeName,
      });
    } else {
      const {
        userDto: {
          officeDto: { officeName, officeId, ofId },
        },
      } = JSON.parse(utils.getItemFromStorage('userData'));

      setOfId(ofId);
      reset({
        officeId,
        officeName,
      });
    }
  };

  useEffect(() => getOfficeDetail(), []);

  useEffect(() => {
    if (createRes !== null) {
      const errMsg = utils.checkError(createRes);

      if (errMsg)
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
      else {
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: true,
            toastMessage: `Office user created successfully`,
            isToastVisible: true,
          })
        );
        reset(defaultValues);
      }
    }
  }, [createRes]);

  const onSubmit = (data, e) => {
    console.log('data', data);

    postCreateRequest(
      {
        ...data,
        action: 'I',
        ofId: ofId,
      },
      endpoint.office.createUser
    );

    //   const errMsg = utils.checkError(createRes);
    //   if (!errMsg) setToast({ status: false, message: errMsg });
    //   else {
    //     setToast({ status: true, message: 'Office user created successfully' });
    // //    reset(defaultValues);
    //   }
  };

  return (
    <div className="CreateUserForm">
      <div className="CreateUserForm-imageContainer d-flex align-items-center">
        <div className="CreateUserForm-imageContainer__image d-flex justify-content-center align-items-center mr-20">
          <PersonIcon style={{ fontSize: 75, color: colors.gray }} />
        </div>
        <div>
          <div className="d-flex">
            <Button text="Upoad New Photo" className="mb-16 mr-10" />
          </div>

          <div className="CreateUserForm-imageContainer__text font-primary-semibold-14">
            Image should be at least 300 X 300 px in .jpg/.png or .gif format
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="action" ref={register}></input>
        <Grid container>
          <Grid item xs={6} className="CreateUserForm-left">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="User Details"
                  className="font-primary-semibold-18"
                />
              </Grid>

              <Grid item xs={12}>
                <SelectWithTextInput
                  name="firstName"
                  selectInputName="title"
                  data={titles}
                  label="First Name: "
                  placeholder="First Name"
                  selectPlaceholder="Title"
                  errors={errors}
                  register={register}
                  validation={{
                    required: 'Please enter the first name.',
                    pattern: {
                      value: regex.name,
                      message: 'Please enter the alphabets only.',
                    },
                  }}
                  selectValidation={{
                    required: 'Please enter the title.',
                  }}
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  name="lastName"
                  register={register}
                  errors={errors}
                  placeholder="Last Name "
                  label="Last Name:"
                  validation={{
                    required: 'Please enter the last name.',
                    minLength: {
                      value: 2,
                      message: 'Please enter minimum two alphabets',
                    },
                    pattern: {
                      value: regex.name,
                      message: 'Please enter the alphabets only.',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectWithTextInput
                  name="mobile"
                  selectInputName="mobileDialCode"
                  data={countriesDialCodeList.dropDownItems}
                  label="Mobile Number: "
                  placeholder="Mobile Number"
                  selectPlaceholder="Dial Code"
                  errors={errors}
                  register={register}
                  validation={{ required: 'Please enter the mobile number.' }}
                  selectValidation={{
                    required: 'Please enter the country code.',
                  }}
                  control={control}
                  showValue
                />
              </Grid>

              <Grid item xs={12}>
                <TextWithTextInput
                  names={{ input1: 'officeId', input2: 'officeName' }}
                  label="Office ID | Name:"
                  errors={errors}
                  register={register}
                  disabled
                />
              </Grid>

              <Grid item xs={12}>
                <MultiSelect
                  label="Security Group:"
                  name="securityGroup"
                  options={[
                    { label: 'Admin', value: 'Admin' },
                    { label: 'Account', value: 'Account' },
                  ]}
                  placeholder="Select Security Group"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  validation={{ required: 'Please enter the security group' }}
                  showValue
                  width="auto"
                />
              </Grid>

              <Grid item xs={12}>
                <MultiSelect
                  label="Status:"
                  name="status"
                  options={objectStatusesList.dropDownItems}
                  placeholder="Select Status"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  // validation={{ required: 'Please enter the status' }}
                  width="auto"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="CreateUserForm-right">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Text
                  showLeftBorder
                  text="Login Details"
                  className="font-primary-semibold-18"
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  name="emailId"
                  register={register}
                  errors={errors}
                  label="Login ID | Email ID:"
                  placeholder="Type Email ID"
                  validation={{
                    required: 'Please enter the email.',
                    pattern: {
                      value: regex.email,
                      message: 'Please enter valid email id.',
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextInput
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  label="Password:"
                  validation={{
                    required: 'Please enter the password.',
                    minLength: {
                      value: 8,
                      message: 'Please enter minimum eight characters',
                    },
                    maxLength: {
                      value: 16,
                      message: 'Please enter maximum sixteen characters',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  name="confirmPassword"
                  type="password"
                  register={register}
                  errors={errors}
                  label="Confirm Password:"
                  validation={{
                    validate: (value) =>
                      value === watch('password') || "Passwords don't match.",
                  }}
                />
              </Grid>

              <Grid item xs={12} className="d-flex justify-content-end">
                <Button text="Create User" type="submit" className="mb-30" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateUserForm;
