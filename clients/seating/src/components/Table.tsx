import React from 'react';
import Rectangle, { RectangleColor, Orientation } from './tables/Rectangle';
import Circle from './tables/Circle';
import { TableStatus } from '../mocks';

export interface TableProps {
  // TODO: This shouldn't have to be a prop of the Table
  shape?: TableShape;
  orientation?: Orientation;
  details: {
    seatingCapacity: number;
    status: string;
  };
  onTableClick(): void;
}

export type TableShape = 'circle' | 'rectangle' | 'square';

const TABLE_STATUS_COLOR_MAP: { [key in TableStatus]: RectangleColor } = {
  cleaning: 'success',
  eating: 'primary',
  ordering: 'purple',
  open: 'grey',
};

// TODO: Not sure how we'll handle orientation in context of table data
const Table: React.FC<TableProps> = ({
  details,
  onTableClick,
  children,
  orientation,
  shape = 'circle',
}) => {
  if (shape === 'circle') {
    return (
      <Circle
        onClick={onTableClick}
        color={(TABLE_STATUS_COLOR_MAP as any)[details.status]}
        size={details.seatingCapacity <= 2 ? 'small' : 'large'}
      >
        {children}
      </Circle>
    );
  }

  return (
    <Rectangle
      onClick={onTableClick}
      color={(TABLE_STATUS_COLOR_MAP as any)[details.status]}
      orientation={orientation}
      size={
        details.seatingCapacity <= 2
          ? 'small'
          : details.seatingCapacity <= 4
          ? 'square'
          : 'large'
      }
    >
      {children}
    </Rectangle>
  );
};

export default Table;
