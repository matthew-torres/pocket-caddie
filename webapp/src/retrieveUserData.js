import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserRowsData = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/user', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        if (response && response.data && response.data.user) {
          setUser(response.data.user);
        } else {
          console.error('Invalid response or missing user object.');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return user;
};

export default useUserRowsData;

