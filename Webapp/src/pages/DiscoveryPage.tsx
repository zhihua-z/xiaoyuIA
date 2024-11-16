import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import MyAppbar from '../components/MyAppbar';
import MyNavigation from '../components/Mynavigation';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Card = ({ image, title, author, date }) => {
    const [count, setCount] = useState(0)
    const [isAdding, setIsAdding] = useState(false)
    const CheckboxChange = (event) => {
        setIsAdding(event.target.checked);
    }
    const boxClick = () => {
        if (isAdding) {
            setCount(count - 1);
        }
        else {
            setCount(count + 1);
        }
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
                src={image}
                sx={{
                    objectFit: 'cover'
                }}
            />
            <CardActionArea onClick={() => { navigate('/detail') }}>
                <Box id={'display_caption'} sx={{ ml: 0.5, mr: 0.5 }}>
                    <Typography fontSize={16} fontWeight={600}>{title}</Typography>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1 }}>{author}</Typography>
                        <Typography fontSize={12} fontWeight={300} sx={{ mt: 1, ml: 1 }}>{date}</Typography>

                    </Box>
                </Box>
            </CardActionArea>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'flex-end'}>
                <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={isAdding}
                    onChange={CheckboxChange}
                    onClick={boxClick}
                    sx={{
                        color: red[600], '&.Mui-checked': {
                            color: red[600],
                        },
                    }}
                />
                <Box sx= {{mt: 1, mr: 2}}>
                    {count}
                </Box>


            </Box>

        </Paper>
    )
}

const getInternetPosts = async (url: string, updateData) => {
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Http error! Status : ${response.status}');
    }
    const data = await response.json();

    console.log(data.post)

    updateData(data.post)

}

const MyDiscovery = () => {
    useEffect(() => {
        getInternetPosts('http://localhost:8000/api/posts', setData)
    }, [])

    const [data, setData] = useState([])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                {
                    data.map((item, index) => {
                        if (index % 2 == 0)
                            return
                        return (
                            <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
                        )
                    })
                }
            </Box>

            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                {
                    data.map((item, index) => {
                        if (index % 2 == 1)
                            return
                        return (
                            <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
                        )
                    })
                }
            </Box>
        </Box>
    )
}

const DiscoveryPage = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <MyAppbar />
            <MyDiscovery />
        </Box>
    )

}

export default DiscoveryPage
