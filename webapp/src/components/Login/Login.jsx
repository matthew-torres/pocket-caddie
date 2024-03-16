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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { globalTheme } from '../../theme';



// const defaultTheme = createTheme();
export default function Login() {
    
      const [failure, setFailure] = useState(false);
      const theme = useTheme()
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let userLogin = {
            email: data.get('email'),
            password: data.get('password')
        };

       axios.post('http://localhost:8080/login', userLogin,{headers: {'Content-Type': 'application/json'}})
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
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" color={theme.palette.text.secondary}>
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="secondary"> </Checkbox>}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                    <Typography variant="body1" color={theme.palette.text.secondary}>
                      Sign In
                  </Typography>
                </Button>
                {failure && <Alert severity="error">Email or Password is incorrect</Alert>}
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }


