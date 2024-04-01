
import { useState, useEffect } from 'react';
import instance from './axios_instance';

const useRowsData = (userId) => {

  const [rows, setRows] = useState([]);


  useEffect(() => {
    instance.get('api/user/rounds')
      .then(response => {
        const mappedRows = response.data.rounds.map(round => ({
          id: round.ID,
          date: round.Date,
          course: round.Course,
          score: round.Score,
          duration: round.Duration,
          weatherCond: round.WeatherCond,
        }));
        setRows(mappedRows);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);

  return rows;
};

export default useRowsData;

