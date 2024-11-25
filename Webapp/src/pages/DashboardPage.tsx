import { useState, useEffect, useRef } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import Slider from '@mui/material/Slider';
import { BarChart } from '@mui/x-charts/BarChart';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import { Paper, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
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

function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
        const timeout = setTimeout(() => {
            const daysInMonth = date.daysInMonth();
            const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

            resolve({ daysToHighlight });
        }, 500);

        signal.onabort = () => {
            clearTimeout(timeout);
            reject(new DOMException('aborted', 'AbortError'));
        };
    });
}

const initialValue = dayjs('2024-11-18');

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
        !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '🌚' : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}


const DataCard = ({ color, children = null }) => {
    return (
        <Box
            sx={{
                width: '25%',
                height: 200,
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
                        borderRadius: 5
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
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
                        borderRadius: 5
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
        <Gauge
            value={60}
            cornerRadius="50%"
            text={'1.25'}
            sx={(theme) => ({
                margin: 'auto',
                width: '60%',
                height: '60%',
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 25,
                    color: theme.palette.common.white,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#FFFFFF',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                },
            })}
        />

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


export const DashDetail = () => {
    const [seriesNb, setSeriesNb] = useState(2);
    const [itemNb, setItemNb] = useState(1);
    const [suggestion, setSuggestion] = useState('eat more apple and orange')
    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };
    const handleSeriesNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setSeriesNb(newValue);
    };

    const requestAbortController = useRef<AbortController | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    const fetchHighlightedDays = (date: Dayjs) => {
        const controller = new AbortController();
        fakeFetch(date, {
            signal: controller.signal,
        })
            .then(({ daysToHighlight }) => {
                setHighlightedDays(daysToHighlight);
                setIsLoading(false);
            })
            .catch((error) => {
                // ignore the error if it's caused by `controller.abort`
                if (error.name !== 'AbortError') {
                    throw error;
                }
            });

        requestAbortController.current = controller;
    };

    useEffect(() => {
        fetchHighlightedDays(initialValue);
        // abort request on unmount
        return () => requestAbortController.current?.abort();
    }, []);

    const handleMonthChange = (date: Dayjs) => {
        if (requestAbortController.current) {
            // make sure that you are aborting useless requests
            // because it is possible to switch between months pretty quickly
            requestAbortController.current.abort();
        }

        setIsLoading(true);
        setHighlightedDays([]);
        fetchHighlightedDays(date);
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
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                <Typography variant='h5'>suggestions</Typography>
                <TextField sx={{ width: '100%' }} multiline rows={4} disabled value={suggestion} />
                <Box>
                    <Typography variant='h4'>Workout hour</Typography>
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'] }]}
                        height={300}
                        series={series
                            .slice(0, seriesNb)
                            .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}

                    />
                    <Typography id="input-item-number" gutterBottom>
                        Number of Week Days
                    </Typography>
                    <Slider
                        value={itemNb}
                        onChange={handleItemNbChange}
                        valueLabelDisplay="auto"
                        min={1}
                        max={7}
                        aria-labelledby="input-item-number"
                    />
                    <Typography id="input-series-number" gutterBottom>
                        Show Last Week
                    </Typography>
                    <Switch defaultChecked onChange={() => setSeriesNb(3 - seriesNb)} />
                </Box>
            </Box>
            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                <Timeline position="alternate">
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            9:30 am
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot>
                                <FastfoodIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Eat
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            variant="body2"
                            color="text.secondary"
                        >
                            10:00 am
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary">
                                <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Code
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            variant="body2"
                            color="text.secondary"
                        >
                            10:00 pm
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineConnector />
                            <TimelineDot color="primary" variant="outlined">
                                <HotelIcon />
                            </TimelineDot>
                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Sleep
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            <TimelineDot color="secondary">
                                <RepeatIcon />
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent sx={{ py: '12px', px: 2 }}>
                            <Typography variant="h6" component="span">
                                Repeat
                            </Typography>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        defaultValue={initialValue}
                        loading={isLoading}
                        onMonthChange={handleMonthChange}
                        renderLoading={() => <DayCalendarSkeleton />}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays,
                            } as any,
                        }}
                    />
                </LocalizationProvider>

            </Box>
        </Box >
    )


}


const DashoboardPage = () => {
    const [seriesNb, setSeriesNb] = useState(2);
    const [itemNb, setItemNb] = useState(1);
    const [suggestion, setSuggestion] = useState('eat more apple and orange')
    const handleItemNbChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue !== 'number') {
            return;
        }
        setItemNb(newValue);
    };
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
                    <DataCard color={'#30b6b5'}>
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
                        <Typography variant='h6' sx={{ ml: 2 }}>Workout hour</Typography>
                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'] }]}
                            height={150}
                            series={series
                                .slice(0, seriesNb)
                                .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}

                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography id="input-item-number" gutterBottom sx={{ ml: 2, mr: 2 }} >
                                Week Day
                            </Typography>
                            <Slider
                                value={itemNb}
                                onChange={handleItemNbChange}
                                valueLabelDisplay="auto"
                                min={1}
                                max={7}
                                aria-labelledby="input-item-number"
                            />
                            <Typography id="input-series-number" gutterBottom sx={{ ml: 2 }} >
                                Last Week
                            </Typography>
                            <Switch defaultChecked onChange={() => setSeriesNb(3 - seriesNb)} />
                        </Box>


                    </GraphCard>
                    <GraphCard color={'#FFFFFF'}>
                        <Typography variant='h6' sx={{ml: 2}}>Progress</Typography>
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
export default DashoboardPage;