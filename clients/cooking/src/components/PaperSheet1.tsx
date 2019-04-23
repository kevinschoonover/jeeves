
import React from 'react';
import {
    withStyles,
    WithStyles,
    Theme, } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    font: 'Raleway',
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

let id = 0;
function createData<T>(orderNumber: number, timeReceived: T, tableNo: number, numberItems: number, chef: string, status: string) {
  id += 1;
  return { id, orderNumber, timeReceived, tableNo, numberItems, chef, status };
}


export type PaperProps = WithStyles<typeof styles>;
type Ref = HTMLDivElement;

const PaperSheet1: React.FC<PaperProps> = ({ classes }, props) => {
    // const rows = [this.props.orderNumber, this.props.timeReceived, this.props.tableNo, this.props.numberItems, this.props.chefAssigned, this.props.status];
    return (
        <div className={classes.root}>
        <Paper className={classes.root} elevation={1}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell>Order No.</TableCell>
                <TableCell align="center">Time Received</TableCell>
                <TableCell align="center">Table No.</TableCell>
                <TableCell align="center">Item No.</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Chef Assigned</TableCell>
                <TableCell align="center">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                <TableCell component="th" scope="row">123457</TableCell>
                <TableCell align="center">{Math.floor(Date.now() / 1000)}</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">4</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">Emeril</TableCell>
                <TableCell align="center">Received</TableCell> 
                </TableRow>
            </TableBody>
        </Table> <br />
        <Button variant="contained" className={classes.button}>
            Update Status
        </Button>
        </Paper>
        </div>
        );
    }

export default withStyles(styles)(PaperSheet1);