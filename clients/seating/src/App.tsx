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
import ReservationForm from './components/ReservationForm';
import { Section, fetchSeatingLayout } from './mocks';

const styles = () =>
  createStyles({
    main: {
      display: 'flex',
      height: '100vh',
    },
    content: {
      flexGrow: 1,
    },
    sidebar: {
      background: 'linear-gradient(180deg, #FFD600 18.23%, #006452 99.99%)',
    },
  });

type AppProps = WithStyles<typeof styles>;

const App: React.FC<AppProps> = ({ classes }) => {
  const [seatingLayoutYOffset, setSeatingLayoutYOffset] = React.useState(0);
  const [sections, setSections] = React.useState<Section[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [selectedTable, setSelectedTable] = React.useState<number | null>(null);

  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  const handleTableClick = (tableId: number) => () => {
    setSelectedTable(tableId);
  };

  const reserveTable = () => {
    console.log('reserve table');
  };

  React.useLayoutEffect(() => {
    if (navbarRef.current) {
      const navBarHeight = navbarRef.current.getBoundingClientRect().height;
      setSeatingLayoutYOffset(navBarHeight);
    }
  });

  React.useEffect(() => {
    fetchSeatingLayout().then((data) => {
      setSections(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar innerRef={navbarRef} />
      <main className={classes.main}>
        <Grid container={true} className={classes.content} spacing={0}>
          <Hidden smDown={true}>
            <Grid
              item={true}
              xs={3}
              component="aside"
              className={classes.sidebar}
            >
              <Grid
                container={true}
                spacing={0}
                direction="column"
                alignItems="center"
                component="section"
                style={{
                  padding: 15,
                  paddingTop: 110 - seatingLayoutYOffset,
                }}
              >
                <h1>Book Table {selectedTable || ''}</h1>
                <ReservationForm onSubmit={reserveTable} />
              </Grid>
            </Grid>
          </Hidden>
          <Grid item={true} sm={12} md={9}>
            <Layout
              yOffset={seatingLayoutYOffset}
              sections={sections}
              isLoading={isLoading}
              setSelectedTable={handleTableClick}
              selectedTable={selectedTable}
            />
          </Grid>
        </Grid>
      </main>
    </>
  );
};

export default withStyles(styles)(App);
