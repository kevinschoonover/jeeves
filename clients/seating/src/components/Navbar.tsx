import React from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { yellow, purple, teal } from '@material-ui/core/colors';
import { useSeatingData } from './SeatingProvider';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: teal.A700,
    },
    brand: {
      position: 'absolute',
      zIndex: 1,
      minHeight: 100,
      width: 125,
      left: 75,
      top: 0,
      padding: theme.spacing.unit,
      margin: 0,
      textAlign: 'center',
      backgroundColor: purple[800],
      color: yellow[700],
      boxShadow: theme.shadows[10],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export type NavbarProps = WithStyles<typeof styles>;
type Ref = HTMLDivElement;

const Navbar: React.FC<NavbarProps> = React.forwardRef<Ref, NavbarProps>(
  ({ classes }, ref) => {
    const { restaurant } = useSeatingData();
    return (
      <div ref={ref} className={classes.root}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.brand} variant="h6">
              <span>{restaurant.name}</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default withStyles(styles)(Navbar);
