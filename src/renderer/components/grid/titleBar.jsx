import { Grid, IconButton, Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React from 'react';

const TitleBar = () => {
  return (
    <Grid item xs={12}>
      <Typography>Hello World</Typography>
      <IconButton>
        <Close
          onClick={() => {
            alert(window);
          }}
        />
      </IconButton>
    </Grid>
  );
};

export default TitleBar;
