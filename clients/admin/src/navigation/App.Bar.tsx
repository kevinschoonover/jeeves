//#region
import * as React from 'react';
const classNames = require('classnames');
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu, MenuItem, Badge } from '@material-ui/core';
import { Route, withRouter, Switch } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './styles';
import { IApplicationProps } from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';
import { IAppState, isAuthenticated } from '../state/AppState';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { bindActionCreators, Dispatch } from 'redux';
import { Alert } from '../state/Alert';
import { AlertDialog } from '../alert/Alert';
import SpinnerDialog from '../spinner/Spinner';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { actions as AccountActionCreators } from '../data/account';
import { actions as MenuActionCreators } from '../data/menu';
import { actions as MailActionCreators } from '../data/mail';
import { actions as MaterialActionCreators } from '../data/material';
import { actions as RestaurantActionCreators } from '../data/restaurant';
import { actions as ReservationActionCreators } from '../data/reservation';
import { actions as InventoryItemsActionCreators } from '../data/inventoryItem';
import { actions as MenuItemsActionCreators } from '../data/menuItem';
import { actions as SectionActionCreators } from '../data/section';
import { actions as TableActionCreators } from '../data/table';
import { actions as OrderActionCreators } from '../data/order';
import { actions as ReviewActionCreators } from '../data/review';
import { actions as ServiceActionCreators } from '../data/service';
import { actions as ShiftActionCreators } from '../data/shift';
import { actions as TransactionActionCreators } from '../data/transaction';
import { actions as VisitActionCreators } from '../data/visit';
// HERE: add

import { AccountPage } from '../pages/account/Account';
import { Index as RestaurantIndex } from '../pages/restaurant/Index';
import { Index as AccountIndex } from '../pages/account/Index';
import { Index as MenuIndex } from '../pages/menu/Index';
import { Index as ReservationIndex } from '../pages/reservation/Index';
import { Index as InventoryItemIndex } from '../pages/inventoryItem/Index';
import { Index as MenuItemIndex } from '../pages/menuItem/Index';
import { Index as SectionIndex } from '../pages/section/Index';
import { Index as TableIndex } from '../pages/table/Index';

import { Index as OrderIndex } from '../pages/order/Index';
import { Index as ReviewIndex } from '../pages/review/Index';
import { Index as ServiceIndex } from '../pages/service/Index';
import { Index as ShiftIndex } from '../pages/shift/Index';
import { Index as TransactionIndex } from '../pages/transaction/Index';
import { Index as VisitIndex } from '../pages/visit/Index';
import { Index as DashboardIndex } from '../pages/dashboard/Index';

// HERE: add

import { getRestaurantItems } from '../selectors';
import AppDrawer from './App.Drawer';
import NotificationIcon from '@material-ui/icons/Notifications';
//#endregion

interface IAppProps extends IApplicationProps {
  classes: any;
  theme?: any;
}

interface IState {
  anchorEl: any;
  notificationEl: any;
}

class MiniDrawer extends React.Component<IAppProps, IState> {
  public state: IState = {
    anchorEl: null,
    notificationEl: null,
  };

  public componentWillMount() {
    this.props.fetchAccounts();
    this.props.fetchRestaurants();
    this.props.fetchMenus();
    this.props.fetchReservations();
    this.props.fetchInventoryItems();
    this.props.fetchMenuItems();
    this.props.fetchSections();
    this.props.fetchTables();
    this.props.fetchOrders();
    this.props.fetchReviews();
    this.props.fetchServices();
    this.props.fetchShifts();
    this.props.fetchTransactions();
    this.props.fetchVisits();
    // HERE: add
  }

  private handleNotificationMenu = (event: any) => {
    this.setState({ notificationEl: event.currentTarget });
  };

  // private handleNotificationMenuClose = () => {
  //   this.setState({ notificationEl: null });
  // };

  private handleMenu = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleMenuClose = (path?: string) => {
    this.setState({ anchorEl: null });
    this.navigate(path);
  };

  public handleLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  private navigate = (path?: string) => {
    if (path) {
      this.props.history.push(path);
    }
  };

  public handleDrawerOpen = () => {
    this.props.openDrawer();
  };

  public handleDrawerClose = () => {
    this.props.closeDrawer();
  };

  public showPopup = () => {
    this.props.showPopup(
      new Alert({
        title: 'Testing title',
        message: 'This is a very long message, expect alert to be very wide',
      })
    );
  };

  public showSpinner = () => {
    this.props.showSpinner('I am loading here please...');
  };

  private renderAlert(): JSX.Element {
    if (this.props.utility.alert) {
      return (
        <AlertDialog
          handleClose={this.props.closePopup}
          data={this.props.utility.alert}
        />
      );
    }

    return null;
  }

