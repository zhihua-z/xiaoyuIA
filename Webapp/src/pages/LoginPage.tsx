import { useState, useEffect, useContext } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, InputAdornment } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';


import { AppContext } from '../main';
import FullScreenImage from '../components/FullScreenImage';


const login = async(username: string, password: string, navigate: any) => {
    const url = 'http://localhost:8000/api/login'

    const inputData = {
        username: username,
        password: password
    }

    console.log(inputData)

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    })

    if (!response.ok) {
        throw 'error';
    }

    const data = await response.json()

    if (data.status == 'success') {
        navigate('/dashboard')
    } else {
        alert(data.status)
    }
}

const LoginPage = () => {
    const navigate = useNavigate();

    const { setUsername } = useContext(AppContext)
    const [localname, setLocalname] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = () => {
        navigate('/signup');
    };
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        setUsername(localname)
        login(localname, password, navigate)
    }

    return (
        <Box width={'100%'} height={'100%'} sx={{ margin: 0, padding: 0 }}>
            <FullScreenImage />
            <Box sx={{
                position: 'relative',
                top: 135,
                color: 'white',
                zIndex: 1,
                backdropFilter: 'blur(10px)',
                width: 350,
                height: 450,
                margin: 'auto',
                border: '1px solid rgba(200, 200, 200, 0.4)',
                borderRadius: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>

                <Typography variant='h3' fontWeight={1000} sx={{ mt: 7, mb: 3 }}>Login</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    value={localname}
                    onChange={e => setLocalname(e.target.value)}
                    sx={{ width: 250, height: 100, borderRadius: 6 }}
                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    sx={{ height: 100 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    size='large'
                    sx={{
                        borderRadius: 4,
                        backgroundColor: 'rgba(150, 0, 150,0.1)',
                        width: 200
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>
                <Link href="#"
                    underline="hover"
                    variant='caption'
                    onClick={handleClick}
                    color='silver'
                    sx={{mt:1}}
                >
                    Click here to sign up
                </Link>

            </Box>
        </Box >
    )

}
export default LoginPage;