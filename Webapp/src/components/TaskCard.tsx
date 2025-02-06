import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { ITask } from "../interfaces";
import useLocalStorage from '../utils/useLocalStorage';


const TaskCard = ({ item }: {item: ITask}) => {
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
            <CardActionArea onClick={() => { navigate('/detail') }}>
                <Box id={'display_caption'} sx={{ m: 0.5 }}>
                    <Typography fontSize={16} fontWeight={600}>{item.name}</Typography>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1 }}>{item.taskCreateTime}</Typography>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1, ml: 1 }}>{item.taskDeadline}</Typography>

                    </Box>
                </Box>
            </CardActionArea>
        </Paper>
    )
}

export default TaskCard