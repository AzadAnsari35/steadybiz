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

const SignInForm = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const dispatch = useDispatch();
  const apiResponse = useSelector((state) => state.usersSignIn);
  useEffect(() => {
    postLogin();
  }, [apiResponse]);

  const postLogin = () => {
    if (apiResponse.items != null) {
      const errMsg = utils.checkError(apiResponse.items);

      dispatch(
        commonActionWithoutApi(
          endpoint.flights.flightSearchResult,
          apiResponse.items
        )
      );
      if (errMsg !== '') setErrorMsg(errMsg);
      else {
        const responseJson = apiResponse.items.data;
        utils.setItemToStorage('userToken', responseJson.token);
        utils.setItemToStorage('userId', responseJson.userDto.userId);
        utils.setItemToStorage('officeId', responseJson.userDto.officeId);
        utils.setItemToStorage('userData', JSON.stringify(responseJson));

        //

        history.push('/Office/Registration');
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
    <>
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
            <Button text="Submit" type="submit" />
          </div>
        </form>
      </div>
      {errorMsg && <Toast isSuccess={!errorMsg} message={errorMsg} />}
    </>
  );
};

export default SignInForm;
