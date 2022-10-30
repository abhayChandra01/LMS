import React,{useState , useEffect} from "react";
import { makeStyles } from '@mui/styles';
import { Avatar } from "@mui/material";
import {Grid,TextField,Button,IconButton} from "@mui/material";
import { postData, ServerURL, getData, postDataAndImage } from "./FetchNodeServices";
import Swal from "sweetalert2";
import { alpha, styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllCourses from './DisplayAllCourses';

const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#2b6777',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#2b6777',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#2b6777',
      },
      '&:hover fieldset': {
        borderColor: '#52ab98',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2b6777',
      },
    },
  });

const useStyles = makeStyles({
    root: {
        display:"flex",
        alignContent:'center',
        justifyContent:'center'
      
  
    },
    subdiv :{
          display:'flex',
          padding:20,
          width:700,
          borderRadius:15,
          border: '2px solid #52ab98',
          backgroundColor: '#c8d8e4',
          marginBottom: 92
        
  
    },
    divv :{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        height:70,
        width:700,
        marginTop:30,
        border: '2px solid #52ab98',
        borderRadius:15,
        backgroundColor: '#c8d8e4'


  },
    
    inputstyle :{
          display:"none"
  
    },
    bg :{
        backgroundImage: `url("/bg.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    
    },
    
    
  });

export default function Courses(props)
{
    var classes=useStyles()
    const [department,setDepartment]=useState('')
    const [courseName,setCourseName]=useState('')
    const [semesters,setSemesters]=useState('')
    const [feePerSem,setFeePerSem]=useState('')
    const [courseIcon,setCourseIcon]=useState({bytes:'',file:'./coursesicon.png'})
    const [listDepartment,setListDepartment]=useState([])

    const handleSubmitCourses=async()=>{

        var formData=new FormData()
        formData.append('departmentid',department)
        formData.append('coursename',courseName)
        formData.append('semesters',semesters)
        formData.append('feepersem',feePerSem)

        formData.append('courseicon',courseIcon.bytes)

        var result=await postDataAndImage('courses/addcourse',formData)
        console.log(result)
        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Course Has Been Submitted Successfully !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'success',
                width:'600',
                height:'400',
              })
        }
        else
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Failed To Submit Course In The Database !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }


    }

    const handleIconChange=(event)=>{
        if(event.target.files.length){
        setCourseIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        
      };

      const fetchAllDepartments=async()=>{
        var result=await getData("department/displayalldepartment")
        setListDepartment(result.result)
  
      }


    const fillDepartment=()=>{

        return(listDepartment.map((item)=>{
            return( <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)

        })
        )

    }

    useEffect(function(){
        fetchAllDepartments()
    },[])
      

    return(
        <div className={classes.bg}>
        <div className={classes.root}>
            <div style={{flexDirection:'column'}}>
                <div className={classes.divv}>
                <div style={{display:'flex',marginLeft:200,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/courses.png" style={{padding:10,width:70,height:70}} />
                        COURSES
                        <div style={{paddingLeft:120}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllCourses />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Select Department
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label">Department</InputLabel>
                       <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
         
                     value={department}
                     label="Department"
                         onChange={handleDepartmentChange}
                     >

                         {fillDepartment()}
                   
                 </Select>
             </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-graduation-cap"></i>
                    
                        Enter Course Name
                    </div>

                <CssTextField onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-book"></i>
                    
                        Enter No. Of Semesters
                    </div>

                <CssTextField onChange={(event)=>setSemesters(event.target.value)} fullWidth label="No. Of Semesters" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-rupee-sign"></i>
                    
                        Enter Fee Per Semester
                    </div>

                <CssTextField onChange={(event)=>setFeePerSem(event.target.value)} fullWidth label="Fee Per Semester" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12} style={{marginTop:10}}>
                <label htmlFor="contained-button-file">
                <input onChange={(event)=>handleIconChange(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Upload
                </Button>
                </label>
        
                </Grid>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Avatar
                alt="Upload Image"
                src={courseIcon.file}
                variant="rounded"
                sx={{ width: 150,height: 150}}
                />

                </Grid>
                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitCourses()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>


                </Grid>
         </div>
     </div>
     </div>
     </div>
    )
}
