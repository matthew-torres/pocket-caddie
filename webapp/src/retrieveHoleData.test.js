import {renderHook, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import useRowsDataHoles from './retrieveHoleData';
import instance from './axios_instance';

describe('useRowsDataHoles hook', () => {
    it('fetches rows data sucessfully', async () => {
        const mockResponse = {
            holes: [
            {
                "HID": 1,
                "RID": 1,
                "UID": 1,
                "HoleNumber": 1,
                "Par": 3,
                "GIR": true,
                "FairwayHit": true,
                "Putts": 1,
                "Score": 3
            },
            {
                "HID": 2,
                "RID": 2,
                "UID": 2,
                "HoleNumber": 2,
                "Par": 4,
                "GIR": true,
                "FairwayHit": false,
                "Putts": 2,
                "Score": 4
            }
            
            ]
        }

        const mockAxios = new MockAdapter(instance);
        mockAxios.onGet("api/round/holes").reply(200,mockResponse);

        const {result} = renderHook(() => useRowsDataHoles());

        await waitFor(() =>
            expect(result.current).toEqual(
                {3: 3, 4: 4, 5: NaN}
            )
        )
    });
})