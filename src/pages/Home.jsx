import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addStudent } from '../services/allAPI'


const Home = () => {

    const navigate=useNavigate()

    const [studentData,setStudentData]=useState({
        name:"",
        email:"",
        course:"",
        phone:0
    })

    const  onAddBtn=async()=>{
        try {
            if(
                studentData.name==""||
                studentData.email==""||
                studentData.course==""||
                studentData.phone==0
            ){
                toast.error("Please fill the form")
            }
            else{
                let apiResponse=await addStudent(studentData)

                if(apiResponse.status==201){
                    toast.success("Successfully added")
                    navigate(`/students`)
                
                }else{
                    toast.error("Failed to add student")
                }
            }

    
            
        } catch (error) {
            console.log(error)
            toast.error("Failed to add student")
        }
    }
  return (
    <Box>
        <Typography>Student Management</Typography>

        <TextField label="Name"
        fullWidth
        value={studentData?.name}
        onChange={(e)=>setStudentData({...studentData,name:e.target.value})}
        />
         
         <TextField label="Email"
         fullWidth
         value={studentData?.email}
        onChange={(e)=>setStudentData({...studentData,email:e.target.value})}
        />

        <TextField label="Course"
        fullWidth
        value={studentData?.course}
        onChange={(e)=>setStudentData({...studentData,course:e.target.value})}
        />

        <TextField label="Phone"
        fullWidth
        value={studentData?.phone}
        onChange={(e)=>setStudentData({...studentData,phone:e.target.value})}
        />

        <Button onClick={onAddBtn}>Add Student</Button>

    </Box>
  )
}

export default Home