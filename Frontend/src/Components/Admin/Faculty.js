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
import DisplayAllFaculties from './DisplayAllFaculties';

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
        justifyContent:'center',
       
      
  
    },
    subdiv :{
          display:'flex',
          padding:20,
          width:900,
          borderRadius:15,
          border: '2px solid #52ab98',
          backgroundColor: '#c8d8e4'
        
  
    },
    divv :{
        display:'flex',
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

export default function Faculty(props)
{
    var classes=useStyles()
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



    useEffect(function(){
        fetchAllDepartments()
        fetchAllStates()

    },[])

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

    const [photo,setPhoto]=useState({bytes:'',file:'./photo.png'})
    const handlePhoto=(event)=>{
        if(event.target.files.length){
            setPhoto({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
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

    
    const handleSubmitFaculty=async()=>{

        var formData=new FormData()
        formData.append('firstname',fname)
        formData.append('lastname',lname)
        formData.append('fathersname',fathersname)
        formData.append('gender',gender)
        formData.append('dob',dob)
        formData.append('qualification',qualification)
        formData.append('departmentname',departmentname)
        formData.append('address',address)
        formData.append('state',state)
        formData.append('city',city)
        formData.append('mobileno',mobileno)
        formData.append('altmobileno',altmobileno)
        formData.append('email',email)
        formData.append('designation',designation)
        formData.append('password',password)

        formData.append('photo',photo.bytes)

        var result=await postDataAndImage('department/addfaculty',formData)
        console.log(result)
        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Faculty Record Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Faculty In The Database !',
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
                <div style={{display:'flex',marginLeft:220,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/faculty.png" style={{padding:10,width:50,height:50}} />
                        FACULTY INTERFACE
                        <div style={{paddingLeft:210}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllFaculties />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>
                <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enter Your First Name
                    </div>

                <CssTextField onChange={(event)=>setFirstName(event.target.value)} fullWidth label="First Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enter Your Last Name
                    </div>
                <CssTextField onChange={(event)=>setLastName(event.target.value)} fullWidth label="Last Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enter Your Father's Name
                    </div>
                <CssTextField onChange={(event)=>setFathersName(event.target.value)} fullWidth label="Father's Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-venus-mars"></i>
                        Gender
                    </div>
                
                <FormControl variant="filled" fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
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
                <CssTextField onChange={(event)=>setDOB(event.target.value)} fullWidth type="date" sx={{ input: { color: '#2b6777',fontFamily:'Serif' }}} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-info-circle"></i>
                        Qualification Details
                    </div>
                <CssTextField onChange={(event)=>setQualification(event.target.value)} fullWidth label="Qualification" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="far fa-building"></i>
                        Department Name
                    </div>
                
                       <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label">Department</InputLabel>
                       <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
         
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
                        Enter Your Address
                    </div>
                <CssTextField onChange={(event)=>setAddress(event.target.value)} fullWidth label="Address" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-satellite"></i>
                        Enter State
                    </div>

                    
                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label">States</InputLabel>
                       <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
         
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
                        Enter City
                    </div>

                    <FormControl variant="filled" fullWidth>
                   <InputLabel id="demo-simple-select-label">Cities</InputLabel>
                       <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
         
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
                        Enter Your Mobile No.
                    </div>
                <CssTextField onChange={(event)=>setMobileNo(event.target.value)} fullWidth label="Mobile No." sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Alternate Mobile No.
                    </div>
                <CssTextField onChange={(event)=>setAltMobileNo(event.target.value)} fullWidth label="Alternate Mobile No." sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-envelope"></i>
                        Enter Your Email ID
                    </div>
                <CssTextField onChange={(event)=>setEmail(event.target.value)} fullWidth label="Email" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Designation Details
                    </div>
                <CssTextField onChange={(event)=>setDesignation(event.target.value)} fullWidth label="Designation" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile"></i>
                        Password
                    </div>
                <CssTextField value={password} focused fullWidth label="Password" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
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
                        Upload Your Picture
                    </div>
                    <label htmlFor="contained-button-file">
                    <input onChange={(event)=>handlePhoto(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                    <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Upload
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
                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitFaculty()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>


                </Grid>
                    
                </div>
            </div>

        </div>
        </div>

    );
}