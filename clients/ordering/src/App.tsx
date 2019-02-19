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
    input: {
      display: 'none',
    },
    button_entrees: {
      color: 'green',
      margin: theme.spacing.unit,
    },
    button_starter: {
      color: 'red',
      margin: theme.spacing.unit,
    },
    button_dessert: {
      color: 'purple',
      margin: theme.spacing.unit,
    },
    button_drink: {
      color: 'blue',
      margin: theme.spacing.unit,
    },
  });

const menucards = [
  {
    id: 1,
    avatar: '1',
    title: 'Sweet and Sour Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: './paella.jpg',
    description:
      'Sweet & Sour sauce, chicken, pineapple, onion, bell peppers, ginge',
  },
  {
    id: 2,
    avatar: '2',
    title: 'Kung Pao Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Spicy Sichuan chili sauce, chicken, peanuts, green onion, red chili peppers.',
  },
  {
    id: 3,
    avatar: '3',
    title: 'Orange Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description: 'Hunan chili sauce, chicken, fresh orange slices.',
  },
  {
    id: 4,
    avatar: '4',
    title: 'Mongolian Beef',
    category: 'starter',
    subheader: '$5.95/$8.75',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Sweet soy glaze, flank steak, garlic and snipped green onion.',
  },
];

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount + 1) % 10);
  };

  const allEntrees = () => {
    // menucards = menucards.filter((menucard) => menucard.category === 'entree');
  };

  return (
    <div className={classes.root}>
      <h1>Menu Items</h1>
      <div>
        <Button variant={'outlined'} className={classes.button_starter}>
          Starters
        </Button>
        <Button
          variant={'outlined'}
          className={classes.button_entrees}
          onClick={allEntrees}
        >
          Entrees
        </Button>
        <Button variant={'outlined'} className={classes.button_dessert}>
          Desserts
        </Button>
        <Button variant={'outlined'} className={classes.button_drink}>
          Drinks
        </Button>
      </div>
      <Grid
        className={classes.grid}
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

export default withStyles(styles)(App);
