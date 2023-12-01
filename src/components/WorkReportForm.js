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
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_BACKEND_URL } from '../utils';
import { useSelector } from 'react-redux';
import {CircularProgress} from '@mui/material';
const WorkReportForm = () => {
    const {formId} = useParams()
    const [loading , setLoading] = useState(false)
    const [descIdx , setDescIdx] = useState(-1);
  const [rows, setRows] = useState([
  { work_category : 'DEV', title: 'Development', hours : 0 , minutes:0 , description : '' },
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
    
    setLoading(true);
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
        alert("Form submitted successfully.")
    })
    .catch(e=>{
        console.log(e)
        alert(e.response.data.msg)
    })
    .finally(()=>{
      setLoading(false)
    })

  };

  return (
    <div style={{width : "80%" , margin : "auto" , marginTop:"20px"}}>
    <Typography variant="h6" align="center">Work Report Form</Typography>
    <TableContainer component={Paper} style={{ width:"85%", maxWidth:"800px" , margin:"auto", overflowX:"hidden"}} >
      <Table >
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
              <TableCell style={{maxWidth:"50px" , padding:"45px 10px"}}>
                <Typography>{row.title}</Typography>
              </TableCell>
              <TableCell>
                <Slider
                  size="small"
                  valueLabelDisplay="on"
                  value={row.hours}
                  min={0}
                  max={24}
                  step={1}
                  onChange={(_, value) => handleInputChange(index, 'hours', value)}
                />
              </TableCell>
              <TableCell>
                <Slider
                  size="small"
                  valueLabelDisplay="on"
                  value={row.minutes}
                  min={0}
                  max={60}
                  step={1}
                  onChange={(_, value) => handleInputChange(index, 'minutes', value)}
                />
              </TableCell>
              <TableCell>
                {
                  descIdx === index ?
                  <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={row.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                />
                :
                <Button onClick={()=>setDescIdx(index)} variant="contained"> Add / Edit Description</Button>

                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: 'flex', justifyContent: 'center' , margin:"10px 0px"}}>
        <Button style={{ margin: "auto" }} variant="contained" color="primary" onClick={handleFormSubmit}>
          {loading ? <CircularProgress style={{ color: 'white' }} size={25}/> : 'Submit'}
        </Button>
      </div>
    </TableContainer>
    </div>
  );
};

export default WorkReportForm;
