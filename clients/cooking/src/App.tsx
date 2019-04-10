import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import Navbar from './components/navbar';
import PaperSheet from './components/PaperSheet';
import PaperSheet1 from './components/PaperSheet1';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      flexGrow: 1, 
      fontFamily: [
        'Raleway',
      ].join(','),
    },

    apple: {
      margin: theme.spacing.unit * 3,
    },
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const navbarRef = React.useRef<HTMLDivElement | null>(null);
  const paperRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className={classes.root}>
      <Navbar innerRef={navbarRef} />
      <h2>Incoming Orders:</h2>
      <PaperSheet />
      <PaperSheet1 />
    </div>
  );
};

export default withStyles(styles)(App);
