import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    Button, 
    Box, 
    Typography, 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardActions, 
    Divider, 
    Chip, 
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import { deleteTask, updatedTask } from './taskSlice';

// פונקציה להמרת סוג המטלה לעברית
const getTaskTypeHebrew = (type) => {
    const types = {
        'quiz': 'בוחן',
        'assignment': 'מטלה',
        'project': 'פרויקט',
        'exam': 'מבחן',
        'Test': 'מבחן',
        'Homework': 'שיעורי בית',
        'Examiner': 'בוחן'
    };
    return types[type] || 'מטלה';
};

// פונקציה להמרת סוג המטלה לצבע
const getTaskTypeColor = (type) => {
    const colors = {
        'quiz': 'info',
        'assignment': 'primary',
        'project': 'success',
        'exam': 'error',
        'Test': 'error',
        'Homework': 'primary',
        'Examiner': 'info'
    };
    return colors[type] || 'default';
};

// פונקציה להמרת סוג המטלה לאייקון
const getTaskTypeIcon = (type) => {
    const icons = {
        'quiz': <QuestionMarkIcon />,
        'assignment': <AssignmentIcon />,
        'project': <BookIcon />,
        'exam': <SchoolIcon />,
        'Test': <SchoolIcon />,
        'Homework': <AssignmentIcon />,
        'Examiner': <QuestionMarkIcon />
    };
    return icons[type] || <AssignmentIcon />;
};

