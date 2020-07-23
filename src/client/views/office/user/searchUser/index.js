import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { regex } from 'Helpers/validator';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  Button,
  MultiSelect,
  SelectWithTextInput,
  Text,
  TextInput,
} from 'Widgets';
import SimplePopover from 'Widgets/Popover';
import PrimaryTable from 'Widgets/PrimaryTable';
import PrimaryTableHeader from 'Widgets/TableHeaders/PrimaryTableHeader';
import routes from 'Constants/routes';
import './style.scss';
import { useHistory } from 'react-router-dom';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';

const headerData = [
  'FIRST NAME',
  'LAST NAME',
  'LOGIN ID | EMAIL',
  'MOBILE',
  'SECURITY GROUP',
  'STATUS',
  'ACTION',
];

const response = {
  status: true,
  data: {
    status: 'OK',
    count: 4,
    data: [
      {
        // ofId: '30f4c169-56b1-4db2-9ab4-7645801ee5b9',
        firstName: 'Azad',
        lastName: 'Ansari',
        officeEmail: 'pawan@gmail.com',
        mobile: '+91-9985860110',
        securityGroup: 'Admin',
        Status: 'Active',
      },
      {
        // ofId: '30f4c169-56b1-4db2-9ab4-7645801ee5b9',
        firstName: 'Azad',
        lastName: 'ANsari',
        officeEmail: 'pawan@gmail.com',
        mobile: '+91-9985860110',
        securityGroup: 'MIS Finance',
        Status: 'Inactive',
      },
      {
        // ofId: '30f4c169-56b1-4db2-9ab4-7645801ee5b9',
        firstName: 'Azad',
        lastName: 'Ansari',
        officeEmail: 'pawan@gmail.com',
        mobile: '+91-9985860110',
        securityGroup: 'Account',
        Status: 'Freeze',
      },
    ],
  },
};

export const objectStatusData = [
  { label: 'All', value: 'All' },

  {
    // objectStatusId: 'eb2c823c-790a-44c7-a1fb-777cb9b7caa8',
    label: 'ACTIVE',
  },
  {
    // objectStatusId: 'c5fbcd98-5ace-493a-89d2-f4bcdaa6ad8a',
    label: 'INACTIVE',
  },
  {
    // objectStatusId: 'c1142fd8-6933-4c5c-8667-3fb55a872e2b',
    label: 'REGISTER',
  },
  {
    // objectStatusId: 'e67cdecd-0c20-46be-aa0d-6f880dd503e7',
    label: 'REJECT',
  },
  {
    // objectStatusId: 'ef7c4785-d249-49d3-ab38-cc3197c26cd1',
    label: 'FREEZE',
  },
];

const PopoverAction = () => {
  const [showPopover, setShowPopover] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowPopover(true);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setShowPopover(false);
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
          <Link
            to={routes.office.viewOfficeUser}
            className="font-primary-regular-14"
          >
            View User
          </Link>
          <Link
            to={routes.office.updateOfficeUser}
            className="font-primary-regular-14"
          >
            Modify User
          </Link>
        </div>
      </SimplePopover>
    </>
  );
};

const SearchUser = () => {
  let history = useHistory();
  const [regResponse, postRegResponse] = useAsyncEndpoint();

  const { register, handleSubmit, errors, control, getValues } = useForm({
    defaultValues: {
      status: { label: 'Active', value: 'Active' },
      officeType: { label: 'Own', value: 'Own' },
    },
  });

  const onSubmit = (data, e) => {
    console.log('data', data);
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
                options={objectStatusData}
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
      <PrimaryTable
        header={<PrimaryTableHeader />}
        headerData={headerData}
        bodyData={response.data}
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
        statusIndex={5}
        imageIndex={0}
      />
    </div>
  );
};

export default SearchUser;
