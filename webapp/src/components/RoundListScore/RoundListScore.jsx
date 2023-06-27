import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useRowsData from '../../retrieveRoundData';
import { Box } from '@mui/material';

//const classes = useStyles();
const columns = [
    { field: 'course', headerName: 'Course', width: 130},
    { field: 'score', headerName: 'Score', width: 13},
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130},
  ];

export default function RoundsListScore() {

    const rows = useRowsData(11);

    return (
    <React.Fragment>
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
    </React.Fragment>
    );
}