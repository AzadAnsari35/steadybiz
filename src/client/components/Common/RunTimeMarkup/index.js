import React from 'react';
import { TextInput, Button } from 'Widgets';
import Grid from '@material-ui/core/Grid';

const RunTimeMarkup = () => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <TextInput
          name="markup"
          // label="Description:"
          onChange={() => console.log('value')}
          useReactHookForm={false}
          placeholder="Markup / PAX / Sector"
        />
      </Grid>
      <Grid item xs={4}>
        <Button text="Calculate" />
      </Grid>
    </Grid>
  );
};

export default RunTimeMarkup;
