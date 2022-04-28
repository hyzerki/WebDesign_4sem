import React from 'react';
import './App.css';
import Notes from './Notes';
import StudentInfo from './StudentInfo';
import StudentInfoHandler from './StudentInfoHandler';

function App() {
  return (
    <React.Fragment>
      <StudentInfo render={dataContext => (
        <StudentInfoHandler dataContext={dataContext} />
      )} />
      <Notes/>
    </React.Fragment>
  );
}

export default App;