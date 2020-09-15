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
import routes from 'Constants/routes';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import useDropDown from 'Hooks/useDropDown';
import {
  dropDownParam,
  titles,
  securityGroups,
} from 'Constants/commonConstant';
import { countriesDialCodeFormatter } from 'Helpers/global';
import { useDispatch, useSelector } from 'react-redux';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { commonActionWithoutApi, commonAction } from 'Actions';

import endpoint from 'Config/endpoint';
import { utils } from 'Helpers';

import './style.scss';

const updateEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.createUser,
    data,
  }));
};

const defaultValues = {
  title: '',
  mobileDialCode: '',
  securityGroup: '',
  status: '',
};
const UserProfileForm = (props) => {
  const { mode } = props;
  const dispatch = useDispatch();

  // const [userId, setUserId] = useState('');

  const isViewUser = mode === routes.office.viewOfficeUser;
  const isManageProfile = mode === routes.office.manageUserProfile;
  const isUpdateUser = mode === routes.office.updateOfficeUser;

  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    defaultValues,
  });

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    'masterCountries'
  );

  const securityGroupNameList = useSelector(
    (state) => state.securityGroupNameList?.items?.data
  );

  let rowNumber = utils.getItemFromStorage('selectedUser');
  const selectedAgency = utils.getItemFromStorage('selectedAgency') ?? '';

  // console.log('rowNumber', rowNumber);

  const searchAgency =
    useSelector((state) => state.searchAgency?.items?.data) || [];

  const searchResult =
    useSelector((state) => state.searchUser?.items?.data) || [];
  console.log('searchResult', searchResult);

  const searchOffice =
    useSelector((state) => state.searchOffice?.items?.data) || [];

  let selectedItem =
    (Number.isInteger(parseInt(rowNumber)) && searchResult?.data[rowNumber]) ||
    {};
  console.log('selectedItem', selectedItem);

  let userId = selectedItem?.userId || '';

  let ofId = utils.getItemFromStorage('officeId');

  const [updateRes, postUpdateRequest] = updateEndpoint();

  const setDefaultValue = () => {
    if (!isManageProfile) {
      const selectedOffice = utils.getItemFromStorage('selectedOffice') || '';
      let officeId = '';
      let officeName = '';

      if (Number.isInteger(parseInt(selectedOffice)) && searchOffice.data) {
        let selectedItem = searchOffice.data[selectedOffice] || {};
        console.log('selected', selectedItem);

        officeId = selectedItem.officeId;
        officeName = selectedItem.officeName;
      } else if (
        Number.isInteger(parseInt(selectedAgency)) &&
        searchAgency.data
      ) {
        let selectedItem = searchAgency.data[selectedAgency] || {};

        officeId = selectedItem.officeId;
        officeName = selectedItem.officeName;
      } else {
        const {
          userDto: { officeDto },
        } = JSON.parse(utils.getItemFromStorage('userData'));

        console.log('userId', userId);
        officeId = officeDto.officeId;
        officeName = officeDto.officeName;
      }

      if (
        countriesDialCodeList.dropDownItems !== null &&
        objectStatusesList.dropDownItems != null &&
        securityGroupNameList &&
        securityGroupNameList.data !== null
      ) {
        const {
          firstName,
          lastName,
          title,
          mobile,
          emailId,
          objectStatusDesc,
          securityGroup,
        } = selectedItem;
        console.log('selectedItem', selectedItem);
        console.log('securityGroupNameList', securityGroupNameList);
        reset({
          firstName,
          lastName,
          title: titles.findItem(title),
          mobile: mobile.split('-')[1],
          mobileDialCode: countriesDialCodeList.dropDownItems.findItem(
            mobile.split('-')[0]
          ),
          emailId,
          status: objectStatusesList.dropDownItems.findItem(
            objectStatusDesc.toUpperCase(),
            'label'
          ),
          securityGroup: securityGroupNameList.data.findItem(
            securityGroup,
            'label'
          ),
          officeId,
          officeName,
        });
      }
    }
  };

  const setManageProfileDefaultValue = () => {
    if (
      isManageProfile &&
      !!countriesDialCodeList.dropDownItems &&
      !!objectStatusesList.dropDownItems &&
      securityGroupNameList &&
      securityGroupNameList.data !== null
    ) {
      const {
        userDto: {
          officeDto,
          firstName,
          lastName,
          title,
          emailId,
          objectStatusId,
          userGroups,
        },
      } = JSON.parse(utils.getItemFromStorage('userData'));
      reset({
        firstName,
        lastName,
        title: titles.findItem(title),
        mobile: officeDto.mobile.split('-')[1],
        mobileDialCode: countriesDialCodeList.dropDownItems.findItem(
          officeDto.mobile.split('-')[0]
        ),
        emailId,
        status: objectStatusesList.dropDownItems.findItem(
          objectStatusId,
          'value'
        ),
        securityGroup: securityGroupNameList.data.findItem(userGroups[0]),
        officeId: officeDto.officeId,
        officeName: officeDto.officeName,
      });
    }
  };

  useEffect(() => {
    if (updateRes !== null) {
      const errMsg = utils.checkError(updateRes);

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
            toastMessage: `Office user updated successfully`,
            isToastVisible: true,
          })
        );
        if (isManageProfile) {
          const userData = JSON.parse(utils.getItemFromStorage('userData'));
          userData.userDto.officeDto.mobile = updateRes.data.data.mobile;
          utils.setItemToStorage('userData', JSON.stringify(userData));
          console.log('response', updateRes);

          console.log('userData', userData);
        }
      }
    }
  }, [updateRes]);

  useEffect(() => setDefaultValue(), [
    countriesDialCodeList.dropDownItems,
    objectStatusesList.dropDownItems,
    securityGroupNameList,
  ]);

  useEffect(() => setManageProfileDefaultValue(), [
    countriesDialCodeList.dropDownItems,
    objectStatusesList.dropDownItems,
    securityGroupNameList,
  ]);

  useEffect(() => {
    dispatch(
      commonAction(endpoint.office.securityGroupNameList, {
        ofId,
        page: 0,
        size: 100,
      })
    );
  }, []);

  const onSubmit = (data, e) => {
    console.log('data', data);
    console.log('userId', userId);

    if (isUpdateUser || isManageProfile) {
      postUpdateRequest(
        {
          ...data,
          action: 'U',
          userId,
        },
        endpoint.office.createUser
      );
    }

    // if (isManageProfile) {
    //   postUpdateRequest(
    //     {
    //       ...data,
    //       action: 'U',
    //       userId: JSON.parse(utils.getItemFromStorage('userId')),
    //     },
    //     endpoint.office.createUser
    //   );
    // }
  };

  return (
    <div className="UserProfileForm">
      <div className="UserProfileForm-imageContainer d-flex align-items-center">
        <div className="UserProfileForm-imageContainer__image d-flex justify-content-center align-items-center mr-20">
          <PersonIcon style={{ fontSize: 75, color: colors.gray }} />
        </div>
        {!isViewUser && (
          <div>
            <div className="d-flex">
              <Button text="Upoad New Photo" className="mb-16 mr-10" />
              <Button text="Remove" secondary className="mb-16" />
            </div>

            <div className="UserProfileForm-imageContainer__text font-primary-semibold-14">
              Image should be at least 300 X 300 px in .jpg/.png or .gif format
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={6} className="UserProfileForm-left">
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
                  disabled={!isUpdateUser}
                  isSearchable
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
                  disabled={!isUpdateUser}
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
                  validation={{
                    required: 'Please enter the mobile number.',
                    pattern: {
                      value: regex.number,
                      message: 'Please enter valid mobile number.',
                    },
                  }}
                  selectValidation={{
                    required: 'Please enter the country code.',
                  }}
                  control={control}
                  showValue
                  disabled={isViewUser}
                  maxLength={15}
                  isSearchable={false}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={6} className="UserProfileForm-right">
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
                  disabled
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
                  options={securityGroupNameList?.data || []}
                  placeholder="Select Security Group"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  validation={{ required: 'Please enter the security group' }}
                  showLabel
                  width="auto"
                  disabled={!isUpdateUser}
                  isSearchable
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
                  validation={{ required: 'Please enter the status' }}
                  width="auto"
                  disabled={!isUpdateUser}
                  isSearchable
                />
              </Grid>

              {!isViewUser && (
                <Grid item xs={12} className="d-flex justify-content-end">
                  <Button
                    text={`${
                      isManageProfile ? 'Update Profile' : 'Modify User'
                    }`}
                    type="submit"
                    className="mb-30"
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserProfileForm;
