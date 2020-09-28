import Grid from '@material-ui/core/Grid';
import endpoint from 'Config/endpoint';
import { commonConstant } from 'Constants/';
import { regex } from 'Helpers/validator';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, SelectWithTextInput, Text, TextInput } from 'Widgets';
import './style.scss';
import useAsyncEndpoint from 'Hooks/useAsyncEndpoint';
import { utils } from 'Helpers/index';
const createEndpoint = () => {
  return useAsyncEndpoint((endpoint, data) => ({
    _endpoint: endpoint,
    data,
  }));
};

const AgencyInvitationForm = (props) => {
  const { countriesDialCodeList } = props;
  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues: {},
  });
  const [createRes, postCreateRequest] = createEndpoint();
  const defaultValues = {
    title: '',

    mobileDialCode: '',
  };
  const handleReset = () => {
    reset(defaultValues);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (createRes) {
      if (createRes.status) {
        dispatch(utils.showSuccessBox('Invitation sent successfully'));
        handleReset();
      } else {
        dispatch(utils.showErrorBox(createRes.error.message));
      }
    }
  }, [createRes]);
  const onSubmit = (data) => {
    postCreateRequest(endpoint.agency.invite, { data, inviteId: null });
    console.log('data', data);
  };

  return (
    <div className="AgencyInvitationForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Contact Details"
              className="font-primary-semibold-18"
            />
          </Grid>

          <Grid item xs={6}>
            <SelectWithTextInput
              name="firstName"
              selectInputName="title"
              data={commonConstant.titles}
              label="First Name"
              placeholder="First Name:"
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
          <Grid item xs={6}>
            <TextInput
              name="lastName"
              register={register}
              errors={errors}
              label="Last Name:"
              validation={{
                required: 'Please enter the last name.',
                pattern: {
                  value: regex.name,
                  message: 'Please enter the alphabets only.',
                },
                minLength: {
                  value: 2,
                  message: 'Please enter minimum two alphabets',
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWithTextInput
              name="mobile"
              selectInputName="mobileDialCode"
              data={countriesDialCodeList.dropDownItems}
              label="Mobile Number:"
              placeholder="Mobile Number"
              selectPlaceholder="Dial Code"
              errors={errors}
              register={register}
              validation={{
                required: 'Please enter the mobile number.',
                pattern: {
                  value: regex.number,
                  message: 'Please enter valid phone number.',
                },
              }}
              selectValidation={{
                required: 'Please enter the country code.',
              }}
              control={control}
              showValue
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="inviteeEmail"
              register={register}
              errors={errors}
              label="Email:"
              validation={{
                required: 'Please enter the email.',
                pattern: {
                  value: regex.email,
                  message: 'Please enter valid email id.',
                },
              }}
            />
          </Grid>
        </Grid>

        <div className="d-flex justify-content-end pt-36">
          <Button
            secondary
            text="Reset"
            className="mr-16"
            onClick={handleReset}
          />
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default AgencyInvitationForm;
