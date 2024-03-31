import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import useRowsData from './retrieveBagData';
import instance from './axios_instance';
import { act } from 'react-dom/test-utils'; 


describe('useRowsData hook',  () => {
  it('fetches rows data successfully', async () => {
    const mockResponse = {
        clubs: [
          { CLID: 1, UID: 1, Brand: 'Brand1', Type: 'Type1', Name: 'Name1' },
          { CLID: 2, UID: 2, Brand: 'Brand2', Type: 'Type2', Name: 'Name2' }
        ]
    };

    // Mock axios
    const url = process.env.VITE_API_URL

    const mockAxios = new MockAdapter(instance);
    mockAxios.onGet(url+"api/user/clubs").reply(200, mockResponse);

    const result = await useRowsData();
  
    expect(result).toEqual([
      { clid: 1, UID: 1, Brand: 'Brand1', Type: 'Type1', Name: 'Name1' },
      { clid: 2, UID: 2, Brand: 'Brand2', Type: 'Type2', Name: 'Name2' }
    ]);
  });

describe('useRowsData unsuccessful query', () => {
  it('returns empty array on unsucessful query', async () => {
    const url = "127.168.1.177:8080/";
    const mockAxiosError = new MockAdapter(instance);
    mockAxiosError.onGet(url + "api/user/clubs").reply(404); // Simulate a 404 error

    // Call the custom hook
    const result = await useRowsData();

    // Assert that the result is an empty array or any other expected behavior when an error occurs
    expect(result).toEqual([]); 
  })
})

});
