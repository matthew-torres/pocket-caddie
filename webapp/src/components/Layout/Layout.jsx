import React, { useState, useEffect } from 'react';
import DataTable from "../RoundsList/RoundsList";
import ScoreBarChart from "../ScoreBarChart/ScoreBarChart";
import CreateRound from "../NewRound/NewRound";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { ThemeProvider, useTheme } from '@mui/material';
import RoundsListScore from "../RoundListScore/RoundListScore";
import { globalTheme } from "../../theme";
import Alert from '@mui/material/Alert';
import Navbar from "../../global/Navbar"
import ParScoreDist from '../ParScoreDist/ParScoreDist';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { height, margin } from '@mui/system';




export default function Layout() {

    if (sessionStorage.getItem('token') === null) {
      window.location.href = '/';
      return
    } 

    const theme = useTheme();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const isSuccess = searchParams.get('success');
      if (isSuccess === 'true') {
        setSuccess(true);
      }
    }, [location]);

    return (
      <ThemeProvider theme={globalTheme}>
          <div style={{ flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ marginTop: '100px', marginLeft: '200px' }}>
              {success && <Alert severity="success" onClose={() => { setSuccess(false) }}>Round successfully added!</Alert>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '-950px auto', marginTop: '-950px auto' }}>
              <Typography variant="h3" color={theme.palette.text.primary} fontWeight="bold" sx={{ m: 'margin-left' }}>Dashboard</Typography>
            </div>
              {/* Header */}
              {/* GRID & CHARTS */}
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} display='flex'>
              {/* RoundScoreList */}
              <Grid item xs={12} md={8} lg={9}>

                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                    width: 875,
                    background: theme.palette.background.default
                  }}
                >
                  <RoundsListScore/>
                </Paper>
              </Grid>
              {/* Avg score */}
              <Grid item xs={12} md={8} lg={5}>
              {/* <Grid item xs='true' md='true' lg='true'> */}
                <Paper
                  sx={{
                    p: -4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    width: 415,
                    background: theme.palette.background.default
                  }}
                >
                  <ScoreBarChart />
                </Paper>
              </Grid>
              {/* Average to Par */}
              <Grid item xs={12} md={8} lg={5}>
              {/* <Grid item xs='true' md='true' lg='true'> */}
                <Paper sx={{ p: -4, display: 'flex', flexDirection: 'column', height: 240, width: 415, background: theme.palette.background.default}}>
                  <ParScoreDist />
                </Paper>
              </Grid>
            </Grid>
          </Container>
            {/* </Box> */}
          </div>
        </ThemeProvider>

    );
    
    
}