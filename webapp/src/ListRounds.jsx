import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
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
    // const [rounds, setRounds] = useState([]);
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

    return (
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
    );
}