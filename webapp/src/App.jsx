import * as React from 'react';
import { useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
// import { ColorModeContext, useMode } from '../theme';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import NewRound from './components/NewRound/NewRound';
import { globalTheme } from './theme';
import RoundView from './components/RoundView/RoundView';


export default function App () {

  const [isSidebar, setIsSidebar] = useState(true);
  return (

       <ThemeProvider theme={globalTheme}>
        <React.Fragment>
          <div className='app'>
            {/* <Sidebar isSidebar={isSidebar}/> */}
            <main className='content'>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Login/>} />
                  <Route path='/dashboard' element={<Layout/>} />
                  <Route path='/signup' element={<Signup/>} />
                  <Route path='/addround' element={<NewRound/>}/>
                  <Route path='/round/:rid' element={<RoundView/>}/>
                </Routes>
              </BrowserRouter>
            </main>
          </div>
        </React.Fragment>
       </ThemeProvider>
  )
}
