import React from "react";
import Grid from "@material-ui/core/Grid";
import { TextInput, SelectWithTextInput, Text, Button } from "Widgets";
import { useForm } from "react-hook-form";
import { regex } from "Helpers/validator";

import "./style.scss";

const OfficeInvitationForm = () => {
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      title: { label: "Mr", value: "mr" },
    },
  });

  const onSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <div className="OfficeInvitationForm">
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
              data={[
                { label: "Mr", value: "mr" },
                { label: "Mrs", value: "mrs" },
              ]}
              label="First Name"
              placeholder="First Name"
              selectPlaceholder="Title"
              errors={errors}
              register={register}
              validation={{ required: "Please enter the first name." }}
              selectValidation={{
                required: "Please enter the title.",
              }}
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="lastName"
              register={register}
              errors={errors}
              label="Last Name"
              validation={{
                required: "Please enter the last name.",
                pattern: {
                  value: regex.name,
                  message: "Please enter the alphabets only.",
                },
                minLength: {
                  value: 2,
                  message: "Please enter minimum two alphabets",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWithTextInput
              name="mobileNumber"
              selectInputName="mobileCountryCode"
              data={[
                { label: "India", value: "+91" },
                { label: "Canada", value: "+51" },
              ]}
              label="Mobile Number"
              placeholder="Mobile Number"
              selectPlaceholder="Country Code"
              errors={errors}
              register={register}
              validation={{ required: "Please enter the first name." }}
              selectValidation={{
                required: "Please enter the country code.",
              }}
              control={control}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="emailId"
              register={register}
              errors={errors}
              label="Email"
              validation={{
                required: "Please enter the email.",
                pattern: {
                  value: regex.email,
                  message: "Please enter valid email id.",
                },
              }}
            />
          </Grid>
        </Grid>
        <div className="d-flex justify-content-end pt-36">
          <Button text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default OfficeInvitationForm;
