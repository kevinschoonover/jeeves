import React from 'react';
import {
  Theme,
  withStyles,
  createStyles,
  WithStyles,
  InputBase,
  Paper,
} from '@material-ui/core';
import { InputBaseProps } from '@material-ui/core/InputBase';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      marginBottom: theme.spacing.unit * 2,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 10,
      minWidth: 250,
      boxShadow:
        '2px 2px 4px rgba(0, 0, 0, 0.25), - 2px 0px 4px rgba(0, 0, 0, 0.25)',
    },
    padding: {
      padding: theme.spacing.unit,
    },
    input: {
      marginLeft: 8,
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      width: 1,
      height: 28,
      margin: 4,
    },
  });

type InputProps = WithStyles<typeof styles> &
  InputBaseProps & {
    adornment?: React.ReactNode;
  };

const Input: React.FC<InputProps> = ({
  classes,
  children,
  adornment,
  type,
  ...inputProps
}) => {
  return (
    <Paper className={classes.root} elevation={1}>
      <div className={classes.padding}>{adornment}</div>
      <InputBase className={classes.input} {...inputProps} />
    </Paper>
  );
};

export default withStyles(styles)(Input);
