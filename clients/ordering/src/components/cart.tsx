import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Button,
  Typography,
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  TextField,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuantity, subQuantity, removeItem } from './actions/cartActions';

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
    cartTitle: {
      textAlign: 'center',
      verticalAlign: 'middle',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  });

interface CartProps extends WithStyles<typeof styles> {
  addedItems: any[];
  boughtItems: any[];
  total: number;
  specialRequests: any[];
}

interface CartState {
  request: string;
}

class Cart extends Component<CartProps, CartState> {
  constructor(props: CartProps) {
    super(props);
    this.state = { request: '' };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ request: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 className={classes.cartTitle}>Shopping Cart</h1>
        <List subheader={<ListSubheader>Quantity</ListSubheader>}>
          {this.props.addedItems.map((item) => {
            return (
              <ListItem key={item.id}>
                <ListItemText primary={item.quantity} />
                <IconButton>
                  <KeyboardArrowUp
                    onClick={() =>
                      (this.props as any).dispatch(addQuantity(item.id))
                    }
                  />
                </IconButton>
                <IconButton>
                  <KeyboardArrowDown
                    onClick={() =>
                      (this.props as any).dispatch(subQuantity(item.id))
                    }
                  />
                </IconButton>
                <ListItemText
                  primary={item.title}
                  secondary={'Calorie Count: ' + 150 * item.quantity}
                />
                <ListItemText
                  primary={'$' + (item.subheader * item.quantity).toFixed(2)}
                />
                <ListItemSecondaryAction>
                  <IconButton>
                    <DeleteIcon
                      onClick={() =>
                        (this.props as any).dispatch(removeItem(item.id))
                      }
                    />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
          <ListItem>
            <ListItemText primary={'Subtotal'} />
            <Typography variant={'subtitle2'}>
              {'$' + this.props.total.toFixed(2)}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary={'Tax'} />
            <Typography variant={'subtitle2'}>
              {'$' + (this.props.total * 0.09).toFixed(2)}
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemText primary={'Total'} />
            <Typography
              variant={'subtitle2'}
              style={{ fontWeight: 'bold', fontSize: 'large' }}
            >
              {'$' + (this.props.total + this.props.total * 0.09).toFixed(2)}
            </Typography>
          </ListItem>
          <ListItem>
            <TextField
              label="Special Requests"
              className={classes.textField}
              value={this.state.request}
              onChange={this.handleChange}
              fullWidth={true}
            />
          </ListItem>
          <Link to="/orders" style={{ textDecoration: 'none' }}>
            <Button
              className={classes.button}
              onClick={() =>
                (this.props as any).dispatch({
                  type: 'ADD_ORDER',
                  request: this.state.request,
                  // tslint:disable-next-line:object-literal-shorthand
                })
              }
            >
              Purchase
            </Button>
          </Link>
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: CartProps) => {
  return {
    addedItems: state.addedItems,
    boughtItems: state.boughtItems,
    total: state.total,
    specialRequests: state.specialRequests,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Cart));
