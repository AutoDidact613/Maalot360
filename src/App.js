
export default App;

import logo from './logo.svg';
import './App.css';
import MeetingsPage from './features/Nava/Meetings/Meetings';
import Meetings from './features/Nava/Meetings/Meetings';
import  TaskList  from './featuers/lecturer/TaskList';
import { AddTask } from './featuers/lecturer/AddTask';
import { SelectCours } from './featuers/lecturer/SelectCours';


function App() {
  return (
    <div className="App">
      {/* <h1>Maalot 360</h1> */}

      <h1>Maalot 360</h1>
      <Meetings courseId="102"/>
      <TaskList/>
        {/* <AddTask/> */}
        <SelectCours />
      </div>
  );
}

export default App;
