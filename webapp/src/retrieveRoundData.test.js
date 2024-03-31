
import MockAdapter from 'axios-mock-adapter'; // Library for mocking axios requests
import useRowsData from './retrieveRoundData';
import instance from './axios_instance';



describe('useRowsData hook',  () => {
  it('fetches rows data successfully', async () => {
    // Mock API response
    const mockResponse = {
        rounds: [
          { ID: 1, UID: 1, Course: 'C1', Score: 'S1', Duration: 1, WeatherCond: "W1", Date: '1-1-1' },
          { ID: 2, UID: 2, Course: 'C2', Score: 'S2', Duration: 2, WeatherCond: "W2", Date: '2-2-2' }
        ]
    };

    // Mock axios
    const url = process.env.VITE_API_URL;

    const mockAxios = new MockAdapter(instance);
    mockAxios.onGet(url+"api/user/rounds").reply(200, mockResponse);

    const result = await useRowsData();
  
    expect(result).toEqual([
      { id: 1, date: '1-1-1' , course: 'C1', score: 'S1', duration: 1, weatherCond: "W1"},
      { id: 2, date: '2-2-2', course: 'C2', score: 'S2', duration: 2, weatherCond: "W2"}
    ]);
  });

describe('useRowsData unsuccessful query', () => {
  it('returns empty array on unsucessful query', async () => {
    const url = process.env.VITE_API_URL;
    const mockAxiosError = new MockAdapter(instance);
    mockAxiosError.onGet(url + "api/user/rounds").reply(404); // Simulate a 404 error

    // Call the custom hook
    const result = await useRowsData();

    // Assert that the result is an empty array or any other expected behavior when an error occurs
    expect(result).toEqual([]); 
  })
})

});
