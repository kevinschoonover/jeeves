import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Grid,
  Hidden,
} from '@material-ui/core';

import Layout from './components/Layout';
import Navbar from './components/Navbar';

const styles = () =>
  createStyles({
    main: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
    },
  });

type AppProps = WithStyles<typeof styles>;

const App: React.FC<AppProps> = ({ classes }) => {
  const [seatingLayoutYOffset, setSeatingLayoutYOffset] = React.useState(0);
  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  React.useLayoutEffect(() => {
    if (navbarRef.current) {
      const navBarHeight = navbarRef.current.getBoundingClientRect().height;
      setSeatingLayoutYOffset(navBarHeight);
    }
  });

  return (
    <>
      <Navbar innerRef={navbarRef} />
      <main className={classes.main}>
        <Grid container={true} className={classes.content} spacing={0}>
          <Grid item={true} sm={12} md={9}>
            <Layout yOffset={seatingLayoutYOffset} />
          </Grid>
          <Hidden smDown={true}>
            <Grid item={true} xs={3}>
              <p style={{ display: 'flex', justifyContent: 'center' }}>
                Some side bar content
              </p>
            </Grid>
          </Hidden>
        </Grid>
      </main>
    </>
  );
};

export default withStyles(styles)(App);
