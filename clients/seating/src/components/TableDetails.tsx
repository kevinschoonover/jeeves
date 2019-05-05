import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Grid,
  Theme,
  Button,
} from '@material-ui/core';
import StatusBadge from './StatusBadge';
import { ITable } from '../types';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    button: {
      background: '#995C00',
      margin: theme.spacing.unit * 3,
      color: 'white',
      borderRadius: 10,
      width: 154,
      '&:hover': {
        backgroundColor: '#995C00',
      },
    },
  });

interface TableDetailsProps extends WithStyles<typeof styles> {
  table: ITable | null;
  onReserveClick(): void;
}

function TableDetails({ classes, table, onReserveClick }: TableDetailsProps) {
  return (
    table && (
      <div className={classes.root}>
        <h1>Table {table.id}</h1>
        <Grid container={true} wrap="nowrap" spacing={16}>
          <Grid item={true}>Seating</Grid>
          <Grid item={true} xs={true} zeroMinWidth={true}>
            {table.seatingCapacity}
          </Grid>
        </Grid>
        <Grid container={true} wrap="nowrap" spacing={16}>
          <Grid item={true}>Status</Grid>
          <Grid item={true} xs={true} zeroMinWidth={true}>
            <StatusBadge status={table.status}>{table.status}</StatusBadge>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          className={classes.button}
          onClick={onReserveClick}
        >
          Reserve
        </Button>
      </div>
    )
  );
}

export default withStyles(styles)(TableDetails);
