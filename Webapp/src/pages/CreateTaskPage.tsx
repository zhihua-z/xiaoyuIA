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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Button } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import useLocalStorage from '../utils/useLocalStorage';
import { ITask } from '../interfaces';
import { createNewTask } from '../utils/internetUtils';


export const TaskInfo = () => {
    const [username, setUsername] = useLocalStorage("username", "")
    const [taskType, setTaskType] = useState('')
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadline] = useState<Dayjs | null>(dayjs(Date()))

    const [taskNameError, setTaskNameError] = useState(false)
    const [deadlineError, setDeadlineError] = useState(false)

    const [taskNameHelper, setTaskNameHelper] = useState('')
    const [deadlineHelper, setDeadlineHelper] = useState('')

    const navigate = useNavigate()

    const handleRegister = () => {
        setTaskNameError(false)
        setDeadlineError(false)

        setTaskNameHelper('')
        setDeadlineHelper('')

        // validate error
        if (taskName.length === 0) {
            setTaskNameError(true)
            setTaskNameHelper('Task name cannot be empty.')
        }
        if (deadline === null || deadline.toString().length === 0) {
            setDeadlineError(true)
            setDeadlineHelper('Task name cannot be empty.')
        }


        const task: ITask = {
            TaskType: taskType,
            TaskName: taskName,
            TaskUser: username,
            TaskCreateTime: Date(),
            TaskDeadline: deadline === null ? "" : deadline.format('YYYY-MM-DD')
        }


        createNewTask(task, navigate)


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
                        <MenuItem value={'strength'}>Strength training</MenuItem>
                        <MenuItem value={'cardio'}>Cardio / Aerobic</MenuItem>
                        <MenuItem value={'stretches'}>Stretches</MenuItem>
                        <MenuItem value={'general'}>Gerneral / Others</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    id="outlined-required"
                    label="Task name"
                    sx={{ height: 100, width: 200 }}
                    value={taskName}
                    error={taskNameError}
                    helperText={taskNameHelper}
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField']}>
                        <DateField
                            label="Choose Deadline"
                            format='YYYY-MM-DD'
                            value={deadline}
                            onChange={(newValue) => setDeadline(newValue)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button onClick={handleRegister} sx={{ mt: 2 }}>
                    Create
                </Button >
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