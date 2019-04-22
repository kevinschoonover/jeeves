import React from 'react';
import { useJeevesAPI } from '@jeeves/common';

const useSeating = (restaurantId: string) => {
  const jeeves = useJeevesAPI();
  const [isLoading, setLoading] = React.useState(true);
  const [sections, setSections] = React.useState([] as any[]);
  const [error, setError] = React.useState(false);

  const createReservation = async ({
    startTime,
    numGuests,
    table,
  }: {
    startTime: Date;
    numGuests: number;
    table: string;
  }) => {
    console.log(startTime, numGuests, table);
    try {
      const response = await jeeves.post(`/Reservations`, {
        startTime,
        numGuests,
        table,
        restaurant: restaurantId,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTables = async () => {
    console.log('fetching tables');
    setLoading(true);
    try {
      const response = await jeeves.get(`/Restaurants/${restaurantId}`);
      console.log(response.data.sections);
      setSections(response.data.sections);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getTables();
  }, [restaurantId]);

  return {
    isLoading,
    sections,
    error,
    createReservation,
    tables: React.useMemo(() => {
      const tableIds: string[] = [];
      const tablesMap: { [key: string]: any } = {};

      sections.forEach((section: any) => {
        section.tables.forEach((table: any) => {
          tableIds.push(table.id);
          tablesMap[table.id] = table;
        });
      });
      return { tableIds, tablesMap };
    }, [sections]),
  };
};

export default useSeating;
