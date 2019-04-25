import React from 'react';
import Rectangle, { RectangleColor } from './tables/Rectangle';
import Circle from './tables/Circle';
import { ITable, TableStatus, TablesEntity } from '../types';

export interface TableProps {
  table: ITable | TablesEntity;
  isSelected: boolean;
  onTableClick(): void;
}

const TABLE_STATUS_COLOR_MAP: { [key in TableStatus]: RectangleColor } = {
  cleaning: 'success',
  eating: 'primary',
  ordering: 'purple',
  open: 'grey',
};

const Table: React.FC<TableProps> = ({
  table,
  onTableClick,
  children,
  isSelected,
}) => {
  const { x, y, status, seatingCapacity, rotation, shape } = table;

  if (shape === 'circle') {
    return (
      <Circle
        x={x}
        y={y}
        isSelected={isSelected}
        onClick={onTableClick}
        color={TABLE_STATUS_COLOR_MAP[status]}
        size={seatingCapacity <= 2 ? 'small' : 'large'}
      >
        {children}
      </Circle>
    );
  }

  return (
    <Rectangle
      x={x}
      y={y}
      onClick={onTableClick}
      isSelected={isSelected}
      color={TABLE_STATUS_COLOR_MAP[status]}
      rotation={rotation}
      size={
        seatingCapacity <= 2
          ? 'small'
          : seatingCapacity <= 4
          ? 'square'
          : 'large'
      }
    >
      {children}
    </Rectangle>
  );
};

export default Table;
