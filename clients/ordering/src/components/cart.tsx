import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';

class Cart extends Component<State> {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          Shopping Cart
        </h1>
        <List subheader={<ListSubheader>Quantity</ListSubheader>}>
          {this.props.addedItems.map((item) => {
            return (
              <ListItem key={item.id}>
                <ListItemText primary={item.quantity} />
                <ListItemText
                  primary={item.title}
                  secondary={'Calorie Count: ' + 150 * item.quantity}
                />
                <ListItemText
                  primary={'$' + (item.subheader * item.quantity).toFixed(2)}
                />
                <ListItemSecondaryAction>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

interface State {
  addedItems: any[];
}

const mapStateToProps = (state: State) => {
  return {
    addedItems: state.addedItems,
  };
};

export default connect(mapStateToProps)(Cart);
