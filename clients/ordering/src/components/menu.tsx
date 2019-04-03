import React, { Component } from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuCard from './card';
import menucards from './menucards';
import { addToCart } from './actions/cartActions';
import { connect } from 'react-redux';
import { render } from 'react-dom';

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      marginTop: '25px',
    },
  });

type Props = WithStyles<typeof styles>;

class Menu extends Component {
  render() {
    return (
      <div>
        <h1>All Items</h1>
        <Grid
          container={true}
          spacing={32}
          alignItems={'center'}
          justify={'space-evenly'}
          style={{ backgroundColor: 'tan' }}
        >
          {menucards.map((menucard) => (
            <MenuCard key={menucard.id} {...menucard} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Menu);
