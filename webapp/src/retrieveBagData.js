import { useState, useEffect } from 'react';
import axios from 'axios';
import instance from './axios_instance';

const useRowsData = async () => {
  const url = process.env.VITE_API_URL
  try {
    const response = await instance.get(url + 'api/user/clubs');
    const rows = response.data.clubs.map(club => ({
      clid: club.CLID,
      UID: club.UID,
      Brand: club.Brand,
      Type: club.Type,
      Name: club.Name
    }));
    return rows;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array if there's an error
  }
};

export default useRowsData;
