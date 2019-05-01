import React, { Component } from 'react';
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Button,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuCard from './card';
import menucards from './menucards';
import { connect } from 'react-redux';

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
        <Typography variant="h4" gutterBottom={true} component="h2">
          All Items
        </Typography>
        <Grid
          container={true}
          spacing={32}
          alignItems={'center'}
          justify={'space-evenly'}
        >
          {menucards.map((menucard) => (
            <MenuCard key={menucard.id} {...menucard} />
          ))}
        </Grid>
      </div>
    );
  }
}

connect()(Menu);

export default withStyles(styles)(Menu);
