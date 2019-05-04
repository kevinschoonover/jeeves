import * as React from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = (theme: Theme) => ({
  card: {
    maxWidth: 345,
  },
  root: {
    width: '100%',
  },
  avatar: {
    marginRight: 5,
  },
  summary: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    height: '100%',
    verticalAlign: 'middle',
    flexBasis: '33.33%',
    flexShrink: 0,
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
  },
  grid: {
    marginBottom: 50,
  },
});

interface IRestaurantListProps {
  items: any[];
  classes: any;
}

class RestaurantList extends React.Component<IRestaurantListProps, {}> {
  public render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Number of Guests</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Start Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.items.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.numGuests}
                </TableCell>
                <TableCell align="right">{row.dateCreated}</TableCell>
                <TableCell align="right">{row.startTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(RestaurantList);
