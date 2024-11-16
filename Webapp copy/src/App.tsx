// import { useState, useEffect } from 'react'
// import './App.css'

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button'
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import HomeIcon from '@mui/icons-material/Home';


// const Card = ({ image, title, author, date }) => {
//   const [count, setCount] = useState(0)

//   return (
//     <Paper
//       square={false}
//       elevation={1}
//       sx={{
//         width: '100%',
//         mt: 0.5,
//         borderRadius: 2,
//         overflow: 'hidden'
//       }}
//     >
//       <Box
//         component={'img'}
//         width={'100%'}
//         src={image}
//         sx={{
//           objectFit: 'cover'
//         }}
//       />
//       <Box id={'display_caption'} sx={{ ml: 0.5, mr: 0.5 }}>
//         <Typography fontSize={16} fontWeight={600}>{title}</Typography>
//         <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'space-between'}>
//           <Typography fontSize={12} fontWeight={300} sx={{ mt: 1 }}>{author}</Typography>
//           <Typography fontSize={12} fontWeight={300} sx={{ mt: 1, ml: 1 }}>{date}</Typography>
//           <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row' }} justifyContent={'flex-end'}>
//             <IconButton
//               size="small"
//               aria-label="menu"
//               sx={{ color: 'red' }}
//               onClick={() => { setCount(count + 1) }}
//             >
//               <FavoriteIcon />
//               {count}
//             </IconButton>


//           </Box>
//         </Box>
//       </Box>

//     </Paper>
//   )
// }

// const getInternetPosts = async (url: string, updateData) => {
//   const response = await fetch(url)

//   if (!response.ok) {
//     throw new Error('Http error! Status : ${response.status}');
//   }
//   const data = await response.json();

//   console.log(data.post)

//   updateData(data.post)

// }




// const MyAppbar = () => {
//   return (
//     <>
//       <AppBar sx={{ backgroundColor: 'white' }}>
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="default"
//             aria-label="menu"
//             sx={{ mr: 7 }}>

//             <MenuIcon />
//           </IconButton>
//           <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>

//             <Button>
//               <Typography color="black">task</Typography>
//             </Button>
//             <Button>
//               <Typography color="black">discovery</Typography>
//             </Button>
//             <Button>
//               <Typography color="black">me</Typography>
//             </Button>
//           </Box>
//           <IconButton
//             size="large"
//             edge="end"
//             color="default"
//             aria-label="search"
//             sx={{ ml: 7 }}
//           >
//             <SearchIcon />
//           </IconButton>
//           <SearchIcon />
//         </Toolbar>
//       </AppBar>
//       <Box height={56} />
//     </>
//   )
// }


// const MyNavigation = () => {
//   const [value, setValue] = useState(1)
//   return (
//     <Box sx={{ flexGrow: 1, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(Event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
//         <BottomNavigationAction label="Home" icon={<HomeIcon />} />
//         <BottomNavigationAction label="Me" icon={<AccountCircleIcon />} />
//       </BottomNavigation>
//     </Box>
//   )
// }

// const MyDiscovery = () => {
//   useEffect(() => {
//     getInternetPosts('http://localhost:8000/api/posts', setData)
//   }, [])

//   const [data, setData] = useState([])

//   return (
//     <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
//       <Box sx={{ flexDirection: 'column', width: '49%' }}>
//         {
//           data.map((item, index) => {
//             if (index % 2 == 0)
//               return
//             return (
//               <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
//             )
//           })
//         }
//       </Box>

//       <Box sx={{ flexDirection: 'column', width: '49%' }}>
//         {
//           data.map((item, index) => {
//             if (index % 2 == 1)
//               return
//             return (
//               <Card image={item.url} title={item.title} author={item.author} date={item.postTime} />
//             )
//           })
//         }
//       </Box>
//     </Box>
//   )
// }

// export const MyHello = () => {
//   return <Typography>Hello world</Typography>
// }

// function App() {
//   return (

//     <Box sx={{ flexGrow: 1 }}>
//       <MyAppbar />
//       <MyDiscovery />
//       <MyNavigation />
//     </Box>
//   )

// }

// export function HelloPage() {
//   return (

//     <Box sx={{ flexGrow: 1 }}>
//       <MyAppbar />
//       <MyHello />
//       <MyNavigation />
//     </Box>
//   )

// }

// export default App
