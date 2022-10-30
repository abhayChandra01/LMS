import React,{useState , useEffect} from "react";
import { makeStyles } from '@mui/styles';
import { Avatar } from "@mui/material";
import {Grid,TextField,Button,IconButton} from "@mui/material";
import { postData, ServerURL, getData, postDataAndImage } from "../Admin/FetchNodeServices";
import Swal from "sweetalert2";
import { alpha, styled } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { deepOrange , deepPurple } from "@mui/material/colors";
import DisplayQuestion from "./DisplayQuestion";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';


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
    
    qnbox: {
        display:"flex",
        alignContent:'center',
        justifyContent:'center',
        
        backgroundColor: '#c8d8e4',
        padding:10,
        borderRadius:10,
        marginTop:20,
        marginLeft:15,
        flexDirection:'row',
        border: '2px solid black',
        boxShadow: "1px 1px 2px black",
        
  
    },

    bg :{
        backgroundImage: `url("/bg.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
    
    },
    root: {
      display:"flex",
      
      justifyContent:'left'
    

  },
    
    
  });

export default function OnlineTest(props)
{
    var classes=useStyles()

    const [qList,setqList]=useState([])
    const [time,setTime] = useState({min:59,sec:59})
    const [refresh,setRefresh] = useState(true)

    var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    var months=['January','February','March','April','May','June','July','August','September','October','November','December']
    
    var d=new Date()
    var cd=days[d.getDay()]+","+d.getDate()+","+months[d.getMonth()]+","+d. getFullYear()
    var et

    function StudentAppBar() {
      return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{backgroundImage: `url("/bg1.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',}} position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 ,color:'#2b6777'}}
              >
                <MenuIcon />
              </IconButton>

              <div style={{flexGrow:1,fontSize:'12',fontFamily:'Rubik',flexDirection:'column',color:"#2b6777",marginRight:5}}>
              <div>
               {cd}
              </div>
              <div>
              Computer Fundamental
              </div>
              </div>
              
              <div style={{flexGrow:1,fontSize:'12',fontFamily:'Rubik',flexDirection:'column',color:"#2b6777",marginRight:5}}>
              <div>
               Paper Code :[001]
              </div>
              <div>
              Computer Fundamental
              </div>
              </div>


              <div style={{display:'flex',fontSize:'12',fontFamily:'Rubik',flexDirection:'column',color:"#2b6777",marginRight:5}}>
              <div>
                Abhay Chandra IT-001
              </div>
              <div>
                Information Technology
              </div>
              </div>
              <Avatar alt="Remy Sharp" src="/1.jpg" />
            </Toolbar>
          </AppBar>
        </Box>
      );
    }




    const fetchAllQuestions=async()=>{

        var result = await postData('questions/fetchallquestions',{setid:'3'})
        setqList(result.result)
        

    }

    function examWatch(){
      
      setTime((t)=>{
        var sec = t.sec-1;
        if(sec==0) return {min:t.min-1,sec:59}
        else return {min:t.min,sec:sec}

      })
      setRefresh(!refresh)
    }

    const startWatch=()=>{
      et=setInterval(examWatch,1000)

    }


    const displayQuestionNumber=()=>{
        return qList.map((item)=>{

            return(<Grid item xs={2}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.questionno}</Avatar>
                </Grid>
            )

        })


    }

    useEffect(function () {

       fetchAllQuestions()
       startWatch()


    }, [])



    return(

    <div className={classes.bg}>
      {StudentAppBar()}

        <Grid container spacing={2}>
          <Grid item xs={3}>
       <div className={classes.root}>
        <div className={classes.qnbox}>

        <Grid container spacing={2}>
            <Grid item xs={12}>

            <Box component="span" style={{borderRadius:20,marginLeft:100,width:100,p: 2, border: '2px solid #2b6777', fontFamily:'Old Standard TT',fontSize:28,display:'flex',justifyContent:'center'}}>
              {time.min>=0 && time.min<=9?`0${time.min}`:`${time.min}`}:{time.sec>=0 && time.sec<=9?`0${time.sec}`:`${time.sec}`}
              </Box>
            </Grid>
            <Grid item xs={12}>
            <Grid container spacing={2}>
                {displayQuestionNumber()}
            </Grid>
            </Grid>
        </Grid>
        </div>
        

        </div>
        </Grid>
        <Grid item xs={9}>
          <DisplayQuestion />
        </Grid>
        </Grid>
    </div>

    )
}