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
import DisplayAllSets from "./DisplayAllSets";


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

export default function CreateSet(props)
{
    var classes=useStyles()

    const [faculty,setFaculty] = useState([])
    const [listCourse,setListCourse]=useState([])
    const [listSemesters,setListSemesters]=useState([])

    const [course,setCourse]=useState('')
    const [listSubject,setListSubject]=useState([])
    const [subject,setSubject]=useState('')
    const [setNo,setSetNo]=useState('')
    const [time,setTime]=useState('')
    const [status,setStatus]=useState('')
    const [marks,setMarks]=useState('')
    const [semesters,setSemesters]=useState('')




    const fetchCourses=async(departmentid)=>{
        var result=await postData("courses/displaycourses",{departmentid:departmentid})
        setListCourse(result.result)
  
      }

      const fetchAllSemesters=async(courseid)=>{
        var body={courseid:courseid}
        var result=await postData("courses/displayallsemesters",body)
        setListSemesters(result.result[0].semesters)
        
      }
      
      const handleSemChange = (event) => {
        setSemesters(event.target.value);
        fetchSubjects(event.target.value)
        
      };

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

       const handleCourseChange = (event) => {
        setCourse(event.target.value);
        fetchAllSemesters(event.target.value)        

     
      };

      const handleStatusChange = (event) => {
      
      setStatus(event.target.value)
      
      }

      const handleSubjectChange = async (event) => {
        setSubject(event.target.value)

        var result = await getData('createset/generateset')

        // setSetNo(result.result)
        setSetNo(faculty.department+"-"+course+"-"+event.target.value+"-"+semesters+"-"+result.result)
    }

      const fetchSubjects=async(sem)=>{
        var result=await postData("subject/displaysubject",{courseid:course,semesters:sem})
        setListSubject(result.result)
  
      }


      const fillSubjects=()=>{

        return(listSubject.map((item)=>{
          
            return(
              <MenuItem value={item.subjectid}>{item.subjectname} ({item.subjecttype})</MenuItem> )

        })
        )

       }

       const handleSubmitSet=async()=>{

        var body={facultyid:faculty.facultyid, departmentid:faculty.department, courseid:course,semester:semesters, subjectid:subject, setno:setNo, time:time, status:status, marks:marks}
        var result=await postData('createset/addset',body)

        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Set Record Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Set In The Database !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }

       }


    useEffect (function(){

        var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
        setFaculty(data)
       fetchCourses(data.department)

    },[])

    return(
        <div className={classes.bg}>
        <div className={classes.root}>
            <div style={{flexDirection:'column'}}>
                <div className={classes.divv}>
                <div style={{display:'flex',marginLeft:200,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/exams.png" style={{padding:10,width:70,height:70}} />
                        CREATE SET
                        <div style={{paddingLeft:120}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllSets />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Faculty
                    </div>

                    <CssTextField aria-readonly autoFocus value={faculty.facultyid} fullWidth label="Faculty" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />

                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Department
                    </div>

                    <CssTextField aria-readonly autoFocus value={faculty.departmentname} fullWidth label="Department" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />

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
                
                        Enter Set No
                    </div>

                <CssTextField aria-readonly value={setNo} fullWidth label="Set No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

              <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-sort-numeric-up"></i>
                
                        Enter Time
                    </div>

                <CssTextField onChange={(event)=>setTime(event.target.value)} fullWidth label="Time (in minutes)" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Set Status
                    </div>

                    <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label55">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label55"
          id="demo-simple-select55"
          value={status}
          label="Status"
          onChange={handleStatusChange}
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Disable">Disable</MenuItem>
        </Select>
      </FormControl>
               
           

                </Grid>

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Set Marks
                    </div>

                <CssTextField onChange={(event)=>setMarks(event.target.value)} fullWidth label="Set Marks" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitSet()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>
              

                </Grid>


                </div>
     </div>
     </div>
     </div>
    )



}