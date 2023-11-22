import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removeUser } from '../features/auth/authSlice';
export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.authReducers.user
    })
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(removeUser())
        navigate("/auth")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <Typography component={Link} to="/" variant="h6"  sx={{ color:"white" , textDecoration:"none", flexGrow: 1 }}>
            Attendance Management App 
          </Typography> */}
            <Typography  variant="h6"  sx={{ color:"white" , textDecoration:"none", flexGrow: 1 }}>
               <a href="/" style={{textDecoration:"none" , color : "white"}}> Employee Work Report </a>
            </Typography>
          {user.firstName ?
          <>
            <Typography>{user.firstName} {user.lastName}</Typography>
            <Button color="primary" style={{ marginLeft:"10px" ,backgroundColor:"white"}} onClick={handleLogout} >Logout</Button>
          </> 
          :
          <>
            <a href="/auth">
                <Button color="primary" style={{ marginLeft:"10px" ,backgroundColor:"white"}}  >Login</Button>
            </a>
          </>  
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}