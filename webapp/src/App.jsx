import * as React from 'react';
import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
// import { ColorModeContext, useMode } from '../theme';
import Layout from './components/Layout/Layout';
import Sidebar from './global/Sidebar'

export default function App () {
  // const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
  
      // <ColorModeContext.Provider value={colorMode}>
        // <ThemeProvider theme={theme}>
        <React.Fragment>
          <div className='app'>
            <Sidebar isSidebar={isSidebar}/>
            <main className='content'>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Layout/>} />
                </Routes>
              </BrowserRouter>
            </main>
          </div>
        </React.Fragment>
        // </ThemeProvider>
      // </ColorModeContext.Provider>
  )
}
