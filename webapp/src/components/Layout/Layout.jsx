import React from "react";
import DataTable from "../RoundsList/RoundsList";
import ScoreBarChart from "../ScoreBarChart/ScoreBarChart";
import CreateRound from "../NewRound/NewRound";
import { Box, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material';
import RoundsListScore from "../RoundListScore/RoundListScore";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7e57c2',
    },
    secondary: {
      main: '#6d696a',
    },
    background: {
      default: '#161515',
    },
    text: {
      primary: 'rgba(249,244,244,0.87)',
    },
  },
})

export default function Layout() {
    return (
        <ThemeProvider theme={theme}>
            <Box m="20px">
                {/*Header*/}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h2" color='primary' fontWeight="bold" sx={{ m: "0 0 5px 0"}}>Dashboard</Typography>
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