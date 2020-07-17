import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  SelectWithTextInput,
  MultiSelect,
  TextInput,
  Button,
  Text,
  TextWithTextInput,
} from 'Widgets';
import { useForm } from 'react-hook-form';
import { regex } from 'Helpers/validator';
import PersonIcon from '@material-ui/icons/Person';
import colors from 'Constants/colors';
import routes from 'Constants/routes';

import './style.scss';

const UserProfileForm = (props) => {
  const { mode } = props;

  const isViewUser = mode === routes.office.viewOfficeUser;
  const isCreateUser = mode === routes.office.createOfficeUser;
  const isUpdateUser = mode === routes.office.updateOfficeUser;

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {
      officeId: 'SB00235',
      officeName: 'Axis Tours and Travels',
    },
  });

  const onSubmit = (data, e) => {
    console.log('data', data);
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
              {isUpdateUser && (
                <Button text="Remove" secondary className="mb-16" />
              )}
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
                  data={[
                    { label: 'Mr', value: 'mr' },
                    { label: 'Mrs', value: 'mrs' },
                  ]}
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
                  disabled={isViewUser && true}
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
                  disabled={isViewUser && true}
                />
              </Grid>

              <Grid item xs={12}>
                <SelectWithTextInput
                  name="mobile"
                  selectInputName="mobileDialCode"
                  data={[
                    { label: 'India', value: 'IN (+91)' },
                    { label: 'Canada', value: 'CA (+1)' },
                  ]}
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
                  disabled={isViewUser && true}
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
                  disabled={isViewUser && true}
                />
              </Grid>

              <Grid item xs={12}>
                <MultiSelect
                  label="Status:"
                  name="status"
                  options={[
                    { label: 'Active', value: 'Active' },
                    { label: 'Inactive', value: 'Inactive' },
                  ]}
                  placeholder="Select Status"
                  showBorder={true}
                  changeStyle={true}
                  control={control}
                  errors={errors}
                  validation={{ required: 'Please enter the status' }}
                  showValue
                  width="auto"
                  disabled={isViewUser && true}
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
                  validation={{
                    required: 'Please enter the email.',
                    pattern: {
                      value: regex.email,
                      message: 'Please enter valid email id.',
                    },
                  }}
                  disabled={(isViewUser || isUpdateUser) && true}
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
                  disabled={isViewUser && true}
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
                  disabled={isViewUser && true}
                />
              </Grid>

              {!isViewUser && (
                <Grid item xs={12} className="d-flex justify-content-end">
                  <Button
                    text={`${isCreateUser ? 'Create User' : 'Save'}`}
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
