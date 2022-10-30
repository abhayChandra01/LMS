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


export default function DisplayAllSubjects(props){

    var classes = useStyles()
    const [listSubjects,setListSubjects]=useState([])

    const [subjectId,setSubjectId]=useState('')
    const [course,setCourse]=useState('')
    const [semesters,setSemesters]=useState('')
    const [subType,setSubType]=useState('')
    const [department,setDepartment]=useState('')
    const [subMarks,setSubMarks]=useState('')
    const [subName,setSubName]=useState('')


    const [listCourse,setListCourse]=useState([])
    const [listDepartment,setListDepartment]=useState([])
    const [listSemesters,setListSemesters]=useState([])
    const [open,setOpen]=useState(false)
    const[btnState,setBtnState]=useState(false)

    const fetchAllSubjects=async()=>{
        var result=await getData("subject/displayallsubjects")
        setListSubjects(result.result)
  
      }

      const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        fetchCourses(event.target.value)
        
      };

      const fetchCourses=async(departmentid)=>{
        var result=await postData("courses/displaycourses",{departmentid:departmentid})
        setListCourse(result.result)
  
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

    const fetchAllSemesters=async(courseid)=>{
      var body={courseid:courseid}
      var result=await postData("courses/displayallsemesters",body)
      setListSemesters(result.result[0].semesters)
      
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

    
    const fillCourses=()=>{

      return(listCourse.map((item)=>{
        
          return(
            <MenuItem value={item.courseid}>{item.coursename}</MenuItem> )

      })
      )

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

      useEffect(function(){
        fetchAllSubjects()
        fetchAllDepartments()
       
  
      },[])

      const handleClose=()=>{
        setOpen(false)
       setBtnState(false)
  
      }

      const handleEditData=async()=>{

        var body={departmentid:department,courseid:course,semesters:semesters,subjectname:subName,subjecttype:subType,subjectmarks:subMarks,subjectid:subjectId}
      var result=await postData('subject/editsubject',body)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Subject Has Been Updated Successfully !',
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
              text: 'Failed To Update Subject !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }
      fetchAllSubjects()



      }

      const handleEdit=(rowData)=>{

        setSubjectId(rowData.subjectid)
        setDepartment(rowData.departmentid)
        fetchCourses(rowData.departmentid)
        setCourse(rowData.courseid)
        fetchAllSemesters(rowData.courseid)  
        setSemesters(rowData.semesters)
        setSubName(rowData.subjectname)
        setSubType(rowData.subjecttype)
        setSubMarks(rowData.subjectmarks)


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
            var body={subjectid:rowData.subjectid}
            var result=await postData('subject/deletesubject',body)
            fetchAllSubjects()
            if (result.result) 
            {

              Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Subject Has Been Deleted Successfully !',
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
                  text: 'Failed To Delete Subject !',
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
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        
        <DialogContent>

        <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:28,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/subjects.png" style={{padding:10,width:90,height:70}} />
                        EDIT SUBJECTS
                        <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:170,fontSize:35}}></i>

                    </div>

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
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
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
                     label="Department"
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

                <CssTextField value={subName} onChange={(event)=>setSubName(event.target.value)} fullWidth label="Subject Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
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

                <CssTextField value={subMarks} onChange={(event)=>setSubMarks(event.target.value)} fullWidth label="Subject Marks" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                


                </Grid>
              </Grid>

        </DialogContent>

<DialogActions>

<Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={handleClose} onClick={()=>handleEditData()}>Save Changes</Button>
</DialogActions>
</Dialog>

)

}



    function displaySubjects() {
        return (
          <MaterialTable
            title="List Of Subjects"
            columns={[
              { title: 'Subject ID', field: 'subjectid' },
              { title: 'Department', field: 'departmentname' },
              { title: 'Course', field: 'coursename' },
              { title: 'Semester', field: 'semesters' },
              { title: 'Subject Name', field: 'subjectname' },
              { title: 'Subject Type', field: 'subjecttype' },
              { title: 'Subject Marks', field: 'subjectmarks' },
              
            ]}
            data={listSubjects}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subjects',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Subjects',
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
                        <img src="/subjects.png" style={{padding:10,width:90,height:70}} />
                        LIST OF SUBJECTS
                    </div>

                </div>
                <div className={classes.subdiv}>

                    {displaySubjects()}
                    {showDialog()}

                </div>
                </div>
            </div>
            </div>


    )
}