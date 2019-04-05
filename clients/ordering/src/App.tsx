import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import { Link, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Menu from './components/menu';
import Starters from './components/starters';
import Entrees from './components/entrees';
import Desserts from './components/desserts';
import AddOns from './components/addons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    buttonGrid: {
      marginTop: '85px',
    },
    buttonSpacing: {
      margin: theme.spacing.unit,
    },
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className={classes.root}>
      <Navbar innerRef={navbarRef} />
      <div className={classes.buttonGrid} />

      <Route exact={true} path="/" component={Menu} />
      <Route path="/starters" component={Starters} />
      <Route path="/entrees" component={Entrees} />
      <Route path="/desserts" component={Desserts} />
      <Route path="/addons" component={AddOns} />
    </div>
  );
};

export default withStyles(styles)(App);
