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
import { Section, fetchSeatingLayout } from './mocks';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Reserve from './Dialogs/Reserve';
import ListCreate from './components/List';
import Button from '@material-ui/core/Button';

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
  const [sections, setSections] = React.useState<Section[]>([]);
  const [isLoading, setLoading] = React.useState(true);
  const [selectedTable, setSelectedTable] = React.useState<number | null>(null);

  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  const handleTableClick = (tableId: number) => () => {
    setSelectedTable(tableId);
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
          <Grid item={true} sm={12} md={9}>
            <Layout
              yOffset={seatingLayoutYOffset}
              sections={sections}
              isLoading={isLoading}
              setSelectedTable={handleTableClick}
              selectedTable={selectedTable}
            />
          </Grid>
          <Hidden smDown={true}>
            <Grid item={true} xs={3}>
              <div
                style={{
                  padding: 15,
                }}
              >
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  {`Selected table: ${selectedTable || ''}`}
                </p>
                <Divider />
                {selectedTable ? null : <ListCreate />}
                <Divider />
                {selectedTable ? (
                  <>
                    <List>
                      <p style={{ display: 'flex', justifyContent: 'left' }}>
                        {`Reservation Time: February 21st 2019`}
                      </p>
                      {[4, 5, 6, 7].map((value) => (
                        <ListItem
                          key={value}
                          role={undefined}
                          dense={true}
                          button={true}
                        >
                          <Checkbox tabIndex={-1} disableRipple={true} />
                          <ListItemText primary={`Thursday: ${value}:30 PM`} />
                          <ListItemSecondaryAction />
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      variant="contained"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      Reserve
                    </Button>
                  </>
                ) : null}
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </main>
    </>
  );
};

export default withStyles(styles)(App);
