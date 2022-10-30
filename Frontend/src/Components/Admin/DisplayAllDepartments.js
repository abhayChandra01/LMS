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


export default function DisplayAllDepartments(props){


    const [listDepartment,setListDepartment]=useState([])

    const [depid,setDepId]=useState()
    const [depname,setDepName]=useState()
    const [depicon,setDepIcon]=useState({bytes:'',file:'./depicon.png'})

    const [tempIcon,setTempIcon]=useState({bytes:'',file:''})

    const[btnState,setBtnState]=useState(false)

    const [open,setOpen]=useState(false)
    const fetchAllDepartments=async()=>{
      var result=await getData("department/displayalldepartment")
      setListDepartment(result.result)

    }

    useEffect(function(){
      fetchAllDepartments()

    },[])

    const handleClose=()=>{
      setOpen(false)
      setBtnState(false)

    }

    const handleCancel=()=>{
      
      setDepIcon({bytes:'',file:`${tempIcon.file}`})
      setBtnState(false)
    }

    const handleEditData=async()=>{

      var body={departmentname:depname,departmentid:depid}
      var result=await postData('department/editdepartment',body)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Department Has Been Updated Successfully !',
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
              text: 'Failed To Update Department !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }
      fetchAllDepartments()

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
            var body={departmentid:rowData.departmentid,icon:rowData.icon}
            var result=await postData('department/deletedepartment',body)
            fetchAllDepartments()
            if (result.result) 
            {

              Swal.fire({
                title: 'LEARNING MANAGEMENT SYSTEM',
                text: 'Department Has Been Deleted Successfully !',
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
                  text: 'Failed To Delete Department !',
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


    const handleEditIcon=async()=>{
      var formData=new FormData()
      formData.append('departmentid',depid)
      formData.append('icon',depicon.bytes)

      var result=await postDataAndImage('department/editicon',formData)
      console.log(result)
      setOpen(false)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Department Icon Has Been Updated Successfully !',
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
              text: 'Failed To Update Department Icon !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })
          

      }
      setBtnState(false)
      fetchAllDepartments()


    }

    const handleEdit=(rowData)=>{

      setDepId(rowData.departmentid)
      setDepName(rowData.departmentname)
      setDepIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
      setTempIcon({bytes:'',file:`${ServerURL}/images/${rowData.icon}`})
      setOpen(true)


    }
    const handleIconChange=(event)=>{
      if(event.target.files.length){
      setDepIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
      setBtnState(true)
      }
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
                        <img src="/depicon.png" style={{width:60,height:60}}></img>
                        EDIT DEPARTMENT
                        <i onClick={handleClose} class="fas fa-times-circle" style={{color:"black",marginLeft:160,fontSize:35}}></i>
                    </div>

        
        <Grid container spacing={2}>
                <Grid item xs={12}>
                
                    <CssTextField value={depname} focused sx={{ input: { color: '#2b6777',fontFamily:'Serif' } }} onChange={(event)=>setDepName(event.target.value)} fullWidth label="Department Name" color="primary" variant="outlined" />
                
                  
                </Grid>
                <Grid item xs={12} style={{marginTop:10}}>
                <label htmlFor="contained-button-file">
                <input onChange={(event)=>handleIconChange(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button fullWidth variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                    Edit Icon
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



    var classes=useStyles()
    function DisplayDepartments() {
        return (
          <MaterialTable
            title="List Of Departments"
            columns={[
              { title: 'Department ID', field: 'departmentid' },
              { title: 'Department', field: 'departmentname' },
              { title: 'Icon', field: 'icon',
              render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, borderRadius: '50%'}}/>
            },
              
            ]}
            data={listDepartment}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Department',
                onClick: (event, rowData) =>handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Department',
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
                            LIST OF DEPARTMENTS 
                        </div>

                    </div>
                    <div className={classes.subdiv}>
                        {DisplayDepartments()}
                        {showDialog()}
                    </div>
                
                </div>    
            </div>
        </div>


      )

}