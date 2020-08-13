import Grid from '@material-ui/core/Grid';
import { commonActionWithoutApi } from 'Actions';
import endpoint from 'Config/endpoint';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import { utils } from 'Helpers';
import { regex } from 'Helpers/validator';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Text, TextInput, TextWithTextInput } from 'Widgets';
import { useDispatch } from 'react-redux';

import './style.scss';

const defaultValues = {
  existingPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const passwordEndpoint = () => {
  return useAsyncEndpoint((data) => ({
    _endpoint: endpoint.office.changePassword,
    data,
  }));
};

const ChangePasswordForm = () => {
  const { register, handleSubmit, errors, control, watch, reset } = useForm({
    defaultValues,
  });

  const dispatch = useDispatch();

  let userId = utils.getItemFromStorage('userId');

  const [response, postData] = passwordEndpoint();

  const setDefaultValue = () => {
    const {
      userDto: {
        officeDto,

        emailId,
      },
    } = JSON.parse(utils.getItemFromStorage('userData'));

    reset({
      emailId,
      officeId: officeDto.officeId,
      officeName: officeDto.officeName,
    });
  };

  useEffect(() => {
    setDefaultValue();
  }, []);

  useEffect(() => {
    if (response !== null) {
      const errMsg = utils.checkError(response);

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
            toastMessage: `Password changed successfully`,
            isToastVisible: true,
          })
        );
        reset(defaultValues);
      }
    }
  }, [response]);

  const onSubmit = (data, e) => {
    console.log('data', data);
    postData({ ...data, userId });
  };

  return (
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
                  name="currentPassword"
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
                  name="newPasswordConfirm"
                  type="password"
                  register={register}
                  errors={errors}
                  label="Confirm Password:"
                  validation={{
                    validate: (value) =>
                      value === watch('newPassword') ||
                      "Passwords don't match.",
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
  );
};

export default ChangePasswordForm;
