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
import { TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';

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


const OldDashoboardPage = () => {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#111111'}}>
            <MyAppbar />
            <DashDetail />
        </Box>
    )

}
export default OldDashoboardPage;