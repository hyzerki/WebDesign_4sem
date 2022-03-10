import './App.css';
import React from 'react';
import Clock from './Clock';
import JobMenu from './JobMenu';

function App() {
  return (
    <React.Fragment>
      <Clock timezone="+3:00"/>
      <JobMenu/>
    </React.Fragment>
  );
}

export default App;
