import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { ITask } from "../interfaces";
import useLocalStorage from '../utils/useLocalStorage';
import { Button } from '@mui/material';
import { setTaskCompleted } from '../utils/internetUtils';


const TaskCard = ({ item, removeTaskFromList }: {item: ITask, removeTaskFromList: any}) => {
    const [deadline, setDeadline] = useLocalStorage("deadline", "")
    const navigate = useNavigate()

    return (
        <Paper
            square={false}
            elevation={1}
            sx={{
                width: '100%',
                mt: 0.5,
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            <Box id={'display_caption'} sx={{ m: 0.5 }}>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
                    <Typography fontSize={16} fontWeight={600}>{item.name}</Typography>
                    <Button onClick={() => {setTaskCompleted(item.id, removeTaskFromList)}}>Complete</Button>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
                    <Typography fontSize={12} fontWeight={300} sx={{ mt: 1 }}>{item.taskCreateTime}</Typography>
                    <Typography fontSize={12} fontWeight={300} sx={{ mt: 1, ml: 1 }}>{item.taskDeadline}</Typography>

                </Box>
            </Box>
        </Paper>
    )
}

export default TaskCard