import { Typography, Box } from "@mui/material";
import MyAppbar from "../components/MyAppbar";

const UserDetail = () => {
    return (
        <Box>
            <Typography>hi</Typography>
        </Box>
    )
}

const MePage = () => {
    return (
        <Box>
            <MyAppbar/>
            <UserDetail/>
        </Box>
    )
}
export default MePage