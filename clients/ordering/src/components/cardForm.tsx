import React, { Component } from 'react';
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PaymentRequestButtonElement,
  IbanElement,
  IdealBankElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Button,
} from '@material-ui/core';
import { InjectedProps } from '@material-ui/core/withMobileDialog';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    form: {
      marginbottom: '40px',
      paddingBottom: '40px',
      borderBottom: '3px solid #e6ebf1',
    },
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
    label: {
      color: '#6b7c93',
      fontWeight: 300,
      letterSpacing: '0.025em',
    },
  });

type Props = WithStyles<typeof styles>;

const handleBlur = () => {
  console.log('[blur');
};
const handleChange = (change: any) => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: 'string',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        padding: '50px',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};

class CardForm extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <form className={classes.form}>
        <label className={classes.label}>
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions()}
          />
        </label>
      </form>
    );
  }
}

export default withStyles(styles)(CardForm);
