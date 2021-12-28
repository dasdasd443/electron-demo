const { withStyles, Grid } = require('@material-ui/core');

const CenterGrid = withStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})(Grid);

export default CenterGrid;
