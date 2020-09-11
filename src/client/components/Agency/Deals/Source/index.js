import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Button, MultiSelect, SecondaryAccordion } from 'Widgets';
import './style.scss';
import { DEALS_SOURCE } from 'Constants/commonConstant';
const Source = ({ path }) => {
  const {
    isCreateDeal,
    isUpdateDeal,
    isViewDeal,
    isDealHistory,
    handleSourceChange,
  } = path;
  const handleChange = () => {
    handleSourceChange();
  };
  return (
    <SecondaryAccordion
      text="SOURCE"
      defaultOpen={true}
      // className={curData.className}
      className="Source"
    >
      <Grid container spacing={1} className="align-items-end Source-form">
        <Grid item xs={9}>
          <MultiSelect
            name="source"
            //id="source"
            label="Source"
            // disabled={isViewSecurityGroup}
            useReactHookForm={false}
            onChange={handleChange}
            showBorder={true}
            changeStyle={true}
            options={DEALS_SOURCE}
            width="auto"
            disabled={isViewDeal || isDealHistory}
          />
        </Grid>
        {!(isViewDeal || isDealHistory) && (
          <Grid item xs={3}>
            <Button text="Select Source" className="width-100" />
          </Grid>
        )}
      </Grid>
    </SecondaryAccordion>
  );
};

export default Source;
