import { useState, useEffect } from 'react';
import axios from 'axios';

const useRowsData = (rid) => {

  const url = import.meta.env.VITE_API_URL
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get(url+'api/round/' + rid + '/holes', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        if (response.data.holes.length > 0) {
        const mappedRows = response.data.holes.map(hole => ({
          hid: hole.HID,
          holeNumber: hole.HoleNumber,
          par: hole.Par,
          GIR: hole.GIR,
          fairwayHit: hole.FairwayHit,
          putts: hole.Putts,
          score: hole.Score
        }));
        setRows(mappedRows);
      } else {
        setRows([]);
      }
    })
      .catch(error => {
        console.error(error);
      });
  }, [rid]);

  return rows;
};

export default useRowsData;
