import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { globalTheme } from '../../theme';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import useRowsData from '../../retrieveRoundMetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import CreateHole from "../CreateHole/CreateHole";
import Navbar from "../../global/Navbar";


const columns = [
  { field: 'holeNumber', headerName: 'Hole Number', width: 130 },
  { field: 'par', headerName: 'Par', width: 13 },

  {
    field: 'fairwayHit',
    headerName: 'Fairway Hit',
    width: 130,
    renderCell: (params) => (
      <span>{params.value ? 'Yes' : 'No'}</span>
    ),
  },
  {
    field: 'GIR',
    headerName: 'GIR',
    width: 100,
    renderCell: (params) => (
      <span>{params.value ? 'Yes' : 'No'}</span>
    ),
  },
  { field: 'putts', headerName: 'Putts', width: 13 },
  { field: 'score', headerName: 'Score', width: 13 },
  
];

export default function RoundView() {
  const [roundData, setRoundData] = useState(null);
  const [selectionModel, setSelectionModel] = useState([]);
  const [open, setOpen] = useState(false);
  const { rid } = useParams();
  const theme = useTheme();
  let rows = useRowsData(rid);
  console.log(rows)

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/round/' + rid, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(response => {
        const roundData = response.data.round;
        setRoundData(roundData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleCellDoubleClick = (params) => {
    // Extract the desired data from the cell params, e.g., the row ID
    const rowId = params.id;
    window.location.href = '/round/'+rowId;
  };

  const handleDelete = (event) => {
    if (selectionModel.length === 1) {
      event.preventDefault();
      axios.delete('http://localhost:8080/api/round/' + rid + '/holes/'+selectionModel[0], {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
      .then(response => { 
          console.log(response)
          window.location.reload();
      })
      .catch(error => {
          console.log(error)
      })
  } else {
    axios.delete('http://localhost:8080/api/round/' + rid + '/holes', {data: { selectionModel: selectionModel },headers: {'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
      .then(response => { 
          console.log(response)
          window.location.reload();
      })
      .catch(error => {
          console.log(error)
      })
  };};

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <ThemeProvider theme={globalTheme}>
       {/* <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
    </div> */}

    <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
        <Typography variant="h1" component="h2">
            {roundData && roundData.Course}
        </Typography>
        <div style = {{position: 'absolute', top: '100px', left: '0px'}}> 
        <Typography variant="h4" component="h4">
            Date: {roundData && moment(roundData.date).format('MM-DD-YYYY')}
        </Typography>
        </div>
        <div style = {{position: 'absolute', top: '140px', left: '0px'}}> 
        <Typography variant="h4" component="h4">
            Round Duration: {roundData && roundData.Duration}
        </Typography>
        </div>
        <div style = {{position: 'absolute', top: '180px', left: '0px'}}> 
        <Typography variant="h4" component="h4">
            Gross Score: {roundData && roundData.Score}
        </Typography>
        </div>
    </div>
<React.Fragment>
  <Box display="flex" flexDirection="column" height='100%' width="110%">
  {rows.length > 0 ? (
  <DataGrid
    rows={rows}
    columns={columns}
    getRowId={(row) => row.hid}
    onRowSelectionModelChange={(newSelection) => {
      console.log(selectionModel)
      setSelectionModel(newSelection);
    }}
    rowSelectionModel={selectionModel}
    onCellDoubleClick={handleCellDoubleClick}
    sx={{
      // boxShadow: 2,
      // border: 2,
      // borderColor: 'primary.light',
      color: theme.palette.text.secondary,
      
      '& .MuiDataGrid-cell:hover': {
        color: 'primary.main',
      },
    }}

    initialState={{
      pagination: {
        paginationModel: { page: 0, pageSize: 5 },
      },
    }}
    pageSizeOptions={[5, 10]}
    checkboxSelection
  />
) : (       
    <Typography variant="h4" component="h4">
        No holes added for round.
    </Typography>
)}

        <Box display="flex" justifyContent="flex-start">
            <IconButton type="submit" variant='outlined' onClick={handleDelete} color="primary"><DeleteIcon/></IconButton>
            <IconButton type="submit" variant='outlined' onClick={handleAdd} color="primary"><AddIcon/></IconButton>
        </Box>
    </Box>
        <Dialog open={open} onClose={handleClose} PaperProps={{sx: {backgroundColor: theme.palette.background.default }}}>
            <CreateHole/>
        </Dialog>
    </React.Fragment>
    </ThemeProvider>
  );
}


// const columns = [
//   { field: 'holeNumber', headerName: 'Hole Number', width: 130 },
//   { field: 'par', headerName: 'Par', width: 13 },
// ];


// export default function RoundView() {
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [roundData, setRoundData] = useState(null);
//   const [selectionModel, setSelectionModel] = useState([]);
//   const [open, setOpen] = useState(false);
//   const { rid } = useParams();
//   const theme = useTheme();
//   let rows = useRowsData(rid);

//   useEffect(() => {
//     axios
//       .get('http://localhost:8080/api/round/' + rid, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem('token')}`,
//         },
//       })
//       .then(response => {
//         const roundData = response.data.round;
//         setRoundData(roundData);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }, []);
//   const handleRowClick = (rowId) => {
//     if (expandedRows.includes(rowId)) {
//       setExpandedRows((prevExpandedRows) =>
//         prevExpandedRows.filter((id) => id !== rowId)
//       );
//     } else {
//       setExpandedRows((prevExpandedRows) => [...prevExpandedRows, rowId]);
//     }
//   };

//   const getRowClassName = (params) =>
//     expandedRows.includes(params.id) ? 'expanded-row' : '';

//   const renderCellContent = (params) => {
//     const isExpanded = expandedRows.includes(params.id);

//     return (
//         <div
//         className={`cell-content ${isExpanded ? 'expanded' : ''}`}
//         onClick={() => handleRowClick(params.id)}
//       >
//         {params.colDef.field === 'selection' && (
//           <input
//             type="checkbox"
//             checked={selectedRows.includes(params.id)}
//             onChange={() => handleRowSelection(params.row)}
//           />
//         )}
//         {params.value}
//         {isExpanded && (
//           <div className="expanded-content">{params.row.description}</div>
//         )}
//       </div>
//     );
//   };

//   const handleCellDoubleClick = (params) => {
//     // Extract the desired data from the cell params, e.g., the row ID
//     const rowId = params.id;
//     window.location.href = '/round/'+rowId;
//   };

//   const handleDelete = (event) => {
//     if (selectionModel.length === 1) {
//       event.preventDefault();
//       axios.delete('http://localhost:8080/api/round/'+selectionModel[0], {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
//       .then(response => { 
//           console.log(response)
//           window.location.reload();
//       })
//       .catch(error => {
//           console.log(error)
//       })
//   } else {
//     axios.delete('http://localhost:8080/api/rounds', {data: { selectionModel: selectionModel },headers: {'Content-Type': 'application/json', Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
//       .then(response => { 
//           console.log(response)
          
//           window.location.reload();
//       })
//       .catch(error => {
//           console.log(error)
//       })
//   };};

//   const handleAdd = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   return (
//     <ThemeProvider theme={globalTheme}>
//     <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
//         <Typography variant="h1" component="h2">
//             {roundData && roundData.Course}
//         </Typography>
//         <div style = {{position: 'absolute', top: '100px', left: '0px'}}> 
//         <Typography variant="h4" component="h4">
//             Date: {roundData && moment(roundData.date).format('MM-DD-YYYY')}
//         </Typography>
//         </div>
//         <div style = {{position: 'absolute', top: '140px', left: '0px'}}> 
//         <Typography variant="h4" component="h4">
//             Round Duration: {roundData && roundData.Duration}
//         </Typography>
//         </div>
//         <div style = {{position: 'absolute', top: '180px', left: '0px'}}> 
//         <Typography variant="h4" component="h4">
//             Gross Score: {roundData && roundData.Score}
//         </Typography>
//         </div>
//     </div>
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns.map((column) => ({
//           ...column,
//           renderCell: renderCellContent,
//         }))}
//         getRowId={(row) => row.hid}
//         getRowClassName={getRowClassName}
//       />
//     </div>
//     </ThemeProvider>
//   );
// }


