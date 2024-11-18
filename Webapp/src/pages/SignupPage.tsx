import { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useSeriesFormatter } from '@mui/x-charts/internals';

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

interface ISendverificationResponse {
    emailStatus: boolean;
    code: String;
}


const sendVerificationCode = async (userEmail) => {
    const url = 'http://localhost:8000/api/sendVerificationCode'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail
        })
    })
    if (!response.ok) {
        console.log('an error in sending verification code')
    }

    const responseData = await response.json()
    return responseData.code
}

const verifyCode = async (userEmail, code, haveResult, setHaveResult, setVerifyresult) => {
    const url = 'http://localhost:8000/api/verifyCode'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            code: code
        })
    })
    if (response.ok) {
        console.log('an error in sending verification code')
    }
    const responseData = await response.json()

    setVerifyresult(responseData.success)
    setHaveResult(haveResult + 1)
}


const SignupPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [veriCode, setVeriCode] = useState('')
    const [shouldVerify, setShouldVerify] = useState('')
    const verified = useRef(false)

    const [haveResult, setHaveResult] = useState(0)
    const [verifyResult, setVerifyresult] = useState(false)

    const handleNext = () => {
        if (!shouldVerify) {
            sendVerificationCode(email)
            setShouldVerify(true)
        }
        else {
            verifyCode(email, veriCode, haveResult, setHaveResult, setVerifyresult)
        }
    }

    useEffect(() => {
        console.log(verifyResult)
        if (verifyResult === true) {
            navigate('/createuser')
        }
        else {
            setVeriCode('')
            if (haveResult !== 0) {
                alert('wrong verification code')
            }
        }
    }, [haveResult])

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

                <Typography
                    variant='h3'
                    fontWeight={1000}
                    sx={{ mt: 7, mb: 3 }}>
                    Sign up
                </Typography>

                {
                    shouldVerify ? (
                        <TextField
                            required
                            id="outlined-required"
                            label="VerificationCode"
                            value={veriCode}
                            onChange={(e) => setVeriCode(e.target.value)}
                            sx={{ height: 100, width: 250 }} />

                    ) : (
                        <TextField
                            required id="outlined-required"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ height: 100, width: 250 }}
                        />
                    )
                }

                <Button
                    variant="contained"
                    endIcon={<NavigateNextIcon />}
                    size='large'
                    sx={{
                        borderRadius: 4,
                        backgroundColor: 'rgba(150, 0, 150,0.1)',
                        width: 200
                    }}
                    onClick= {handleNext}
                >
                    Next
                </Button>
                <Link
                    href="#"
                    underline="hover"
                    variant='caption'
                    onClick={handleClick}
                    color='silver'
                    sx={{ mt: 1 }}
                >
                    Click here to login
                </Link>

            </Box>
        </Box>
    )

}
export default SignupPage;