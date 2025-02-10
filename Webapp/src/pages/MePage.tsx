import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import LocalFireDepartmentTwoToneIcon from '@mui/icons-material/LocalFireDepartmentTwoTone';
import MonitorHeartTwoToneIcon from '@mui/icons-material/MonitorHeartTwoTone';
import { LineChart } from '@mui/x-charts/LineChart';
import FullScreenImage from '../components/FullScreenImage';
import DataCard from '../components/DataCard';
import DataEntryCard from '../components/DataEntryCard';
import { getMePageData, postMePageData } from '../utils/internetUtils';
import useLocalStorage from '../utils/useLocalStorage';
import { calorieCardColor, hearRateCardColor, runCardColor, waterCardColor } from '../utils/colors';

import { BorderLinearProgress, CircleGauge, MyGauge } from '../components/DataDisplayGraphs';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

const MePage = () => {

    const [data, setData] = useState({})
    const [username, setUsername] = useLocalStorage("username", "")

    const [runDistance, setRunDistance] = useState(0)
    const [water, setWater] = useState(0)
    const [calorie, setCalorie] = useState(0)
    const [heartrate, setHeartRate] = useState(0)

    useEffect(() => {
        getMePageData(username, setData)
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
                        <CircleGauge waterIntake={data.total_water_intake_ml ?? 0} suggestedWaterIntake={2000} />
                    </DataCard>

                    <DataCard color={'#fa5b7f'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <LocalFireDepartmentTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Calories: {data.total_calorie_intake_kcal ?? 0} kcal</Typography>
                        </Box>
                        <MyGauge intake={data.total_calorie_intake_kcal ?? 0} suggestedIntake={2000} />
                    </DataCard>

                    <DataCard color={'#8675fe'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <MonitorHeartTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Heart Rates: {data.average_heart_rate ?? 0} bpm</Typography>
                        </Box>
                        <MyGauge intake={data.average_heart_rate ?? 0} suggestedIntake={180} />

                    </DataCard>
                </Box>




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
                    <DataEntryCard label={'Enter Run Distance'} value={runDistance} setter={setRunDistance} color={runCardColor} handler={() => {
                        postMePageData(username, setData, 'run', runDistance)
                        setRunDistance(0)
                    }} />
                    <DataEntryCard label={'Enter Water Intake'} value={water} setter={setWater} color={waterCardColor} handler={() => {
                        postMePageData(username, setData, 'water', water)
                        setWater(0)
                    }} />
                    <DataEntryCard label={'Enter Calorie Intake'} value={calorie} setter={setCalorie} color={calorieCardColor} handler={() => {
                        postMePageData(username, setData, 'calorie', calorie)
                        setCalorie(0)
                    }} />
                    <DataEntryCard label={'Enter Current Heart Rate'} value={heartrate} setter={setHeartRate} color={hearRateCardColor} handler={() => {
                        if (heartrate >= 0) {
                            postMePageData(username, setData, 'heartrate', heartrate)
                            setHeartRate(0)
                        } else {
                            alert('heartrate must be positive')
                            setHeartRate(0)
                        }
                    }} />
                </Box>
            </Box>
        </>
    )

}
export default MePage;