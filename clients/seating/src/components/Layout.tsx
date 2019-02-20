import React from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
  LinearProgress,
} from '@material-ui/core';
import classNames from 'classnames';
import grey from '@material-ui/core/colors/grey';
import Table from './Table';
import { Section } from '../mocks';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridColumnGap: 0,
      height: '100%',
      overflow: 'auto',
      backgroundColor: grey[800],
      // This doesn't work like intended
      [theme.breakpoints.down('lg')]: {
        overflowX: 'scroll',
      },
    },
    loader: {
      width: '100vw',
    },
    element: {
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    one: {
      gridColumn: '1 / 5',
      gridRow: '1 / 3',
      display: 'flex',
      flexDirection: 'row',
    },
    two: {
      gridColumn: '1',
      gridRow: '3 / 10',
      display: 'flex',
      flexDirection: 'column',
    },
    three: {
      gridColumn: '2 / 5',
      gridRow: '3 / 5',
      display: 'flex',
      flexDirection: 'row',
    },
    four: {
      gridColumn: '2 / 5',
      gridRow: '5 / 10',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
    },
  });

export interface LayoutProps extends WithStyles<typeof styles> {
  yOffset: number;
  sections: Section[];
  isLoading: boolean;
  setSelectedTable: (tableId: number) => () => void;
}

const Layout: React.FC<LayoutProps> = ({
  classes,
  yOffset,
  sections,
  isLoading,
  setSelectedTable,
}) => {
  const one = classNames(classes.element, classes.one);
  const two = classNames(classes.element, classes.two);
  const three = classNames(classes.element, classes.three);
  const four = classNames(classes.element, classes.four);

  const sectionTableStyles = {
    one: {
      className: one,
      shape: 'rectangle',
      orientation: 'horizontal',
    },
    two: {
      className: two,
      shape: 'rectangle',
    },
    three: {
      className: three,
      shape: 'circle',
    },
    four: {
      className: four,
      shape: 'circle',
    },
  } as any;

  return (
    <div
      className={classes.container}
      style={{
        top: yOffset,
      }}
    >
      {isLoading && !sections.length ? (
        <LinearProgress className={classes.loader} />
      ) : (
        sections.map((section) => (
          <div
            key={section.sectionId}
            className={sectionTableStyles[section.className].className}
          >
            {section.tables.map((table) => (
              <Table
                key={table.id}
                onTableClick={setSelectedTable(table.id)}
                details={{
                  seatingCapacity: table.seatingCapacity,
                  status: table.status,
                }}
                {...sectionTableStyles[section.className]}
              >
                {table.id}
              </Table>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default withStyles(styles)(Layout);
