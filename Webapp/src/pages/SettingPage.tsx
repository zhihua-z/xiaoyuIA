import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export const SetDetail = () => {
    const navigate = useNavigate()

    return  (
        <Typography>Control</Typography>
    )
    

}

const SettingPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppbar/>
            <SetDetail />
        </Box>
    )

}
export default SettingPage;