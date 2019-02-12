import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const styles = () =>
  createStyles({
    table: {
      '&:hover': {
        fill: grey[200],
        cursor: 'pointer',
      },
      stroke: 'black',
      transition: '200ms',
      transitionTimingFunction: 'ease-in-out',
    },
  });

export interface TableProps extends WithStyles<typeof styles> {
  x: number;
  y: number;
  width: number;
  height: number;
  onTableClick(): void;
}

const Table: React.FC<TableProps> = ({
  x,
  y,
  width,
  height,
  onTableClick,
  classes,
  children,
}) => {
  return (
    <svg
      width={width}
      height={height}
      x={x}
      y={y}
      onClick={onTableClick}
      tabIndex={1}
    >
      <g>
        <circle
          className={classes.table}
          cx="50%"
          cy="50%"
          r="48%"
          fill="#FFFFFF"
        />
        <text x="50%" y="51%" textAnchor="middle">
          {children}
        </text>
      </g>
    </svg>
  );
};

export default withStyles(styles)(Table);
