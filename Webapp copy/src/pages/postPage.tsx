import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';

export const PostDetail = () => {
    return  <Typography>post</Typography>
    

}

const PostPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppbar/>
            <PostDetail />
        </Box>
    )

}
export default PostPage;