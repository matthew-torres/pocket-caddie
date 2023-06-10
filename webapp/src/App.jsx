import * as React from 'react';
import './App.css'
import DataTable from './ListRounds';
import InsertTable from './NewRound';

export default function App () {
  return (
    <React.Fragment>
      <h1>hi</h1>
      <DataTable></DataTable>
      <InsertTable></InsertTable>
    </React.Fragment>
  )
}
