import * as React from 'react';
import { makeStyles } from '@mui/styles';
import {useState , useEffect} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from './FetchNodeServices';
import { alpha, styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import Swal from "sweetalert2";




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


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const useStyles = makeStyles({
    
    bg :{
        backgroundImage: `url("/bg1.png")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    
    },
    
    
  });

export default function AdminLogin() {
    var classes=useStyles()
    var navigate=useNavigate()
    const [emailId,setEmailId] = useState('')
    const [password,setPassword] = useState('')
    const [msg,setMsg] = useState('')


  const handleSubmit = async() => {
      var result = await postData('admin/checkadminlogin',{emailid:emailId,password:password})
        if (result.result)
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login Successful',
                showConfirmButton: false,
                timer: 1500
              })

            localStorage.setItem("SES_ADMIN",JSON.stringify(result.data))
            navigate("/dashboard")
        }
        else
        {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Invalid AdminID / Password...',
                showConfirmButton: false,
                timer: 1500
              })
            setMsg("Invalid AdminID / Password...")
        }

};

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid className={classes.bg} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
               <div style={{display:'flex',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:30,fontWeight:'bold'}}>
                         <img src="/lms.png" style={{padding:10,width:300,height:100}} />

              </div>
              <div style={{display:'flex',alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:20,fontWeight:'bold',marginBottom:10}}>
                        Learning Management System
              </div>
            <Avatar sx={{ m: 1, bgcolor: '#2b6777' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Admin Log in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <CssTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(event)=>setEmailId(event.target.value)}
              />
              <CssTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(event)=>setPassword(event.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                 
                </Grid>
                <Grid item>
                <div style={{color:"red",fontSize:18,fontWeight:'bold'}}>
                       {msg}
                  </div>
                </Grid>
              </Grid>
              <Link href="https://www.youtube.com/channel/UCc7W0Le6_JQNUez5fi2zFKA" underline="hover" style={{fontSize:14,marginLeft:180}} >Copyright ©️ FoRmAL ZoNe 2022</Link>
            </Box>
          </Box>
          </Grid>
       
      </Grid>
    </ThemeProvider>
  );
}