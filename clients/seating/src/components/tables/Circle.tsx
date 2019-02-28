import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
import { deepPurple, green } from '@material-ui/core/colors';

const LARGE = 150;
const SMALL = 100;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        outlineColor: theme.palette.grey[50],
      },
      borderRadius: '50%',
      textAlign: 'center',
      backgroundColor: 'white',
      border: '1px solid black',
      display: 'flex',
    },
    inner: {
      margin: 'auto',
    },
    large: {
      height: LARGE,
      width: LARGE,
    },
    small: {
      height: SMALL,
      width: SMALL,
    },
    purple: {
      backgroundColor: deepPurple[300],
      color: 'white',
    },
    grey: {
      backgroundColor: theme.palette.grey[500],
      color: theme.palette.getContrastText(theme.palette.grey[50]),
    },
    primary: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    secondary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    success: {
      backgroundColor: green[600],
      color: theme.palette.getContrastText(green[600]),
    },
  });

export type Size = 'large' | 'small';
export type CircleColor =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'purple'
  | 'success';

export interface CircleProps extends WithStyles<typeof styles> {
  size?: Size;
  color?: CircleColor;
}

const Circle: React.FC<CircleProps & React.HTMLAttributes<HTMLDivElement>> = ({
  classes,
  children,
  color,
  size,
  ...attributes
}) => {
  const circle = classNames(
    classes.root,
    size ? classes[size] : classes.small,
    color && classes[color]
  );

  return (
    <div className={circle} tabIndex={1} {...attributes}>
      <span className={classes.inner}>{children}</span>
    </div>
  );
};

export default withStyles(styles)(Circle);
