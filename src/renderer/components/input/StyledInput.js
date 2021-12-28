import {
  bgColor,
  bgColor2,
  color,
  color2,
} from '../variables/backgroundVariables';

const { withStyles, TextField } = require('@material-ui/core');

const StyledInput = withStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: color2, // or try theme.palette.primary.main
    },
    '& label.Mui-focused': {
      color: color2,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: color2,
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: color2,
    },
    '& .MuiInput-underline:hover': {
      borderBottomColor: color2,
    },
    '& .MuiInputBase-input': {
      position: 'relative',
      fontSize: 16,
      color: color2,
    },
    '& .MuiInput': {
      color: color2,
    },
    '& .MuiFormLabel-root': {
      color: color2,
    },
  },
}))(TextField);

export default StyledInput;
