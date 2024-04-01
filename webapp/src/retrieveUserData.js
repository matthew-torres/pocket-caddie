import { useState, useEffect } from 'react';
import instance from './axios_instance';

const useUserRowsData = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
   instance.get("api/user")
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

