import React from 'react';
import { useJeevesAPI } from '@jeeves/common';
import { useSeatingData } from '../components/SeatingProvider';

const useSeating = () => {
  const jeeves = useJeevesAPI();
  const {
    sections,
    tableIds,
    tablesMap,
    setSections,
    restaurantId,
  } = useSeatingData();
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const getTables = async () => {
    console.log('fetching tables');
    setLoading(true);
    try {
      const response = await jeeves.get(`/Restaurants/${restaurantId}`);
      console.log(response.data);
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
    tables: {
      tableIds,
      tablesMap,
    },
  };
};

export default useSeating;
