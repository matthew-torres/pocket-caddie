import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../index.css'
import { MenuItem, Button, ThemeProvider, useTheme} from '@mui/material';
import { useLocation } from 'react-router-dom';


const weatherConditions = [
    {value: 'Clear'},{value: 'Fair'}, {value: 'Windy'}, {value: 'Extreme Wind'}, {value: 'Light Rain'}, {value: 'Rain'}, {value: 'Heavy Rain'}
]

export default function CreateRound() {

    const url = import.meta.env.VITE_API_URL
    const [success, setSuccess] = useState(false);
    const theme = useTheme();

    const [formData, setFormData] = useState({
        // add uid to request based on user
        Course: '',
        Score: 0,
        Duration: 0.0,
        WeatherCond: 'Clear',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;

        if (name === 'UID' || name === 'Score') {
          parsedValue = parseInt(value);
          if (isNaN(parsedValue)) {
            parsedValue = ''; // Set to empty string if parsing fails
          }
        } else if (name === 'Duration') {
          parsedValue = parseFloat(value);
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
        event.preventDefault();
        console.log(formData); // JSON object with the form data, make axios request to api
        console.log(formData.Duration)
        axios.post(url+'api/round/newround', formData, {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
        .then(response => { 
            console.log(response)
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
              id="filled-course"
              name="Course"
              label="Course"
              variant="filled"
              value={formData.Course}
              onChange={handleChange}
            />
            <TextField
              required
              id="filled-score"
              name="Score"
              type="number"
              label="Score"
              variant="filled"
              value={formData.Score}
              onChange={handleChange}
            />
            <TextField
              select
              id="filled-weatherCond"
              label="Weather Condition"
              name="WeatherCond"
              variant="filled"
              value={formData.WeatherCond}
              onChange={handleChange}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      backgroundColor: theme.palette.background.default, // Set the background color of the dropdown menu
                    },
                  },
                  sx: {
                    '& .Mui-selected': {
                      backgroundColor: theme.palette.primary.main, // Set the background color of the selected MenuItem
                      color: '#transparent', // Set the text color of the selected MenuItem
                    },
                  },
                },
                sx: {
                  textAlign: 'left',
                }
              }}
            >
                {weatherConditions.map((cond) => (
                    <MenuItem key={cond.value} value={cond.value}> 
                        {cond.value}
                    </MenuItem>
                )
                )}
            </TextField>
            <TextField
              id="filled-duration"
              name="Duration"
              type="number"
              label="Duration (hours)"
              variant='filled'
              value={formData.Duration}
              onChange={handleChange}
              />
        </div>
            <Button type="submit" variant='outlined' onClick={handleSubmit} color="primary">Add</Button>
            {success && <Alert severity="success" onClose={() => {setSuccess(false)}}>Round successfully added!</Alert>}
        </Box>
   // </ThemeProvider>
    )
}