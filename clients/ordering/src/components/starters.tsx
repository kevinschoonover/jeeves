import React from 'react';
import { Theme, createStyles, WithStyles } from '@material-ui/core';
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

const Starters: React.FC<Props> = ({ classes }) => {
  const starters = menucards.filter((f) => f.category === 'starter');

  return (
    <div>
      <h1>Starters</h1>
      <Grid
        container={true}
        spacing={32}
        alignItems={'center'}
        justify={'space-evenly'}
        style={{
          backgroundColor: 'tan',
        }}
      >
        {starters.map((menucard) => (
          <MenuCard key={menucard.id} {...menucard} />
        ))}
      </Grid>
    </div>
  );
};

export default Starters;
