import { useState, useEffect } from 'react'

import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';

import Card from '../components/Card';
import VCard from '../components/VCard';
import { IPost } from "../interfaces";

import { getInternetPosts } from '../utils/internetUtils';


const MyDiscovery = () => {
    useEffect(() => {
        getInternetPosts('http://localhost:8000/api/posts', setData)
    }, [])

    const [data, setData] = useState<IPost[]>([])

    return (
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                {
                    data.map((item, index) => {
                        if (index % 2 == 1)
                            return
                        return (
                            item.type === "blog" ? (
                                <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
                            ) : (
                                <VCard videoURL={item.url} title={item.title} author={item.author} date={item.postTime} />
                            )
                        )
                    })
                }
            </Box>

            <Box sx={{ flexDirection: 'column', width: '49%' }}>
                {
                    data.map((item, index) => {
                        if (index % 2 == 0)
                            return
                        return (
                            item.type === "blog" ? (
                                <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
                            ) : (
                                <VCard videoURL={item.url} title={item.title} author={item.author} date={item.postTime} />
                            )
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
            <MyAppbar currentTab={"discovery"} />
            <MyDiscovery />
        </Box>
    )

}

export default DiscoveryPage
