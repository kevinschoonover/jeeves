import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

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
