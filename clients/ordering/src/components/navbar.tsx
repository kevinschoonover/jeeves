import React, { useState } from 'react';
import {
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, FormHelperText } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { yellow, purple, teal } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Cart from './cart';
import menuNavItems from './menunav';

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
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    shoppingCartButton: {
      flexGrow: 1,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing.unit * 2,
      marginLeft: '0',
      left: '150px',
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit * 3,
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    list: {
      width: 500,
    },
    listHeader: {
      marginleft: '50',
      textAlign: 'center',
      verticalAlign: 'middle',
    },
  });

export type NavbarProps = WithStyles<typeof styles>;
type Ref = HTMLDivElement;

const Navbar: React.FC<NavbarProps> = React.forwardRef<Ref, NavbarProps>(
  ({ classes }, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [open2, setOpen2] = useState<boolean>(false);

    return (
      <div ref={ref} className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={() => setOpen2((prevOpen) => !prevOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={open2}
              onClose={() => setOpen2((prevOpen) => !prevOpen)}
            >
              <List>{menuNavItems}</List>
            </Drawer>
            <Typography className={classes.brand} variant="h6">
              <span>Gosnell's Diner & Lounge</span>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search..."
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
            <div className={classes.shoppingCartButton} />
            <IconButton
              color="inherit"
              onClick={() => setOpen((prevOpen) => !prevOpen)}
            >
              <ShoppingCartIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={open}
              onClose={() => setOpen((prevOpen) => !prevOpen)}
            >
              <div className={classes.list}>
                <Cart />
              </div>
            </Drawer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default withStyles(styles)(Navbar);
