import instance from './axios_instance';

const useRowsData = async (userId) => {

  const url = process.env.VITE_API_URL

  try {
    const response = await instance.get(url+'api/user/rounds');
    const rows = response.data.rounds.map(round => ({
        id: round.ID,
        date: round.Date,
        course: round.Course,
        score: round.Score,
        duration: round.Duration,
        weatherCond: round.WeatherCond,
      }));
      return rows

  } catch (error) {
    console.log(error);
    return []

  }
};
  
//       .then(response => {
//         const mappedRows = response.data.rounds.map(round => ({
//           id: round.ID,
//           date: round.Date,
//           course: round.Course,
//           score: round.Score,
//           duration: round.Duration,
//           weatherCond: round.WeatherCond,
//         }));
//         setRows(mappedRows);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, [userId]);

//   return rows;
// };

export default useRowsData;
