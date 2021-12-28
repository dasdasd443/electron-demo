import { IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { color2 } from '../variables/backgroundVariables';
import StyledInput from './StyledInput';

// eslint-disable-next-line react/prop-types
const InputFields = ({ SearchFunction, icon, id, placeholder, label }) => {
  return (
    <Typography
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <StyledInput
        id={id}
        style={{
          width: '100%',
        }}
        variant="standard"
        placeholder={placeholder}
        label={label}
      />
      <IconButton
        style={{
          right: 0,
          color: color2,
        }}
        onClick={SearchFunction}
      >
        {icon}
      </IconButton>
    </Typography>
  );
};

export default InputFields;
