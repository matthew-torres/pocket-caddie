import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer, Label } from 'recharts';
import '../../index.css'
import useRowsDataHoles from '../../retrieveHoleData';
import { ThemeProvider, Typography, useTheme} from '@mui/material';
import { globalTheme } from '../../theme';

export default function ParScoreDist() {
    const rows = useRowsDataHoles()
    const theme = useTheme();
    
    const data = Object.keys(rows).map((par) => ({
        par: "Par " + par,
        avg: rows[par],
      }));


    return (
      <ThemeProvider theme={globalTheme}>
        <React.Fragment>

            <ResponsiveContainer width="95%" height="80%">
              <BarChart
              data={data}
              margin={{
                  top: 5,
                  right: 15,
                  left: 15,
                  bottom: 5,
              }}
              label="Average by Par"
              barGap={1}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="par" fontSize={15} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avg" fill={theme.palette.primary.main} barSize={50} />
              <Label value="Average by Par" position="top" />
              </BarChart>
              
            </ResponsiveContainer>
            <h5 style={{ color: theme.palette.text.secondary, textAlign: 'center', margin:'0px'} }>Average to Par </h5>
        </React.Fragment>
    </ThemeProvider>
    );
}