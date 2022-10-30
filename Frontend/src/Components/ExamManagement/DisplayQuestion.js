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

import { Chip } from "@mui/material";
import { Done } from "@mui/icons-material";

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
    
    qnbox2: {
        display:"flex",
        // alignContent:'center',
        // justifyContent:'center',
        backgroundColor: '#c8d8e4',
        padding:10,
        borderRadius:10,
        marginTop:20,
        marginRight:12,
        width:'100%',
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
    qblock:{
        display:"flex",
        alignItems:'center',
        margin:20,
        padding:20,
        


    },
    qfont:{
      fontSize:28,
      fontFamily:'Rubik',
      fontWeight:200,
      padding:20,
      margin:10
    },
    options:{
      fontSize:20,
      fontFamily:'Rubik',
      fontWeight:100,
      padding:20,
      margin:10
    },
    schip:{
      fontSize:12,
      fontFamily:'Rubik',
      fontWeight:'bold',
      
    },
    textoption:{
      padding:5,
      margin:5
    }
    
    
  });

export default function DisplayQuestion(props)
{
    var classes=useStyles()

    const [qList,setqList]=useState([])
    const [index,setIndex]=useState(0)
    const [options,setOptions] = useState({one:'',two:'',three:'',four:''})


    const fetchAllQuestions=async()=>{

        var result = await postData('questions/fetchallquestions',{setid:'3'})
        setqList(result.result)
        

    }

    const setSelectedOptions=(choice)=>{

        if(choice==1)
        setOptions({one:<Done/>,two:'',three:'',four:''})
        else if(choice==2)
        setOptions({one:'',two:<Done />,three:'',four:''})
        else if(choice==3)
        setOptions({one:'',two:'',three:<Done />,four:''})
        else if(choice==4)
        setOptions({one:'',two:'',three:'',four:<Done />})
    }

    const displayQuestion=(index)=>{

        return(
      
            <Grid container spacing={2} className={classes.qblock}>
                <Grid item xs={12} className={classes.qfont}>
                    {`Q ${qList[index].questionno}: ${qList[index].question}`}

                </Grid>
                <Grid item xs={6} className={classes.options}>
                   <Chip className={classes.schip} icon={options.one} label='1' onClick={()=>setSelectedOptions(1)} /> 
                 <span className={classes.textoption}> {`${qList[index].option1}`} </span>
                </Grid>
                <Grid item xs={6} className={classes.options}>
                <Chip className={classes.schip} icon={options.two} label='2' onClick={()=>setSelectedOptions(2)} />
                <span className={classes.textoption}> {`${qList[index].option2}`} </span>
                </Grid>
                <Grid item xs={6} className={classes.options}>
                <Chip className={classes.schip} icon={options.three} label='3' onClick={()=>setSelectedOptions(3)} />
                <span className={classes.textoption}> {`${qList[index].option3}`} </span>
                </Grid>
                <Grid item xs={6} className={classes.options}> 
                <Chip className={classes.schip} icon={options.four} label='4'  onClick={()=>setSelectedOptions(4)} />
                <span className={classes.textoption}> {`${qList[index].option4}`} </span>
                </Grid>
                <Grid item xs={3}>
            <Button style={{width:230}} onClick={handlePrevious} disabled={index<=0?true:false} variant="outlined" color="success" >PREVIOUS</Button>
            </Grid>
            <Grid item xs={3}>
            <Button style={{width:230}} variant="outlined" color="success" onClick={handleNext} disabled={index>=qList.length-1?true:false}>NEXT</Button>
            </Grid>
            <Grid item xs={3}>
            <Button style={{width:230}} variant="outlined" color="success" >MARK AS REVIEW</Button>
            </Grid>
            <Grid item xs={3}>
            <Button style={{width:230}} variant="outlined" color="success">SUBMIT EXAM</Button>
            </Grid>

            </Grid>
            
            
        )


    }
   

    useEffect(function () {

        fetchAllQuestions()
    }, [])


    const handleNext = () => {

        var i=index
        if(i>=qList.length-1)
            setIndex(0)
        else
        setIndex(i+1)
    }

    // const displayButton = () => {

    //     return(<Grid container spacing={2} style={{margin:5}}>
    //       <Grid item xs={3}>
    //         <Button style={{width:200}} onClick={handlePrevious} disabled={index<=0?true:false} variant="outlined" color="success" >PREVIOUS</Button>
    //         </Grid>
    //         <Grid item xs={3}>
    //         <Button style={{width:200}} variant="outlined" color="success" onClick={handleNext} disabled={index>=qList.length-1?true:false}>NEXT</Button>
    //         </Grid>
    //         <Grid item xs={3}>
    //         <Button style={{width:200}} variant="outlined" color="success" >MARK AS REVIEW</Button>
    //         </Grid>
    //         <Grid item xs={3}>
    //         <Button style={{width:200}} variant="outlined" color="success">SUBMIT EXAM</Button>
    //         </Grid>

    //         </Grid>
    //     )

    // }

    
    
    const handlePrevious = () => {

        var i=index
        setIndex(i-1)
    }

    return(
      <div className={classes.root}>
      <div className={classes.qnbox2}>

            {qList.length>0?displayQuestion(index):<></>}
            {/* {qList.length>0?displayButton():<></>} */}
           

        </div>
        </div>
    
    )
}