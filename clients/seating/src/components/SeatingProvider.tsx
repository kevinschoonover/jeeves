import React from 'react';

export interface ISeatingContext {
  restaurantId: string;
  sections: any[];
  tableIds: string[];
  tablesMap: {
    [tableId: string]: any;
  };
  setSections: React.Dispatch<React.SetStateAction<any[]>>;
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
  const [sections, setSections] = React.useState<any[]>([]);

  const tables = React.useMemo(() => {
    const tableIds: string[] = [];
    const tablesMap: { [key: string]: any } = {};

    sections.forEach((section: any) => {
      section.tables.forEach((table: any) => {
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
