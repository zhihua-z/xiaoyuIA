import Box from "@mui/material/Box"
import DataCard from "./DataCard"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"


const DataEntryCard = ({label, color, value, setter, handler}) => {
    return (
        <DataCard color={color}>
            <Box sx={{
                mt: 3,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography>{label}</Typography>
                <TextField
                    required
                    id="outlined-required"
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                />
                <Button sx={{ mt: 2, color: '#000000' }} onClick={handler}>Submit</Button>
            </Box>

        </DataCard>
    )
}

export default DataEntryCard;