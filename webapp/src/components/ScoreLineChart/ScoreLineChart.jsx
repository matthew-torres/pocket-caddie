import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import '../../index.css'
import useRowsData from '../../retrieveRoundData';
import { ThemeProvider, useTheme} from '@mui/material';
import { globalTheme } from '../../theme';

export default function ScoreLineChart() {

    const rows = useRowsData(0)
    const theme = useTheme();

    const transformedData = rows.map((row) => ({
      date: new Date(row.date).toLocaleDateString(), // Convert date to a readable format
      score: row.score,
    }));

    console.log(rows)
    return (
      <ThemeProvider theme={globalTheme}>
        <React.Fragment>
            <ResponsiveContainer width="95%" height="80%">
            <LineChart
              width={500}
              height={300}
              data={transformedData.slice(-10)}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} tickCount={4} interval={2} />
              <YAxis domain={['dataMin', 'dataMax']}/>
              <Tooltip />
              <Legend />
              <Line type="linear" dataKey="score" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
              {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
        <h5 style={{ color: theme.palette.text.secondary}}> Scores to Date </h5>
    </ThemeProvider>
    );
}