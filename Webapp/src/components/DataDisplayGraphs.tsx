import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
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

export const CircleGauge = ({waterIntake, suggestedWaterIntake}: {waterIntake: number; suggestedWaterIntake: number}) => {

    var leftMargin: number = 12.5

    if (waterIntake < 10)
        leftMargin = 13.5
    if (waterIntake >= 10 && waterIntake < 100)
        leftMargin = 12.5
    if (waterIntake >= 100 && waterIntake < 1000)
        leftMargin = 11.5
    if (waterIntake >= 1000)
        leftMargin = 10.5

    return (
        <>
            <Box sx={{ position: 'absolute' }}>
                <Typography
                    fontWeight={600}
                    fontSize={26}
                    color='white'
                    sx={{
                        mt: 4.4,
                        ml: leftMargin
                    }}
                >
                    {waterIntake}
                </Typography>
            </Box>
            <Gauge
                value={waterIntake / suggestedWaterIntake * 100}
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

export const MyGauge = ({intake, suggestedIntake}: {calorieIntake: number; suggestedCalorieIntake: number}) => {

    let displayText: string = 'Normal'
    let angle: number = 0

    if (intake === 0) {
        displayText = 'No Data'
        angle = 0
    }
    else if (intake / suggestedIntake * 100 < 30) {
        displayText = 'Too little'
        angle = intake / (suggestedIntake / 100)
    }
    else if (intake / suggestedIntake * 100 > 100) {
        displayText = 'Excess'
        angle = 100
    } else {
        displayText = 'Normal'
        angle = intake / (suggestedIntake / 100)
    }

    return (
        <Gauge
            cornerRadius="50%"
            value={angle} // normal 4000 >= heartrate >= 0
            startAngle={-90}
            endAngle={90}
            text={displayText}
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
