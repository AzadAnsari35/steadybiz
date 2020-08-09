import React from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'Widgets';
import { regex } from 'Helpers/validator';

import './style.scss';

const ForgotPasswordForm = (props) => {
  const { register, handleSubmit, watch, errors } = useForm();

  const { setSelectedForm, selectedForm } = props;

  const onSubmit = (data) => {
    console.log('data', data);
  };

  return (
    <div className="ForgotPasswordForm">
      <div className="font-primary-medium-14 mb-28">
        {selectedForm === 'ForgotPasswordForm'
          ? "Enter the email address associated with your account and we'll send you a link to reset your password."
          : 'SignUp'}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="emailId"
          register={register}
          errors={errors}
          label="Email ID"
          validation={{
            required: 'Please enter a valid email.',
            pattern: {
              value: regex.email,
              message: 'Please enter a valid email id',
            },
          }}
          classes={{ root: 'mb-16', input: '' }}
        />
        <Button
          text="Continue"
          type="submit"
          className="ForgotPasswordForm-btn"
        />
      </form>
      <div className=" font-primary-medium-14 d-flex justify-content-center mt-12">
        <div>
          {' '}
          Return to
          <span
            className="link-text"
            onClick={() => setSelectedForm('SignInForm')}
          >
            {' '}
            Sign In{' '}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
