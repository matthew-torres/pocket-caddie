import { useState, useEffect } from 'react';
import instance from './axios_instance';

const useRowsData = (rid) => {

  const [rows, setRows] = useState([]);
  useEffect(() => {
    instance.get('api/round/' + rid + '/holes')
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
