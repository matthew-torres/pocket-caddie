import React, { useState, useEffect, PureComponent } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import './index.css'

const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'date', headerName: 'Date', width: 200, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'course', headerName: 'Course', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'score', headerName: 'Score', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'duration', headerName: 'Duration (hours)', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
  ];

export default function DataTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/user/rounds/11')
        .then(response => {
            const mappedRows = response.data.rounds.map(round => ({
                id: round.ID,
                date: round.Date,
                course: round.Course,
                score: round.Score,
                duration: round.Duration,
                weatherCond: round.WeatherCond,
              }));
              setRows(mappedRows);
        })
        .catch(error => {
            console.error(error);
        })
    }, []);

    function calculateAverageScore(data) {
      if (data.length === 0) {
        return 0; // Return 0 if there are no data entries
      }
    
      const sum = data.reduce((total, entry) => total + entry.score, 0);
      const average = sum / data.length;
      return average;
    }

    const avgScore = calculateAverageScore(rows)
    console.log(avgScore)

    return (
    <React.Fragment>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <div style={{ height: 300, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <BarChart
          width={700}
          height={300}
          data={rows.slice(-5)}
          margin={{
            top: 5,
            right: 15,
            left: 15,
            bottom: 5,
          }}
          barGap={1}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" fontSize={10} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="score" fill="#8884d8" barSize={50} />
          <ReferenceLine y={avgScore} stroke="red" /*label={avgScore.toPrecision(4)}*/ strokeDasharray="5 5" position="end"/>
        </BarChart>
      </div>
      <h2>Average Score: {avgScore.toPrecision(4)}</h2>
    </React.Fragment>
    );
}