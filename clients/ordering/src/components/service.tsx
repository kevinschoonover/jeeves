import React, { Component } from 'react';
import {
  Typography,
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
      marginTop: 100,
      marginLeft: 700,
    },
    button: {
      margin: theme.spacing.unit,
    },
  });

interface ServiceProps extends WithStyles<typeof styles> {
  specialRequests: any[];
}

class Service extends Component<ServiceProps> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <Typography variant={'h6'} id="modal-title">
          Service options
        </Typography>
        <Button variant={'outlined'} className={classes.button}>
          Request waiter
        </Button>
        <Button variant={'outlined'} className={classes.button}>
          Refill drink
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state: ServiceProps) => {
  return {
    specialRequests: state.specialRequests,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Service));
