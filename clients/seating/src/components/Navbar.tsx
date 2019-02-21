import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

export type NavbarProps = WithStyles<typeof styles>;
type Ref = HTMLDivElement;

const Navbar: React.FC<NavbarProps> = React.forwardRef<Ref, NavbarProps>(
  ({ classes }, ref) => {
    return (
      <div ref={ref} className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Seating
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default withStyles(styles)(Navbar);