import React from 'react';
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

const styles = (theme: Theme) =>
  createStyles({
    grid: {
      marginTop: '25px',
    },
  });

type Props = WithStyles<typeof styles>;

const Menu: React.FC<Props> = ({ classes }) => {
  return (
    <div>
      <h1>All Items</h1>
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
};

export default Menu;
