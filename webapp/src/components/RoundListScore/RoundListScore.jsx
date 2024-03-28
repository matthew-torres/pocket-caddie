import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Checkbox from '@mui/material/Checkbox';
import useRowsData from '../../retrieveRoundData';
import { Box, IconButton,Typography } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateRound from "../NewRound/NewRound";
import Dialog from '@mui/material/Dialog';
import { globalTheme } from '../../theme';
import axios from 'axios';
import moment from 'moment';
// import { useHistory } from 'react-router-dom';

//const classes = useStyles();
const columns = [
    { field: 'course', headerName: 'Course', width: 130},
    { field: 'score', headerName: 'Score', width: 13},
    { field: 'weatherCond', headerName: 'Weather Condition', width: 130},
    { field: 'date', headerName: 'Date', width: 200, val: (params) => params.value.toLocaleDateString()},
  ];

export default function RoundsListScore() {

    const url = import.meta.env.VITE_API_URL
    const theme = useTheme();
    // const history = useHistory();
    let rows = useRowsData(0);
    const [selectionModel, setSelectionModel] = useState([]);
    const [open, setOpen] = useState(false);

    const handleDelete = (event) => {
      if (selectionModel.length === 1) {
        event.preventDefault();
        console.log(sessionStorage.getItem('token'))
        axios.delete(url+'api/round/'+selectionModel[0], {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
        .then(response => { 
            console.log(response)
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    } else {
      axios.delete(url+'api/rounds', {data: { selectionModel: selectionModel },headers: {'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
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

    const isRowSelected = (rowId) => selectionModel.includes(rowId);
  
    const handleRowSelection = (rowId) => {
      const isSelected = isRowSelected(rowId);
      if (isSelected) {
        setSelectionModel(selectionModel.filter((id) => id !== rowId));
      } else {
        setSelectionModel([...selectionModel, rowId]);
      }
    }

    return (
    <ThemeProvider theme={globalTheme}>
      <React.Fragment>
        {/* <Box display="flex" flexDirection="column" height='100%' width="150%"> */}
      <Typography variant="h5" color={theme.palette.text.primary} fontWeight="bold" sx={{justifyContent: "left", m: "0 0 10px 0" }}>
        My Rounds 
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={rows.length > 0 && selectionModel.length === rows.length}
                  indeterminate={selectionModel.length > 0 && selectionModel.length < rows.length}
                  onChange={() => {
                    if (selectionModel.length === rows.length) {
                      setSelectionModel([]);
                    } else {
                      setSelectionModel(rows.map((row) => row.id));
                    }
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.field} sx={{ fontWeight: "bold" }}>{column.headerName} </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} selected={isRowSelected(row.id)} onClick={() => handleRowSelection(row.id)} onDoubleClick={() => handleCellDoubleClick(row)}>
                <TableCell padding="checkbox">
                  <Checkbox color="primary" checked={isRowSelected(row.id)} />
                </TableCell>
                {columns.map((column) => {
                  if (column.field === 'date') {
                    const formattedDate = moment(row.date).format('MM-DD-YYYY');
                    return <TableCell key={column.field} sx={{ color: theme.palette.text.secondary }}>{formattedDate} </TableCell>;
                  } else {
                    return <TableCell key={column.field} sx={{ color: theme.palette.text.secondary }}>{row[column.field]} </TableCell>;
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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