import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../index.css'
import { MenuItem, Button, ThemeProvider, useTheme} from '@mui/material';
import { useParams } from 'react-router-dom';



const boolVals = [
    {value: true, label: 'True'}, {value: false, label: 'False'}
]

export default function CreateHole() {

    const url = import.meta.env.VITE_API_URL  
    const [success, setSuccess] = useState(false);
    const { rid } = useParams();
    const theme = useTheme();

    const [formData, setFormData] = useState({
        // add uid to request based on user
        HoleNumber: 0,
        Score: 0,
        Par: 0,
        GIR: false,
        FairwayHit: false,
        Putts: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;

        if (name === 'HoleNumber' || name === 'Score' || name === 'Par' || name === 'Putts') {
          parsedValue = parseInt(value);
          if (isNaN(parsedValue)) {
            parsedValue = ''; // Set to empty string if parsing fails
          }
        } 
        setFormData((prevData) => ({
          ...prevData,
          [name]: parsedValue,
        }));
      };   

    const handleSubmit = (event) => {
        event.preventDefault(); // JSON object with the form data, make axios request to api
        console.log(formData)
        axios.post(url+'api/round/'+ rid +'/newhole', formData, {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
        .then(response => { 
            setSuccess(true);
            window.location.reload();
        })
        .catch(error => {
            console.log(error)
        })
    };

    return (
      //<ThemeProvider theme={globalTheme}>
        <Box
            component="form"
            //onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <div>
            <TextField
              required
              id="filled-HoleNumber"
              name="HoleNumber"
              label="Hole Number"
              type='number'
              variant="filled"
              value={formData.holeNumber}
              onChange={handleChange}
            />
            <TextField
              required
              id="filled-Par"
              name="Par"
              type="number"
              label="Par"
              variant="filled"
              value={formData.par}
              onChange={handleChange}
            />
            <TextField
                required
                id="filled-GIR"
                label="GIR"
                name="GIR"
                variant="filled"
                type='bool'
                value={formData.GIR}
                onChange={handleChange}
                SelectProps={{
                    MenuProps: {
                    PaperProps: {
                        sx: {
                        backgroundColor: theme.palette.background.default,
                        },
                    },
                    sx: {
                        '& .Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: '#transparent',
                        },
                    },
                    },
                    sx: {
                    textAlign: 'left',
                    },
                }}
                select
                >
                {boolVals.map((cond) => (
                    <MenuItem key={String(cond.value)} value={cond.value}>
                    {cond.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
              required
              id="filled-FairwayHit"
              name="FairwayHit"
              type="bool"
              label="Fairway Hit"
              variant='filled'
              value={formData.FairwayHit}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                PaperProps: {
                    sx: {
                    backgroundColor: theme.palette.background.default,
                    },
                },
                sx: {
                    '& .Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: '#transparent',
                    },
                },
                },
                sx: {
                textAlign: 'left',
                },
            }}
            select
            >
            {boolVals.map((cond) => (
                <MenuItem key={String(cond.value)} value={cond.value}>
                {cond.label}
                </MenuItem>
            ))}

              </TextField>
            <TextField
              required
              id="filled-Putts"
              name="Putts"
              type="number"
              label="Putts"
              variant='filled'
              value={formData.Putts}
              onChange={handleChange}
              />
            <TextField
              required
              id="filled-Score"
              name="Score"
              type="number"
              label="Score"
              variant='filled'
              value={formData.Score}
              onChange={handleChange}
              />
        </div>
            <Button type="submit" variant='outlined' onClick={handleSubmit} color="primary">Add</Button>
            {success && <Alert severity="success" onClose={() => {setSuccess(false)}}>Round successfully added!</Alert>}
        </Box>
   // </ThemeProvider>
    )
}