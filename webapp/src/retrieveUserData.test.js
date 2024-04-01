
import MockAdapter from 'axios-mock-adapter'; // Library for mocking axios requests
import useRowsData from './retrieveUserData';
import instance from './axios_instance';
import { waitFor, renderHook} from '@testing-library/react';


describe('User: useRowData hook', () => {
    it('fetches rows data successfully', async () => {
        const mockResponse = {
                "user": {
                    "UID": 1,
                    "Firstname": "TestFirst",
                    "Lastname": "TestLast",
                    "Password": "",
                    "Email": "test@email.com",
                    "Handicap": 32
                }
        }

        const mockAxios = new MockAdapter(instance);
        mockAxios.onGet("api/user").reply(200, mockResponse);
        const {result} = renderHook(() => useRowsData());

        await waitFor(() =>
            expect(result.current).toEqual(
                {"UID": 1,
                "Firstname": "TestFirst",
                "Lastname": "TestLast",
                "Password": "",
                "Email": "test@email.com",
                "Handicap": 32}
            )
        )
    })
})

describe('User: useRowsData unsuccessful query', () => {
    it('returns null if no user is found', async () => {
      const mockAxiosError = new MockAdapter(instance);
      mockAxiosError.onGet("api/user").reply(404); // Simulate a 404 error
  
      // Call the custom hook
  
      const {result} = renderHook(() => useRowsData());
  
      await waitFor(() =>
        expect(result.current).toEqual(null)
      )
     
    })
  })
  