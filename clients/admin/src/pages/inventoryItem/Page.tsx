import * as React from 'react';
import InventoryItemCard from '../../components/InventoryItemCard';
import { withRouter } from 'react-router';
import { Typography, Theme, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';

interface IPageProps {
  items: any[];
  classes: any;
  history: any;
  deleteItem: (context: any) => any;
}

class Page extends React.Component<IPageProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;
    // HERE: change
    return (
      <div>
        <div className={classes.boxHeader}>
          <Typography className={classes.boxHeaderTitle}>
            Inventory Items
          </Typography>
        </div>
        <Grid container={true} spacing={16}>
          {this.props.items.map((item: any) => {
            return (
              <Grid key={item.id} item={true} xs={3}>
                <InventoryItemCard
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                />
              </Grid>
            );
          })}
        </Grid>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => this.props.history.push('/inventoryItems/create')}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
  },
  boxHeader: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  boxHeaderTitle: {
    padding: '5px 10px',
    fontSize: 35,
  },
  fillRemainingSpace: {
    flex: '1 1 auto',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

export default withRouter(withStyles(styles as any)(Page as any) as any) as any;
