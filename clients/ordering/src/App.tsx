import React from 'react';
import {
  Button,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginTop: '400px',
    },
    apple: {
      margin: theme.spacing.unit * 3,
    },
  });

type Props = WithStyles<typeof styles>;

const App: React.FC<Props> = ({ classes }) => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount((prevCount) => (prevCount + 1) % 10);
  };

  return (
    <div className={classes.root}>
      <h1>Ordering client</h1>
      <div>Clicked {count} times!</div>
      <Button
        className={classes.apple}
        onClick={handleClick}
        color="primary"
        variant="contained"
      >
        Click Me!
      </Button>
      <Grid container={true} spacing={16}>
        <Grid item={true} xs={12} md={6}>
          <Typography variant="h6">Menu Items</Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Big Mac"
                secondary="This is the famous one"
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <AddBoxIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Quarter Pounder"
                secondary="A different type of burger"
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <AddBoxIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Double Cheeseburger"
                secondary="This is the cheap one"
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete">
                  <AddBoxIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(App);
