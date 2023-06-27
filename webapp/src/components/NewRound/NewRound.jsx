import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../index.css'
import { MenuItem, Button } from '@mui/material';

const weatherConditions = [
    {value: 'Clear'},{value: 'Fair'}, {value: 'Windy'}, {value: 'Extreme Wind'}, {value: 'Light Rain'}, {value: 'Rain'}, {value: 'Heavy Rain'}
]

export default function CreateRound() {

    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        // add uid to request based on user
        UID: 0,
        Course: '',
        Score: 0,
        Duration: 0,
        WeatherCond: 'Clear',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
        if (name === 'UID' || name === 'Score' || name === 'Duration') {
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
        event.preventDefault();
        console.log(formData); // JSON object with the form data, make axios request to api
        axios.post('http://localhost:8080/newround', formData, {headers: {'Content-Type': 'application/json'}})
        .then(response => { 
            console.log(response)
            setSuccess(true);
        })
        .catch(error => {
            console.log(error)
        })
    };

    return (
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
          id="filled-uid"
          name="UID"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          label="UID"
          variant="standard"
          value={formData.UID}
          onChange={handleChange}
        />
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
          defaultValue="Fair"
          variant="filled"
          value={formData.WeatherCond}
          onChange={handleChange}
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
          value={formData.Duration}
          onChange={handleChange}
          />
    </div>
        <Button type="submit" variant='outlined' onClick={handleSubmit} color='primary'>Add</Button>
        {success && <Alert severity="success">Round successfully added!</Alert>}
    </Box>
    )
}