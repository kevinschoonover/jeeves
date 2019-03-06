import React from 'react';
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    listHeader: {
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  });

type Props = WithStyles<typeof styles>;

const Cart: React.FC<Props> = ({ classes }) => {
  return (
    <div>
      <h1 className={classes.listHeader}>Shopping Cart</h1>
    </div>
  );
};

export default withStyles(styles)(Cart);
