import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput, Button, Toast, PrimaryLoader } from 'Widgets';
import { regex } from 'Helpers/validator';
import { showError } from 'Helpers/utils';
import { useDispatch, useSelector } from 'react-redux';
import { commonAction, commonActionWithoutApi } from 'Actions/';
import endpoint from 'Config/endpoint';
import { utils } from 'Helpers/index';
import { useHistory } from 'react-router-dom';
import endpointWithoutApi from 'Config/endpointWithoutApi';
import routes from 'Constants/routes';

import './style.scss';

const SignInForm = (props) => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState(null);

  const { setSelectedForm } = props;

  const dispatch = useDispatch();
  const apiResponse = useSelector((state) => state.usersSignIn);
  useEffect(() => {
    postLogin();
  }, [apiResponse]);

  const postLogin = () => {
    console.log('apiResponse', apiResponse);
    if (!!apiResponse.items && !!apiResponse.items.data) {
      const errMsg = utils.checkError(apiResponse.items);

      console.log('errMsg'), errMsg;

      if (errMsg !== '')
        dispatch(
          commonActionWithoutApi(endpointWithoutApi.toast.toastStatus, {
            toastStatus: false,
            toastMessage: errMsg,
            isToastVisible: true,
          })
        );
      else {
        const responseJson = apiResponse.items.data;
        utils.setItemToStorage('userToken', responseJson.token);
        utils.setItemToStorage('userId', responseJson.userDto.userId);
        utils.setItemToStorage('officeId', responseJson.userDto.officeId);
        utils.setItemToStorage('userData', JSON.stringify(responseJson));

        //

        // history.push('/Office/Registration');
        history.push(routes.flight.search);
      }
    }

    //alert(apiResponse.items.success);
  };

  const onSubmit = (data) => {
    try {
      dispatch(commonAction(endpoint.user.login, data));
    } catch (err) {
      showError(err, setError);
    }
  }; //

  return (
    <div className="SignInForm">
      <div className="d-flex">
        <p className="font-primary-medium-20 mb-28">Sign In to your account</p>
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
            required: 'Please enter a password.',
          }}
        />
        <div className="d-flex justify-content-end link-text">
          <p
            className="font-primary-medium-14 mt-24 mb-16"
            onClick={() => setSelectedForm('ForgotPasswordForm')}
          >
            Forgot Password?
          </p>
        </div>
        <Button text="Submit" type="submit" className="SignInForm-btn" />
        <div className="font-primary-medium-14 d-flex justify-content-center mt-12">
          <div>
            {' '}
            Don't have account?
            <a
              className="link-text text-decoration-none"
              href="mailto:oktravels.mussafah@gmail.com
              ?subject=SubAgent SignUp"
            >
              {' '}
              Email{' '}
            </a>
            to Signup
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
