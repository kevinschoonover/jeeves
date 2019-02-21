import React from 'react';

export interface DummyHeaderProps {
  color?: string;
}

export const DummyHeader: React.FC<DummyHeaderProps> = ({
  children,
  color,
}) => {
  return <h1 style={{ color }}>{children}</h1>;
};
