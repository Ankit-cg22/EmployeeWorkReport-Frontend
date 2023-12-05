import { Box, Button, Container, Grid, Paper } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_BACKEND_URL, convertToDateISOString } from '../utils';
import axios from 'axios'
import ActivityList from './ActivityList';

export default function IndividualDetail() {
    const {userId} = useParams();
    const [data , setData] = useState([])
    const handleFormSubmit = (e)=> {
      e.preventDefault()
      console.log(userId)
      const dateStr = convertToDateISOString(date)
      axios.post(`${BASE_BACKEND_URL}/api/analytics/dayWiseDetails/${userId}` ,
        {date : dateStr}
      )
      .then(res=>{
        setData(res.data.data)
        console.log(data)
      })
      .catch(err=>{
        console.log(err)
      })
    }
    const [date, setDate] = useState(null);
  return (
    <Container style={{ display: 'flex', width:"98.5vw" , minWidth:"800px" , maxWidth:"100vw", padding:"0" ,height: '100vh' , justifyContent:"space-between"  }}>
        <Paper>
        <Box style={{ flex: '1', overflow: 'hidden' , maxWidth:"375 px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box p={2}>
                <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <StaticDatePicker 
                        label="Start Date"
                        value={date}
                        onChange={(date) => setDate(date)}
                        fullWidth
                        required
                       />
                       
                    </DemoContainer>
                    </LocalizationProvider>
                  
                  <Button type="submit" variant="contained" color="primary" fullWidth style={{margin:"10px 0px"}}>
                    Submit
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Paper>
        <Box style={{ flex: '1' }}>
          {data?.length>0 && <ActivityList data={data}/>}
        </Box>
      </Container>
  )
}