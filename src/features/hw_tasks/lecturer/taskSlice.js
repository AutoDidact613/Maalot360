import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks:null,
    status: 'idle',
    error: null
};

const taskSlice = createSlice({
    name: 'taskSlice', // שינוי השם ל-taskSlice
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = action.payload;
            task.id = Date.now().toString();
            task.isSubmitted = false;
            state.tasks.push(task);
        },
        updatedTask: (state, action) => {
            const updatedTask = action.payload;
            const taskIndex = state.tasks.findIndex(x => x.id === updatedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTask };
            }
        },
        deleteTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
        },
        addQuestions: (state, action) => {
            const { taskId, questions } = action.payload;
            const task = state.tasks.find(t => t.id === taskId);
            if (task) {
                task.questions = questions;
            }
        },
        submitTask: (state, action) => {
            const taskId = action.payload;
            const task = state.tasks.find((t) => t.id === taskId);
            if (task) {
                task.isSubmitted = true; // תיקון: שינוי מ-submitted ל-isSubmitted
            }
        }
    }
});

export const { addTask, updatedTask, deleteTask, addQuestions, submitTask } = taskSlice.actions;

// תיקון הסלקטורים
export const getTaskById = (state, taskId) => {
    return state.taskSlice.tasks.find(task => task.id === taskId);
};

export const getTasksByCourse = (state, courseName) => {
    return state.taskSlice.tasks.filter(task => task.course === courseName);
};

// הוספת סלקטור חדש לקבלת כל המטלות
export const getAllTasks = (state) => state.taskSlice.tasks || [];

export default taskSlice.reducer;
