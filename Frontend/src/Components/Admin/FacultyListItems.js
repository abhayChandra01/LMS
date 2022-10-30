import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import CreateSet from './CreateSet';
import Questions from './Questions';
import AssignmentIcon from '@mui/icons-material/Assignment';


export default function FacultyListItems(props){

    const handleClick=(v)=>{
        props.setView(v)

    }

    return(
    <div  >
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<CreateSet setView={props.setView} />)} button>
      <ListItemIcon>
      <img src="/exams.png" style={{width:30,height:30}}></img>

      </ListItemIcon >
      <ListItemText  primary="Create Set" /> 
    </ListItem>
    
    <ListItem style={{backgroundImage: `url("/bg1.png")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',}} onClick={()=>handleClick(<Questions setView={props.setView} />)} button>
      <ListItemIcon>
      <img src="/questions.png" style={{width:30,height:30}}></img>

      </ListItemIcon >
      <ListItemText  primary="Questions" /> 
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