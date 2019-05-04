import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ListAltIcon from '@material-ui/icons/ListAlt';

const menuNavItems = (
  <div>
    <Link to="/orders" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="All Orders" />
      </ListItem>
    </Link>
    <Link to="/" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary="All Items" />
      </ListItem>
    </Link>
    <Link to="/starters" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary="Starters" />
      </ListItem>
    </Link>
    <Link to="/entrees" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary="Entrees" />
      </ListItem>
    </Link>
    <Link to="/desserts" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary="Desserts" />
      </ListItem>
    </Link>
    <Link to="/addons" style={{ textDecoration: 'none' }}>
      <ListItem button={true}>
        <ListItemIcon>
          <RestaurantMenuIcon />
        </ListItemIcon>
        <ListItemText primary="Add-ons" />
      </ListItem>
    </Link>
  </div>
);

export default menuNavItems;
