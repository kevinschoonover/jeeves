import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  open: boolean;
  onClose(): void;
}

export default class FormDialog extends React.Component<Props> {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="form-dialog-title"
          onClose={this.props.onClose}
        >
          <DialogTitle id="form-dialog-title">Reserve Table</DialogTitle>
          <DialogContent>
            <List>
              {[3, 4, 5, 6].map((value) => (
                <ListItem
                  key={value}
                  role={undefined}
                  dense={true}
                  button={true}
                >
                  <Checkbox
                    tabIndex={-1}
                    disableRipple={true}
                  />
                  <ListItemText primary={`2/14/2019 ${value + 1}:30 PM`} />
                  <ListItemSecondaryAction />
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.onClose} color="primary">
              Reserve
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
