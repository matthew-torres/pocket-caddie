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
import useRowsData from '../../retrieveBagData';
import { Box, IconButton,Typography } from '@mui/material';
import { useState } from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CreateClub from "../CreateClub/CreateClub";
import Dialog from '@mui/material/Dialog';
import { globalTheme } from '../../theme';


const columns = [

    { field: 'type', headerName: 'Type', width: 130},
    { field: 'brand', headerName: 'Brand', width: 13},
    { field: 'name', headerName: 'Name', width: 130},
  ];

export default function MyBag() {

    const url = process.env.VITE_API_URL;
    const theme = useTheme();
    let rows = useRowsData();
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleDelete = (event) => {
        if (selectionModel.length === 1) {
          event.preventDefault();
          axios.delete(url+'api/user/club/'+selectionModel[0], {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
          .then(response => { 
              console.log(response)
              window.location.reload();
          })
          .catch(error => {
              console.log(error)
          })
      } else {
        axios.delete(url+'api/user/clubs', {data: { selectionModel: selectionModel },headers: {'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
          .then(response => { 
              console.log(response)
              window.location.reload();
          })
          .catch(error => {
              console.log(error)
          })
      };};
  
    
    return (
    <ThemeProvider theme={globalTheme}>
        <React.Fragment>
            <Typography variant="h8" color={theme.palette.text.primary} fontWeight="bold" sx={{justifyContent: "left", m: "0 0 10px 0" }}>
                My Bag 
            </Typography>
            <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.default }}>
                <Table stickyHeader>
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell key={column.field} sx={{ fontWeight: 'bold' }}>{column.headerName}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.clid}>
                        {columns.map((column) => (
                            <TableCell key={column.field} sx={{ color: theme.palette.text.secondary }}>
                            {row[column.headerName]}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                <Dialog open={open} onClose={handleClose} PaperProps={{sx: {backgroundColor: theme.palette.background.default }}}>
                    <CreateClub/>
                </Dialog>
            </TableContainer>
                <Box display="flex" justifyContent="flex-start">
                    <IconButton type="submit" variant='outlined' onClick={handleDelete} color="primary"><DeleteIcon/></IconButton>
                    <IconButton type="submit" variant='outlined' onClick={handleAdd} color="primary"><AddIcon/></IconButton>
                </Box>
        </React.Fragment>
    </ThemeProvider>
      );
}