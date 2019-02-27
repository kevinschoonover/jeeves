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
import AddOns from './components/addons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    button_grid: {
      marginTop: '85px',
    },
    button_spacing: {
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
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant={'outlined'}
            className={classes.button_spacing}
            style={{ color: 'blue' }}
          >
            All Items
          </Button>
        </Link>
        <Link to="/starters" style={{ textDecoration: 'none' }}>
          <Button
            variant={'outlined'}
            className={classes.button_spacing}
            style={{ color: 'red' }}
          >
            Starters
          </Button>
        </Link>
        <Link to="/entrees" style={{ textDecoration: 'none' }}>
          <Button
            variant={'outlined'}
            className={classes.button_spacing}
            style={{ color: 'green' }}
          >
            Entrees
          </Button>
        </Link>
        <Link to="/desserts" style={{ textDecoration: 'none' }}>
          <Button
            variant={'outlined'}
            className={classes.button_spacing}
            style={{ color: 'fuchsia' }}
          >
            Desserts
          </Button>
        </Link>
        <Link to="/addons" style={{ textDecoration: 'none' }}>
          <Button
            variant={'outlined'}
            className={classes.button_spacing}
            style={{ color: 'maroon' }}
          >
            Add-ons
          </Button>
        </Link>
      </div>

      <Route exact={true} path="/" component={Menu} />
      <Route path="/starters" component={Starters} />
      <Route path="/entrees" component={Entrees} />
      <Route path="/desserts" component={Desserts} />
      <Route path="/addons" component={AddOns} />
    </div>
  );
};

export default withStyles(styles)(App);
