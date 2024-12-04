import Box from '@mui/material/Box';

const TaskCard = ({ color, children } : {color: string, children: any}) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: 75,
                margin: 'auto',
                borderRadius: 10
            }}
        >
            <Box sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box
                    sx={{
                        background: color,
                        height: '100%',
                        width: '98%',
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

export default TaskCard;