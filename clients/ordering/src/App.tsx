import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuCard from './components/card';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: '100px',
    },
    apple: {
      margin: theme.spacing.unit * 3,
    },
    grid: {
      marginTop: '75px',
    },
  });

const menucards = [
  {
    id: 1,
    avatar: '1',
    title: 'Big Mac',
    subheader: 'Our Class Burger',
    image: '',
    description: 'This is a test, hope it works',
  },
];

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount + 1) % 10);
  };

  return (
    <div className={classes.root}>
      <h1>Menu Items</h1>
      <Grid
        className={classes.grid}
        container={true}
        spacing={32}
        alignItems={'center'}
        justify={'space-evenly'}
      >
        <Grid item={true}>
          <MenuCard
            avatar="1"
            title="Sweet & Sour Pork"
            subheader="$5.60/$8.36"
            image="/clients/ordering/photos/sweetsour.jpg"
            description="Sweet and Sour Chicken with crispy chicken, pineapple and bell peppers just like your favorite takeout place without the food coloring."
          />
        </Grid>
        <Grid item={true}>
          <MenuCard
            avatar="2"
            title="General Tso's Chicken"
            subheader="$5.60/$8.36"
            image="/clients/ordering/photos/sweetsour.jpg"
            description="With a flair of peanut oil, a streak of sesame, a dash of orange, and a sweet spot for hot, this is sure to be a favorite. Serve with steamed broccoli and white rice."
          />
        </Grid>
        <Grid item={true}>
          <MenuCard
            avatar="3"
            title="Orange Chicken"
            subheader="$5.60/$8.36"
            image="/clients/ordering/photos/sweetsour.jpg"
            description="Our signature dish. Crispy chicken wok-tossed in a sweet and spicy orange sauce."
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
