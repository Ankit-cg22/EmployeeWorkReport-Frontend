import { Button, Paper, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect , useState } from 'react'
import {useSelector} from 'react-redux';

export default function Home() {
  // const [user , setUser] = useState({});
  const user = useSelector(state => {
    return state.authReducers.user
  })
  const [forms, setForms] = useState([])
  useEffect(()=>{
    if(user.id){
      axios.get(`http://localhost:8080/api/form/unsubmitteForms/${user.id}`)
      .then(res=>{
        setForms(res.data.data)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [user.id])

  return (
    <div>
    <Typography align="center" variant = "h4" style={{margin : "20px 0px"}}>
      Welcome to Employee Work Report Platform
    </Typography>

      {
        forms?.length > 0 ? 
        <div>
          <Typography align="center" variant="h5" style={{marginTop:"10px"}}>Unsubmitted Forms</Typography>
          {
            forms.map((f , idx)=>{
              return(
                <div style={{}}>
                  <Paper style={{width : "50%" , margin:"auto" , marginTop:"10px" , display:"flex" , justifyContent:"space-around" , alignItems:"center" , padding:"10px"}}>
                    <Typography>Work Report Form {f.date}</Typography>
                    <a href={`http://localhost:3000/form/${f.formId}`}>
                      <Button variant="contained">Fill</Button>
                    </a>
                  </Paper>
                </div>
              )
            })
          }
        </div>
        :
        <></>
      }
    </div>
    
  )
}
