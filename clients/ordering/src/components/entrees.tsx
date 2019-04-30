import React from 'react';
import { Theme, createStyles, WithStyles, Typography } from '@material-ui/core';
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

const Entrees: React.FC<Props> = ({ classes }) => {
  const entrees = menucards.filter((f) => f.category === 'entree');

  return (
    <div>
      <Typography variant="h4" gutterBottom={true} component="h2">
        Entrees
      </Typography>
      <Grid
        container={true}
        spacing={32}
        alignItems={'center'}
        justify={'space-evenly'}
      >
        {entrees.map((menucard) => (
          <MenuCard key={menucard.id} {...menucard} />
        ))}
      </Grid>
    </div>
  );
};

interface State {
  addedItems: any[];
  boughtItems: any[];
  total: number;
  showItems: any[];
}

const mapStateToProps = (state: State) => {
  return {
    showItems: state.showItems,
    addedItems: state.addedItems,
    boughtItems: state.boughtItems,
    total: state.total,
  };
};

export default Entrees;
