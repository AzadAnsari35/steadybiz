import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  SelectWithTextInput,
  MultiSelect,
  TextInput,
  Button,
  CustomRadio,
  Text,
} from "Widgets";

import { useForm } from "react-hook-form";
import { regex } from "Helpers/validator";

import "./style.scss";

const OfficeRegistrationForm = () => {
  const { register, handleSubmit, errors, control, setValue, watch } = useForm({
    defaultValues: {
      title: { label: "Mr", value: "mr" },
    },
  });

  useEffect(() => {
    setValue("settlementOptions", "advanceDeposit");
  }, []);

  const onSubmit = (data, e) => {
    console.log("data", data);
    e.target.reset();
    const { confirmPassword, ...request } = data;
    console.log("request", request);
  };

  return (
    <div className="OfficeRegistrationForm">
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
              validation={{
                required: "Please enter the first name.",
                pattern: {
                  value: regex.name,
                  message: "Please enter the alphabets only.",
                },
              }}
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
              placeholder="Last Name"
              label="Last Name"
              validation={{
                required: "Please enter the last name.",
                minLength: {
                  value: 2,
                  message: "Please enter minimum two alphabets",
                },
                pattern: {
                  value: regex.name,
                  message: "Please enter the alphabets only.",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectWithTextInput
              name="mobile"
              selectInputName="mobileDialCode"
              data={[
                { label: "India", value: "IN (+91)" },
                { label: "Canada", value: "CA (+1)" },
              ]}
              label="Mobile Number"
              placeholder="Mobile Number"
              selectPlaceholder="Dial Code"
              errors={errors}
              register={register}
              validation={{ required: "Please enter the first name." }}
              selectValidation={{
                required: "Please enter the country code.",
              }}
              control={control}
              showValue
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="emailId"
              register={register}
              errors={errors}
              label="Email"
              placeholder="Email"
              validation={{
                required: "Please enter the email.",
                pattern: {
                  value: regex.email,
                  message: "Please enter valid email id.",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="password"
              type="password"
              register={register}
              errors={errors}
              label="Password"
              validation={{
                required: "Please enter the password.",
                minLength: {
                  value: 8,
                  message: "Please enter minimum eight characters",
                },
                maxLength: {
                  value: 16,
                  message: "Please enter maximum sixteen characters",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="confirmPassword"
              type="password"
              register={register}
              errors={errors}
              label="Confirm Password"
              validation={{
                validate: (value) =>
                  value === watch("password") || "Passwords don't match.",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Agency Details"
              className="font-primary-semibold-18"
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="officeName"
              register={register}
              errors={errors}
              label="Agency Name"
              placeholder="Agency Name"
              validation={{
                required: "Please enter the agency name.",
                pattern: {
                  value: regex.alphanumeric,
                  message: "Please enter valid agency name.",
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="address1"
              register={register}
              errors={errors}
              placeholder="Address Line 1"
              label="Address Line 1"
              validation={{
                required: "Please enter the address line 1.",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextInput
              name="address2"
              register={register}
              errors={errors}
              placeholder="Address Line 2"
              label="Address Line 2"
              validation={{
                required: "Please enter the address line 2.",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <MultiSelect
              label="Country"
              name="countryCode"
              options={[
                { label: "India", value: "IN" },
                { label: "Canada", value: "CN" },
              ]}
              placeholder="Country"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: "Please enter the country" }}
              showValue
              width="auto"
            />
          </Grid>

          <Grid item xs={6}>
            <MultiSelect
              label="City"
              name="cityCode"
              options={[
                { label: "New Delhi", value: "DEL" },
                { label: "Mumbai", value: "BOM" },
              ]}
              placeholder="City"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: "Please enter the city" }}
              width="auto"
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              name="zipCode"
              register={register}
              errors={errors}
              label="Zip Code"
              placeholder="Zip Code"
              validation={{
                required: "Please enter the address zip code.",
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              label="No of Users"
              name="noOfUserRequested"
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
              placeholder="No of Users"
              showBorder={true}
              changeStyle={true}
              control={control}
              errors={errors}
              validation={{ required: "Please enter the no of users" }}
              width="auto"
            />
          </Grid>

          <Grid item xs={6}>
            <SelectWithTextInput
              name="phone"
              selectInputName="phoneDialCode"
              data={[
                { label: "India", value: "IN (+91)" },
                { label: "Canada", value: "CA (+1)" },
              ]}
              label="Phone Number"
              placeholder="Phone Number"
              selectPlaceholder="Country Code"
              errors={errors}
              register={register}
              validation={{ required: "Please enter the phone number." }}
              selectValidation={{
                required: "Please enter the country code.",
              }}
              control={control}
              showValue
            />
          </Grid>

          <Grid item xs={12}>
            <Text
              showLeftBorder
              text="Payment Settlement Options"
              className="font-primary-semibold-18 mt-32"
            />
          </Grid>
          <Grid item xs={4}>
            <CustomRadio
              id="advanceDeposit"
              name="settlementOptions"
              register={register}
              errors={errors}
              value="advanceDeposit"
              label="Advance Deposit"
              subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomRadio
              id="creditCard"
              value="creditCard"
              name="settlementOptions"
              register={register}
              errors={errors}
              label="Credit Card"
              subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
            />
          </Grid>

          <Grid item xs={4}>
            <CustomRadio
              id="bankGuarantee"
              value="bankGuarantee"
              name="settlementOptions"
              register={register}
              errors={errors}
              label="Bank Guarantee"
              subLabel="Safe money transfer using your bank account. Safe Payment online. Credit Card needed, Visa ,Mastero, Discover"
            />
          </Grid>
        </Grid>
        <div className="d-flex justify-content-end pt-36">
          <Button type="submit" text="Submit" />
        </div>
      </form>
    </div>
  );
};

export default OfficeRegistrationForm;
