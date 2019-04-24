import React, { Component } from 'react';
import {
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Paper,
  Theme,
  createStyles,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import CardForm from './cardForm';

class Checkout extends Component<State> {
  render() {
    return (
      <Elements>
        <div>
          <Paper
            style={{
              paddingTop: 25,
              paddingLeft: 600,
              paddingRight: 600,
            }}
          >
            <Typography component={'h1'} variant={'h4'} align={'center'}>
              Checkout
            </Typography>
            <Typography variant="h6" align={'left'} gutterBottom={true}>
              Order summary
            </Typography>
            <List>
              {this.props.addedItems.map((item) => {
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
                  {'$' +
                    (this.props.total + this.props.total * 0.09).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
            <Typography variant={'h6'} gutterBottom={true} align={'left'}>
              Billing Address
            </Typography>
            <Grid container={true} spacing={24}>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'firstName'}
                  name={'firstName'}
                  label={'First name'}
                  fullWidth={true}
                  autoComplete={'fname'}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'lastName'}
                  name={'lastName'}
                  label={'Last name'}
                  fullWidth={true}
                  autoComplete={'lname'}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  required={true}
                  id={'address1'}
                  name={'address1'}
                  label={'Address line 1'}
                  fullWidth={true}
                  autoComplete={'biling address-line1'}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  required={true}
                  id={'address2'}
                  name={'address2'}
                  label={'Address line 2'}
                  fullWidth={true}
                  autoComplete={'biling address-line2'}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'city'}
                  name={'city'}
                  label={'City'}
                  fullWidth={true}
                  autoComplete={'biling address-line2'}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  id={'state'}
                  name={'state'}
                  label={'State'}
                  fullWidth={true}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'zip'}
                  name={'zip'}
                  label={'ZIP code'}
                  fullWidth={true}
                  autoComplete={'biling postal-code'}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'country'}
                  name={'country'}
                  label={'Country'}
                  fullWidth={true}
                  autoComplete={'biling country'}
                />
              </Grid>
            </Grid>
            <div style={{ paddingTop: 25 }}>
              <Typography variant={'h6'} gutterBottom={true} align={'left'}>
                Card Details
              </Typography>
              <CardForm />
            </div>
          </Paper>
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
