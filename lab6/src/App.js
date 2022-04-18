import './App.css';
import StudentInfo from './StudentInfo';
import StudentInfoHandler from './StudentInfoHandler';

function App() {
  return (
    <StudentInfo render={ dataContext => (
      <StudentInfoHandler dataContext={dataContext}/>
      )}/>
  );
}

export default App;