import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { globalTheme } from '../../theme';

export default function Signup() {
    
      const [failure, setFailure] = useState(false);
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let userLogin = {
            email: data.get('email'),
            password: data.get('password'),
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            handicap: parseInt(data.get('handicap'))
        };

       axios.post('http://localhost:8080/newuser', userLogin,{headers: {'Content-Type': 'application/json'}})
       .then(response => { 
            console.log(response)
            // Storing the token in session storage
            sessionStorage.setItem('token', response.data["token"]);

            window.location.href = '/dashboard';

        })
        .catch(error => {
            setFailure(true);
            console.log(error)
        })

      };
    
      return (
        <ThemeProvider theme={globalTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 2, bgcolor: 'secondary.main'}}>
                <GolfCourseIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Registration
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoComplete="firstname"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lastname"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="handicap"
                  label="Handicap"
                  type="number"
                  name="handicap"
                  autoComplete="handicap"
                  autoFocus
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                {failure && <Alert severity="error">Email already exists</Alert>}
                <Grid container>
                  <Grid item xs>
                    <Link href="http://localhost:5173/" variant="body2">
                      Already a user?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }


