import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
  LinearProgress,
} from '@material-ui/core';
import Table from './Table';
import { SectionsEntity } from '../types';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      backgroundColor: theme.palette.grey[800],
    },
    loader: {
      width: '100vw',
    },
  });

export interface LayoutProps extends WithStyles<typeof styles> {
  yOffset: number;
  sections: SectionsEntity[];
  isLoading: boolean;
  setSelectedTable: (tableId: number) => () => void;
  selectedTable: number | null;
}

const Layout: React.FC<LayoutProps> = ({
  classes,
  yOffset,
  sections,
  isLoading,
  setSelectedTable,
  selectedTable,
}) => {
  if (isLoading && !sections.length) {
    return (
      <div
        className={classes.container}
        style={{
          top: yOffset,
          width: '100%',
          height: '100%',
        }}
      >
        <LinearProgress className={classes.loader} />
      </div>
    );
  }

  return (
    <svg id="layout" className={classes.container} width="100%" height="100%">
      {sections.map((section) => (
        <React.Fragment key={section.id}>
          {section.tables.map((table) => (
            <Table
              key={table.id}
              isSelected={selectedTable === table.id}
              onTableClick={setSelectedTable(table.id)}
              table={table}
            >
              {table.id}
            </Table>
          ))}
        </React.Fragment>
      ))}
    </svg>
  );
};

export default withStyles(styles)(Layout);
