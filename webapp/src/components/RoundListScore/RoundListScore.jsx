import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useRowsData from '../../retrieveRoundData';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateRound from "../NewRound/NewRound";
import Dialog from '@mui/material/Dialog';
import { globalTheme } from '../../theme';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';

//const classes = useStyles();
const columns = [
    { field: 'course', headerName: 'Course', width: 130},
    { field: 'score', headerName: 'Score', width: 13},
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130},
  ];

export default function RoundsListScore() {

    const theme = useTheme();
    // const history = useHistory();
    let rows = useRowsData(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDelete = (event) => {
      if (selectionModel.length === 1) {
        event.preventDefault();
        console.log(sessionStorage.getItem('token'))
        axios.delete('http://localhost:8080/api/round/'+selectionModel[0], {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
        .then(response => { 
            console.log(response)
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    } else {
      axios.delete('http://localhost:8080/api/rounds', {data: { selectionModel: selectionModel },headers: {'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
        .then(response => { 
            console.log(response)
            
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    };};

    const handleCellDoubleClick = (params) => {
      // Extract the desired data from the cell params, e.g., the row ID
      const rowId = params.id;
      window.location.href = '/round/'+rowId;
    };

    const handleAdd = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
    <ThemeProvider theme={globalTheme}>
      <React.Fragment>
        {/* <Box display="flex" flexDirection="column" height='100%' width="150%"> */}
          <DataGrid
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newSelection) => {
              console.log(selectionModel)
              setSelectionModel(newSelection);
            }}
            rowSelectionModel={selectionModel}
            onCellDoubleClick={handleCellDoubleClick}
          
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
          <Box display="flex" justifyContent="flex-start">
            <IconButton type="submit" variant='outlined' onClick={handleDelete} color="primary"><DeleteIcon/></IconButton>
            <IconButton type="submit" variant='outlined' onClick={handleAdd} color="primary"><AddIcon/></IconButton>
          </Box>
        {/* </Box> */}
        <Dialog open={open} onClose={handleClose} PaperProps={{sx: {backgroundColor: theme.palette.background.default }}}>
          <CreateRound/>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
    );
}