import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
//import useStyles from "./styles";
import useRowsData from '../../retrieveRoundData';

//const classes = useStyles();
const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'date', headerName: 'Date', width: 200, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'course', headerName: 'Course', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'score', headerName: 'Score', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'duration', headerName: 'Duration (hours)', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130, headerClassName: 'white-header', cellClassName: 'white-text' },
  ];

export default function DataTable() {

    const rows = useRowsData(11);

    return (
    <React.Fragment>
      <div id='user-round-table' style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          
          //className={classes.root}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </React.Fragment>
    );
}