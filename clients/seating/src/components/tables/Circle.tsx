import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
import { deepPurple, green } from '@material-ui/core/colors';

const LARGE = 150;
const SMALL = 100;

const styles = (theme: Theme) =>
  createStyles({
    circle: {
      strokeWidth: 2,
      stroke: theme.palette.grey[900],
    },
    selected: {
      stroke: theme.palette.grey[50],
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
  isSelected?: boolean;
  x: number;
  y: number;
}

const Circle: React.FC<CircleProps & React.HTMLAttributes<SVGGElement>> = ({
  classes,
  children,
  color,
  size,
  isSelected,
  x,
  y,
  ...attributes
}) => {
  const [isHovering, setHovering] = React.useState(false);
  const radius = size === 'large' ? LARGE / 2 : SMALL / 2;

  const circle = classNames(
    classes.circle,
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

  return (
    <g
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...attributes}
      transform={`translate(${x},${y})`}
      style={{ cursor: isHovering ? 'pointer' : '' }}
    >
      <circle className={circle} cx={radius} cy={radius} r={radius} />
      <text
        className={textColor}
        textAnchor="middle"
        alignmentBaseline="central"
        transform={`translate(${radius},${radius}) rotate(0)`}
      >
        {children}
      </text>
    </g>
  );
};

export default withStyles(styles)(Circle);
