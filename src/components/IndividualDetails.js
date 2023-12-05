import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_BACKEND_URL } from '../utils'
import UserList from './UserList'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function IndividualDetails() {
    const [users , setUsers] = useState([])
    const manager = useSelector(state => {
        return state.authReducers.user
    })
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`${BASE_BACKEND_URL}/api/user/getMembersByManagerId/${manager.manager_id}`)
        .then(res=>{
            setUsers(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    } , [])
    const handlePromoteMemberClick = (user) => {
        navigate(`/individualDetail/${user.id}`)
    }
  return (
    <div>
        <UserList users={users} onClickButton={handlePromoteMemberClick} buttonText="Details"/>;
    </div>
  )
}
