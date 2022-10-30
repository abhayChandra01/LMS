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
import DisplayAllSubjects from './DisplayAllSubjects';


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
          marginBottom: 221
        
  
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

export default function Subjects(props)
{
    var classes=useStyles()
    const [course,setCourse]=useState('')
    const [semesters,setSemesters]=useState('')
    const [subType,setSubType]=useState('')
    const [department,setDepartment]=useState('')
    const [subMarks,setSubMarks]=useState('')
    const [subName,setSubName]=useState('')


    const [listCourse,setListCourse]=useState([])
    const [listDepartment,setListDepartment]=useState([])
    const [listSemesters,setListSemesters]=useState([])
    



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


      const handleSubmitSubject=async()=>{
        
        var body={departmentid:department,courseid:course,semesters:semesters,subjectname:subName,subjecttype:subType,subjectmarks:subMarks}
        var result=await postData('subject/addsubject',body)
        
        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Subject Record Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Subject In The Database !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }

      }

    const handleCourseChange = (event) => {
        setCourse(event.target.value);
       
        fetchAllSemesters(event.target.value)        
      };
      const handleSemChange = (event) => {
        setSemesters(event.target.value);
        
      };

      const handleType = (event) => {
        setSubType(event.target.value);
        
        
      };

      const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        fetchCourses(event.target.value)
        
      };

      const fetchAllSemesters=async(courseid)=>{
        var body={courseid:courseid}
        var result=await postData("courses/displayallsemesters",body)
        setListSemesters(result.result[0].semesters)
        
      }
   
      const fetchCourses=async(departmentid)=>{
        var result=await postData("courses/displaycourses",{departmentid:departmentid})
        setListCourse(result.result)
  
      }
      
      const fillCourses=()=>{

        return(listCourse.map((item)=>{
          
            return(
              <MenuItem value={item.courseid}>{item.coursename}</MenuItem> )

        })
        )

       }

       const fillSemesters=()=>{

        var x=[]
        for(var i=1;i<=listSemesters;i++)
        x.push(i)
        return(x.map(item=>{
          return(<MenuItem value={item} >{item}</MenuItem>)

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
                        <img src="/subjects.png" style={{padding:10,width:90,height:70}} />
                        SUBJECTS
                        <div style={{paddingLeft:120}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllSubjects />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

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
             <Grid item xs={6}>
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

              <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-book"></i>
                    
                        Select Semester
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label1">Semester</InputLabel>
                       <Select
                     labelId="demo-simple-select-label1"
                     id="demo-simple-select1"
         
                     value={semesters}
                     label="Semesters"
                         onChange={handleSemChange}
                     >

                         {fillSemesters()}
                   
                 </Select>
             </FormControl>

                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enter Subject Name
                    </div>

                <CssTextField onChange={(event)=>setSubName(event.target.value)} fullWidth label="Subject Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Type Of Subject
                    </div>

                    <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label2">Subject Type</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          value={subType}
          label="Type"
          onChange={handleType}
        >
          <MenuItem value="Theory">Theory</MenuItem>
          <MenuItem value="Practical">Practical</MenuItem>
        
        </Select>
      </FormControl>

                </Grid>
                <Grid item xs={6}>
                
                <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enter Subject Marks
                    </div>

                <CssTextField onChange={(event)=>setSubMarks(event.target.value)} fullWidth label="Subject Marks" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                


                </Grid>
                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitSubject()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>
              




              </Grid>
            

                </div>
            </div>
            </div>
        </div>
    
    )
}