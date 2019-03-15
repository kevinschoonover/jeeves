import React from 'react';
import Rectangle, { RectangleColor, Orientation } from './tables/Rectangle';
import Circle from './tables/Circle';
import { TableStatus } from '../mocks';

export interface TableProps {
  shape?: TableShape;
  orientation?: Orientation;
  details: {
    seatingCapacity: number;
    status: string;
    x: number;
    y: number;
  };
  isSelected: boolean;
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
  isSelected,
  shape = 'circle',
}) => {
  if (shape === 'circle') {
    return (
      <Circle
        x={details.x}
        y={details.y}
        isSelected={isSelected}
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
      x={details.x}
      y={details.y}
      onClick={onTableClick}
      isSelected={isSelected}
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
