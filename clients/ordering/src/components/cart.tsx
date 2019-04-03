import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Button,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
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
                <IconButton>
                  <KeyboardArrowUp />
                </IconButton>
                <IconButton>
                  <KeyboardArrowDown />
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
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <List>
          <ListItem>
            <ListItemText
              primary={'Subtotal: $' + this.props.total.toFixed(2)}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={'Tax: $' + (this.props.total * 0.09).toFixed(2)}
              secondary={'~9%'}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                'Total: $' +
                (this.props.total + this.props.total * 0.09).toFixed(2)
              }
            />
          </ListItem>
        </List>
      </div>
    );
  }
}

interface State {
  addedItems: any[];
  total: number;
}

const mapStateToProps = (state: State) => {
  return {
    addedItems: state.addedItems,
    total: state.total,
  };
};

export default connect(mapStateToProps)(Cart);
