import Grid from '@material-ui/core/Grid';
import React from 'react';
import { Button, MultiSelect, SecondaryAccordion } from 'Widgets';
import './style.scss';

const Source = ({ path }) => {
  const { isCreateDeal, isUpdateDeal, isViewDeal, isDealHistory } = path;
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
            label="Source"
            // disabled={isViewSecurityGroup}
            useReactHookForm={false}
            onChange={(value) => console.log(value)}
            showBorder={true}
            changeStyle={true}
            options={[]}
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
