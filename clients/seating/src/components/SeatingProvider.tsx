import React from 'react';
import { SectionsEntity, TablesEntity, ITable } from '../types';

export interface ISeatingContext {
  restaurantId: string;
  sections: SectionsEntity[];
  tableIds: Array<TablesEntity['id']>;
  tablesMap: {
    [tableId: number]: ITable;
  };
  setSections: React.Dispatch<React.SetStateAction<SectionsEntity[]>>;
}

export interface SeatingProviderProps {
  restaurantId: string;
}

export const SeatingContext = React.createContext<ISeatingContext>(
  // tslint:disable-next-line: no-object-literal-type-assertion
  {} as ISeatingContext
);

export const SeatingProvider: React.FC<SeatingProviderProps> = ({
  children,
  restaurantId,
}) => {
  const [sections, setSections] = React.useState<SectionsEntity[]>([]);

  const tables = React.useMemo(() => {
    const tableIds: Array<TablesEntity['id']> = [];
    const tablesMap: { [tableId: number]: ITable } = {};

    sections.forEach((section: SectionsEntity) => {
      section.tables.forEach((table: TablesEntity) => {
        tableIds.push(table.id);
        tablesMap[table.id] = {
          ...table,
          sectionId: section.id,
        };
      });
    });
    return { tableIds, tablesMap };
  }, [sections]);

  return (
    <SeatingContext.Provider
      value={{ sections, ...tables, setSections, restaurantId }}
    >
      {children}
    </SeatingContext.Provider>
  );
};

export const useSeatingData = () => React.useContext(SeatingContext);
