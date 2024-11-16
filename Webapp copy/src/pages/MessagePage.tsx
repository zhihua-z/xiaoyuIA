import MyAppbar from "../components/MyAppbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export const Mailbox = () => {
    return (
        <Typography>Empty</Typography>
    )
}

const MessagePage = () => {
    return (
        <Box>
            <MyAppbar/>
            <Mailbox/>
        </Box>
        
    )
}
export default MessagePage