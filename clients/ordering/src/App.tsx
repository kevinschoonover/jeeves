import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import { Link, Route, Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import MenuCard from './components/card';
import Navbar from './components/navbar';
import Tester from './components/test';
import Menu from './components/menu';
import Starters from './components/starters';
import Entrees from './components/entrees';
import Desserts from './components/desserts';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    button_grid: {
      marginTop: '25px',
    },
    button_entrees: {
      color: 'green',
      margin: theme.spacing.unit,
    },
    button_starter: {
      color: 'red',
      margin: theme.spacing.unit,
    },
    button_dessert: {
      color: 'purple',
      margin: theme.spacing.unit,
    },
    button_drink: {
      color: 'blue',
      margin: theme.spacing.unit,
    },
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div className={classes.root}>
      <Navbar innerRef={navbarRef} />
      <div className={classes.button_grid}>
        <Link to="/menu" style={{ textDecoration: 'none' }}>
          <Button variant={'outlined'} className={classes.button_dessert}>
            All Items
          </Button>
        </Link>
        <Link to="/starters" style={{ textDecoration: 'none' }}>
          <Button variant={'outlined'} className={classes.button_starter}>
            Starters
          </Button>
        </Link>
        <Link to="/entrees" style={{ textDecoration: 'none' }}>
          <Button variant={'outlined'} className={classes.button_entrees}>
            Entrees
          </Button>
        </Link>
        <Link to="/desserts" style={{ textDecoration: 'none' }}>
          <Button variant={'outlined'} className={classes.button_drink}>
            Desserts
          </Button>
        </Link>
      </div>

      <Route exact={true} path="/menu" component={Menu} />
      <Route path="/starters" component={Starters} />
      <Route path="/entrees" component={Entrees} />
      <Route path="/desserts" component={Desserts} />
    </div>
  );
};

export default withStyles(styles)(App);
