import React from 'react';
import { TextInput, Button } from 'Widgets';
import Grid from '@material-ui/core/Grid';

import './style.scss';

const RunTimeMarkup = () => {
  return (
    <Grid container className="RunTimeMarkup">
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
        <Button text="Calculate" className="RunTimeMarkup-btn" />
      </Grid>
    </Grid>
  );
};

export default RunTimeMarkup;
