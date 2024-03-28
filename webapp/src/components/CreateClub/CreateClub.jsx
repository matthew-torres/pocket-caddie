import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import '../../index.css'
import { MenuItem, Button, ThemeProvider, useTheme} from '@mui/material';
import { useParams } from 'react-router-dom';



const boolVals = [
    {value: 'Driver', label: 'Driver'}, {value: "3 Wood", label: '3 Wood'}, {value: "5 Wood", label: '5 Wood'},
    {value: "7 Wood", label: '7 Wood'}, {value: "3 Hybrid", label: '3 Hybrid'}, {value: "4 Hybrid", label: '3 Hybrid'},
    {value: "2 Iron", label: '2 Iron'}, {value: "3 Iron", label: '3 Iron'}, {value: "4 Iron", label: '4 Iron'},
    {value: "5 Iron", label: '5 Iron'}, {value: "6 Iron", label: '6 Iron'}, {value: "7 Iron", label: '7 Iron'},
    {value: "8 Iron", label: '8 Iron'}, {value: "9 Iron", label: '9 Iron'}, {value: "Attack Wedge", label: 'Attack Wedge'},
    {value: "Gap Wedge", label: 'Gap Wedge'}, {value: "Sand Wedge", label: 'Sand Wedge'}, {value: "Lob Wedge", label: 'Lob Wedge'},
    {value: "Putter", label: 'Putter'}
]

export default function CreateBag() {

    const url = import.meta.env.VITE_API_URL
    const [success, setSuccess] = useState(false);
    const { rid } = useParams();
    const theme = useTheme();

    const [formData, setFormData] = useState({
        // add uid to request based on user
        Type: "",
        Brand: "",
        Name: "",
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
        axios.post(url+'api/user/club', formData, {headers: {'Content-Type': 'application/json',Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
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
              id="filled-Brand"
              name="Brand"
              label="Brand"
              variant="filled"
              value={formData.Brand}
              onChange={handleChange}
            />
            <TextField
              required
              id="filled-Name"
              name="Name"
              label="Name"
              variant="filled"
              value={formData.Name}
              onChange={handleChange}
            />
            <TextField
                required
                id="filled-Type"
                label="Type"
                name="Type"
                variant="filled"
                value={formData.Type}
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

            
        </div>
            <Button type="submit" variant='outlined' onClick={handleSubmit} color="primary">Add</Button>
            {success && <Alert severity="success" onClose={() => {setSuccess(false)}}>Round successfully added!</Alert>}
        </Box>
   // </ThemeProvider>
    )
}