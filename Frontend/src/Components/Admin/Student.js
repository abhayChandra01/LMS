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
import DisplayAllStudents from './DisplayAllStudents';



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
          width:1000,
          borderRadius:15,
          border: '2px solid #52ab98',
          backgroundColor: '#c8d8e4',
          marginBottom:100
        
  
    },
    divv :{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        height:70,
        width:1000,
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

export default function Student(props)
{
    var classes=useStyles()

    const [enrollmentNo,setEnrollmentNo]=useState('')
    const [studentName,setStudentName]=useState('')
    const [gender,setGender]=useState('')
    const [fatherName,setFatherName]=useState('')
    const [motherName,setMotherName]=useState('')
    const [dob,setDob]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [parentMobileNo,setParentMobileNo]=useState('')
    const [email,setEmail]=useState('')
    const [currentCity,setCurrentCity]=useState('')
    const [currentState,setCurrentState]=useState('')
    const [permanentCity,setPermanentCity]=useState('')
    const [permanentState,setPermanentState]=useState('')
    const [currentAddress,setCurrentAddress]=useState('')
    const [permanentAddress,setPermanentAddress]=useState('')
    const [parentOccupation,setParentOccupation]=useState('')
    const [annualIncome,setAnnualIncome]=useState('')
    const [aadharNo,setAadharNo]=useState('')
    const [domicile,setDomicile]=useState('')
    const [department,setDepartment]=useState('')
    const [course,setCourse]=useState('')

    const [nationality,setNationality]=useState('')
    const [category,setCategory]=useState('')

    const [password,setPassword]=useState('')


    const [listStates,setListStates]=useState([])
    const [listCities,setListCities]=useState([])
    const [listStates1,setListStates1]=useState([])
    const [listCities1,setListCities1]=useState([])
    const [listCourse,setListCourse]=useState([])
    const [listDepartment,setListDepartment]=useState([])

    const [aadharPhoto,setAadharPhoto]=useState({bytes:'',file:'./aadhar.png'})
    
    const [domicilePhoto,setDomicilePhoto]=useState({bytes:'',file:'./domicile.png'})
    const [photo,setPhoto]=useState({bytes:'',file:'./photo.png'})

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


    const handleCourseChange = (event) => {
        setCourse(event.target.value);
       
      };

      const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
        fetchCourses(event.target.value)
        
      };

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
  


    const fetchAllStates=async()=>{
        var result=await getData("statecity/displayallstates")
        setListStates(result.result)
  
      }

      
    const handleAadhar=(event)=>{
        if(event.target.files.length){
            setAadharPhoto({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }

    const handleDomicilePhoto=(event)=>{
        if(event.target.files.length){
            setDomicilePhoto({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }

    const handlePhoto=(event)=>{
        if(event.target.files.length){
            setPhoto({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }


      const fetchAllCities=async(stateid)=>{
        var result=await postData("statecity/displayallcities",{stateid:stateid})
        setListCities(result.result)
  
      }

      const fetchAllStates1=async()=>{
        var result=await getData("statecity/displayallstates")
        setListStates1(result.result)
  
      }

      const fetchAllCities1=async(stateid)=>{
        var result=await postData("statecity/displayallcities",{stateid:stateid})
        setListCities1(result.result)
  
      }

    const handleCurrentStateChange = (event) => {
        setCurrentState(event.target.value);
        fetchAllCities(event.target.value)
        
      };

      const handlePermanentStateChange = (event) => {
        setPermanentState(event.target.value);
        fetchAllCities1(event.target.value)
        
      };

      const fillStates=()=>{

        return(listStates.map((item)=>{
            return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

        })
        )

    }
    const fillStates1=()=>{

        return(listStates1.map((item)=>{
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
    const fillCities1=()=>{

        return(listCities1.map((item)=>{
            return( <MenuItem value={item.cityid}>{item.cityname}</MenuItem>)

        })
        )

    }

    const handleCurrentCityChange = (event) => {
        setCurrentCity(event.target.value);
        
        
      };

      const handlePermanentCityChange = (event) => {
        setPermanentCity(event.target.value);
        
        
      };


      const handleGender = (event) => {
        setGender(event.target.value);
        
      };
      const handleNationality = (event) => {
        setNationality(event.target.value);
        
      };
      const handleDomicile = (event) => {
        setDomicile(event.target.value);
        
      };
      const handleCategory = (event) => {
        setCategory(event.target.value);
        
      };

      const handleSubmitStudent=async()=>{

        var formData=new FormData()
        formData.append('enrollmentno',enrollmentNo)
        formData.append('studentname',studentName)
        formData.append('gender',gender)
        formData.append('dob',dob)
        formData.append('nationality',nationality)
        formData.append('category',category)
        formData.append('fathername',fatherName)
        formData.append('mothername',motherName)
        formData.append('currentaddress',currentAddress)
        formData.append('currentstate',currentState)
        formData.append('currentcity',currentCity)
        formData.append('permanentaddress',permanentAddress)
        formData.append('permanentstate',permanentState)
        formData.append('permanentcity',permanentCity)
        formData.append('mobileno',mobileNo)
        formData.append('parentmobileno',parentMobileNo)
        formData.append('email',email)
        formData.append('parentoccupation',parentOccupation)
        formData.append('annualincome',annualIncome)
        formData.append('aadharno',aadharNo)
        formData.append('domicile',domicile)
        formData.append('departmentid',department)
        formData.append('courseid',course)
        formData.append('password',password)

        formData.append('aadhar',aadharPhoto.bytes)
        formData.append('domiciledocument',domicilePhoto.bytes)
        formData.append('photo',photo.bytes)

        var result=await postDataAndImage('student/addstudent',formData)
        console.log(result)
        if (result.aresult)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Student Record Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Student In The Database !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }



      }



      useEffect(function(){
       
        fetchAllStates()
        fetchAllStates1()
        fetchAllDepartments()

    },[])


    return(
        <div className={classes.bg}>
        <div className={classes.root}>
            <div style={{flexDirection:'column'}}>
                <div className={classes.divv}>
                <div style={{display:'flex',marginLeft:250,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/student.png" style={{padding:10,width:60,height:60}} />
                        STUDENT INTERFACE
                        <div style={{paddingLeft:240}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllStudents />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <div style={{color:"#2b6777",fontSize:20,fontFamily:"serif",fontWeight:'bold'}}>
                        PERSONAL DETAILS <i style={{marginLeft:3}} class="fas fa-user-check"></i>
                        <hr style={{marginRight:900,width:200,color: "#2b6777",backgroundColor: "#2b6777",height: 2,marginTop:3}}/>
                    </div>
                    
            
                </Grid>
               
                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-signature"></i>
                        Enrollment No
                    </div>

                <CssTextField onChange={(event)=>setEnrollmentNo(event.target.value)} size="small" fullWidth label="Enrollment No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-user-graduate"></i>
                        Student's Name
                    </div>

                <CssTextField onChange={(event)=>setStudentName(event.target.value)} size="small" fullWidth label="Student's Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-venus-mars"></i>
                        Gender
                    </div>
                
                <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          
          size="small"
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
                <CssTextField onChange={(event)=>setDob(event.target.value)} size="small" fullWidth type="date" sx={{ input: { color: '#2b6777',fontFamily:'Serif' }}} variant="outlined" />
                </Grid>

                <Grid item xs={2}>

                <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-flag"></i>
                        Nationality
                    </div>
                
                <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label5">Nationality</InputLabel>
        <Select
          labelId="demo-simple-select-label5"
          id="demo-simple-select5"
          
          size="small"
          value={nationality}
          label="Nationality"
          onChange={handleNationality}
        >
          <MenuItem value="Indian">Indian</MenuItem>
          <MenuItem value="NRI">Non Resident Indian (NRI)</MenuItem>
          
        </Select>
      </FormControl>
               

                </Grid>
                <Grid item xs={2}>

                <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-user-tag"></i>
                        Category
                    </div>
                
                <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label6">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label6"
          id="demo-simple-select6"
          
          size="small"
          value={category}
          label="Category"
          onChange={handleCategory}
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="OBC">Other Backward Classes (OBC)</MenuItem>
          <MenuItem value="SC">Scheduled Castes</MenuItem>
          <MenuItem value="ST">Scheduled Tribes</MenuItem>


        </Select>
      </FormControl>


                    </Grid>

                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-user"></i>
                        Father's Name
                    </div>

                <CssTextField onChange={(event)=>setFatherName(event.target.value)} size="small" fullWidth label="Father's Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="far fa-user"></i>
                        Mother's Name
                    </div>

                <CssTextField onChange={(event)=>setMotherName(event.target.value)} size="small" fullWidth label="Mother's Name" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                

                

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-map-marked"></i>
                        Current Address
                    </div>

                <CssTextField onChange={(event)=>setCurrentAddress(event.target.value)} size="small" fullWidth label="Current Address" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-satellite"></i>
                        Current State
                    </div>

                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label1">States</InputLabel>
                       <Select
                     labelId="demo-simple-select-label1"
                     id="demo-simple-select1"
                     size="small"   
                     value={currentState}
                     label="State"
                         onChange={handleCurrentStateChange}
                     >

                         {fillStates()}
                   
                 </Select>
             </FormControl>
                

                </Grid>

                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-city"></i>
                        Current City
                    </div>

                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label2">Cities</InputLabel>
                       <Select
                     labelId="demo-simple-select-label2"
                     id="demo-simple-select2"
                     size="small"
                     value={currentCity}
                     label="City"
                         onChange={handleCurrentCityChange}
                     >

                         {fillCities()}
                   
                 </Select>
             </FormControl>               
              </Grid>

              <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-map-marked"></i>
                        Permanent Address
                    </div>

                <CssTextField onChange={(event)=>setPermanentAddress(event.target.value)} size="small" fullWidth label="Permanent Address" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-satellite"></i>
                        Permanent State
                    </div>

                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label3">States</InputLabel>
                       <Select
                     labelId="demo-simple-select-label3"
                     id="demo-simple-select3"
                     size="small"   
                     value={permanentState}
                     label="State"
                         onChange={handlePermanentStateChange}
                     >

                         {fillStates1()}
                   
                 </Select>
             </FormControl>
                

                </Grid>

                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-city"></i>
                        Permanent City
                    </div>

                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label4">Cities</InputLabel>
                       <Select
                     labelId="demo-simple-select-label4"
                     id="demo-simple-select4"
                     size="small"
                     value={permanentCity}
                     label="City"
                         onChange={handlePermanentCityChange}
                     >

                         {fillCities1()}
                   
                 </Select>
             </FormControl>               
              </Grid>

              <Grid item xs={12}>
                
                    <div style={{color:"#2b6777",fontSize:20,fontFamily:"serif",fontWeight:'bold',marginTop:10}}>
                        CONTACT DETAILS<i style={{marginLeft:3}} class="fas fa-phone"></i>
                        <hr style={{marginRight:900,width:200,color: "#2b6777",backgroundColor: "#2b6777",height: 2,marginTop:3}}/>
                    </div>
                    
            
                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Mobile No
                    </div>

                <CssTextField onChange={(event)=>setMobileNo(event.target.value)} size="small" fullWidth label="Mobile No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile"></i>
                        Parent's Mobile No
                    </div>

                <CssTextField onChange={(event)=>setParentMobileNo(event.target.value)} size="small" fullWidth label="Parent's Mobile No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-at"></i>
                        Email ID
                    </div>

                <CssTextField onChange={(event)=>setEmail(event.target.value)} size="small" fullWidth label="Email ID" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                
                <div style={{color:"#2b6777",fontSize:20,fontFamily:"serif",fontWeight:'bold',marginTop:10}}>
                    DOCUMENTATION<i style={{marginLeft:3}} class="far fa-file-alt"></i>
                    <hr style={{marginRight:900,width:200,color: "#2b6777",backgroundColor: "#2b6777",height: 2,marginTop:3}}/>
                </div>
                
        
            </Grid>
            <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-user-md"></i>
                        Parent's Occupation
                    </div>

                <CssTextField onChange={(event)=>setParentOccupation(event.target.value)} size="small" fullWidth label="Parent's Occupation" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={6}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-rupee-sign"></i>
                        Annual Income
                    </div>

                <CssTextField onChange={(event)=>setAnnualIncome(event.target.value)} size="small" fullWidth label="Annual Income" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>

                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fab fa-angular"></i>
                        Aadhar No
                    </div>

                <CssTextField onChange={(event)=>setAadharNo(event.target.value)} size="small" fullWidth label="Aadhar No" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-upload"></i>
                        Upload Aadhar
                    </div>
                    <label htmlFor="contained-button-file3">
                <input onChange={(event)=>handleAadhar(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file3" multiple type="file" />
                <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Upload
                </Button>
                </label>
                

                </Grid>

                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fab fa-angular"></i>
                        Domicile
                    </div>

 
                    <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-label6">Domicile</InputLabel>
        <Select
          labelId="demo-simple-select-label6"
          id="demo-simple-select6"
          
          size="small"
          value={domicile}
          label="Domicile"
          onChange={handleDomicile}
        >
          <MenuItem value="State">State</MenuItem>
          <MenuItem value="Other State">Other State</MenuItem>
          
        </Select>
      </FormControl>              
        </Grid>
                <Grid item xs={2}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-upload"></i>
                        Upload Domicile
                    </div>
                    <label htmlFor="contained-button-file2">
                <input onChange={(event)=>handleDomicilePhoto(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file2" multiple type="file" />
                <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Upload
                </Button>
                </label>
                

                </Grid>
                <Grid item xs={4}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-file-upload"></i>
                        Upload Photo
                    </div>
                    <label htmlFor="contained-button-file1">
                <input onChange={(event)=>handlePhoto(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file1" multiple type="file" />
                <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Upload
                </Button>
                </label>
                

                </Grid>

                



                <Grid item xs={4} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Aadhar Preview
                    </div>

                    <Avatar
                    alt="Upload Aadhar"
                    src={aadharPhoto.file}
                    variant="rounded"
                    sx={{ width: 150,height: 150,}}
                    />

                    
                </Grid>
                <Grid item xs={4} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile-alt"></i>
                        Domicile Preview
                    </div>

                    <Avatar
                    alt="Upload Domicile"
                    src={domicilePhoto.file}
                    variant="rounded"
                    sx={{ width: 150,height: 150,}}
                    />

                    
                </Grid>
                <Grid item xs={4} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
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

                <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Select Department
                    </div>

                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label0">Departments</InputLabel>
                       <Select
                     labelId="demo-simple-select-label0"
                     id="demo-simple-select0"
                     size="small"
                     value={department}
                     label="Department"
                         onChange={handleDepartmentChange}
                     >

                         {fillDepartment()}
                   
                 </Select>
             </FormControl>
             </Grid>
             <Grid item xs={3}>
             <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-building"></i>
                    
                        Select Course
                    </div>
                    <FormControl variant="standard" fullWidth>
                   <InputLabel id="demo-simple-select-label6">Courses</InputLabel>
                       <Select
                     labelId="demo-simple-select-label6"
                     id="demo-simple-select6"
                     size="small"
                     value={course}
                     label="Courses"
                         onChange={handleCourseChange}
                     >

                         {fillCourses()}
                   
                 </Select>
             </FormControl>
                    

              </Grid>

              <Grid item xs={3}>
                    <div style={{display:'flex',justifyContent:'right',alignItems:'center',color:"#2b6777",fontSize:15,marginBottom:5,fontStyle:'italic'}}>
                    <i style={{paddingRight:5}} class="fas fa-mobile"></i>
                        Password
                    </div>
                <CssTextField size="small" value={password} focused fullWidth label="Password" sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <div style={{marginTop:25}}>
                    <Button fullWidth variant="contained" onClick={()=>handleGeneratePassword()} style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Create Password
                    </Button>
                    </div>
                </Grid>

                <Grid item xs={12}>
                <Button fullWidth onClick={()=>handleSubmitStudent()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>
                </Grid>
               
                
                
                
                
                </Grid>
                
            

                </div>
            </div>
        </div>
    </div>
    )



}