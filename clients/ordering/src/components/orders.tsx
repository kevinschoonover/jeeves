import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Orders extends Component<State> {
  render() {
    return (
      <div>
        <Paper
          style={{
            padding: 25,
            marginLeft: 550,
            marginRight: 550,
            marginBottom: 25,
            align: 'center',
          }}
        >
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
        </Paper>
      </div>
    );
  }
}

interface State {
  addedItems: any[];
  boughtItems: any[];
  total: number;
}

const mapStateToProps = (state: State) => {
  return {
    addedItems: state.addedItems,
    boughtItems: state.boughtItems,
    total: state.total,
  };
};

export default connect(mapStateToProps)(Orders);
