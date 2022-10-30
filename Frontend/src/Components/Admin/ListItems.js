import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import AssignmentIcon from '@mui/icons-material/Assignment';
import Department from './Department';
import Faculty from './Faculty';
import Courses from './Courses';
import Subjects from './Subjects';
import Student from './Student';
import Units from './Units';


export default function ListItems(props){

    const handleClick=(v)=>{
        props.setView(v)

    }

    return(
    <div  >
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Department setView={props.setView} />)} button>
      <ListItemIcon>
      <img src="/depicon.png" style={{width:30,height:30}}></img>

      </ListItemIcon >
      <ListItemText  primary="Department" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Faculty  setView={props.setView}  />)} button>
      <ListItemIcon>
      <img src="/faculty.png" style={{width:30,height:30}}></img>
      </ListItemIcon>
      <ListItemText primary="Faculty" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Courses  setView={props.setView}  />)} button>
      <ListItemIcon>
      <img src="/courses.png" style={{width:30,height:30}}></img>
      </ListItemIcon>
      <ListItemText primary="Courses" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Subjects  setView={props.setView}  />)} button>
      <ListItemIcon>
      <img src="/subjects.png" style={{width:40,height:30}}></img>
      </ListItemIcon>
      <ListItemText primary="Subjects" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Units  setView={props.setView}  />)} button>
      <ListItemIcon>
      <img src="/units.png" style={{width:30,height:30}}></img>
      </ListItemIcon>
      <ListItemText primary="Units" />
    </ListItem>
  
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Student  setView={props.setView}  />)} button>
      <ListItemIcon>
      <img src="/student.png" style={{width:30,height:30}}></img>
      </ListItemIcon>
      <ListItemText primary="Students" />
    </ListItem>
  

    <ListSubheader style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} inset>Saved reports</ListSubheader>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
      
    </ListItem>
  </div>
)
}