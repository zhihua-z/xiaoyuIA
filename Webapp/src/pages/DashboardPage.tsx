import { useState } from 'react'
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
            <Box sx={{position: 'absolute'}}>
                <Typography 
                    fontWeight={600} 
                    fontSize={26} 
                    color='white'
                    sx={{
                        mt: 4.4,
                        ml: 12.5
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


const DashboardPage = () => {
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
                            <Typography variant='h7' fontWeight={700} color='white'>Run distance</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, ml: 3 }}>
                            <Typography variant='h5' fontWeight={700} color='white'>250</Typography>
                            <Typography variant='h5' fontWeight={200} color='white'>km</Typography>
                        </Box>
                        <BorderLinearProgress
                            variant="determinate"
                            value={50}
                            sx={{
                                mt: 4, ml: 'auto',
                                mr: 'auto',
                            }} />
                    </DataCard>
                    <DataCard color={'#fe7445'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <WaterDropTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Water</Typography>
                        </Box>
                        <CircleGauge />

                    </DataCard>
                    <DataCard color={'#fa5b7f'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <LocalFireDepartmentTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Calories</Typography>
                        </Box>
                        <MyGauge />

                    </DataCard>
                    <DataCard color={'#8675fe'}>
                        <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                            <MonitorHeartTwoToneIcon />
                            <Typography variant='h7' fontWeight={700} color='white'>Heart Rates</Typography>
                        </Box>
                        <BasicLineChart />

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
                            xAxis={[{ scaleType: 'band', data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'] }]}
                            height={150}
                            series={series
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
                                        data: [
                                            { id: 0, value: 30, label: 'Lift Weight' },
                                            { id: 1, value: 15, label: 'Running' },
                                            { id: 2, value: 10, label: 'Streching' },
                                        ],
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

                {/* recommendation */}
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

                </Box>

            </Box>
        </>
    )

}
export default DashboardPage;