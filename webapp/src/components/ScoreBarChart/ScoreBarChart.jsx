import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import '../../index.css'
import useRowsData from '../../retrieveRoundData';
import { ThemeProvider, useTheme} from '@mui/material';
import { globalTheme } from '../../theme';

export default function ScoreBarChart() {

    const rows = useRowsData(11)
    const theme = useTheme();
    function calculateAverageScore(data) {
        if (data.length === 0) {
          return 0; // Return 0 if there are no data entries
        }
      
        const sum = data.reduce((total, entry) => total + entry.score, 0);
        const average = sum / data.length;
        return average;
      }
  
      const avgScore = calculateAverageScore(rows)
      console.log(avgScore)
    return (
      <ThemeProvider theme={globalTheme}>
        <React.Fragment>
            <ResponsiveContainer width="95%" height="80%">
              <BarChart
              // width={700}
              // height={300}
              data={rows.slice(-5)}
              margin={{
                  top: 5,
                  right: 15,
                  left: 15,
                  bottom: 5,
              }}
              barGap={1}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" fontSize={10} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill={theme.palette.primary.main} barSize={50} />
              <ReferenceLine y={avgScore} stroke="red" /*label={avgScore.toPrecision(4)}*/ strokeDasharray="5 5" position="end"/>
              </BarChart>
            </ResponsiveContainer>
            <h5>Average Score: {avgScore.toPrecision(4)}</h5>
        </React.Fragment>
    </ThemeProvider>
    );
}