import * as React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Grid,
  Hidden,
  Typography,
} from '@material-ui/core';

import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ReservationForm from './components/ReservationForm';
import useOnClickInside from './hooks/useOnClickInside';
import TableDetails from './components/TableDetails';
import useSeating from './hooks/useSeating';
import { TablesEntity } from './types';

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
  const [selectedTable, setSelectedTable] = React.useState<
    TablesEntity['id'] | null
  >(null);
  const [layout, setLayout] = React.useState<SVGElement | null>(null);

  const [showTableDetails, setShowTableDetails] = React.useState(false);
  const [showReserveForm, setShowReserveForm] = React.useState(false);

  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  const { isLoading, sections, error, tables } = useSeating();

  const { tablesMap } = tables;

  const handleClickAway = React.useCallback(() => {
    setSelectedTable(null);
    setShowTableDetails(false);
  }, [setSelectedTable, setShowTableDetails]);

  useOnClickInside(layout, handleClickAway);

  const handleTableClick = (tableId: number | null) => () => {
    setSelectedTable(tableId);
    if (tableId !== selectedTable) {
      setShowReserveForm(false);
      setShowTableDetails(true);
    }
  };

  React.useLayoutEffect(() => {
    const node = (document.getElementById('layout') as unknown) as SVGElement;
    setLayout(node);
  });

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
                {showTableDetails ? (
                  <TableDetails
                    table={
                      selectedTable !== null ? tablesMap[selectedTable] : null
                    }
                    onReserveClick={() => {
                      setShowReserveForm(true);
                      setShowTableDetails(false);
                    }}
                  />
                ) : showReserveForm ? (
                  <>
                    <h1>Book Table {selectedTable || ''}</h1>
                    <ReservationForm
                      table={
                        selectedTable !== null ? tablesMap[selectedTable] : null
                      }
                    />
                  </>
                ) : (
                  <Typography style={{ paddingTop: 100 }}>
                    Please select a table to proceed
                  </Typography>
                )}
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
