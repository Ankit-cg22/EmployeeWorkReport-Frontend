import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Slider,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_BACKEND_URL } from '../utils';
import { useSelector } from 'react-redux';

const WorkReportForm = () => {
    const {formId} = useParams()
  const [rows, setRows] = useState([
  { work_category : 'DEV', title: 'Development', hours : 0 , minutes:0 , description : ''  },
  { work_category : 'MEET', title: 'Meeting', hours : 0 , minutes:0 , description : '' },
  { work_category : 'INTERVIEW', title: 'Interview' , hours : 0 , minutes:0 , description : ''},
  { work_category : 'DOCS', title: 'Documentation' , hours : 0 , minutes:0 , description : ''},
  { work_category : 'LEARN', title: 'Learning', hours : 0 , minutes:0 , description : '' },
  { work_category : 'OTHERS', title: 'Others' , hours : 0 , minutes:0 , description : ''},
  ]);
  const handleInputChange = (index, fieldName, value) => {
    const newRows = [...rows];
    newRows[index][fieldName] = value;
    setRows(newRows);
  };
  const user = useSelector(state => {
    return state.authReducers.user
  })
  const calculateTotalTime = (form) => {
    
    const totalMinutes = form.reduce(
      (total, f) => total + f.hours * 60 + f.minutes,
      0
    );
    return {
      totalHours: Math.floor(totalMinutes / 60),
      totalMinutes: totalMinutes ,
    };
  };

  const handleFormSubmit = () => {
    if(!user.id){
      alert("Please login to submit form!")
      return
    }
    if((rows[5].hours>0 || rows[5].minutes>0) && rows[5].description==""){
        alert("please provide details for OTHERS category")
        return;
    }
    // Handle form submission logic
    const vals = rows.filter(row => row.hours>0 || row.minutes>0 )
    const { totalHours, totalMinutes } = calculateTotalTime(vals);
    if (totalMinutes < (8*60)) {
      alert('Total work time is less than 8 hours!');
      return
    }
    console.log(vals);
    
    axios.post(`${BASE_BACKEND_URL}/api/form/submitForm/${formId }` ,
        {userId : user.id , activityList : vals} ,
        {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Credentials": true,
          }
        }
    )
    .then(r => {
        console.log(r)
    })
    .catch(e=>{
        console.log(e)
    })

  };
  
  return (
    <div style={{width : "80%" , margin : "auto" , marginTop:"20px"}}>
    <Typography align="center">Work Report Form</Typography>
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Hours</TableCell>
            <TableCell>Minutes</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>{row.title}</Typography>
              </TableCell>
              <TableCell>
                <Slider
                  valueLabelDisplay="on"s
                  value={row.hours}
                  min={0}
                  max={24}
                  step={1}
                  onChange={(_, value) => handleInputChange(index, 'hours', value)}
                />
              </TableCell>
              <TableCell>
                <Slider
                  valueLabelDisplay="on"
                  value={row.minutes}
                  min={0}
                  max={60}
                  step={1}
                  onChange={(_, value) => handleInputChange(index, 'minutes', value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={row.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button style={{ margin:"10px 0px"} }fullWidth variant="contained" color="primary" onClick={handleFormSubmit}>
        Submit
      </Button>
    </TableContainer>
    </div>
  );
};

export default WorkReportForm;
