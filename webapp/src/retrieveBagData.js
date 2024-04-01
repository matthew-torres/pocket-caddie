import { useState, useEffect } from 'react';

import instance from './axios_instance';

const useRowsData = () => {

  const [rows, setRows] = useState([]);


  useEffect(() => {
    instance.get('api/user/clubs')
      .then(response => {
        const mappedRows = response.data.clubs.map(club => ({
          clid: club.CLID, // HID
          UID: club.UID,
          Brand: club.Brand,
          Type: club.Type,
          Name: club.Name
        }));
        setRows(mappedRows);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return rows;
};

export default useRowsData;