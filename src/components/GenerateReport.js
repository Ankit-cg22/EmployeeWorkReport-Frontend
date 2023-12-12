import React, { useEffect, useState } from 'react';
import {  Button, MenuItem, Select, InputLabel, FormControl, Container, Typography, Grid, Box, FormControlLabel, Checkbox, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BASE_BACKEND_URL, convertToDateISOString, findIdx, toHoursInDecimal } from '../utils';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import { useSelector } from 'react-redux';

const GenerateReport = () => {

    const [reportData , setReportData] = useState({})

    const chartData =[]
    function processReportData(reportData){
        console.log(reportData)
        if(reportData.cummulativeReport){

        const pieData = reportData.cummulativeReport.map(r => {
            return {
                name : r.work_category ,
                y : toHoursInDecimal(r.total_hours ,r.total_minutes)
            }
        })

        const names = reportData.individualReports.map(d => d.user.firstName);
        const vals = [
            {
                name: 'DEV',
                data: [],
            },
            
            {
                name: 'MEET',
                data: [],
            },
            {
                name: 'INTERVIEW',
                data: [],
            },
            {
                name: 'LEARN',
                data: [],
            },
            {
                name: 'OTHERS',
                data: [],
            },
            {
                name: 'DOCS',
                data: [],
            }
            ]

            reportData.individualReports.map( data => {
                for(let i = 0 ; i<data.report.length ; i++){
                    const timeInHours = toHoursInDecimal(data.report[i].total_hours , data.report[i].total_minutes)
                    vals[findIdx(data.report[i].work_category)].data.push( timeInHours )
                }
            })
            
            setOptionsPie({ 
              chart: {
              type: 'pie',
              },
              title: {
              text: 'Time distribution over categories(in hours)',
              },
              plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.y} hours'
                    }
                }
              },
              series: [
              {
                  name: 'Categories',
                  data: pieData,
              },
              ],
            })
            setOptionsBar(
                {
                chart: {
                type: 'bar',
                },
                title: {
                text: 'Time distribution of individual member(in hours)',
                },
                xAxis: {
                categories:names,
                },
                yAxis: {
                title: {
                    text: 'Total',
                },
                },
                legend: {
                reversed: true,
                },
                plotOptions: {
                  series: {
                      stacking: 'normal',
                  },
                  
                },
                series: vals,
            })
    }

    };
    
    const [optionsBar , setOptionsBar] = useState({});
    const [optionsPie,setOptionsPie] =useState({});
    const [members , setMembers] = useState([])
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
  
    const handleUserToggle = (userId) => {
      if (selectedUserIds.includes(userId)) {
        setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
      } else {
        setSelectedUserIds([...selectedUserIds, userId]);
      }
    };
    const manager = useSelector(state => {
        return state.authReducers.user
    })
    useEffect(()=>{
        axios.get(`${BASE_BACKEND_URL}/api/user/getMembersByManagerId/${manager.manager_id}`)
        .then(res=>{
            if(res.data?.data)setMembers(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }, [])
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      // Do something with the selected data, e.g., send it to the server
      const sDate = convertToDateISOString(startDate)
      const eDate = convertToDateISOString(endDate);
      console.log('Start Date:', sDate);
      console.log('End Date:', eDate);
      console.log('Selected User IDs:', selectedUserIds);

      axios.post(`${BASE_BACKEND_URL}/api/analytics/getReport` , {
        "userIdList" : selectedUserIds ,
        "startDate" : sDate ,
        "endDate" : eDate
      })
      .then(res =>{
        setReportData(res.data)
        // console.log(reportData)
        console.log(res.data);
        processReportData(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
      
    };
  
    return (
      <Container style={{ display: 'flex', width:"98.5vw" , minWidth:"800px" , maxWidth:"100vw", padding:"0" ,height: '100vh' , justifyContent:"space-between"  }}>
        <Paper>
        <Box style={{ flex: '1', overflow: 'hidden' , maxWidth:"350px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box p={2}>
                <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
                  
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker 
                        label="Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        fullWidth
                        required
                    />
                    </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        fullWidth
                        required
                        />
                    </DemoContainer>
                    </LocalizationProvider>
                  <Box maxHeight={200}  overflow="auto" style={{marginTop : "10px"}}>
                    <Typography align="center">Team Members</Typography>
                    {members.map((member) => (
                        <div>
                      <FormControlLabel
                        key={member.id}
                        control={
                          <Checkbox
                            checked={selectedUserIds.includes(member.id)}
                            onChange={() => handleUserToggle(member.id)}
                          />
                        }
                        label={member.firstName}
                      />
                      </div>
                    ))}
                  </Box>
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
            {reportData.cummulativeReport ?
            <>
                <HighchartsReact highcharts={Highcharts} options={optionsPie} />
                <HighchartsReact highcharts={Highcharts} options={optionsBar} />
            </>
            :
            <></>
            }

        </Box>
      </Container>
    );
};

export default GenerateReport;

