import React from 'react';
import { Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '.125rem',
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1,
      padding: '.375rem .5625rem',
      display: 'inline-block',
      background: deepPurple[300],
      color: 'white',
    },
  });

interface StatusBadgeProps extends WithStyles<typeof styles> {}

const StatusBadge: React.FC<StatusBadgeProps> = ({ children, classes }) => {
  return <label className={classes.root}>{children}</label>;
};

export default withStyles(styles)(StatusBadge);
