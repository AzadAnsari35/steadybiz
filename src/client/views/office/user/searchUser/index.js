import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { regex } from 'Helpers/validator';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  MultiSelect,
  SelectWithTextInput,
  Text,
  TextInput,
  SimplePopover,
  PrimaryTable,
  PrimaryTableHeader,
} from 'Widgets';
import routes from 'Constants/routes';
import { useHistory } from 'react-router-dom';
import endpoint from 'Config/endpoint.js';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import { useDispatch, useSelector } from 'react-redux';
import useDropDown from 'Hooks/useDropDown';
import { dropDownParam } from 'Constants/commonConstant';

import './style.scss';

const headerData = [
  'FIRST NAME',
  'LAST NAME',
  'LOGIN ID | EMAIL',
  'MOBILE',
  'SECURITY GROUP',
  'STATUS',
  'ACTION',
];

const PopoverAction = (props) => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const { rowNumber } = props;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
  };

  const handleViewUser = () => {
    history.push(routes.office.viewOfficeUser);
    dispatch(commonActionWithoutApi(endpoint.office.viewUser, rowNumber));
  };

  const handleModifyUser = () => {
    history.push(routes.office.updateOfficeUser);
    dispatch(commonActionWithoutApi(endpoint.office.updateUser, rowNumber));
  };

  return (
    <>
      <MoreVertIcon className="cursor-pointer" onClick={handlePopoverOpen} />
      <SimplePopover
        open={showPopover}
        handleClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className="SearchUser-tableAction d-flex flex-direction-column">
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={() => handleViewUser()}
          >
            View User
          </div>
          <div
            className="font-primary-regular-14 cursor-pointer"
            onClick={() => handleModifyUser()}
          >
            Modify User
          </div>
        </div>
      </SimplePopover>
    </>
  );
};

const SearchUser = () => {
  let history = useHistory();
  let dispatch = useDispatch();

  const objectStatusesList = useDropDown(
    endpoint.master.objectStatuses,
    dropDownParam.objectStatuses,
    'masterObjectStatuses'
  );

  const searchResult = useSelector((state) => state.overrideSearchResult);
  const response = searchResult ? searchResult.items : [];
  console.log('response', response);

  const { register, handleSubmit, errors, control, getValues } = useForm({
    defaultValues: {
      status: { label: 'Active', value: 'Active' },
    },
  });

  const onSubmit = (data, e) => {
    console.log('data', data);

    dispatch(commonAction(endpoint.office.searchUser, null));
  };

  return (
    <div className="SearchUser">
      <div className="SearchUser-head">
        <div className="font-primary-semibold-24 pb-4">MANAGE USERS</div>
        <div className="horizontal-grey-divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Text
            showLeftBorder={true}
            text="SEARCH USER"
            className="font-primary-medium-18 my-24"
          />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <TextInput
                name="firstName"
                register={register}
                errors={errors}
                label="First Name:"
                validation={{
                  pattern: {
                    value: regex.name,
                    message: 'Please enter the alphabets only.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="lastName"
                register={register}
                errors={errors}
                label="Last Name:"
                validation={{
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
            <Grid item xs={3}>
              <TextInput
                name="loginId"
                register={register}
                errors={errors}
                label="Login ID | Email :"
                validation={{
                  pattern: {
                    value: regex.email,
                    message: 'Please enter valid email id.',
                  },
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectWithTextInput
                name="mobile"
                selectInputName="mobileDialCode"
                data={[
                  { label: 'India', value: 'IN (+91)' },
                  { label: 'Canada', value: 'CA (+1)' },
                ]}
                label="Mobile Number"
                placeholder="Mobile Number"
                selectPlaceholder="Code"
                errors={errors}
                register={register}
                control={control}
                showValue
                validation={{
                  pattern: {
                    value: regex.number,
                    message: 'Please enter numbers only.',
                  },
                }}
                // selectValidation={
                //   getValues('mobile') && {
                //     validate: (value) =>
                //       !value && 'Please enter the mobile dial code .',
                //   }
                // }
              />
            </Grid>

            {/* <Grid item xs={3}>
              <MultiSelect
                label="Office Type:"
                name="officeType"
                options={[
                  { label: 'All', value: 'All' },
                  { label: 'Branch', value: 'Branch' },
                  { label: 'Own', value: 'Own' },
                ]}
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="officeName"
                register={register}
                errors={errors}
                label="Office Name:"
              />
            </Grid>
            <Grid item xs={3}>
              <TextInput
                name="officeId"
                register={register}
                errors={errors}
                label="Office ID:"
              />
            </Grid> */}
            <Grid item xs={3}>
              <MultiSelect
                label="Status:"
                name="status"
                options={objectStatusesList.dropDownItems}
                valueKey="label"
                showBorder={true}
                changeStyle={true}
                control={control}
                errors={errors}
                showValue
                width="auto"
              />
            </Grid>
            <Grid item xs={9}>
              <div className="d-flex justify-content-end pt-32">
                <Button
                  text="Create"
                  secondary
                  className=" px-48 mr-10"
                  onClick={() => history.push(routes.office.createOfficeUser)}
                />

                <Button type="submit" text="Search" className=" px-48" />
              </div>
            </Grid>
          </Grid>
        </form>

        <div></div>
      </div>
      {response && (
        <PrimaryTable
          header={<PrimaryTableHeader />}
          headerData={headerData}
          bodyData={response}
          AddElement={{
            last: <PopoverAction />,
          }}
          count={20}
          size={5}
          columnAlignments={[
            'left',
            'left',
            'left',
            'center',
            'left',
            'left',
            'center',
          ]}
          statusIndex={6}
          imageIndex={1}
          hideKeys={['userId', 'officeId']}
        />
      )}
    </div>
  );
};

export default SearchUser;
