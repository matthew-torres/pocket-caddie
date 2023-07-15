import React, { useEffect, useState } from 'react';
import useRowsData from '../../retrieveRoundData';
import useUserRowsData from '../../retrieveUserData';
import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme} from '@mui/material';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { globalTheme } from '../../theme';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import axios from 'axios';



export default function UserInfo() {
    const [initUser, setInitUser] = useState(null);
    const [rounds, setRounds] = useState([]);
    const [isOpen, setOpenDialog] = useState(false)
    const [user, setUser] = useState(initUser); // Replace `initialUserState` with your initial user state value
    const theme = useTheme()
  
    useEffect(() => {
        const fetchInitUser = async () => {
            try {
              const response = await axios.get('http://localhost:8080/api/user', {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
              });
              if (response && response.data && response.data.user) {
                setUser(response.data.user);
              } else {
                console.error('Invalid response or missing user object.');
              }
            } catch (error) {
              console.error(error);
              setUser(null);
            }
          };
  
      const fetchRounds = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/user/rounds', {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          });
          const mappedRows = response.data.rounds.map((round) => ({
            id: round.ID,
            date: round.Date,
            course: round.Course,
            score: round.Score,
            duration: round.Duration,
            weatherCond: round.WeatherCond,
          }));
          setRounds(mappedRows);
        } catch (error) {
          console.error(error);
          setRounds([]);
        }
      };
  
  
      fetchInitUser();
      fetchRounds();
    }, []);

    function calculateAverageScore(data) {
        if (data.length === 0) {
          return 0; // Return 0 if there are no data entries
        }
      
        const sum = data.reduce((total, entry) => total + entry.score, 0);
        const average = sum / data.length;
        return average;
      }

    function handleEdit() {
       setOpenDialog(true)
    }

    function handleCloseEdit() {
        setOpenDialog(false)
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        let parsedValue = value;
      
        if (name === 'Handicap') {
          parsedValue = parseInt(value);
          if (isNaN(parsedValue)) {
            parsedValue = ''; // Set to empty string if parsing fails
          }
        }
      
        setUser((prevUser) => ({
          ...prevUser,
          Handicap: parsedValue,
        }));
      };
      

    return (
    <ThemeProvider theme={globalTheme}>
       {/* <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
    </div> */}
        <Typography variant="h5" component="h5" style={{ textAlign: 'left',  marginLeft: '20px', color: theme.palette.text.primary, marginTop:"10px", fontWeight: 'bold' }}>
            Hello, {user?.Firstname}
        </Typography>
        <Typography variant="h6" component="h6" style={{ textAlign: 'left', marginLeft: "20px", color: theme.palette.text.secondary}}>
            Handicap: {user?.Handicap}
            <IconButton type="submit" variant='outlined' onClick={handleEdit} color="primary" ><EditIcon/></IconButton>
        </Typography>
        <Typography variant="h6" component="h6" style={{ textAlign: 'left', marginLeft: "20px", color: theme.palette.text.secondary}}>
            Rounds: {rounds.length}
        </Typography>
        <Typography variant="h6" component="h6" style={{ textAlign: 'left', marginLeft: "20px", color: theme.palette.text.secondary}}>
            Average Score: {calculateAverageScore(rounds)}
        </Typography>
        <Box
            component="form"
            //onSubmit={handleSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch', height: "100px" },
            }}
            // noValidate
            autoComplete="off"
        >
        <Dialog open={isOpen} onClose={handleCloseEdit} PaperProps={{sx: {backgroundColor: theme.palette.background.default }}}>
            <TextField
                required
                id="filled-handicap"
                name="Handicap"
                label="Handicap"
                // variant="filled"
                value={user?.Handicap}
                onChange={handleChange}
                />
        </Dialog>
       </Box>
    </ThemeProvider>
);
}