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
import { SettingsPowerRounded } from "@mui/icons-material";


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
    root: {
        display:"flex",
        alignContent:'center',
        justifyContent:'center'
      
  
    },
    subdiv :{
          display:'flex',
          padding:20,
          width:850,
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
        width:850,
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

export default function DisplayAllUnits(props)
{
    var classes=useStyles()
    const [unitId,setUnitId]=useState('')
    const [department,setDepartment]=useState('')
    const [course,setCourse]=useState('')
    const [subject,setSubject]=useState('')
    const [unitNo,setUnitNo]=useState('')
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
   
    const [listUnit,setListUnit]=useState([])
    const [listCourse,setListCourse]=useState([])
    const [listDepartment,setListDepartment]=useState([])
    const [listSubject,setListSubject]=useState([])
    const [open,setOpen]=useState(false)

    const fetchAllUnits=async()=>{
        var result=await getData("unit/displayallunits")
        setListUnit(result.result)
  
      }


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
        var result=await postData("subject/displaysubject",{courseid:courseid})
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
        fetchAllUnits()
        
  
      },[])

      const handleClose=()=>{
        setOpen(false)
  
  
      }

      const handleEditData=async()=>{

        var body={departmentid:department, courseid:course, subjectid:subject, unitno:unitNo, title:title, description:description, unitid:unitId}
        var result=await postData('unit/editunit',body)
        console.log(result)
        setOpen(false)
        if (result.result)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Unit Has Been Updated Successfully !',
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
                text: 'Failed To Update Unit !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',
  
            })
  
        }
        fetchAllUnits()
  
  
  


      }

      
      const handleEdit=(rowData)=>{

          setUnitId(rowData.unitid)
          setDepartment(rowData.departmentid)
          fetchCourses(rowData.departmentid)
          setCourse(rowData.courseid)
          fetchSubjects(rowData.courseid)
          setSubject(rowData.subjectid)
          setUnitNo(rowData.unitno)
          setTitle(rowData.title)
          setDescription(rowData.description)
          setOpen(true)
          


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
            var body={unitid:rowData.unitid}
            var result=await postData('unit/deleteunit',body)
            fetchAllUnits()
            if (result.result) 
            {

              Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Unit Has Been Deleted Successfully !',
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
                  text: 'Failed To Delete Unit !',
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

    
    const showDialog=()=>{

      return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth='sm'
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        
        <DialogContent>

                    <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:28,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/units.png" style={{padding:10,width:50,height:50}} />
                        EDIT UNITS
                        <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:260,fontSize:35}}></i>

                    </div>

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

                <CssTextField value={unitNo} onChange={(event)=>setUnitNo(event.target.value)} fullWidth label="Unit No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Unit Title
                    </div>

                <CssTextField value={title} onChange={(event)=>setTitle(event.target.value)} fullWidth label="Unit Title" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                
                        Enter Unit Description
                    </div>

                <CssTextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth label="Unit Description" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
            
            
            </Grid>



        </DialogContent>

        
<DialogActions>

<Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={handleClose} onClick={()=>handleEditData()}>Save Changes</Button>
</DialogActions>
</Dialog>

)

}



      function displayUnits() {
        return (
          <MaterialTable
            title="List Of Units"
            columns={[
              { title: 'Unit ID', field: 'unitid' },
              { title: 'Department', field: 'departmentname' },
              { title: 'Course', field: 'coursename' },
              { title: 'Subject', field: 'subjectname' },
              { title: 'Unit No', field: 'unitno' },
              { title: 'Title', field: 'title' },
              { title: 'description', field: 'description' },
              
            ]}
            data={listUnit}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Unit',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Unit',
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
                        <img src="/units.png" style={{padding:10,width:50,height:50}} />
                        LIST OF UNITS
                    </div>

                </div>
                <div className={classes.subdiv}>

                    {displayUnits()}
                    {showDialog()}

                </div>
                </div>
            </div>
            </div>


    )


    }