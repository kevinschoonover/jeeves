import React, { Component } from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import shoppingCart from './shoppingCart';
import { connect } from 'react-redux';

const styles = (theme: Theme) =>
  createStyles({
    listHeader: {
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  });

type Props = WithStyles<typeof styles>;

class Cart extends Component<State> {
  render() {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <List subheader={<ListSubheader>Quantity</ListSubheader>}>
          {shoppingCart.map((shoppingcart) => (
            <ListItem key={shoppingcart.id}>
              <ListItemText primary={shoppingcart.quantity} />
              <ListItemText
                primary={shoppingcart.title}
                secondary={
                  'Calorie Count: ' +
                  shoppingcart.calorie * shoppingcart.quantity
                }
              />
              <ListItemText
                primary={
                  '$' + (shoppingcart.price * shoppingcart.quantity).toFixed(2)
                }
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        {this.props.items.map((item) => (
          <li key={item.id}>
            <div>
              <span>{item.title}</span>
              <span>{item.quantity}</span>
            </div>
          </li>
        ))}
      </div>
    );
  }
}

interface State {
  items: any[];
}

const mapStateToProps = (state: State) => {
  return {
    items: state.items,
  };
};

export default connect(mapStateToProps)(Cart);
