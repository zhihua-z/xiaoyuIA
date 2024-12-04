import { Box } from "@mui/material";

const ScrollableScreenImage: React.FC = ({ children }) => {
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
                    zIndex: -2,            // Place the image behind other content
                }}
            >
            </Box>
            <Box sx={{
                flexGrow: 1,
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(30px)',
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                position:'fixed',
                zIndex: -1
            }}>
            </Box>
        </>
    );
};

export default ScrollableScreenImage