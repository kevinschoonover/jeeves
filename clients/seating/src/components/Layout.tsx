import React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Table from './Table';

const styles = () =>
  createStyles({
    root: {
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
      backgroundColor: blue[100],
      zIndex: -1,
    },
    table: {
      '&:hover': {
        fill: grey[50],
        cursor: 'pointer',
      },
      stroke: 'black',
      transition: '200ms',
      transitionTimingFunction: 'ease-in-out',
    },
  });

const tables = [
  {
    id: 1,
    x: 100,
    y: 100,
    width: 200,
    height: 200,
  },
  {
    id: 2,
    x: 500,
    y: 100,
    width: 200,
    height: 200,
  },
  {
    id: 3,
    x: 900,
    y: 100,
    width: 200,
    height: 200,
  },
  {
    id: 4,
    x: 100,
    y: 500,
    width: 200,
    height: 200,
  },
  {
    id: 5,
    x: 500,
    y: 500,
    width: 200,
    height: 200,
  },
  {
    id: 6,
    x: 900,
    y: 500,
    width: 200,
    height: 200,
  },
];

export type LayoutProps = WithStyles<typeof styles>;

const Layout: React.FC<LayoutProps> = ({ classes }) => {
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);

  const handleTableClick = (tableId: string) => () => {
    setSelectedTable(tableId);
  };

  return (
    <>
      <svg id="restaurant" className={classes.root}>
        <g>
          {tables.map((table) => (
            <Table
              key={table.id}
              {...table}
              onTableClick={handleTableClick(`${table.id}`)}
            >
              {table.id}
            </Table>
          ))}
        </g>
      </svg>
    </>
  );
};

export default withStyles(styles)(Layout);