const TaskList = () => {
    const { courseName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskSlice.tasks || []);
    
    // סינון המטלות לפי שם הקורס
    const filteredTasks = courseName 
        ? tasks.filter((task) => task.course === courseName)
        : tasks;

    // מצב לדיאלוג עריכה
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [editedTask, setEditedTask] = useState({
        name: '',
        desc: '',
        lessonId: '',
        finalDate: '',
        instructionsFile: '',
        type: '',
        course: ''
    });

    // פתיחת דיאלוג עריכה
    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditedTask({
            id: task.id,
            name: task.name,
            desc: task.desc,
            lessonId: task.lessonId,
            finalDate: task.finalDate,
            instructionsFile: task.instructionsFile,
            type: task.type,
            course: task.course
        });
        setEditDialogOpen(true);
    };

    // שמירת שינויים בעריכה
    const handleSaveEdit = () => {
        dispatch(updatedTask(editedTask));
        setEditDialogOpen(false);
    };

    // מחיקת מטלה
    const handleDeleteTask = (taskId) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק מטלה זו?')) {
            dispatch(deleteTask(taskId));
        }
    };

    // עדכון שדות בטופס העריכה
    const handleEditChange = (e) => {
        setEditedTask({
            ...editedTask,
            [e.target.name]: e.target.value
        });
    };

    // טיפול בהעלאת קובץ
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setEditedTask({
                ...editedTask,
                instructionsFile: e.target.files[0].name
            });
        }
    };

    const taskTypes = [
        { value: 'Test', label: 'מבחן' },
        { value: 'Homework', label: 'שיעורי בית' },
        { value: 'Examiner', label: 'בוחן' },
        { value: 'quiz', label: 'בוחן' },
        { value: 'assignment', label: 'מטלה' },
        { value: 'project', label: 'פרויקט' },
        { value: 'exam', label: 'מבחן' }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            {/* כותרת וכפתור הוספת מטלה */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 3, 
                    mb: 4, 
                    borderRadius: 2,
                    background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)'
                }}
            >
                <Box sx={{ textAlign: 'center' }}>
                    {courseName && (
                        <Typography 
                            variant="h4" 
                            gutterBottom 
                            sx={{ 
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                mb: 3
                            }}
                        >
                            מטלות עבור {courseName}
                        </Typography>
                    )}
                    
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => navigate(`/add-task/${courseName || ''}`)}
                        sx={{ 
                            py: 1.5, 
                            px: 4, 
                            borderRadius: 2,
                            fontSize: '1.1rem',
                            boxShadow: 3,
                            '& .MuiButton-startIcon': {
                                marginRight: '12px'
                            }
                        }}
                    >
                        הוסף מטלה חדשה
                    </Button>
                </Box>
            </Paper>

            {/* רשימת המטלות - 2 כרטיסיות בשורה */}
            <Grid container spacing={3}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Grid item xs={12} md={6} key={task.id}>
                            <Card 
                                elevation={4} 
                                sx={{ 
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 8
                                    }
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        bgcolor: 'primary.main', 
                                        color: 'white', 
                                        p: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >
                                    {getTaskTypeIcon(task.type)}
                                    <Typography variant="h5" component="h2" fontWeight="bold">
                                        {task.name}
                                    </Typography>
                                </Box>
                                
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box sx={{ mb: 2 }}>
                                        <Chip 
                                            label={getTaskTypeHebrew(task.type)} 
                                            color={getTaskTypeColor(task.type)}
                                            size="medium"
                                            icon={getTaskTypeIcon(task.type)}
                                            sx={{ fontWeight: 'bold', mb: 2 }}
                                        />
                                    </Box>
                                    
                                    <Typography variant="body1" color="text.secondary" paragraph>
                                        {task.desc}
                                    </Typography>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    מספר שיעור:
                                                </Typography>
                                                <Typography variant="body1">
                                                    {task.lessonId}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    תאריך סופי:
                                                </Typography>
                                                <Typography variant="body1">
                                                    {task.finalDate}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                        
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <Typography variant="subtitle1" fontWeight="bold" sx={{ minWidth: '120px' }}>
                                                    קובץ הוראות:
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <AttachFileIcon sx={{ mr: 1, color: 'primary.main' }} />
                                                    <Typography variant="body1">
                                                        {task.instructionsFile || "אין קובץ הוראות"}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                
                                <Divider />
                                
                                <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<EditIcon />}
                                            onClick={() => handleEditClick(task)}
                                            sx={{ 
                                                mr: 1,
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            ערוך
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteTask(task.id)}
                                            sx={{ 
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            מחק
                                        </Button>
                                    </Box>
                                    
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            startIcon={<QuestionMarkIcon />}
                                            onClick={() => navigate(`/add-questions/${task.name}/course/${task.course}`)}
                                            sx={{ 
                                                ml: 1,
                                                '& .MuiButton-startIcon': {
                                                    marginRight: '8px'
                                                }
                                            }}
                                        >
                                            שאלות
                                        </Button>
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <Typography variant="h6">
                                לא נמצאו מטלות לקורס זה. ניתן להוסיף מטלה חדשה באמצעות הכפתור למעלה.
                            </Typography>
                        </Paper>
                    </Grid>
                )}
            </Grid>

            {/* דיאלוג עריכת מטלה */}
            <Dialog 
                open={editDialogOpen} 
                onClose={() => setEditDialogOpen(false)}
                fullWidth
                maxWidth="md"
                dir="rtl"
            >
                <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
                    עריכת מטלה
                </DialogTitle>
                <DialogContent sx={{ p: 3, mt: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="שם המטלה"
                                name="name"
                                value={editedTask.name}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                label="קורס"
                                name="course"
                                value={editedTask.course}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="תיאור המטלה"
                                name="desc"
                                value={editedTask.desc}
                                onChange={handleEditChange}
                                variant="outlined"
                                multiline
                                rows={3}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="מספר שיעור"
                                name="lessonId"
                                value={editedTask.lessonId}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="תאריך סופי"
                                name="finalDate"
                                value={editedTask.finalDate}
                                onChange={handleEditChange}
                                variant="outlined"
                                type="date"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="קובץ הוראות"
                                name="instructionsFile"
                                value={editedTask.instructionsFile}
                                onChange={handleEditChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-label">סוג המטלה</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editedTask.type}
                                    onChange={handleEditChange}
                                    label="סוג המטלה"
                                    name="type"
                                >
                                    {taskTypes.map((type) => (
                                        <MenuItem key={type.value} value={type.value}>
                                            {type.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="primary">
                        בטל
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        שמור
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default TaskList;
