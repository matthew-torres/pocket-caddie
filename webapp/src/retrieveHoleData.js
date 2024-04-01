import { useState, useEffect } from 'react';
import instance from './axios_instance';

const useRowsDataHoles = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {
    instance.get('api/round/holes')
      .then(response => {
        const mappedRows = response.data.holes.map(hole => ({
          id: hole.HID, // HID
          rid: hole.RID,
          UID: hole.UID,
          HoleNumber: hole.Par,
          Par: hole.Par,
          GIR: hole.GIR,
          FairwayHit: hole.FairwayHit,
          Putts: hole.Putts,
          Score: hole.Score
        }));
        setRows(mappedRows);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const parCounts = { '3': 0, '4': 0, '5': 0 };
  let par3count = 0;
  let par4count = 0;
  let par5count = 0;

  rows.forEach((hole) => {
    const { Par, Score } = hole;
    if (Par === 3) {
      parCounts[Par] += Score;
      par3count = par3count + 1;
    } else if (Par === 4) {
      parCounts[Par] += Score;
      par4count = par4count + 1;
    } else {
      parCounts[Par] += Score;
      par5count = par5count + 1;
    }
  });

  parCounts["3"] = parCounts["3"] / par3count;
  parCounts["4"] = parCounts["4"] / par4count;
  parCounts["5"] = parCounts["5"] / par5count;


  return parCounts;
};

export default useRowsDataHoles;
