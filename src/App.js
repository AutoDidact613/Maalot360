
import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { SelectCours } from './featuers/lecturer/SelectCours';
import StudentTasks from './featuers/student/StudentTasks';
import { AddTask } from './featuers/lecturer/AddTask';
import StudentQuestions from './featuers/student/StudentQuestions';
import SubmissionHistory from './featuers/student/SubmissionHistory';
import QuestionsList from './featuers/lecturer/QuestionsList';

import TaskList from './featuers/lecturer/TaskList';
import AddQuestions from './featuers/lecturer/AddQuestions';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Maalot 360
                </Typography>
                {/* <Link /> */}
                <Button
                    color="inherit"
                    sx={{ fontWeight: location.pathname === '/lecturer' ? 'bold' : 'normal' }}
                  onClick={()=>{navigate('/lecturer')}}
               >
                    מרצה
                </Button>
                {/* <Button
                    color="inherit"
                    component={Link}
                    to="/lecturer"
                    sx={{ fontWeight: location.pathname === '/lecturer' ? 'bold' : 'normal' }}
                >
                    מרצה
                </Button> */}
                <Button
                    color="inherit"
                    component={Link}
                    to="/student"
                    sx={{ fontWeight: location.pathname === '/student' ? 'bold' : 'normal' }}
                >
                    משתלמת
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/add-questions/:taskName/course/:courseName" element={<AddQuestions />} />
                <Route path="/task/:taskId/questions-list" element={<QuestionsList />} />
                <Route path="/task/:taskId/questions" element={<StudentQuestions />} />
                <Route path="/add-task/:courseName" element={<AddTask />} />
                <Route path="/TaskList/:courseName" element={<TaskList />} />
                <Route path="/student" element={<StudentTasks />} />
                <Route path="/StudentTasks" element={<StudentTasks />} />
                <Route path="/submission-history" element={<SubmissionHistory />} />
                <Route path="/lecturer" element={<SelectCours />} />
                {/* <Route path="/add-task" element={<AddTask />} /> נתיב חדש עבור AddTask */}
                <Route path="*" element={<SelectCours />} />
                <Route path="/" element={<SelectCours />} />
            </Routes>
        </div>
    );
}