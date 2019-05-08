import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    button: {
      whiteSpace: 'nowrap',
      border: 0,
      outline: 0,
      display: 'inline-block',
      height: '40px',
      lineHeight: '40px',
      padding: '0 14px',
      boxShadow:
        '0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)',
      color: '#fff',
      borderRadius: '4px',
      fontSize: '15px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.025em',
      backgroundColor: '#6772e5',
      textDecoration: 'none',
      WebkitTransition: 'all 150ms ease',
      transition: 'all 150ms ease',
      marginTop: '10px',
      marginLeft: '20px',
    },
    paper: {
      padding: 25,
      marginLeft: 550,
      marginRight: 550,
      marginBottom: 25,
      align: 'center',
    },
    requests: {},
  });

interface OrdersProps extends WithStyles<typeof styles> {
  addedItems: any[];
  boughtItems: any[];
  total: number;
  finalTotal: number;
  specialRequests: any[];
}

class Orders extends Component<OrdersProps> {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h6" align={'left'} gutterBottom={true}>
            Order summary
          </Typography>
          <List>
            {this.props.boughtItems.map((item) => {
              return (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.title}
                    secondary={item.quantity}
                  />
                  <Typography>
                    {'$' + (item.subheader * item.quantity).toFixed(2)}
                  </Typography>
                </ListItem>
              );
            })}
          </List>
          <TextField
            variant="outlined"
            label="Special Requests"
            value={this.props.specialRequests}
            fullWidth={true}
            disabled={true}
          />
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button className={classes.button}>Pay</Button>
          </Link>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state: OrdersProps) => {
  return {
    addedItems: state.addedItems,
    boughtItems: state.boughtItems,
    total: state.total,
    specialRequests: state.specialRequests,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Orders));
