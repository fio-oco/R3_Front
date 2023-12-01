import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


export default function Header(){
  const navigate = useNavigate();
  
  //const [isLoggedIn, setIsLoggedIn] = setIsLoggedIn(false);
  
  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    //setIsLoggedIn = false;
    navigate("/");
  };

  const handleMyClimbs = () => {
    navigate("/myclimbs");
  }
  const handleCommClimbs = () => {
    navigate("/gallery");
  }

    return(
        <>
        <div className='header'>
      <Toolbar width="100%">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Mountain Logbook
        </Typography>
        <Button size="small" color="inherit" variant="outlined" onClick={handleMyClimbs}>My Climbs</Button>
        <Button size="small" color="inherit" variant="outlined" onClick={handleCommClimbs}>Community Climbs</Button>
        <Button size="small" color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
        </Toolbar>
    </div>
        </>
    )
}
//here I need the functionality for the logout within the button with onClick
// need to write the logic so that the button only appears if the user is logged in ie. if isLoggedIn = true
/* {isLoggedIn !== ? 
  <Button size="small" color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
} : { hidden} */