import React from 'react';
import {
  SectionsEntity,
  TablesEntity,
  ITable,
  RestaurantEntity,
} from '../types';

export interface ISeatingContext {
  restaurantId: string;
  sections: SectionsEntity[];
  tableIds: Array<TablesEntity['id']>;
  tablesMap: {
    [tableId: number]: ITable;
  };
  restaurant: RestaurantEntity;
  setRestaurant: React.Dispatch<React.SetStateAction<RestaurantEntity>>;
}

export interface SeatingProviderProps {
  restaurantId: string;
}

export const SeatingContext = React.createContext<ISeatingContext>(
  ({} as unknown) as ISeatingContext
);

export const SeatingProvider: React.FC<SeatingProviderProps> = ({
  children,
  restaurantId,
}) => {
  const [restaurant, setRestaurant] = React.useState<RestaurantEntity>(
    ({} as unknown) as RestaurantEntity
  );

  console.log('restaurant', restaurant);

  const tables = React.useMemo(() => {
    const tableIds: Array<TablesEntity['id']> = [];
    const tablesMap: { [tableId: number]: ITable } = {};

    if (restaurant && restaurant.sections) {
      restaurant.sections.forEach((section: SectionsEntity) => {
        section.tables.forEach((table: TablesEntity) => {
          tableIds.push(table.id);
          tablesMap[table.id] = {
            ...table,
            sectionId: section.id,
          };
        });
      });
    }
    return { tableIds, tablesMap };
  }, [restaurant]);

  return (
    <SeatingContext.Provider
      value={{
        sections: restaurant.sections || [],
        ...tables,
        restaurantId,
        restaurant,
        setRestaurant,
      }}
    >
      {children}
    </SeatingContext.Provider>
  );
};

export const useSeatingData = () => React.useContext(SeatingContext);
