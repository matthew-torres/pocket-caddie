import MockAdapter from 'axios-mock-adapter'; // Library for mocking axios requests
import useRowsData from './retrieveRoundMetaData';
import instance from './axios_instance';
import { waitFor, renderHook} from '@testing-library/react';


describe('Round Metadata: useRowData hook', () => {
    it('fetches rows data successfully', async () => {
        const mockResponse = {
            "holes": [
                {
                    "HID": 1,
                    "RID": 1,
                    "UID": 1,
                    "HoleNumber": 1,
                    "Par": 4,
                    "GIR": true,
                    "FairwayHit": true,
                    "Putts": 2,
                    "Score": 4
                },
                {
                    "HID": 2,
                    "RID": 1,
                    "UID": 1,
                    "HoleNumber": 2,
                    "Par": 3,
                    "GIR": true,
                    "FairwayHit": false,
                    "Putts": 2,
                    "Score": 4
                }
            ]
        }

        const mockAxios = new MockAdapter(instance);
        mockAxios.onGet("api/round/1/holes").reply(200, mockResponse);
        const {result} = renderHook(() => useRowsData(1));

        await waitFor(() =>
            expect(result.current).toEqual(
                [
                    {
                        "GIR": true, 
                        "fairwayHit": true, 
                        "hid": 1, 
                        "holeNumber": 1, 
                        "par": 4, 
                        "putts": 2, 
                        "score": 4
                    }, 
                    {
                        "GIR": true, 
                        "fairwayHit": false, 
                        "hid": 2, 
                        "holeNumber": 2,
                        "par": 3, 
                        "putts": 2, 
                        "score": 4
                    }]
            )
        )
    })
})


describe('Round Metadata: useRowsData unsuccessful query', () => {
    it('returns empty array if no user is found', async () => {
      const mockAxiosError = new MockAdapter(instance);
      mockAxiosError.onGet("api/round/1/holes").reply(404); // Simulate a 404 error
  
      // Call the custom hook
  
      const {result} = renderHook(() => useRowsData(1));
  
      await waitFor(() =>
        expect(result.current).toEqual([])
      )
     
    })
  })
