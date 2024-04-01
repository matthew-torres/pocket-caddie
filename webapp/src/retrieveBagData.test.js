import { renderHook,waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import useRowsData from './retrieveBagData';
import instance from './axios_instance';


describe('Bag Data: useRowsData hook',  () => {
  it('fetches rows data successfully', async () => {
    const mockResponse = {
        clubs: [
          { CLID: 1, UID: 1, Brand: 'Brand1', Type: 'Type1', Name: 'Name1' },
          { CLID: 2, UID: 2, Brand: 'Brand2', Type: 'Type2', Name: 'Name2' }
        ]
    };

    // Mock axios
    const mockAxios = new MockAdapter(instance);
    mockAxios.onGet("api/user/clubs").reply(200, mockResponse);

    //const result = await useRowsData();
    const {result} =  renderHook(() => useRowsData());

    await waitFor(() =>
      expect(result.current).toEqual([
      { clid: 1, UID: 1, Brand: 'Brand1', Type: 'Type1', Name: 'Name1' },
      { clid: 2, UID: 2, Brand: 'Brand2', Type: 'Type2', Name: 'Name2' }
     ])
    );
  });

describe('Bag Data: useRowsData unsuccessful query', () => {
  it('returns empty array on unsucessful query', async () => {
    const mockAxiosError = new MockAdapter(instance);
    mockAxiosError.onGet("api/user/clubs").reply(404); // Simulate a 404 error

    // Call the custom hook
    const {result} = renderHook(() => useRowsData());
    // Assert that the result is an empty array or any other expected behavior when an error occurs
    await waitFor(() =>
      expect(result.current).toEqual([])
  )
  })
})

});
