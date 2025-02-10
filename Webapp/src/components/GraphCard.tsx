import Box from "@mui/material/Box"

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

export default GraphCard