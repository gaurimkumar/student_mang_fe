import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deletestudent, getStudent, updateStudent } from '../services/allAPI'
import Modal from '@mui/material/Modal';

const Students = () => {

    const [studentDatas,setStudentDatas]=useState([])

     const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [studentData, setStudentData] = useState({
    name: "",
    email:"",
    course: "",
    phone: 0,
    
  });

  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

  const [editStudent, setEditStudent] = useState("");

    useEffect(()=>{
        getStudentDatas()
    },[])

 const getStudentDatas=async()=>{
    try {
        const apiResponse=await getStudent()
        setStudentDatas(apiResponse.data)
    } catch (error) {
        console.log(error)
        toast.error('Failed to get data')
    }
 }

 
  const onDeleteBtn = async (id) => {
    try {
      const apiResponse = await deletestudent(id);

      if (apiResponse.status === 200) {
        toast.success("Successfully deleted");
        getStudentDatas();
      } else {
        toast.error("Failed to delete course");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete course");
    }
  };

  const onUpdateBtn = async () => {
   try {
      let apiResponse=await updateStudent(editStudent,studentData)
      if(apiResponse.status==200){
        toast.success("Updated successfully")
        handleClose()
        getStudentDatas()
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Updation Failed')
    }
  };



  return (
   <Box>
    
       
             <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Phone</TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
           { studentDatas?.map((eachData,index)=>(
              <TableRow key={index}>
                <TableCell>{eachData?.name}</TableCell>
                <TableCell>{eachData?.email}</TableCell>
                <TableCell>{eachData?.course}</TableCell>
                <TableCell>{eachData?.phone}</TableCell>
               
                <TableCell>
                  <Button onClick={() => onDeleteBtn(eachData.id)}> Delete</Button>
                </TableCell>
                <TableCell>
                  <Button  onClick={() => {
                setStudentData(eachData);
                setEditStudent(eachData.id);
                handleOpen()}} >  Edit </Button>
                </TableCell>
              </TableRow>
           ))
    }
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Paper sx={style}>
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
        
                <Button onClick={onUpdateBtn}>Update Student</Button>
        
            </Paper>
      </Modal>
       
   </Box>
  )
}

export default Students