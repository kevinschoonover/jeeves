import React from 'react';
import { Theme, withStyles, createStyles, WithStyles } from '@material-ui/core';
import classNames from 'classnames';
import { deepPurple, green } from '@material-ui/core/colors';
import { TableStatus } from '../mocks';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '.125rem',
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
      lineHeight: 1,
      padding: '.375rem .5625rem',
      display: 'inline-block',
      textTransform: 'uppercase',
    },
    open: {
      background: theme.palette.grey[500],
      color: theme.palette.getContrastText(theme.palette.grey[500]),
    },
    ordering: {
      background: deepPurple[300],
      color: theme.palette.getContrastText(deepPurple[300]),
    },
    eating: {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    cleaning: {
      background: green[600],
      color: theme.palette.getContrastText(green[600]),
    },
  });

interface StatusBadgeProps extends WithStyles<typeof styles> {
  status: TableStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  classes,
  status,
}) => {
  return (
    <label className={classNames(classes.root, classes[status])}>
      {children}
    </label>
  );
};

export default withStyles(styles)(StatusBadge);
