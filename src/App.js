import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Courses from './components/Courses';
import Students from './components/Students';
import Teachers from './components/Teachers';
import Events from './components/Events';
import Tasks from './components/Tasks';
import Attendance from './components/Attendance';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Users from './components/Users';
import Todos from './components/Todos';
import Items from './components/Items';

//childern of tasks  >>>
import { SelectCours } from './features/hw_tasks/lecturer/SelectCours';
import StudentTasks from './features/hw_tasks/student/StudentTasks';
import { AddTask } from './features/hw_tasks/lecturer/AddTask';
import StudentQuestions from './features/hw_tasks/student/StudentQuestions';
import SubmissionHistory from './features/hw_tasks/student/SubmissionHistory';
import QuestionsList from './features/hw_tasks/lecturer/QuestionsList';
import TaskList from './features/hw_tasks/lecturer/TaskList';
import AddQuestions from './features/hw_tasks/lecturer/AddQuestions';
//childern of tasks  <<<

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/events" element={<Events />} />
        <Route path="/tasks" element={<Tasks />} >

          <Route path="add-questions/:taskName/course/:courseName" element={<AddQuestions />} />
          <Route path="task/:taskId/questions-list" element={<QuestionsList />} />
          <Route path="task/:taskId/questions" element={<StudentQuestions />} />
          <Route path="add-task/:courseName" element={<AddTask />} />
          <Route path="TaskList/:courseName" element={<TaskList />} />
          <Route path="student" element={<StudentTasks />} />
          <Route path="StudentTasks" element={<StudentTasks />} />
          <Route path="submission-history" element={<SubmissionHistory />} />
          <Route path="lecturer" element={<SelectCours />} />
          <Route path="*" element={<SelectCours />} />
          <Route path="" element={<SelectCours />} />

        </Route>
        <Route path="/todos" element={<Todos />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
  );
}

export default App;