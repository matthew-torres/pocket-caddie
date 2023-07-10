import React, { useState, useEffect } from 'react';
import DataTable from "../RoundsList/RoundsList";
import ScoreBarChart from "../ScoreBarChart/ScoreBarChart";
import CreateRound from "../NewRound/NewRound";
import { Box, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from '@mui/material';
import RoundsListScore from "../RoundListScore/RoundListScore";
import { globalTheme } from "../../theme";
import Alert from '@mui/material/Alert';



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
          <div>
            {success && <Alert severity="success" onClose={() => {setSuccess(false)}}>Round successfully added!</Alert>}
          </div>
          <div style={{ position: 'absolute', top: '100px', left: '200px' }}>              
            <Typography variant="h2" color={theme.palette.text.secondary} fontWeight="bold" sx={{ m: "0 0 5px 0"}}>Dashboard</Typography>
          </div>
          <Box m="20px">
                {/*Header*/}
                {/*GRID & CHARTS*/}
                <Box display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="300px" gap="10px">
                    <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">   
                        <RoundsListScore></RoundsListScore>
                    </Box>
                    <Box gridColumn="span 4" display='flex' alignItems="center" justifyContent="center">
                        <ScoreBarChart></ScoreBarChart>
                    </Box>
                    {/* / this commented out brings some type of error regarding formatting*/ }
                    {/* <Box gridColumn="span 4" display='flex' alignItems="center" justifyContent="center">
                        <CreateRound></CreateRound>
                    </Box> */} 

                </Box>
            </Box>
        </ThemeProvider>
    )
}