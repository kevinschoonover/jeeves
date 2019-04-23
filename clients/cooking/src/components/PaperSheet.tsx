
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
import { OrderCard } from './OrderData';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,

  },
  table: {
    minWidth: 700,
    fontFamily: 'Raleway',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  button: {
    margin: theme.spacing.unit,
    fontFamily: 'Raleway',
  },
});


interface PaperProps extends WithStyles<typeof styles>{
  index: number;
  order: OrderCard;
  addOrder: (newOrder: OrderCard) => void;
  finishOrder: (index: number) => void;
}

const PaperSheet: React.FC<PaperProps> = ({ classes , index, order, addOrder, finishOrder}) => {
  const [chefAssigned, setChefAssigned] = React.useState('');
  const [orderStatus, setOrderStatus] = React.useState('Received');
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
    return (
        <div className={classes.root}>
        <Paper className={classes.root} elevation={1}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell align="center">Order No.</TableCell>
                <TableCell align="center">Time Received</TableCell>
                <TableCell align="center">Table No.</TableCell>
                <TableCell align="center">Items ordered</TableCell>
                <TableCell align="center">Chef Assigned</TableCell>
                <TableCell align="center">Status</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell align="center">{order.orderNo}</TableCell>
                  <TableCell align="center">{order.timeReceived.toLocaleString()}</TableCell>
                  <TableCell align="center">{order.tableNo}</TableCell>
                  <TableCell rowSpan={order.items.length} align="center">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Item Name</TableCell>
                        <TableCell align="left">Item No.</TableCell>
                        <TableCell align="left">Quantity</TableCell> 
                      </TableRow>
                    </TableHead>
                      {order.items.map(item => (<TableRow>
                                                  <TableCell align="left">{item.itemName}</TableCell>
                                                  <TableCell align="left">{item.itemNumber}</TableCell>
                                                  <TableCell align="left">{item.quantity}</TableCell>
                                                </TableRow>
                                              ))}
                  </TableCell>
                  <TableCell align="center">
                    <FormControl className={classes.formControl}>
                      <Select
                        value={chefAssigned}
                        onChange={e => {setChefAssigned(e.target.value)}}
                        >
                        <MenuItem value={"Gordon"}>Gordon</MenuItem>
                        <MenuItem value={"Cedric"}>Cedric</MenuItem>
                        <MenuItem value={"Emeril"}>Emeril</MenuItem>
                        <MenuItem value={"Martha"}>Martha</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">{orderStatus}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <br /> 
          <Button variant="contained" className={classes.button} onClick={() => orderStatus === 'Received'? 
                                                                                setOrderStatus('Prep'):
                                                                                  (orderStatus === 'Prep'?
                                                                                  setOrderStatus('Cook'):
                                                                                    (orderStatus === 'Cook'?
                                                                                    setOrderStatus('Ready'):setOpen(true)))}>
              Update Status
          </Button>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Order Ready!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Cannot update order any further.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} style={{color:'#540778'}}>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Button variant="contained" style={{backgroundColor: '#37c425', fontFamily:'Raleway'}} onClick={() => (orderStatus === 'Ready' && !(chefAssigned === ''))?
                                                                                                  finishOrder(index):
                                                                                                  setOpen1(true)}>
              Order Finished
          </Button>
          <Dialog
            open={open1}
            onClose={() => setOpen1(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Cannot Proceed!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Order can be finished only once it's ready and chef assigned is set.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen1(false)} style={{color:'#540778'}}>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
        </div>
        );
    }

export default withStyles(styles)(PaperSheet);