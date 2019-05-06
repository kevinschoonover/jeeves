import * as React from 'react';
// import InboxIcon from '@material-ui/icons/Inbox';
// import DraftsIcon from '@material-ui/icons/Drafts';
// import SendIcon from '@material-ui/icons/Send';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EventIcon from '@material-ui/icons/Event';
import FastFoodIcon from '@material-ui/icons/Fastfood';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TableChartIcon from '@material-ui/icons/TableChart';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PaymentIcon from '@material-ui/icons/Payment';
import VisitIcon from '@material-ui/icons/SentimentSatisfied';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import RateReviewIcon from '@material-ui/icons/RateReview';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DashboardIcon from '@material-ui/icons/Dashboard';

import {
  Drawer,
  IconButton,
  Divider,
  Theme,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Account } from '../state/Account';
import { Utility } from '../state/Utility';
import { NavLink } from 'react-router-dom';
import { styles } from './styles';
const classNames = require('classnames');

interface IAppDrawer {
  authentication?: Account;
  utility: Utility;
  classes?: any;
  theme?: Theme;
  handleDrawerClose?: () => void;
}

class AppDrawer extends React.Component<IAppDrawer, {}> {
  public routes = [
    {
      path: '/',
      title: 'Dashboard',
      icon: () => <DashboardIcon />,
    },
    {
      path: '/restaurants',
      title: 'Restaurants',
      icon: () => <RestaurantIcon />,
    },
    { path: '/accounts', title: 'Accounts', icon: () => <AccountCircleIcon /> },
    { path: '/menus', title: 'Menus', icon: () => <RestaurantMenuIcon /> },
    {
      path: '/menuItems',
      title: 'Menu Items',
      icon: () => <ShoppingCartIcon />,
    },
    { path: '/reservations', title: 'Reservations', icon: () => <EventIcon /> },
    {
      path: '/inventoryItems',
      title: 'Inventory Items',
      icon: () => <FastFoodIcon />,
    },
    { path: '/sections', title: 'Sections', icon: () => <TableChartIcon /> },
    { path: '/tables', title: 'Tables', icon: () => <EventSeatIcon /> },
    { path: '/orders', title: 'Orders', icon: () => <AttachMoneyIcon /> },
    { path: '/reviews', title: 'Reviews', icon: () => <RateReviewIcon /> },
    { path: '/services', title: 'Services', icon: () => <AccessibilityIcon /> },
    { path: '/shifts', title: 'Shifts', icon: () => <PersonAddIcon /> },
    {
      path: '/transactions',
      title: 'Transactions',
      icon: () => <PaymentIcon />,
    },
    { path: '/visits', title: 'Visits', icon: () => <VisitIcon /> },
    // HERE: add
  ];

  public render(): JSX.Element {
    const { authentication, classes, utility, theme } = this.props;
    return (
      <Drawer
        hidden={!authentication}
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !utility.drawerOpen && classes.drawerPaperClose
          ),
        }}
        open={utility.drawerOpen}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.props.handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {this.routes.map((route, index) => {
          return (
            <NavLink
              key={index}
              exact={true}
              activeClassName={classes.current}
              className={classes.link}
              to={route.path}
            >
              <ListItem button={true}>
                <ListItemIcon>{route.icon()}</ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItem>
            </NavLink>
          );
        })}
        <Divider />
      </Drawer>
    );
  }
}

export default withStyles(styles as any, { withTheme: true })(
  AppDrawer as any
) as any;
