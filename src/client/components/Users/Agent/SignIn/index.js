import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "Widgets/TextInput";
import Button from "Widgets/Button";
import { regex } from "Helpers/validator";

const SignInForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {}; //

  return (
    <div>
      <div className="d-flex justify-content-center">
        <p className="font-primary-medium-32 mb-28">Sign In</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          name="emailId"
          register={register}
          errors={errors}
          label="Email ID"
          validation={{
            required: "This input is required.",
            pattern: {
              value: regex.email,
              message: "Please enter a valid email id",
            },
          }}
          classes={{ root: "mb-16", input: "" }}
        />
        <TextInput
          name="password"
          register={register}
          errors={errors}
          label="Password"
          validation={{
            required: "This input is required.",
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
