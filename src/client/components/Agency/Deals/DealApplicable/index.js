import Grid from '@material-ui/core/Grid';
import React from 'react';
import {
  Button,
  MultiSelect,
  SecondaryAccordion,
  TextInput,
  CustomCheckbox,
} from 'Widgets';
import './style.scss';

const DealApplicable = () => {
  return (
    <SecondaryAccordion
      text={
        <div className="d-flex align-items-center">
          DEAL APPLICABLE POS
          <div className="font-primary-regular-14 pl-8">
            [If Booked from any of below Region, Continent, Country, or City]:
          </div>
        </div>
      }
      defaultOpen={true}
      // className={curData.className}
      className="DealApplicable"
    >
      <div className="DealApplicable-container">
        <Grid
          container
          spacing={1}
          className="DealApplicable-container-form"
          alignItems="flex-end"
        >
          <Grid item xs={3}>
            <MultiSelect
              name="region"
              label="Region:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Region"
            />
          </Grid>
          <Grid item xs={9}>
            <TextInput
              name=""
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              placeholder="South East Asia, North India, Asia Pacific, North Africa, Europe"
            />
          </Grid>
          <Grid item xs={3}>
            <MultiSelect
              name="continent"
              label="Continent:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Continent"
            />
          </Grid>
          <Grid item xs={9}>
            <TextInput
              name=""
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="country"
              label="Country:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select Country"
            />
          </Grid>
          <Grid item xs={9}>
            <TextInput
              name=""
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
            />
          </Grid>

          <Grid item xs={3}>
            <MultiSelect
              name="city"
              label="City:"
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              showBorder={true}
              changeStyle={true}
              options={[]}
              width="auto"
              placeholder="Select City"
            />
          </Grid>
          <Grid item xs={9}>
            <TextInput
              name=""
              // disabled={isViewSecurityGroup}
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomCheckbox
              primaryLabel="All [Countries &amp; Cities]"
              name="All"
              useReactHookForm={false}
              onChange={(value) => console.log(value)}
              className="mt-20"
            />
          </Grid>
        </Grid>
      </div>
    </SecondaryAccordion>
  );
};

export default DealApplicable;
