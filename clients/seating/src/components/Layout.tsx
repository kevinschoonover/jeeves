import React from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';
import grey from '@material-ui/core/colors/grey';
import Table from './Table';
import Reserve from '../Dialogs/Reserve';

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
      gridRow: '3 / 7',
      display: 'flex',
      flexDirection: 'row',
    },
    four: {
      gridColumn: '2 / 5',
      gridRow: '7 / 10',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-around',
    },
  });

export enum TableStatus {
  OPEN = 'open',
  ORDERING = 'ordering',
  EATING = 'eating',
  CLEANING = 'cleaning',
}

const tables = [
  {
    id: 1,
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
  {
    id: 2,
    x: 500,
    y: 100,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
  {
    id: 3,
    x: 900,
    y: 100,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
  {
    id: 4,
    x: 100,
    y: 500,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
  {
    id: 5,
    x: 500,
    y: 500,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
  {
    id: 6,
    x: 900,
    y: 500,
    width: 200,
    height: 200,
    details: {
      seatingCapacity: 4,
      status: TableStatus.OPEN,
    },
  },
];

interface Table {
  id: number;
  details: {
    seatingCapacity: number;
    status: TableStatus;
  };
}

export interface LayoutProps extends WithStyles<typeof styles> {
  yOffset: number;
}

const Layout: React.FC<LayoutProps> = ({ classes, yOffset }) => {
  const [selectedTable, setSelectedTable] = React.useState<string | null>(null);
  const handleTableClick = (tableId: string) => () => {
    setSelectedTable(tableId);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const one = classNames(classes.element, classes.one);
  const two = classNames(classes.element, classes.two);
  const three = classNames(classes.element, classes.three);
  const four = classNames(classes.element, classes.four);

  return (
    <div
      className={classes.container}
      style={{
        top: yOffset,
      }}
    >
      <div className={one}>
        <Reserve open={open} onClose={handleClickClose} />
        <Table
          onTableClick={handleClickOpen}
          shape="square"
          details={{ seatingCapacity: 4, status: TableStatus.OPEN }}
        >
          1
        </Table>
        <Table
          onTableClick={handleClickOpen}
          shape="rectangle"
          orientation="horizontal"
          details={{ seatingCapacity: 8, status: TableStatus.CLEANING }}
        >
          2
        </Table>
        <Table
          onTableClick={handleClickOpen}
          shape="rectangle"
          orientation="horizontal"
          details={{ seatingCapacity: 8, status: TableStatus.ORDERING }}
        >
          3
        </Table>
        <Table
          onTableClick={handleClickOpen}
          shape="rectangle"
          orientation="horizontal"
          details={{ seatingCapacity: 8, status: TableStatus.EATING }}
        >
          4
        </Table>
      </div>
      <div className={two}>
        <Table
          shape="rectangle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Two
        </Table>
        <Table
          shape="rectangle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Two
        </Table>
        <Table
          shape="rectangle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Two
        </Table>
      </div>
      <div className={three}>
        <Table
          shape="rectangle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 8, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="rectangle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 8, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 8, status: TableStatus.OPEN }}
        >
          Three
        </Table>
      </div>
      <div className={four}>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
        <Table
          shape="circle"
          onTableClick={handleClickOpen}
          details={{ seatingCapacity: 2, status: TableStatus.OPEN }}
        >
          Three
        </Table>
      </div>
    </div>
  );
};

export default withStyles(styles)(Layout);
