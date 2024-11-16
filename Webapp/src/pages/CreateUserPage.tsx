import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography';
import { Button, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import CountrySelect from '../components/CountryList';
import Link from '@mui/material/Link';

const FullScreenImage: React.FC = () => {
    return (
        <>
            {/* Reset body's margin and padding to eliminate unwanted space */}
            <style>
                {`
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              overflow: hidden;  /* Optional: Prevents scrolling */
            }
          `}
            </style>

            <Box
                component="img"
                src="https://images8.alphacoders.com/105/1051723.jpg"  // Replace with your image URL or path
                sx={{
                    position: 'fixed',    // Fix the image in place so it doesn't scroll
                    top: 0,               // Align to the top of the viewport
                    left: 0,              // Align to the left of the viewport
                    width: '100vw',       // Full width of the viewport
                    height: '100vh',      // Full height of the viewport
                    objectFit: 'cover',   // Ensure the image covers the entire area without distortion
                    zIndex: -1            // Place the image behind other content
                }}
            />
        </>
    );
};


const internetRegisterUser = async (username: string, password: string) => {
    const url = 'http://localhost:8000/api/register'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    if (!response.ok) {
        throw "error"
    }

    console.log(response.json())
}


export const CollectInfo = () => {

    const [username, setUsername] = useState('')
    const [country, setCountry] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [password2Error, setPassword2Error] = useState(false)

    const [usernameHelper, setUsernameHelper] = useState('')
    const [passwordHelper, setPasswordHelper] = useState('')
    const [password2Helper, setPassword2Helper] = useState('')

    const navigate = useNavigate()

    const handleRegister = () => {
        setUsernameError(false)
        setPasswordError(false)
        setPassword2Error(false)
        setUsernameHelper('')
        setPasswordHelper('')
        setPassword2Helper('')

        if (username.length === 0) {
            setUsernameError(true)
            setUsernameHelper('Username cannot be empty.')
        }

        if (password.length === 0) {
            setPasswordError(true)
            setPasswordHelper('Password cannot be empty.')
        }

        if (password !== password2) {
            setPassword2Error(true)
            setPassword2Helper('Second password must be the same.')
        }
        else {
            setPassword2Error(false)
            navigate('/dashboard');
        }

        internetRegisterUser(username, password)

    };

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

    }
    return (
        <>
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
                <Typography variant='h4' sx={{ mt: 2, mb: 2 }}>Welcome</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    sx={{ height: 100, width: 250 }}
                    value={username}
                    error={usernameError}
                    helperText={usernameHelper}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <CountrySelect value={country} setValue={setCountry} />
                <TextField
                    required
                    id="outlined-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                    error={passwordError}
                    helperText={passwordHelper}
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
                <TextField
                    required
                    id="outlined-password-input"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    label="Password"
                    type="password"
                    sx={{ height: 100 }}
                    error={password2Error}
                    helperText={password2Helper}
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
                <Button onClick={handleRegister}>
                    register
                </Button >
            </Box>

        </>

    )


}

const CreateUserPage = () => {
    return (
        <CollectInfo />
    )
}
export default CreateUserPage