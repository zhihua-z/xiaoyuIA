import { useState, useEffect, useContext } from 'react'

import Box from '@mui/material/Box';
import MyAppbar from '../components/MyAppbar';

import Card from '../components/Card';
import VCard from '../components/VCard';
import { IPost } from "../interfaces";

import { getInternetPosts } from '../utils/internetUtils';

import { AppContext } from '../main';

const MyDiscovery = () => {
    
    const {username} = useContext(AppContext)

    useEffect(() => {
        getInternetPosts('http://localhost:8000/api/posts', username, setData)
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
                                <Card item={item}/>
                            ) : (
                                <VCard item={item} />
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
                                <Card item={item} />
                            ) : (
                                <VCard item={item} />
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
