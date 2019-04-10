import React, { Component } from 'react';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import CardForm from './cardForm';

class Checkout extends Component<State> {
  render() {
    return (
      <Elements>
        <div>
          <List>
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
          <CardForm />
        </div>
      </Elements>
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

export default connect(mapStateToProps)(Checkout);
