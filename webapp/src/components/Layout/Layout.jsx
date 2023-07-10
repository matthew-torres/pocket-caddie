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
              <Typography variant="h3" color={theme.palette.text.secondary} fontWeight="bold" sx={{ m: 'margin-left' }}>Dashboard</Typography>
            </div>

            {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                p: 5,
                mt: -4,
                ml: -4,
              }}
            > */}
              {/* Header */}
              {/* GRID & CHARTS */}
              <Box display="inline-grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="400px" gap="10px" justifyContent='left'>
                <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                  <RoundsListScore></RoundsListScore>
                </Box>
                <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                  <ScoreBarChart></ScoreBarChart>
                </Box>
                {/* <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                  <CreateRound></CreateRound>
                </Box> */}
                <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                  <ParScoreDist/>
                </Box>

              </Box>
            {/* </Box> */}
          </div>
        </ThemeProvider>

    );
    
    
}