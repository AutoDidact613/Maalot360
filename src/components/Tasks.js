import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet, useNavigate } from "react-router";
import { getAllHW_tasks } from '../features/hw_tasks/lecturer/hw_taskApi';
import { useDispatch } from 'react-redux';
import { initTask } from '../features/hw_tasks/lecturer/taskSlice';

const Tasks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {


    getAllHW_tasks().then(data => {
      console.log(data);
      dispatch(initTask(data));
    }).catch(e => {
      console.log(e);
      alert("שגיאת שרת. מתנצלים. נסה מאוחר יותר.");
    })



  }, [])

  return (
    <div>
      <h1>Tasks</h1>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Maalot 360
          </Typography>
          <Button
            color="inherit"
            // sx={{ fontWeight: location.pathname === '/lecturer' ? 'bold' : 'normal' }}
            onClick={() => navigate('lecturer')}
          >
            מרצה
          </Button>
          <Button
            color="inherit"
            // sx={{ fontWeight: location.pathname === '/student' ? 'bold' : 'normal' }}
            onClick={() => navigate('student')}
          >
            משתלמת
          </Button>
        </Toolbar>
      </AppBar>


      <Outlet />
    </div>
  );
};

export default Tasks;