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
import Box from '@mui/material/Box';
import DisplayAllUnits from './DisplayAllUnits';


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
          marginBottom: 224
        
  
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

export default function Units(props)
{
    var classes=useStyles()
    const [department,setDepartment]=useState('')
    const [course,setCourse]=useState('')
    const [subject,setSubject]=useState('')
    const [unitNo,setUnitNo]=useState('')
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    
    const [listCourse,setListCourse]=useState([])
    const [listDepartment,setListDepartment]=useState([])
    const [listSubject,setListSubject]=useState([])


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

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        fetchCourses(event.target.value)
    }

    const fetchCourses=async(departmentid)=>{
        var result=await postData("courses/displaycourses",{departmentid:departmentid})
        setListCourse(result.result)
  
      }

      const fetchSubjects=async(courseid)=>{
        var result=await postData("subject/displaysubjectbycourseid",{courseid:courseid})
        setListSubject(result.result)
  
      }

      const handleCourseChange = (event) => {
        setCourse(event.target.value);
        fetchSubjects(event.target.value)
         
      };

      const handleSubjectChange = (event) => {
        setSubject(event.target.value);
         
      };
      
      
      const fillCourses=()=>{

        return(listCourse.map((item)=>{
          
            return(
              <MenuItem value={item.courseid}>{item.coursename}</MenuItem> )

        })
        )

       }

       const fillSubjects=()=>{

        return(listSubject.map((item)=>{
          
            return(
              <MenuItem value={item.subjectid}>{item.subjectname} ({item.subjecttype})</MenuItem> )

        })
        )

       }

       useEffect(function(){
        fetchAllDepartments()
        
  
      },[])

      const handleSubmitUnit=async()=>{

        var body={departmentid:department, courseid:course, subjectid:subject, unitno:unitNo, title:title, description:description}
        var result=await postData('unit/addunit',body)

        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Unit Record Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Unit In The Database !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }

      }


    return(
        <div className={classes.bg}>
        <div className={classes.root}>
            <div style={{flexDirection:'column'}}>
                <div className={classes.divv}>
                <div style={{display:'flex',marginLeft:230,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/units.png" style={{padding:10,width:50,height:50}} />
                        UNITS
                        <div style={{paddingLeft:170}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllUnits />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>

                <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Select Department
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label0">Departments</InputLabel>
                       <Select
                     labelId="demo-simple-select-label0"
                     id="demo-simple-select0"
         
                     value={department}
                     label="Department"
                         onChange={handleDepartmentChange}
                     >

                         {fillDepartment()}
                   
                 </Select>
             </FormControl>
             </Grid>
             <Grid item xs={4}>
             <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-graduation-cap"></i>
                    
                        Select Course
                    </div>
                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label6">Courses</InputLabel>
                       <Select
                     labelId="demo-simple-select-label6"
                     id="demo-simple-select6"
         
                     value={course}
                     label="Courses"
                         onChange={handleCourseChange}
                     >

                         {fillCourses()}
                   
                 </Select>
             </FormControl>
                    

              </Grid>

              <Grid item xs={4}>
             <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                    
                        Select Subject
                    </div>
                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label7">Subject</InputLabel>
                       <Select
                     labelId="demo-simple-select-label7"
                     id="demo-simple-select7"
         
                     value={subject}
                     label="Courses"
                         onChange={handleSubjectChange}
                     >

                         {fillSubjects()}
                   
                 </Select>
             </FormControl>
                    

              </Grid>
              <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-sort-numeric-up"></i>
                
                        Enter Unit No.
                    </div>

                <CssTextField onChange={(event)=>setUnitNo(event.target.value)} fullWidth label="Unit No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Unit Title
                    </div>

                <CssTextField onChange={(event)=>setTitle(event.target.value)} fullWidth label="Unit Title" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Unit Description
                    </div>

                <CssTextField onChange={(event)=>setDescription(event.target.value)} fullWidth label="Unit Description" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitUnit()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>
              
            
            
            
            
            
            
            </Grid>



                </div>
            </div>
        </div>
        </div>
    
    )





}