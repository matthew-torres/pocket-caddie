import { useState, useEffect } from 'react';
import axios from 'axios';

const useRowsData = () => {
  const [rows, setRows] = useState([]);


  useEffect(() => {
    axios
      .get('http://localhost:8080/api/user/clubs', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
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
