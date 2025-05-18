import './App.css';
import TaskList from './featuers/lecturer/TaskList';
import { SelectCours } from './featuers/lecturer/SelectCours';
import Meetings from './featuers/Nava/Meetings/Meetings';
import LearningSpace from './featuers/Nava/LearningSpace/LearningSpace'


function App() {



  return (
    <div className="App">
      
      <h1>Maalot 360</h1>
      <LearningSpace/>
      <Meetings courseId={"102"}></Meetings>
     
    </div>
  );
}

export default App;
