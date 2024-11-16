import { useState } from 'react'

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';

const MyNavigation = () => {
    const [value, setValue] = useState(1)
    return (
      <Box sx={{ flexGrow: 1, position: 'fixed', bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(Event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Tasks" icon={<AssignmentIcon />} />
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Me" icon={<AccountCircleIcon />} />
        </BottomNavigation>
      </Box>
    )
  }

export default MyNavigation