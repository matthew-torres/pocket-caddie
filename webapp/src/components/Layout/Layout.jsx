import React from "react";
import DataTable from "../RoundsList/RoundsList";
import ScoreBarChart from "../ScoreBarChart/ScoreBarChart";
import CreateRound from "../NewRound/NewRound";
import { Box, Typography } from "@mui/material";
import { ThemeProvider, useTheme } from '@mui/material';
import RoundsListScore from "../RoundListScore/RoundListScore";
import { globalTheme } from "../../theme";


export default function Layout() {

    if (sessionStorage.getItem('token') === null) {
      window.location.href = '/';
      return
    } 

    const theme = useTheme();

    return (
        <ThemeProvider theme={globalTheme}>
            <Box m="20px">
                {/*Header*/}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" color={theme.palette.primary.main} fontWeight="bold" sx={{ m: "0 0 5px 0"}}>Dashboard</Typography>
                </Box>
                {/*GRID & CHARTS*/}
                <Box display="grid" gridTemplateColumns="repeat(12,1fr)" gridAutoRows="300px" gap="10px">
                    <Box gridColumn="span 4" display="flex" alignItems="center" justifyContent="center">   
                        <RoundsListScore></RoundsListScore>
                    </Box>
                    <Box gridColumn="span 4" display='flex' alignItems="center" justifyContent="center">
                        <ScoreBarChart></ScoreBarChart>
                    </Box>
                    <Box gridColumn="span 4" display='flex' alignItems="center" justifyContent="center">
                        <CreateRound></CreateRound>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}