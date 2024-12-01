import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import { BarChart } from '@mui/x-charts/BarChart';
import Switch from '@mui/material/Switch';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

import { runCardColor, waterCardColor, calorieCardColor, hearRateCardColor } from '../utils/colors';

import FullScreenImage from '../components/FullScreenImage';
import DataCard from '../components/DataCard';
import TaskCard from '../components/TaskCard';

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

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    width: 140,
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#FFFFFF',
    },
}));

const CircleGauge = () => {
    return (
        <>
            <Box sx={{ position: 'absolute' }}>
                <Typography
                    fontWeight={600}
                    fontSize={26}
                    color='white'
                    sx={{
                        mt: 4.4,
                        ml: 17
                    }}
                >
                    60
                </Typography>
            </Box>
            <Gauge
                value={60}
                cornerRadius="50%"
                text={''}
                sx={(theme) => ({
                    margin: 'auto',
                    width: '60%',
                    height: '60%',
                    // [`& .${gaugeClasses.valueText}`]: {
                    //     fontSize: 25,
                    //     color: theme.palette.common.white,
                    // },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#FFFFFF',
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                    },
                })}
            />
        </>


    )
}

const MyGauge = () => {
    return (
        <Gauge
            cornerRadius="50%"
            value={60}
            startAngle={-90}
            endAngle={90}
            text={"Normal"}
            sx={(theme) => ({
                width: '70%',
                height: '70%',
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 15,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#FFFFFF',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                },
                ml: 'auto',
                mr: 'auto',
            })}
        />
    )
}

const BasicLineChart = () => {
    return (
        <LineChart
            xAxis={[{ data: [60, 70, 80, 90, 100, 110] }]}
            series={[
                {
                    data: [100, 88, 70, 72, 90, 85],
                },
            ]}
            width={230}
            height={150}
            sx={{
                display: 'flex',
                mr: 5,
            }}
        />
    );
}


const TaskPage = () => {
    const [seriesNb, setSeriesNb] = useState(2);
    const [suggestion, setSuggestion] = useState('eat more apple and orange')

    const handleSeriesNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setSeriesNb(newValue);
    };
    const highlightScope = {
        highlight: 'series',
        fade: 'global',
    } as const;

    const series = [
        {
            label: 'This Week',
            data: [
                3, 10, 2, 7, 15, 10, 4
            ],

        },
        {
            label: 'Last Week',
            data: [
                2, 4, 13, 11, 8, 1, 5
            ],

        },


    ].map((s) => ({ ...s, highlightScope }));

    return (
        <>
            <FullScreenImage />
            <Box sx={{
                flexGrow: 1,
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(30px)',
                backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}>
                <MyAppbar currentTab={"task"} />

                {/* list of tasks */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '70%',
                        ml: 'auto',
                        mr: 'auto',
                        mt: 3,
                    }}
                >
                    <TaskCard color={hearRateCardColor}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 3, ml: 2 }}>
                            <MonitorHeartTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Heart Rates</Typography>
                            <Typography variant='h7' fontWeight={200} color='white' ml={10}>my task 123123</Typography>
                        </Box>

                    </TaskCard>

                </Box>
            </Box>
        </>
    )

}
export default TaskPage;