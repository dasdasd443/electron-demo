const { withStyles, Typography } = require('@material-ui/core');

const RegisterTextField = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    color: 'black',
  },
})(Typography);

export default RegisterTextField;
