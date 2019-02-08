import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: '400px',
    },
    apple: {
      margin: theme.spacing.unit * 3,
    },
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount + 1) % 10);
  };

  return (
    <div className={classes.root}>
      <h1>Ordering client</h1>
      <div>Clicked {count} times!</div>
      <Button
        className={classes.apple}
        onClick={handleClick}
        color="primary"
        variant="contained"
      >
        Click Me!
      </Button>
    </div>
  );
};

export default withStyles(styles)(App);
