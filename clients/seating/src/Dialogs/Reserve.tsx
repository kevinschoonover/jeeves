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

interface Props {
  open: boolean;
}

export default class FormDialog extends React.Component {
  render() {
    return (
      <div>
        <List>
          <p style={{ display: 'flex', justifyContent: 'left' }}>
            {`Tables Open:`}
          </p>
          {[1, 2, 3, 4].map((value) => (
            <ListItem key={value} role={undefined} dense={true} button={true}>
              <Checkbox tabIndex={-1} disableRipple={true} />
              <ListItemText primary={`Table: ${value} is ready.`} />
              <ListItemSecondaryAction />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
