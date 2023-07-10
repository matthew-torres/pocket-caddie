import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useRowsData from '../../retrieveRoundData';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'date', headerName: 'Date', width: 200, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'course', headerName: 'Course', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'score', headerName: 'Score', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'duration', headerName: 'Duration (hours)', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
  ];

  
  export default function DataTable() {
    const theme = useTheme();
    const rows = useRowsData(0);
    const [selectionModel, setSelectionModel] = useState([]);
  
    return (
      <React.Fragment>
        <h1>hello</h1>
        <div id="user-round-table" style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            onSelectionModelChange={(newSelection) => {
              setSelectionModel(newSelection.selectionModel);
            }}
            selectionModel={selectionModel}
            hideFooterPagination
            checkboxSelection
          />
        </div>
        <div>
        {selectionModel.map((val) => (
          <h1>{val}</h1>
        ))}
        </div>
      </React.Fragment>
    );
  }
  