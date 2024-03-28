import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const useRowsData = (userId) => {

  const url = import.meta.env.VITE_API_URL
  const [rows, setRows] = useState([]);


  useEffect(() => {
    axios
      .get(url+'api/user/rounds', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
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
