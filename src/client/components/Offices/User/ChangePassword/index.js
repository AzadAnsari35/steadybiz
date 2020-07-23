import Grid from '@material-ui/core/Grid';
import { regex } from 'Helpers/validator';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  SelectWithTextInput,
  Text,
  TextInput,
  TextWithTextInput,
  Toast,
} from 'Widgets';
import useDropDown from 'Hooks/useDropDown';
import endpoint from 'Config/endpoint';
import { dropDownParam, titles } from 'Constants/commonConstant';
import { countriesDialCodeFormatter } from 'Helpers/global';

import './style.scss';

const ChangePasswordForm = () => {
  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: {},
  });

  const [toast, setToast] = useState({
    message: '',
    status: false,
  });

  const onSubmit = (data, e) => {
    console.log('data', data);
  };

  const countriesDialCodeList = useDropDown(
    endpoint.master.countries,
    dropDownParam.countriesDialCode,
    'masterCountries',
    countriesDialCodeFormatter
  );

  return (
    <>
      <div className="ChangePasswordForm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={6} className="ChangePasswordForm-left">
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
                  <TextWithTextInput
                    names={{ input1: 'officeId', input2: 'officeName' }}
                    label="Office ID | Name:"
                    errors={errors}
                    register={register}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className="ChangePasswordForm-right">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Text
                    showLeftBorder
                    text="User Details"
                    className="font-primary-semibold-18"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    name="existingPassword"
                    type="password"
                    register={register}
                    errors={errors}
                    label="Existing Password:"
                    validation={{
                      required: 'Please enter the existing password.',
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextInput
                    name="newPassword"
                    type="password"
                    register={register}
                    errors={errors}
                    label="New Password:"
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
                  <Button
                    text="Change Password"
                    type="submit"
                    className="mb-30"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      {toast.message && (
        <Toast isSuccess={toast.status} message={toast.message} />
      )}
    </>
  );
};

export default ChangePasswordForm;
