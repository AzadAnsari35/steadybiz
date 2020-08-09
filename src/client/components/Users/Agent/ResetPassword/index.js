import React from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'Widgets';

const ResetPassword = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    console.log('data', data);
  };

  return (
    <div>
      <div className="d-flex">
        <p className="font-primary-medium-20 mb-28">Reset Password</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          type="password"
          name="password"
          register={register}
          errors={errors}
          label="Password"
          validation={{
            required: 'Please enter a password.',
          }}
          classes={{ root: 'mb-20' }}
        />
        <TextInput
          name="newPassword"
          type="password"
          register={register}
          errors={errors}
          label="New Password"
          validation={{
            validate: (value) =>
              value === watch('password') || "Passwords don't match.",
          }}
          classes={{ root: 'mb-20' }}
        />

        <Button
          text="Reset Password"
          type="submit"
          className="SignInForm-btn"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
