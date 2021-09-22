import React from 'react';

const { withStyles, createTheme, Button } = require('@material-ui/core');

const theme = createTheme();
const StyledButton = withStyles({
  root: {
    backgroundColor: '#191919',
    color: theme.palette.getContrastText('#191919'),
  },
})(Button);

// eslint-disable-next-line react/prop-types
export default function FormButtonBlack({ text, action }) {
  return <StyledButton onClick={action}>{text}</StyledButton>;
}
