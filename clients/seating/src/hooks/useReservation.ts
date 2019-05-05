import React from 'react';
import { useJeevesAPI } from '@jeeves/common';
import { useSeatingData } from '../components/SeatingProvider';
import { TablesEntity, ReservationsEntity } from '../types';

export interface ReservationFormValues {
  startTime: Date;
  numGuests: number;
  table: TablesEntity['id'];
}

const wait = (delay: number = 2000) => new Promise(resolve => setTimeout(resolve, delay));

const useReservation = () => {
  const jeeves = useJeevesAPI();
  const { restaurantId, setRestaurant, tablesMap } = useSeatingData();
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const addReservation = (
    tableId: TablesEntity['id'],
    reservation: ReservationsEntity,
  ) => {
    console.log('addReservation', tableId, reservation);
    const table = tablesMap[tableId];

    setRestaurant((restaurant) => {
      const prevSections = restaurant.sections;
      const index = prevSections.findIndex(
        (section) => section.id === table.sectionId
      );
      const newSections = prevSections.slice();

      newSections[index] = {
        ...newSections[index],
        tables: newSections[index].tables.map((t) =>
          t.id === tableId
            ? {
                ...table,
                reservations: [...table.reservations, reservation],
              }
            : t
        ),
      };

      return { ...restaurant, sections: newSections };
    });
  };

  const createReservation = async ({
    startTime,
    numGuests,
    table,
  }: ReservationFormValues) => {
    console.log(startTime, numGuests, table);
    setLoading(true);
    try {
      const response = await jeeves.post(`/Reservations`, {
        startTime,
        numGuests,
        table,
        restaurant: restaurantId,
      });
      await wait(2000); // Adds a nicer loading effect, so it's not an instant flash
      addReservation(table, response.data);
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
