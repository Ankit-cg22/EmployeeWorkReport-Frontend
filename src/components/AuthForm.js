import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { BASE_BACKEND_URL } from '../utils';
import { useDispatch } from 'react-redux'
import { addUser } from '../features/auth/authSlice';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
const WorkHourOptions = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, '0') + ':00',
  label: i.toString().padStart(2, '0') + ':00',
}));
const AuthForm = () => {
  const [loading , setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    workHourStart: '00:00',
    workHourEnd: '01:00',
  });
  
  const handleFormSwitch = () => {
    setIsLogin((prev) => !prev);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form data submitted:', formData);
    if(isLogin){
      setLoading(true)
      axios.post(`${BASE_BACKEND_URL}/api/user/login` , formData)
      .then(res => {
        console.log(res)
        const user = res.data.user
        dispatch(addUser({user : user}))
        navigate('/')
      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=>{
        setLoading(false)

      })
    }
    else{
      setLoading(true)
      
      axios.post(`${BASE_BACKEND_URL}/api/user/register` , formData)
      .then(res => {
        const user = res.data
        dispatch(addUser({user : user}))
        navigate('/')

      })
      .catch(err => {
        console.log(err)
      })
      .finally(()=>{
        setLoading(false)
      })
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <div style={{ margin:"10px 0px" ,display: 'flex', width: '100%' , marginBottom : "10px" }}>
      <Button
        variant={isLogin ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setIsLogin(true)}
        style={{ flex: 1 , borderRadius:0}}
      >
        Login
      </Button>
      <Button
        variant={!isLogin ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => setIsLogin(false)}
        style={{ flex: 1 , borderRadius:0}}
      >
        Register
      </Button>
    </div>
      <Typography align="center" variant="h5">{isLogin ? 'Login' : 'Register'}</Typography>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="First Name"
              name="firstName"
              onChange={handleInputChange}
              required
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={handleInputChange}
              required
            />
          </>
        )}
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email"
          name="emailId"
          type="email"
          onChange={handleInputChange}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          name="password"
          type="password"
          onChange={handleInputChange}
          required
        />
        {!isLogin && (
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="workStart-label">Work Hour Start</InputLabel>
            <Select
              label="Work Hour Start"
              labelId="workStart-label"
              name="workHourStart"
              value={formData.workStart}
              onChange={handleInputChange}
            >
              {WorkHourOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {!isLogin && (
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="workEnd-label">Work Hour End</InputLabel>
            <Select
              label="Work Hour End"
              labelId="workEnd-label"
              name="workHourEnd"
              value={formData.workEnd}
              onChange={handleInputChange}
            >
              {WorkHourOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginBottom:"15px"}}>
          {
            loading ? 
            <CircularProgress size={25} style={{color : "white"}}/>

            :
            <div>{isLogin ? 'Login' : 'Register'}</div>
          }

        </Button>
        {/* <Typography
          variant="body2"
          align="center"
          style={{ cursor: 'pointer', marginTop: '16px' }}
          color="primary"
          onClick={handleFormSwitch}
        >
          {isLogin
            ? "Don't have an account? Register here."
            : 'Already have an account? Login here.'}
        </Typography> */}
      </form>
    </Container>
  );
};

export default AuthForm;
