import Typography from '@mui/material/Typography';
import FullScreenImage from '../components/FullScreenImage';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AppContext } from '../main';
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const internetRegisterUser = async (TaskType: string, TaskName: string, Deadline: string, navigate) => {
    const url = 'http://localhost:8000/api/task'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            TaskType: TaskType,
            TaskName: TaskName,
            Deadline: Deadline
        })
    })

    if (!response.ok) {
        throw "error"
    }

    const data = await response.json()
    if (data.status == 'success') {
        navigate('/task')
    } else {
        alert(data.status)
    }

    console.log(response.json())
}

export const TaskInfo = () => {
    const { email, setEmail } = useContext(AppContext)
    const [taskType, setTaskType] = useState('')
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadline] = useState('')


    const [taskNameError, setUsernameError] = useState(false)
    const [deadlineError, setPasswordError] = useState(false)


    const [taskNameHelper, setUsernameHelper] = useState('')
    const [deadlineHelper, setPasswordHelper] = useState('')


    const navigate = useNavigate()

    const handleRegister = () => {
        setUsernameError(false)
        setPasswordError(false)

        setUsernameHelper('')
        setPasswordHelper('')


        if (taskName.length === 0) {
            setUsernameError(true)
            setUsernameHelper('Username cannot be empty.')
        }
         

        internetRegisterUser(taskName, deadline, email, navigate)

    };
    const handleChange = (event: SelectChangeEvent) => {
        setTaskType(event.target.value);
    };
    return (
        <>
            <FullScreenImage />
            <Box sx={{
                position: 'relative',
                top: 135,
                color: 'white',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
                width: 350,
                height: 450,
                margin: 'auto',
                border: '1px solid rgba(200, 200, 200, 0.4)',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant='h4' sx={{ mt: 2, mb: 2 }}>New Task</Typography>
                <FormControl variant="standard" sx={{ m: 5, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={taskType}
                        onChange={handleChange}
                        label="Type"
                    >
                        <MenuItem>Strength training</MenuItem>
                        <MenuItem>Cardio / Aerobic</MenuItem>
                        <MenuItem>Stretches</MenuItem>
                        <MenuItem>Gerneral / Others</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="outlined-required"
                    label="Task name"
                    sx={{ height: 100, width: 250 }}
                    value={taskName}
                    error={taskNameError}
                    helperText={taskNameHelper}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </Box>
        </>

    )

}

const CreateTaskPage = () => {
    return (
        <TaskInfo />
    )
}

export default CreateTaskPage