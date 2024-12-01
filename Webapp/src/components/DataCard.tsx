import Box from '@mui/material/Box';

const DataCard = ({ color, children } : {color: string, children: any}) => {
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

export default DataCard;