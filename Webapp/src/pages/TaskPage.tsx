import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { runCardColor, waterCardColor, calorieCardColor, hearRateCardColor } from '../utils/colors';
import ScrollableScreenImage from '../components/ScrollableScreenImage';
import DataCard from '../components/DataCard';
import TaskCard from '../components/TaskCard';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { ITask } from '../interfaces';
import useLocalStorage from '../utils/useLocalStorage';

import { getListOfTasks } from '../utils/internetUtils';
import Calendar from '../components/Calendar';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
        ...theme.applyStyles('dark', {
            backgroundColor: '#30404d',
        })
    }
}))

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#d742f5',
    '&::before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});
function BpCheckbox(props: CheckboxProps) {
    return (
        <Checkbox
            sx={{ '&:hover': { bgcolor: 'transparent' } }}
            disableRipple
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            inputProps={{ 'aria-label': 'Checkbox demo' }}
            {...props}
        />
    );
}

const OpenIconSpeedDial = () => {
    const navigate = useNavigate()
    const actions = [
        { icon: <NoteAddIcon />, name: 'Add Task', onClick: () => navigate('/createtask') },
    ];
    return (
        <SpeedDial
            ariaLabel="SpeedDial openIcon example"
            sx={{ position: 'absolute', bottom: 16, right: 16, color: '#d742f5' }}
            icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    onClick={action.onClick}
                    icon={action.icon}
                    tooltipTitle={action.name}
                />
            ))}
        </SpeedDial>
    );
}

const GraphCard = ({ color, children = null }) => {
    return (
        <Box
            sx={{
                width: '50%',
                height: 250,
                margin: 'auto',
                borderRadius: 10
            }}
        >
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Box
                    sx={{
                        background: color,
                        height: '90%',
                        width: '90%',
                        margin: 'auto',
                        borderRadius: 5,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const TaskPage = () => {
    const [tasks, setTasks] = useState<ITask[]>([])
    const [username, setUsername] = useLocalStorage("username", "")

    // filter off the task with this ID, set tasks to new list
    const removeTaskFromList = (taskId: number) => {
        const leftovers = tasks.filter((task) => task.id !== taskId)
        setTasks(leftovers)
    }

    useEffect(()=>{
        getListOfTasks(username, setTasks)
    }, [])

    return (
        <>
            <ScrollableScreenImage />
            <MyAppbar currentTab={"task"} />
            <Calendar />

            {/* list of tasks */}
            <Box sx={{
                width: '70%',
                margin: 'auto'
            }}>
                {
                    tasks.map((item, index) => {
                        return <TaskCard key={index} item={item} removeTaskFromList={removeTaskFromList}/>
                    })
                }
                {/* <TaskCard color={hearRateCardColor}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, ml: 2 }}>
                        <MonitorHeartTwoToneIcon />
                        <Typography variant='h7' fontWeight={700} color='white'>Heart Rates</Typography>
                        <Typography variant='h7' fontWeight={200} color='white' ml={10}>my task 123123</Typography>
                        <Typography ml={10}>12/Nov/2024</Typography>
                        <BpCheckbox {...label} color="secondary" sx={{ ml: 10, mb: 5, color: '#605EA1' }} />
                    </Box>

                </TaskCard> */}
                
            </Box>
            <OpenIconSpeedDial />
        </>
    )

}
export default TaskPage;