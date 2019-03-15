import * as React from 'react';
import RestaurantList from '../../components/RestaurantList';
import { Typography, Theme, withStyles } from '@material-ui/core';

interface IRestaurantProps {
  items: any[];
  classes: any;
  deleteRestaurant: (context: any) => any;
}

class RestaurantPage extends React.Component<IRestaurantProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.boxHeader}>
          <Typography className={classes.boxHeaderTitle}>
            Restaurants
          </Typography>
        </div>
        <RestaurantList {...this.props} />
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
});

export default withStyles(styles as any)(RestaurantPage as any) as any;
