import * as React from 'react';
import { Box, Stack } from '@mui/material';



export const CalendarRow = ({ days, events }: { days: string[] }) => {
    return (

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {
                days.map((d, index) => {
                    return <Box sx={{ width: 50, textAlign: 'center' }} key={index}>
                        {d}
                    </Box>
                })
            }
        </Box>

    )
}

const Calendar: React.FC = () => {
    const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六'];

    // 得到今天是哪一号
    const now = new Date()

    // 怎么得到当前这个月份有多少天
    const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const lastDayOfThisMonth = new Date(firstDayOfNextMonth.getTime())
    lastDayOfThisMonth.setDate(firstDayOfNextMonth.getDate() - 1)

    // 怎么得到这个月的1号是星期几
    const dayOfWeek = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

    let dates: string[][] = [];
    let rowNumber = 0

    dates.push([])

    for (let i = 0; i < dayOfWeek; i++) {
        dates[rowNumber].push(' ')
    }

    for (let i = 0; i < lastDayOfThisMonth.getDate(); i++) {
        dates[rowNumber].push((i + 1).toString())

        if ((i + 1 + dayOfWeek) % 7 === 0) {
            rowNumber += 1
            dates.push([])
        }
    }

    while (dates[rowNumber].length < 7)
    {
        dates[rowNumber].push(' ')
    }



    console.log(dates)


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 800, ml: 'auto', mr: 'auto'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                {daysOfWeek.map((day) => (
                    <Box key={day} sx={{ width: 50, textAlign: 'center' }}>
                        {day}
                    </Box>
                ))}
            </Box>
            <Stack spacing={5} direction={"column"}>
                {
                    dates.map((days, rowNumber) => {
                        return <CalendarRow days={days} key={rowNumber} />
                    })
                }
            </Stack>
        </Box>
    );
};

export default Calendar;