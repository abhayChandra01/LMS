import React ,{useEffect,useState} from "react";
import MaterialTable from "material-table";
import { makeStyles } from '@mui/styles';
import { Avatar } from "@mui/material";
import {Grid,TextField,Button} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';

import { postData, postDataAndImage,getData ,ServerURL } from "./FetchNodeServices";
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
    root: {
        display:"flex",
        alignContent:'center',
        justifyContent:'center'
      
  
    },
    subdiv :{
          
          padding:20,
          width:1200,
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
        width:1200,
        marginTop:30,
        border: '2px solid #52ab98',
        borderRadius:15,
        backgroundColor: '#c8d8e4',
        


  },
    
    inputstyle :{
          display:"none"
  
    },
    bg :{
        backgroundImage: `url("/bg.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
       
    
    }
  
  });


export default function DisplayAllFaculties(props){

  const [facultyid,setFacultyId]=useState('')
  const [fname,setFirstName]=useState('')
  const [lname,setLastName]=useState('')
  const [fathersname,setFathersName]=useState('')
  const [gender,setGender]=useState('')
  const [dob,setDOB]=useState('')
  const [qualification,setQualification]=useState('')
  const [departmentname,setDepartmentName]=useState('')
  const [address,setAddress]=useState('')
  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [mobileno,setMobileNo]=useState('')
  const [altmobileno,setAltMobileNo]=useState('')
  const [email,setEmail]=useState('')
  const [designation,setDesignation]=useState('')
  const [password,setPassword]=useState('')
  const [listDepartment,setListDepartment]=useState([])
  const [listStates,setListStates]=useState([])
  const [listCities,setListCities]=useState([])

  const [photo,setPhoto]=useState({bytes:'',file:'./photo.png'})
    const handlePhoto=(event)=>{
        if(event.target.files.length){
            setPhoto({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
            setBtnState(true)
        }
    }


  const [tempPhoto,setTempPhoto]=useState({bytes:'',file:''})

  const[btnState,setBtnState]=useState(false)

  const [open,setOpen]=useState(false)

    const [listFaculty,setListFaculty]=useState([])
    const fetchAllFaculties=async()=>{
      var result=await getData("department/displayallfaculties")
      setListFaculty(result.result)

    }

    useEffect(function(){
      fetchAllFaculties()
      fetchAllDepartments()
      fetchAllStates()


    },[])

    const handleEdit=(rowData)=>{

      setFacultyId(rowData.facultyid)
      setFirstName(rowData.firstname)
      setLastName(rowData.lastname)
      setFathersName(rowData.fathersname)
      setGender(rowData.gender)
      setDOB(rowData.dob)
      setQualification(rowData.qualification)
      setDepartmentName(rowData.department)
      setAddress(rowData.address)
      setState(rowData.state)
      fetchAllCities(rowData.state)
      setCity(rowData.city)
      setMobileNo(rowData.mobileno)
      setAltMobileNo(rowData.altmobileno)
      setEmail(rowData.email)
      setDesignation(rowData.designation)
      setPassword(rowData.password)

      setPhoto({bytes:'',file:`${ServerURL}/images/${rowData.photo}`})
      setTempPhoto({bytes:'',file:`${ServerURL}/images/${rowData.photo}`})

      setOpen(true)

    }


    const handleEditData=async()=>{

      var body={firstname:fname,lastname:lname,fathersname:fathersname,gender:gender,dob:dob,qualification:qualification,department:departmentname,address:address,state:state,city:city,mobileno:mobileno,altmobileno:altmobileno,email:email,designation:designation,password:password,facultyid:facultyid}
      var result=await postData('department/editfaculty',body)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Faculty Has Been Updated Successfully !',
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
              text: 'Failed To Update Faculty !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }
      fetchAllFaculties()

    }


    const handleDeleteData=(rowData)=>{

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
            var body={facultyid:rowData.facultyid,photo:rowData.photo}
            var result=await postData('department/deletefaculty',body)
            fetchAllFaculties()
            if (result.result) 
            {

              Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Faculty Has Been Deleted Successfully !',
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
                  text: 'Failed To Delete Faculty !',
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

    const handleEditPhoto=async()=>{
      var formData=new FormData()
      formData.append('facultyid',facultyid)
      formData.append('photo',photo.bytes)

      var result=await postDataAndImage('department/editphoto',formData)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Faculty Photo Has Been Updated Successfully !',
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
              text: 'Failed To Update Faculty Photo !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })
          

      }
      setBtnState(false)
      fetchAllFaculties()


    }


    const handleClose=()=>{
      setOpen(false)
      setBtnState(false)

    }

    const fetchAllDepartments=async()=>{
      var result=await getData("department/displayalldepartment")
      setListDepartment(result.result)

    }

    const fetchAllStates=async()=>{
      var result=await getData("statecity/displayallstates")
      setListStates(result.result)

    }

    const fetchAllCities=async(stateid)=>{
      var result=await postData("statecity/displayallcities",{stateid:stateid})
      setListCities(result.result)

    }


    const handleCancel=()=>{
      
      setPhoto({bytes:'',file:`${tempPhoto.file}`})
      setBtnState(false)
    }


    const handleGender = (event) => {
      setGender(event.target.value);
      
    };

    const handleDepartmentChange = (event) => {
      setDepartmentName(event.target.value);
      
    };

    const handleStateChange = (event) => {
      setState(event.target.value);
      fetchAllCities(event.target.value)
      
    };

    const handleCityChange = (event) => {
      setCity(event.target.value);
      
      
    };

    

    const fillStates=()=>{

      return(listStates.map((item)=>{
          return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

      })
      )

  }

  const fillCities=()=>{

      return(listCities.map((item)=>{
          return( <MenuItem value={item.cityid}>{item.cityname}</MenuItem>)

      })
      )

  }

  const handleGeneratePassword=()=>{

    var ar=['0','1','2','3','4','5','@','*','a','b','A','B',]
    var pwd=""

    for(var i=1;i<=8;i++)
    {
        var c=ar[Math.floor(Math.random()*9)]
        pwd+=c
    }
    setPassword(pwd)

}




    const fillDepartment=()=>{

      return(listDepartment.map((item)=>{
          return( <MenuItem value={item.departmentid}>{item.departmentname}</MenuItem>)

      })
      )

  }

    const showDialog=()=>{

      return(<Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth='md'
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        
        <DialogContent>
        
                    <div style={{display:'flex',justifyContent:'left',alignItems:'center',color:"#2b6777",marginBottom:5,fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/faculty.png" style={{marginRight:10,width:40,height:40}}></img>
                        EDIT FACULTY
                        <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:550,fontSize:35}}></i>
                    </div>

        
        <Grid container spacing={2}>

        <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        First Name
                    </div>

                <CssTextField focused onChange={(event)=>setFirstName(event.target.value)} value={fname} fullWidth label="First Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Last Name
                    </div>
                <CssTextField focused value={lname} onChange={(event)=>setLastName(event.target.value)} fullWidth label="Last Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Father's Name
                    </div>
                <CssTextField focused value={fathersname} onChange={(event)=>setFathersName(event.target.value)} fullWidth label="Father's Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-venus-mars"></i>
                        Gender
                    </div>
                
                <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label1">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label1"
          id="demo-simple-select1"
          value={gender}
          label="Gender"
          onChange={handleGender}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
          <MenuItem value="Prefer Not To Say">Prefer Not To Say</MenuItem>
        </Select>
      </FormControl>
               
                
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="far fa-calendar-alt"></i>
                        Date Of Birth
                    </div>
                <CssTextField focused value={dob} onChange={(event)=>setDOB(event.target.value)} fullWidth type="date" sx={{ input: { color: '#2b6777',fontFamily:'Serif' }}} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-info-circle"></i>
                        Qualification Details
                    </div>
                <CssTextField focused value={qualification} onChange={(event)=>setQualification(event.target.value)} fullWidth label="Qualification" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="far fa-building"></i>
                        Department Name
                    </div>
                
                       <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label2">Department</InputLabel>
                       <Select
                     labelId="demo-simple-select-label2"
                     id="demo-simple-select2"
                     value={departmentname}
                     label="Department"
                         onChange={handleDepartmentChange}
                     >

                         {fillDepartment()}
                   
                 </Select>
             </FormControl>
                
               
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-map-marked"></i>
                        Address
                    </div>
                <CssTextField focused value={address} onChange={(event)=>setAddress(event.target.value)} fullWidth label="Address" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-satellite"></i>
                        State
                    </div>

                    
                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label3">States</InputLabel>
                       <Select
                
                     labelId="demo-simple-select-label3"
                     id="demo-simple-select3"
         
                     value={state}
                     label="State"
                         onChange={handleStateChange}
                     >

                         {fillStates()}
                   
                 </Select>
             </FormControl>
                


                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-city"></i>
                        City
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label4">Cities</InputLabel>
                       <Select
            
                     labelId="demo-simple-select-label4"
                     id="demo-simple-select4"
         
                     value={city}
                     label="City"
                         onChange={handleCityChange}
                     >

                         {fillCities()}
                   
                 </Select>
             </FormControl>
                


                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile"></i>
                        Mobile No.
                    </div>
                <CssTextField focused value={mobileno} onChange={(event)=>setMobileNo(event.target.value)} fullWidth label="Mobile No." sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Mobile No.
                    </div>
                <CssTextField focused value={altmobileno} onChange={(event)=>setAltMobileNo(event.target.value)} fullWidth label="Alternate Mobile No." sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-envelope"></i>
                        Email ID
                    </div>
                <CssTextField focused value={email} onChange={(event)=>setEmail(event.target.value)} fullWidth label="Email" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Designation Details
                    </div>
                <CssTextField focused value={designation} onChange={(event)=>setDesignation(event.target.value)} fullWidth label="Designation" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile"></i>
                        Password
                    </div>
                <CssTextField focused value={password} focused fullWidth label="Password" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{marginTop:35}}>
                    <Button fullWidth variant="contained" onClick={()=>handleGeneratePassword()} style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Create Password
                    </Button>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Picture
                    </div>
                    <label htmlFor="contained-button-file">
                    <input onChange={(event)=>handlePhoto(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Change Photo
                    </Button>
                    </label>
                </Grid>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Photo Preview
                    </div>

                    <Avatar
                    alt="Upload Image"
                    src={photo.file}
                    variant="rounded"
                    sx={{ width: 150,height: 150,}}
                    />

                    
                </Grid>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                {btnState?<><Button variant="contained" onClick={()=>handleCancel()} style={{backgroundColor:'#52ab98',width:200,fontFamily:"Monaco",color:"#fff",marginRight:10,marginLeft:70}}>Reset Icon</Button><Button onClick={()=>handleEditPhoto()} variant="contained" style={{backgroundColor:'#52ab98',width:200,fontFamily:"Monaco",color:"#fff"}}>Save Icon</Button></>:<></>}

                </Grid>
               
            
            
        </Grid>



        </DialogContent>
        <DialogActions>
          
          <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={handleClose} onClick={()=>handleEditData()}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      )}


    var classes=useStyles()
    function DisplayFaculties() {
        return (
          <MaterialTable
            title="List Of Faculties"
            columns={[
              { title: 'Faculty ID', field: 'facultyid' },
              { title: 'Name',
              render:(rowData)=>(<div>{rowData.firstname} {rowData.lastname}</div>) },
              { title: 'Fathers Name', field: 'fathersname' },
              { title: 'Gender/DOB',
              render:(rowData)=>(<div>{rowData.gender}<br/>{rowData.dob}</div>) },
              { title: 'Qualification', field: 'qualification' },
              { title: 'Designation/Department', 
              render:(rowData)=>(<div>{rowData.designation}<br/>{rowData.departmentname}</div>) },
              { title: 'Address',
              render:(rowData)=>(<div>{rowData.address}<br/> {rowData.cityname},<br/>{rowData.statename} </div>) },
              { title: 'Contact Details', 
              render:(rowData)=>(<div>{rowData.mobileno}<br/> {rowData.altmobileno}<br/> {rowData.email}</div>) },
              //{ title: 'Password', field: 'password' },
              { title: 'Photo ID', field: 'photo',
              render: rowData => <img src={`${ServerURL}/images/${rowData.photo}`} style={{width: 50, borderRadius: '30%'}}/>
            },
              
            ]}
            data={listFaculty}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Faculty',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Faculty',
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
                            <img src="/depttlist.png" style={{padding:10,width:60,height:60}} />
                            LIST OF FACULTIES
                        </div>

                    </div>
                    <div className={classes.subdiv}>
                        {DisplayFaculties()}
                        {showDialog()}
                    </div>
                
                </div>    
            </div>
        </div>


      )







}