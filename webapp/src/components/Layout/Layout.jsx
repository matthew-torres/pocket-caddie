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
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
  
          <div style={{ marginTop: '100px', marginLeft: '200px' }}>
            {success && <Alert severity="success" onClose={() => { setSuccess(false) }}>Round successfully added!</Alert>}
          </div>
  
          <div style={{display:'flex', flexDirection: 'column', marginLeft: '-950px', marginTop: "-950px"}}>
            <Typography variant="h2" color={theme.palette.text.secondary} fontWeight="bold" sx={{ m: "0 0 5px 0" }}>Dashboard</Typography>
          </div>
          <Box flex={1} display="flex" flexDirection="column" alignItems="center" justifyContent="flex-start" p={5} mt={-4} ml={-4}>
      {/* Header */}
      {/* GRID & CHARTS */}
            <Box display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="300px" gap="10px">
              <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                <RoundsListScore></RoundsListScore>
              </Box>
              <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                <ScoreBarChart></ScoreBarChart>
              </Box>
              {/* <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">
                <CreateRound></CreateRound>
              </Box> */}
            </Box>
          </Box>
        </div>
      </ThemeProvider>
    );
    
}