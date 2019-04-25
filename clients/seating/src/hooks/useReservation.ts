import React from 'react';
import { useJeevesAPI } from '@jeeves/common';
import { useSeatingData } from '../components/SeatingProvider';

const useReservation = () => {
  const jeeves = useJeevesAPI();
  const { restaurantId, setSections, tablesMap } = useSeatingData();
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const addReservation = (tableId: string, reservation: any) => {
    console.log('addReservation', tableId, reservation);
    const table = tablesMap[tableId];

    // I don't like this. This will probably be fine for now, but this can be an expensive
    // calculation and this will cause the entire app to rerender because
    // everything relies on sections.
    setSections((prevSections) => {
      const index = prevSections.findIndex(
        (section) => section.id === table.sectionId
      );
      const newSections = prevSections.slice();

      newSections[index] = {
        ...newSections[index],
        tables: newSections[index].tables.map((t: any) =>
          t.id === tableId
            ? {
                ...table,
                reservations: [...table.reservations, reservation],
              }
            : t
        ),
      };

      return newSections;
    });
  };

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
    setLoading(true);
    try {
      const response = await jeeves.post(`/Reservations`, {
        startTime,
        numGuests,
        table,
        restaurant: restaurantId,
      });
      addReservation(table, { startTime, numGuests, table });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, isLoading, error };
};

export default useReservation;
