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
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addQuantity, subQuantity, removeItem } from './actions/cartActions';

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
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <Button
              style={{
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
              }}
            >
              Pay
            </Button>
          </Link>
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
