import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../../../widgets/TextInput";
import Button from "../../../../widgets/Button";

const SignInForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }; //

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
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
