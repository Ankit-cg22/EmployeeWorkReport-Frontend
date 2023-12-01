import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_BACKEND_URL } from '../utils'
import UserList from './UserList'
import { useSelector } from 'react-redux'

export default function PromoteTeamMember() {
    const [users , setUsers] = useState([])
    const manager = useSelector(state => {
        return state.authReducers.user
    })

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
        axios.get(`${BASE_BACKEND_URL}/api/user/makeManager/${user.id}`)
        .then(res=>{
            const newUsers = users.filter((u) => u.id !== user.id);
            setUsers(newUsers)
            alert(res.data.msg)
        })
        .catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <UserList users={users} onClickButton={handlePromoteMemberClick} buttonText="Promote to manager"/>;
    </div>
  )
}
