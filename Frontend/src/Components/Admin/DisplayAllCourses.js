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
          width:900,
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
        width:900,
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


export default function DisplayAllCourses(props){

    var classes = useStyles()
    const [listCourses,setListCourses]=useState([])

    const [courseId,setCourseId]=useState('')
    const [department,setDepartment]=useState('')
    const [courseName,setCourseName]=useState('')
    const [semesters,setSemesters]=useState('')
    const [feePerSem,setFeePerSem]=useState('')
    const [courseIcon,setCourseIcon]=useState({bytes:'',file:'./coursesicon.png'})
    const [tempIcon,setTempIcon]=useState({bytes:'',file:''})
    const [open,setOpen]=useState(false)
    const [listDepartment,setListDepartment]=useState([])
    const[btnState,setBtnState]=useState(false)




    const fetchAllCourses=async()=>{
        var result=await getData("courses/displayallcourses")
        setListCourses(result.result)
  
      }

      const handleCancel=()=>{
      
        setCourseIcon({bytes:'',file:`${tempIcon.file}`})
        setBtnState(false)
      }


      const handleEditIcon=async()=>{
        var formData=new FormData()
        formData.append('courseid',courseId)
        formData.append('courseicon',courseIcon.bytes)
  
        var result=await postDataAndImage('courses/editcourseicon',formData)
        console.log(result)
        setOpen(false)
        if (result.result)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Course Icon Has Been Updated Successfully !',
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
                text: 'Failed To Update Course Icon !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',
  
            })
            
  
        }
        setBtnState(false)
        fetchAllCourses()
  
  
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
        fetchAllCourses()
        fetchAllDepartments()
  
      },[])

    function DisplayCourses() {
        return (
          <MaterialTable
            title="List Of Coursess"
            columns={[
              { title: 'Course ID', field: 'courseid' },
              { title: 'Department', field: 'departmentname' },
              { title: 'Course Name', field: 'coursename' },
              { title: 'Semesters', field: 'semesters' },
              { title: 'Fees Per Semester', field: 'feepersem' },
              { title: 'Course Icon', field: 'courseicon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.courseicon}`} style={{width: 50, borderRadius: '50%'}}/>
            },
              
            ]}
            data={listCourses}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Course',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Course',
                onClick: (event, rowData) =>handleDeleteData(rowData)
              }
            ]}
          />
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
            var body={courseid:rowData.courseid,courseicon:rowData.courseicon}
            var result=await postData('courses/deletecourse',body)
            fetchAllCourses()
            if (result.result) 
            {

              Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Course Has Been Deleted Successfully !',
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
                  text: 'Failed To Delete Course !',
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




const handleEditData=async()=>{

      var body={departmentid:department,coursename:courseName,semesters:semesters,feepersem:feePerSem,courseid:courseId}
      var result=await postData('courses/editcourse',body)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Course Has Been Updated Successfully !',
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
              text: 'Failed To Update Course !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }
      fetchAllCourses()

    }
      const handleClose=()=>{
        setOpen(false)
       setBtnState(false)
  
      }

      const handleIconChange=(event)=>{
        if(event.target.files.length){
        setCourseIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnState(true)
        }
    }

  

      const handleEdit=(rowData)=>{

        setCourseId(rowData.courseid)
        setDepartment(rowData.departmentid)
        setCourseName(rowData.coursename)
        setSemesters(rowData.semesters)
        setFeePerSem(rowData.feepersem)
        setCourseIcon({bytes:'',file:`${ServerURL}/images/${rowData.courseicon}`})
        setTempIcon({bytes:'',file:`${ServerURL}/images/${rowData.courseicon}`})
        setOpen(true)
        


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
                          <img src="/courses.png" style={{width:60,height:60}}></img>
                          EDIT COURSES
                          <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:250,fontSize:35}}></i>
                      </div>
                      <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Department
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label5">Department</InputLabel>
                       <Select
                     labelId="demo-simple-select-label5"
                     id="demo-simple-select5"
         
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

                <CssTextField value={courseName} onChange={(event)=>setCourseName(event.target.value)} fullWidth label="Course Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-book"></i>
                    
                        Enter No. Of Semesters
                    </div>

                <CssTextField value={semesters} onChange={(event)=>setSemesters(event.target.value)} fullWidth label="No. Of Semesters" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-rupee-sign"></i>
                    
                        Enter Fee Per Semester
                    </div>

                <CssTextField value={feePerSem} onChange={(event)=>setFeePerSem(event.target.value)} fullWidth label="Fee Per Semester" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
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
                <Grid item xs={12} style={{marginTop:10}}>
                {btnState?<><Button variant="contained" onClick={()=>handleCancel()} style={{backgroundColor:'#52ab98',width:200,fontFamily:"Monaco",color:"#fff",marginRight:10,marginLeft:70}}>Reset Icon</Button><Button onClick={()=>handleEditIcon()} variant="contained" style={{backgroundColor:'#52ab98',width:200,fontFamily:"Monaco",color:"#fff"}}>Save Icon</Button></>:<></>}

                </Grid>



                </Grid>


                      </DialogContent>

                      <DialogActions>
          
          <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={handleClose} onClick={()=>handleEditData()}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      )

    }
  

      return(
        <div className={classes.bg}>
            <div className={classes.root}>
                <div style={{flexDirection:'column'}}>
                    <div className={classes.divv}>
                        <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:30,fontWeight:'bold',letterSpacing:1}}>
                            <img src="/courses.png" style={{padding:10,width:60,height:60}} />
                            LIST OF COURSES
                        </div>

                    </div>
                    <div className={classes.subdiv}>

                        {DisplayCourses()}
                        {showDialog()}

                    </div>
                </div>
            </div>
            </div>
      )



}