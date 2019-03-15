import React from 'react';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import { deepPurple, green } from '@material-ui/core/colors';

export const HEIGHT = {
  LARGE: 175,
  SMALL: 125,
  SQUARE: 100,
};

export const WIDTH = 100;

export const styles = (theme: Theme) =>
  createStyles({
    rectangle: {
      strokeWidth: 2,
      stroke: theme.palette.grey[900],
    },
    selected: {
      stroke: theme.palette.grey[50],
    },
    large: {
      height: HEIGHT.LARGE,
      width: WIDTH,
    },
    small: {
      height: HEIGHT.SMALL,
      width: WIDTH,
    },
    square: {
      height: HEIGHT.SQUARE,
      width: WIDTH,
    },
    purple: {
      fill: deepPurple[300],
    },
    purpleContrastText: {
      fill: 'white',
    },
    grey: {
      fill: theme.palette.grey[500],
    },
    greyContrastText: {
      fill: theme.palette.getContrastText(theme.palette.grey[500]),
    },
    primary: {
      fill: theme.palette.primary.main,
    },
    primaryContrastText: {
      fill: theme.palette.primary.contrastText,
    },
    secondary: {
      fill: theme.palette.secondary.main,
    },
    secondaryContrastText: {
      fill: theme.palette.secondary.contrastText,
    },
    success: {
      fill: green[600],
    },
    successContrastText: {
      fill: theme.palette.getContrastText(green[600]),
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
  isSelected?: boolean;
  x: number;
  y: number;
}

const Rectangle: React.FC<
  RectangleProps & React.HTMLAttributes<SVGGElement>
> = ({
  classes,
  children,
  size,
  orientation,
  color,
  isSelected,
  x,
  y,
  ...attributes
}) => {
  const [isHovering, setHovering] = React.useState(false);

  const rotation = orientation === 'horizontal' ? 90 : 0;
  const textRotation = orientation === 'horizontal' ? -90 : 0;

  const rectangle = classNames(
    classes.rectangle,
    size ? classes[size] : classes.small,
    color ? classes[color] : classes.grey,
    isSelected && classes.selected
  );

  let textColor = classNames(classes.greyContrastText);
  switch (color) {
    case 'primary':
      textColor = classNames(classes.primaryContrastText);
      break;
    case 'purple':
      textColor = classNames(classes.purpleContrastText);
      break;
    case 'secondary':
      textColor = classNames(classes.secondaryContrastText);
      break;
    case 'success':
      textColor = classNames(classes.successContrastText);
      break;
  }

  let textLocation = {
    x: WIDTH / 2,
    y: HEIGHT.SMALL / 2,
  };
  switch (size) {
    case 'large':
      textLocation = {
        x: WIDTH / 2,
        y: HEIGHT.LARGE / 2,
      };
      break;
    case 'square':
      textLocation = {
        x: WIDTH / 2,
        y: HEIGHT.SQUARE / 2,
      };
      break;
  }

  return (
    <g
      transform={`translate(${x},${y}) rotate(${rotation})`}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{ cursor: isHovering ? 'pointer' : '' }}
      {...attributes}
    >
      <rect className={rectangle} x="0" y="0" />
      <text
        className={textColor}
        textAnchor="middle"
        alignmentBaseline="central"
        transform={`translate(${textLocation.x},${
          textLocation.y
        }) rotate(${textRotation})`}
      >
        {children}
      </text>
    </g>
  );
};

export default withStyles(styles)(Rectangle);