  private renderSpinner(): JSX.Element {
    if (this.props.utility.spinner) {
      return <SpinnerDialog message={this.props.utility.spinner.message} />;
    }

    return null;
  }

  // private renderNotifications(notifications: any[]) {
  //   const { classes } = this.props;
  //   return (
  //     <Menu
  //       id="notifications"
  //       anchorEl={this.state.notificationEl}
  //       anchorOrigin={{
  //         vertical: 'top',
  //         horizontal: 'right',
  //       }}
  //       transformOrigin={{
  //         vertical: 'top',
  //         horizontal: 'right',
  //       }}
  //       className={classes.notifications}
  //       open={Boolean(this.state.notificationEl)}
  //       onClose={this.handleNotificationMenuClose}
  //     >
  //       {notifications.map((n: any) => (
  //         <MenuItem
  //           key={n.id}
  //           onClick={this.handleNotificationMenuClose}
  //           dense={true}
  //           button={true}
  //           className={classes.notificationListItem}
  //         >
  //           <Avatar src={n.avatar} />
  //           <ListItemText primary={n.subject} />
  //         </MenuItem>
  //       ))}
  //     </Menu>
  //   );
  // }

  private renderAppBar() {
    if (this.props.authentication) {
      const { classes, utility } = this.props;
      const { anchorEl, notificationEl } = this.state;
      const open = Boolean(anchorEl);
      const notificationsOpen = Boolean(notificationEl);

      return (
        <AppBar
          position="fixed"
          className={classNames(
            classes.appBar,
            utility.drawerOpen && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!utility.drawerOpen}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                utility.drawerOpen && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.fillSpace}
              variant="title"
              color="inherit"
              noWrap={true}
            >
              Jeeves Admin Dashboard
            </Typography>
            <div>
              <IconButton
                aria-owns={notificationsOpen ? 'notifications' : null}
                aria-haspopup="true"
                color="inherit"
                onClick={this.handleNotificationMenu}
              >
                <Badge color="secondary">
                  <NotificationIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={open ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={this.handleMenuClose.bind(this, null)}
              >
                <MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>
                  {this.props.authentication.name}
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      );
    }

    return null;
  }

  private renderAccount = () => {
    return (
      <AccountPage
        account={this.props.authentication}
        login={this.props.login}
        match={this.props.match}
        location={this.props.location}
      />
    );
  };

  private renderDrawer() {
    const { utility, authentication } = this.props;
    return (
      <Hidden mdDown={!utility.drawerOpen && true}>
        <AppDrawer
          utility={utility}
          authentication={authentication}
          handleDrawerClose={this.handleDrawerClose}
        />
      </Hidden>
    );
  }

  public render() {
    const { classes } = this.props;

    const RestaurantsBoard = isAuthenticated(
      (props: any): any => {
        return (
          <RestaurantIndex
            createItem={this.props.createRestaurant}
            deleteItem={this.props.deleteRestaurant}
            items={this.props.restaurants}
          />
        );
      }
    );

    const AccountsBoard = isAuthenticated(
      (props: any): any => {
        return (
          <AccountIndex
            createItem={this.props.createAccount}
            deleteItem={this.props.deleteAccount}
            items={this.props.accounts}
          />
        );
      }
    );

    const MenusBoard = isAuthenticated(
      (props: any): any => {
        return (
          <MenuIndex
            createItem={this.props.createMenu}
            deleteItem={this.props.deleteMenu}
            items={this.props.menus}
            restaurants={this.props.restaurants}
          />
        );
      }
    );

    const ReservationsBoard = isAuthenticated(
      (props: any): any => {
        return (
          <ReservationIndex
            createItem={this.props.createReservation}
            deleteItem={this.props.deleteReservation}
            items={this.props.reservations}
            tables={this.props.tables}
            restaurants={this.props.restaurants}
          />
        );
      }
    );

    const InventoryItemsBoard = isAuthenticated(
      (props: any): any => {
        return (
          <InventoryItemIndex
            createItem={this.props.createInventoryItem}
            deleteItem={this.props.deleteInventoryItem}
            items={this.props.inventoryItems}
            menuItems={this.props.menuItems}
          />
        );
      }
    );

    const MenuItemsBoard = isAuthenticated(
      (props: any): any => {
        return (
          <MenuItemIndex
            createItem={this.props.createMenuItem}
            deleteItem={this.props.deleteMenuItem}
            items={this.props.menuItems}
            menus={this.props.menus}
          />
        );
      }
    );

    const SectionBoard = isAuthenticated(
      (props: any): any => {
        return (
          <SectionIndex
            createItem={this.props.createSection}
            deleteItem={this.props.deleteSection}
            items={this.props.sections}
            restaurants={this.props.restaurants}
          />
        );
      }
    );

    const TableBoard = isAuthenticated(
      (props: any): any => {
        return (
          <TableIndex
            createItem={this.props.createTable}
            deleteItem={this.props.deleteTable}
            items={this.props.tables}
            sections={this.props.sections}
          />
        );
      }
    );

    const OrderBoard = isAuthenticated(
      (props: any): any => {
        return (
          <OrderIndex
            createItem={this.props.createOrder}
            deleteItem={this.props.deleteOrder}
            items={this.props.orders}
            menuItems={this.props.menuItems}
          />
        );
      }
    );

    const ReviewBoard = isAuthenticated(
      (props: any): any => {
        return (
          <ReviewIndex
            createItem={this.props.createReview}
            deleteItem={this.props.deleteReview}
            items={this.props.reviews}
            restaurants={this.props.restaurants}
            menuItems={this.props.menuItems}
            accounts={this.props.accounts}
          />
        );
      }
    );

    const ServiceBoard = isAuthenticated(
      (props: any): any => {
        return (
          <ServiceIndex
            createItem={this.props.createService}
            deleteItem={this.props.deleteService}
            items={this.props.services}
            accounts={this.props.accounts}
            tables={this.props.tables}
          />
        );
      }
    );

    const ShiftBoard = isAuthenticated(
      (props: any): any => {
        return (
          <ShiftIndex
            createItem={this.props.createShift}
            deleteItem={this.props.deleteShift}
            items={this.props.shifts}
            accounts={this.props.accounts}
            sections={this.props.sections}
          />
        );
      }
    );

    const TransactionBoard = isAuthenticated(
      (props: any): any => {
        return (
          <TransactionIndex
            createItem={this.props.createTransaction}
            deleteItem={this.props.deleteTransaction}
            items={this.props.transactions}
            accounts={this.props.accounts}
            visits={this.props.visits}
          />
        );
      }
    );

    const VisitBoard = isAuthenticated(
      (props: any): any => {
        return (
          <VisitIndex
            createItem={this.props.createVisit}
            deleteItem={this.props.deleteVisit}
            items={this.props.visits}
            accounts={this.props.accounts}
            restaurants={this.props.restaurants}
            shifts={this.props.shifts}
          />
        );
      }
    );

    const Dashboard = isAuthenticated(
      (props: any): any => {
        return <DashboardIndex />;
      }
    );

    // HERE: add
    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        {this.renderDrawer()}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/" exact={true} component={Dashboard} />
            <Route path="/restaurants" component={RestaurantsBoard} />
            <Route path="/accounts" component={AccountsBoard} />
            <Route path="/menus" component={MenusBoard} />
            <Route path="/menuItems" component={MenuItemsBoard} />
            <Route path="/reservations" component={ReservationsBoard} />
            <Route path="/inventoryItems" component={InventoryItemsBoard} />
            <Route path="/sections" component={SectionBoard} />
            <Route path="/tables" component={TableBoard} />
            <Route path="/orders" component={OrderBoard} />
            <Route path="/reviews" component={ReviewBoard} />
            <Route path="/services" component={ServiceBoard} />
            <Route path="/shifts" component={ShiftBoard} />
            <Route path="/transactions" component={TransactionBoard} />
            <Route path="/visits" component={VisitBoard} />
            <Route path="/account" render={this.renderAccount} />
          </Switch>
          {this.renderAlert()}
          {this.renderSpinner()}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  utility: state.utility,
  authentication: state.authentication,
  accounts: state.accounts.items,
  materials: state.materials,
  restaurants: getRestaurantItems(state),
  materialCharts: state,
  mail: state.mail,
  menus: state.menus.items,
  reservations: state.reservations.items,
  inventoryItems: state.inventoryItems.items,
  menuItems: state.menuItems.items,
  sections: state.sections.items,
  tables: state.tables.items,
  orders: state.orders.items,
  reviews: state.reviews.items,
  services: state.services.items,
  shifts: state.shifts.items,
  transactions: state.transactions.items,
  visits: state.visits.items,
  // HERE: add
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
  bindActionCreators(
    _.assign(
      {},
      AppActionCreators,
      MailActionCreators,
      AccountActionCreators,
      MenuActionCreators,
      MaterialActionCreators,
      RestaurantActionCreators,
      ReservationActionCreators,
      InventoryItemsActionCreators,
      MenuItemsActionCreators,
      SectionActionCreators,
      TableActionCreators,
      OrderActionCreators,
      ReviewActionCreators,
      ServiceActionCreators,
      ShiftActionCreators,
      TransactionActionCreators,
      VisitActionCreators
      // HERE: add
    ),
    dispatch
  );

export default withRouter(connect(
  mapStateToProps,
  mapDispatchtoProps
)(withStyles(styles as any, { withTheme: true })(MiniDrawer as any)) as any);
