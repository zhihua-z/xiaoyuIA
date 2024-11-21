import { useState, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

const AppBarButton = ({ navigate, navDestination, label, currentTab }) => {
    return (
        <Button onClick={() => { navigate(navDestination) }}>
            <Typography color={currentTab == label ? "red" : "black"}>{label}</Typography>
        </Button>
    )
}

const MyAppbar = ({ currentTab }) => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="default"
                        aria-label="menu"
                        sx={{ mr: 7 }}
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >

                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { navigate('/messages') }}>Message</MenuItem>
                        <MenuItem onClick={() => { navigate('/setting') }}>Setting</MenuItem>
                        <MenuItem onClick={() => { navigate('/') }}>Logout</MenuItem>
                    </Menu>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <AppBarButton
                            navigate={navigate}
                            navDestination={"/discovery"}
                            currentTab={currentTab}
                            label={"discovery"}
                        />

                        <AppBarButton
                            navigate={navigate}
                            navDestination={"/dashboard"}
                            currentTab={currentTab}
                            label={"dashboard"}
                        />

                        <AppBarButton
                            navigate={navigate}
                            navDestination={"/task"}
                            currentTab={currentTab}
                            label={"task"}
                        />
                    </Box>
                    <Button onClick={() => { navigate('/me') }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>
                    </Button>
                </Toolbar>
            </AppBar >
            <Box height={68} />
        </>
    )
}

export default MyAppbar;