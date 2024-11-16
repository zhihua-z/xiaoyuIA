import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
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



const SignupPage = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/');
    };
    return (
        <Box width={'100%'} height={'100%'}>
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

                <Typography variant='h3' fontWeight={1000} sx={{ mt: 7, mb: 3 }}>Sign up</Typography>
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    sx={{ height: 100, width: 250 }}
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
                    onClick={() => { navigate('/createuser') }}
                >
                    Sign up
                </Button>
                <Link href="#" underline="hover" variant='caption' onClick={handleClick} color='silver'>Click here to login</Link>

            </Box>
        </Box>
    )

}
export default SignupPage;