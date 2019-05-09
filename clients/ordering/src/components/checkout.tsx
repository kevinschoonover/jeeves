import React, { Component } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Theme,
  withStyles,
  createStyles,
  WithStyles,
} from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardForm from './cardForm';

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
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 25,
      align: 'center',
      width: 750,
    },
    slider: {
      marginLeft: 40,
    },
    totalText: {
      fontWeight: 'bold',
      fontSize: 'large',
    },
  });

interface CheckoutProps extends WithStyles<typeof styles> {
  addedItems: any[];
  boughtItems: any[];
  total: number;
  finalTotal: number;
}

interface CheckoutState {
  value: number;
}

class Checkout extends Component<CheckoutProps, CheckoutState> {
  constructor(props: CheckoutProps) {
    super(props);
    this.state = { value: 15 };
  }

  handleTipChange = (event: any, value: any) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Elements>
        <div>
          <Paper className={classes.paper}>
            <Typography component={'h1'} variant={'h4'} align={'center'}>
              Checkout
            </Typography>
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
              <ListItem>
                <ListItemText primary={'Subtotal'} />
                <Typography variant={'subtitle2'}>
                  {'$' + this.props.finalTotal.toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Tax'} />
                <Typography variant={'subtitle2'}>
                  {'$' + (this.props.finalTotal * 0.09).toFixed(2)}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Tip'} />
                <Slider
                  className={classes.slider}
                  value={this.state.value}
                  min={0}
                  max={100}
                  step={1}
                  onChange={this.handleTipChange}
                />
                <ListItemText
                  primary={this.state.value + '%'}
                  style={{ marginRight: 300 }}
                />
                <Typography variant={'subtitle2'}>
                  {'$' +
                    ((this.state.value / 100) * this.props.finalTotal).toFixed(
                      2
                    )}
                </Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary={'Total'} />
                <Typography variant={'subtitle2'} className={classes.totalText}>
                  {'$' +
                    (
                      (this.state.value / 100) * this.props.finalTotal +
                      this.props.finalTotal +
                      this.props.finalTotal * 0.09
                    ).toFixed(2)}
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
                  autoComplete={'billing address-line1'}
                />
              </Grid>
              <Grid item={true} xs={12}>
                <TextField
                  required={true}
                  id={'address2'}
                  name={'address2'}
                  label={'Address line 2'}
                  fullWidth={true}
                  autoComplete={'billing address-line2'}
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <TextField
                  required={true}
                  id={'city'}
                  name={'city'}
                  label={'City'}
                  fullWidth={true}
                  autoComplete={'billing address-line2'}
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
              <Link to="/orders" style={{ textDecoration: 'none' }}>
                <Button
                  className={classes.button}
                  onClick={() =>
                    (this.props as any).dispatch({
                      type: 'PURCHASE',
                      // tslint:disable-next-line:object-literal-shorthand
                    })
                  }
                >
                  Submit
                </Button>
              </Link>
            </div>
          </Paper>
        </div>
      </Elements>
    );
  }
}

const mapStateToProps = (state: CheckoutProps) => {
  return {
    addedItems: state.addedItems,
    boughtItems: state.boughtItems,
    total: state.total,
    finalTotal: state.finalTotal,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(Checkout));
