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
