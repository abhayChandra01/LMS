import React ,{useEffect,useState} from "react";
import MaterialTable from "material-table";
import { makeStyles ,styled } from '@mui/styles';
import { Avatar } from "@mui/material";
import {Grid,TextField,Button} from "@mui/material";
import {postData,postDataAndImage, getData ,ServerURL } from "./FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";

import Slide from '@mui/material/Slide';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  inputstyle :{
    display:"none"

},
  
    root: {
        display:"flex",
        alignContent:'center',
        justifyContent:'center'
      
  
    },
    subdiv :{
          
          padding:20,
          width:950,
          opacity: 0.9,
          borderRadius:15,
          border: '2px solid #52ab98',
          backgroundColor: '#c8d8e4',
          marginBottom:50
  
    },
    divv :{
        display:"flex",
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        height:70,
        width:950,
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


export default function DisplayAllSets(props){

    var classes = useStyles()
    const [listSets,setListSets]=useState([])
    const [listSubject,setListSubject]=useState([])
    const [listCourse,setListCourse]=useState([])
    const [faculty,setFaculty] = useState([])


    const [setId,setSetId]=useState('')

    const [course,setCourse]=useState('')
    const [subject,setSubject]=useState('')
    const [setNo,setSetNo]=useState('')
    const [time,setTime]=useState('')
    const [status,setStatus]=useState('')
    const [marks,setMarks]=useState('')
    const [semesters,setSemesters]=useState('')


    const [open,setOpen]=useState(false)

    const fetchAllSets=async(facultyid)=>{
      var result=await postData("createset/displayallsets",{facultyid:facultyid})
      setListSets(result.result)

    }

    useEffect(function(){
      var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
      setFaculty(data)
      fetchAllSets(data.facultyid)
    },[])

    
    const handleEdit=(rowData)=>{

      setSetId(rowData.setid)
      fetchCourses(rowData.departmentid)
      setCourse(rowData.courseid)
      fetchSubjects(rowData.courseid)
      setSubject(rowData.subjectid)
      setSetNo(rowData.setno)
      setTime(rowData.time)
      setStatus(rowData.status)
      setMarks(rowData.marks)
      
      setOpen(true)
      


    }

    
    const handleClose=()=>{
      setOpen(false)

    }

    
    const handleEditData=async()=>{
      var body={courseid:course, subjectid:subject, setno:setNo, time:time, status:status, marks:marks, setid:setId}
      var result=await postData('createset/editset',body)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Set Has Been Updated Successfully !',
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
              text: 'Failed To Update Set !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }
      fetchAllSets()

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


     const handleCourseChange = (event) => {
      setCourse(event.target.value);
      fetchSubjects(event.target.value)
   
    };

    const handleSubjectChange = (event) => {
      setSubject(event.target.value);
       
    };
    

    const fetchSubjects=async(courseid)=>{
      var result=await postData("subject/displaysubject",{courseid:courseid})
      setListSubject(result.result)

    }

    const handleStatusChange = (event) => {
      
      setStatus(event.target.value)
      
      }


    const fillSubjects=()=>{

      return(listSubject.map((item)=>{
        
          return(
            <MenuItem value={item.subjectid}>{item.subjectname} ({item.subjecttype})</MenuItem> )

      })
      )

     }


    const showDialog=()=>{

      return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        
        <DialogContent>
        
                    <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",marginBottom:5,fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/exams.png" style={{width:60,height:60}}></img>
                        EDIT SETS
                        <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:300,fontSize:35}}></i>
                    </div>
                    <Grid container spacing={2}>


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

                <CssTextField value={setNo} onChange={(event)=>setSetNo(event.target.value)} fullWidth label="Set No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

              <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-sort-numeric-up"></i>
                
                        Enter Time
                    </div>

                <CssTextField value={time} onChange={(event)=>setTime(event.target.value)} fullWidth label="Time (in minutes)" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
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

                <CssTextField value={marks} onChange={(event)=>setMarks(event.target.value)} fullWidth label="Set Marks" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                </Grid>


        </DialogContent>

<DialogActions>

<Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={handleClose} onClick={()=>handleEditData()}>Save Changes</Button>
</DialogActions>
</Dialog>

)

}




    const handleDeleteData=async(rowData)=>{

      Swal.fire({
      title: 'Are You Sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
      }).then(async(input) => 
      {
        if (input.isConfirmed) 
        {
          var body={setid:rowData.setid}
          var result=await postData('createset/deleteset',body)
          fetchAllSets()
          if (result.result) 
          {

            Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Set Has Been Deleted Successfully !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'success',
              width:'600',
              height:'400',
            })

          }
          else{
          Swal.fire(
            {
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Failed To Delete Set !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',
  
            }
          )
          }
          
    
        
        } 
    })
    
  }


    function DisplaySets() {
      return (
        <MaterialTable
          title="List Of Sets"
          columns={[
            { title: 'Set ID', field: 'setid' },
            { title: 'Course Name', field: 'coursename' },
            { title: 'Semester', field: 'semester' },
            { title: 'Subject Name', field: 'subjectname' },
            { title: 'Set No', field: 'setno' },
            { title: 'Set Time', field: 'time' },
            { title: 'Set Status', field: 'status'},
            { title: 'Set Marks', field: 'marks'},
            
          ]}
          data={listSets}        
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Set',
              onClick: (event, rowData) =>handleEdit(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete Set',
              onClick: (event, rowData) =>handleDeleteData(rowData)
            }
          ]}
        />
      )
    }


    return(
      <div className={classes.bg}>
          <div className={classes.root}>
              <div style={{flexDirection:'column'}}>
                  <div className={classes.divv}>
                      <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:30,fontWeight:'bold',letterSpacing:1}}>
                          <img src="/exams.png" style={{padding:10,width:60,height:60}} />
                          LIST OF SETS
                      </div>

                  </div>
                  <div className={classes.subdiv}>

                      {DisplaySets()}
                      {showDialog()}

                  </div>
              </div>
          </div>
          </div>
    )






}