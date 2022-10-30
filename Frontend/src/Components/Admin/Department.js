import React,{useState} from "react";
import { makeStyles } from '@mui/styles';
import { Avatar } from "@mui/material";
import {Grid,TextField,Button,IconButton} from "@mui/material";
import { postData, ServerURL, postDataAndImage } from "./FetchNodeServices";
import Swal from "sweetalert2";
import { alpha, styled } from '@mui/material/styles';
import DisplayAllDepartments from './DisplayAllDepartments';



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
    border: '2px solid  #52ab98',
    backgroundColor: '#c8d8e4',
    marginBottom:213
  

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
export default function Department(props)
{
    var classes=useStyles()
    const [depname,setDepName]=useState()
    const [depicon,setDepIcon]=useState({bytes:'',file:'./depicon.png'})
    const handleSubmit=async()=>{

        var formData=new FormData()
        formData.append('departmentname',depname)
        formData.append('icon',depicon.bytes)

        var result=await postDataAndImage('department/adddepartment',formData)
        console.log(result)
        if (result.result)
        {
            Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Department Has Been Submitted Successfully !',
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
                text: 'Failed To Submit Department !',
                imageUrl: '/lms.png',
                imageWidth: 300,
                imageHeight: 100,
                icon: 'error',
                width:'600',
                height:'400',

            })

        }

    }
   
    const handleIconChange=(event)=>{
        if(event.target.files.length){
        setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        }
    }
    
    return(
        <div className={classes.bg}>
        <div className={classes.root}>
        <div style={{flexDirection:'column'}}>
            
            <div className={classes.divv}>
            
                
                    <div style={{display:'flex',marginLeft:90,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/depicon.png" style={{width:60,height:60}}></img>
                        DEPARTMENT INTERFACE
                        <div style={{paddingLeft:50}}>
                        <IconButton onClick={()=>props.setView(<DisplayAllDepartments />)} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                        
                    </div>
            </div>
            <div className={classes.subdiv}>
                
                <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <CssTextField sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} onChange={(event)=>setDepName(event.target.value)} fullWidth label="Department Name" color="secondary" variant="outlined" />
                
                  
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
                src={depicon.file}
                variant="rounded"
                sx={{ width: 150,height: 150}}
                />

                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                    <Button fullWidth onClick={()=>handleSubmit()} variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Save</Button>

                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

                    <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}>Reset</Button>

                </Grid>


            </Grid>
            </div>
            </div>
        </div>
        </div>
    );
    




}
