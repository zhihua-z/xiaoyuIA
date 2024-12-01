import { useState, useContext } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { IPost } from "../interfaces";


import useLocalStorage from '../utils/useLocalStorage';
import { setInternetLiked } from '../utils/internetUtils';



const Card = ({ item }: {item: IPost}) => {
    console.log("here",item)
    const [likeAmount, setLikeAmount] = useState(item.likedCount)
    const [isLiked, setIsLiked] = useState(item.userLiked)
    const [username, setUsername] = useLocalStorage("username", "")

    const internetLike = () => {
        setInternetLiked(username, item.id, isLiked, setLikeAmount, setIsLiked)
    }

    const navigate = useNavigate()

    return (
        <Paper
            square={false}
            elevation={1}
            sx={{
                width: '100%',
                mt: 0.5,
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            <Box
                component={'img'}
                width={'100%'}
                src={item.url}
                sx={{
                    objectFit: 'cover'
                }}
            />
            <CardActionArea onClick={() => { navigate('/detail') }}>
                <Box id={'display_caption'} sx={{ ml: 0.5, mr: 0.5 }}>
                    <Typography fontSize={16} fontWeight={600}>{item.title}</Typography>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1 }}>{item.author}</Typography>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1, ml: 1 }}>{item.postTime}</Typography>

                    </Box>
                </Box>
            </CardActionArea>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'flex-end'}>
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isLiked}
                    onClick={internetLike}
                    sx={{
                        color: red[600], '&.Mui-checked': {
                            color: red[600],
                        },
                    }}
                />
                <Box sx= {{mt: 1, mr: 2}}>
                    {likeAmount}
                </Box>
            </Box>
        </Paper>
    )
}

export default Card