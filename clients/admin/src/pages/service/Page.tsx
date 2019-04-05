import * as React from 'react';
import RestaurantList from '../../components/RestaurantList';
import { withRouter } from "react-router";
import { Typography, Theme, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
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
            Services
          </Typography>
        </div>
        <RestaurantList {...this.props} />
        <Fab color="primary" aria-label="Add" className={classes.fab} onClick={() => this.props.history.push("/services/create")}>
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
