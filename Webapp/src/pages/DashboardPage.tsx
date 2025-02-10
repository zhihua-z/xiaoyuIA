import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import { BarChart } from '@mui/x-charts/BarChart';
import Switch from '@mui/material/Switch';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

import FullScreenImage from '../components/FullScreenImage';
import DataCard from '../components/DataCard';
import { runCardColor, waterCardColor, calorieCardColor, hearRateCardColor } from '../utils/colors';
import { getMePageData, getProgressData, getWorkoutData } from '../utils/internetUtils';
import useLocalStorage from '../utils/useLocalStorage';
import GraphCard from '../components/GraphCard';
import { BorderLinearProgress, CircleGauge, MyGauge } from '../components/DataDisplayGraphs';

const DashboardPage = () => {
    const [seriesNb, setSeriesNb] = useState(2);
    const [suggestion, setSuggestion] = useState('eat more apple and orange')

    const [data, setData] = useState({})
    const [username, setUsername] = useLocalStorage("username", "")

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

    const [series, setSeries] = useState([
        {
            label: 'This Week',
            data: [
                0, 0, 0, 0, 0, 0, 0
            ],

        },
        {
            label: 'Last Week',
            data: [
                0, 0, 0, 0, 0, 0, 0
            ],

        },
    ])

    const [progressData, setProgressData] = useState([
        { id: 0, value: 2, label: 'Strength' },
        { id: 1, value: 3, label: 'Cardio' },
        { id: 2, value: 5, label: 'Streches' },
        { id: 2, value: 0, label: 'General' },
    ])


    useEffect(() => {
        getMePageData(username, setData)
        getWorkoutData(username, setSeries)
        getProgressData(username, setProgressData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                <MyAppbar currentTab={"dashboard"} />

                {/* graphs */}
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
                    <DataCard color={runCardColor}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <DirectionsRunIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Run distance: {data.total_run_distance_km ?? 0} km</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, ml: 3 }}>
                            <Typography variant='h5' fontWeight={700} color='white'>{data.total_run_distance_km ?? 0} </Typography>
                            <Typography variant='h5' fontWeight={200} color='white' sx={{ml: 1}}>km</Typography>
                        </Box>
                        <BorderLinearProgress
                            variant="determinate"
                            value={(data.total_run_distance_km ?? 0) / 5.0 * 100 > 100 ? 100 : (data.total_run_distance_km ?? 0) / 5.0 * 100}
                            sx={{
                                mt: 4, ml: 'auto',
                                mr: 'auto',
                            }} />
                    </DataCard>
                    <DataCard color={'#fe7445'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <WaterDropTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Water: {data.total_water_intake_ml ?? 0} ml</Typography>
                        </Box>
                        <CircleGauge waterIntake={data.total_water_intake_ml ?? 0} suggestedWaterIntake={2000}/>
                    </DataCard>

                    <DataCard color={'#fa5b7f'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <LocalFireDepartmentTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Calories: {data.total_calorie_intake_kcal ?? 0} kcal</Typography>
                        </Box>
                        <MyGauge intake={data.total_calorie_intake_kcal ?? 0} suggestedIntake={2000}/>
                    </DataCard>
                    
                    <DataCard color={'#8675fe'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <MonitorHeartTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Heart Rates: {data.average_heart_rate ?? 0} bpm</Typography>
                        </Box>
                        <MyGauge intake={data.average_heart_rate ?? 0} suggestedIntake={180}/>

                    </DataCard>
                </Box>


                {/* stats */}
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
                    <GraphCard color={'#FFFFFF'}>
                        <Typography fontWeight={600} fontSize={24} sx={{ ml: 2 }}>Workout hour</Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'] }]}
                            height={150}
                            series={series
                                .map((s) => ({ ...s, highlightScope }))
                                .slice(0, seriesNb)
                                .map((s) => ({ ...s, data: s.data.slice(0, 7) }))}

                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography id="input-series-number" gutterBottom sx={{ ml: 2 }} >
                                Show Last Week
                            </Typography>
                            <Switch defaultChecked size='small' onChange={() => setSeriesNb(3 - seriesNb)} />
                        </Box>


                    </GraphCard>
                    <GraphCard color={'#FFFFFF'}>
                        <Typography fontWeight={600} fontSize={24} sx={{ ml: 2 }}>Progress</Typography>
                        <Box sx={{ display: 'flex', ml: 5 }}>
                            <PieChart
                                series={[
                                    {
                                        data: progressData,
                                        innerRadius: 30,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        cx: 10
                                    },
                                ]}
                                width={200}
                                height={200}
                            />

                        </Box>

                    </GraphCard>

                </Box>
            </Box>
        </>
    )

}
export default DashboardPage;