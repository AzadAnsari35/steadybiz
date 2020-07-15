import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button } from 'Widgets';
import { regex } from 'Helpers/validator';
import { showError } from 'Helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import commonAction from 'Actions/';
import endpoint from 'Config/endpoint';
import { utils } from 'Helpers/index';
const SignInForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const apiResponse = useSelector((state) => state.usersSignIn);
  useEffect(() => {
    postLogin();
  }, [apiResponse]);

  const postLogin = () => {
    if (apiResponse.items != null) {
      const errorMsg = utils.checkError(apiResponse);
    }
    //alert(apiResponse.items.success);
  };
  const onSubmit = (data) => {
    try {
      const postData = { emailId: data.emailId, password: data.password };

      dispatch(commonAction(endpoint.user.login, postData));
    } catch (err) {
      showError(err, setError);
    }
  }; //

  return (
    <div>
      <div className="d-flex justify-content-center">
        <p className="font-primary-medium-32 mb-28">Sign In</p>
        <p>{error}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="emailId"
          register={register}
          errors={errors}
          label="Email ID"
          validation={{
            required: 'This input is required.',
            pattern: {
              value: regex.email,
              message: 'Please enter a valid email id',
            },
          }}
          classes={{ root: 'mb-16', input: '' }}
        />
        <TextInput
          type="password"
          name="password"
          register={register}
          errors={errors}
          label="Password"
          validation={{
            required: 'This input is required.',
          }}
        />
        <div className="d-flex justify-content-end">
          <p className="font-primary-medium-18 my-8">Forgot Password</p>
        </div>
        <div className="d-flex justify-content-end">
          <Button text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
