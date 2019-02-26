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
import Navbar from './components/navbar';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    apple: {
      margin: theme.spacing.unit * 3,
    },
    grid: {
      marginTop: '25px',
    },
    input: {
      display: 'none',
    },
    button_grid: {
      marginTop: '25px',
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
    title: 'Crab Rangoon',
    category: 'starter',
    subheader: '$2.50(2)/$4.25(4)',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Crab and cream cheese wontons pinched into little purses and deep fried.',
  },
  {
    id: 2,
    avatar: '2',
    title: 'Eggrolls',
    category: 'starter',
    subheader: '$2.50(2)/$4.25(4)',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Savory roll with shredded cabbage, chopped pork, and other fillings inside a wheat flour skin and deep fried.',
  },
  {
    id: 3,
    avatar: '3',
    title: 'Sweet and Sour Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: './paella.jpg',
    description:
      'Sweet & Sour sauce, chicken, pineapple, onion, bell peppers, ginge',
  },
  {
    id: 4,
    avatar: '4',
    title: 'Kung Pao Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Spicy Sichuan chili sauce, chicken, peanuts, green onion, red chili peppers.',
  },
  {
    id: 5,
    avatar: '5',
    title: 'Orange Chicken',
    category: 'entree',
    subheader: '$5.60/$8.36',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description: 'Hunan chili sauce, chicken, fresh orange slices.',
  },
  {
    id: 6,
    avatar: '6',
    title: 'Mongolian Beef',
    category: 'entree',
    subheader: '$5.95/$8.75',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Sweet soy glaze, flank steak, garlic and snipped green onion.',
  },
  {
    id: 7,
    avatar: '7',
    title: 'Black Pepper Chicken',
    category: 'entree',
    subheader: '$5.95/$8.75',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'Marinated chicken, celery and onions in a bold black pepper sauce.',
  },
  {
    id: 8,
    avatar: '8',
    title: 'Broccoli Beef',
    category: 'entree',
    subheader: '$5.95/$8.75',
    image: '/clients/ordering/photos/sweetsour.jpg',
    description:
      'A classic favorite. Tender beef and fresh broccoli in a ginger soy sauce.',
  },
];

const starters = menucards.filter((f) => f.category === 'starter');
const entrees = menucards.filter((f) => f.category === 'entree');

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount + 1) % 10);
  };

  const navbarRef = React.useRef<HTMLDivElement | null>(null);

  const allEntrees = () => {
    // menucards = menucards.filter((menucard) => menucard.category === 'entree');
  };

  return (
    <div className={classes.root}>
      <Navbar innerRef={navbarRef} />
      <h1>Menu</h1>
      <div className={classes.button_grid}>
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
