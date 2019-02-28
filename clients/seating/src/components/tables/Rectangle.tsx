import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import classNames from 'classnames';
import { green } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '&:hover': {
        cursor: 'pointer',
      },
      '&:focus': {
        outlineColor: theme.palette.grey[50],
      },
      textAlign: 'center',
      border: '1px solid black',
      display: 'flex',
    },
    inner: {
      margin: 'auto',
    },
    innerHorizontal: {
      transform: 'rotate(-90deg)',
    },
    large: {
      height: 175,
      width: 100,
    },
    small: {
      height: 125,
      width: 100,
    },
    square: {
      height: 100,
      width: 100,
    },
    vertical: {},
    horizontal: {
      transform: 'rotate(90deg)',
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

export type Size = 'large' | 'small' | 'square';
export type Orientation = 'vertical' | 'horizontal';
export type RectangleColor =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'purple'
  | 'success';

export interface RectangleProps extends WithStyles<typeof styles> {
  size?: Size;
  orientation?: Orientation;
  color?: RectangleColor;
}

const Rectangle: React.FC<
  RectangleProps & React.HTMLAttributes<HTMLDivElement>
> = ({ classes, children, size, orientation, color, ...attributes }) => {
  const rectangle = classNames(
    classes.root,
    size ? classes[size] : classes.small,
    orientation && classes[orientation],
    color && classes[color]
  );

  const inner = classNames(
    classes.inner,
    orientation === 'horizontal' && classes.innerHorizontal
  );

  return (
    <div className={rectangle} tabIndex={1} {...attributes}>
      <span className={inner}>{children}</span>
    </div>
  );
};

export default withStyles(styles)(Rectangle);
