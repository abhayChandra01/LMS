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
import Box from '@mui/material/Box';
import DisplayAllSubjects from './DisplayAllSubjects';
import PhotoCamera from '@mui/icons-material/PhotoCamera';


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
          width:900,
          borderRadius:15,
          border: '2px solid #52ab98',
          backgroundColor: '#c8d8e4',
          marginBottom: 221
        
  
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

export default function Questions(props)
{
    var classes=useStyles()

    const [faculty, setFaculty] = useState([])
    const [departmentId, setDepartmentId] = useState('')
    const [listCourses, setListCourses] = useState([])

    const [courses, setCourses] = useState('')

    const [subject, setSubject] = useState('')

    const [listSubjects, setListSubjects] = useState([])
    const [semester, setSemester] = useState('')

    const [totalSemester, setTotalSemester] = useState('')
    const [setId, setSetId] = useState('')

    const [unit, setUnits] = useState('')
    const [listUnits, setListUnits] = useState([])

    const [listSets, setListSets] = useState([])

    const [questionNumber, setQuestionNumber] = useState('')
    const [question, setQuestion] = useState('')

    const [questionImage, setQuestionImage] = useState({ byte: '', file: '/questionimage.png' })

    const [option1, setOption1] = useState('')
    const [option1Image, setoption1Image] = useState({ byte: '', file: '/questionicon.png' })

    const [option2, setOption2] = useState('')
    const [option2Image, setoption2Image] = useState({ byte: '', file: '/questionicon.png' })

    const [option3, setOption3] = useState('')
    const [option3Image, setoption3Image] = useState({ byte: '', file: '/questionicon.png' })

    const [option4, setOption4] = useState('')
    const [option4Image, setoption4Image] = useState({ byte: '', file: '/questionicon.png' })
    
    const [correctAnswer, setCorrectAnswer] = useState('')

    const handleCoursesChange = (event) => {

        setCourses(event.target.value)

        fetchAllSemester(event.target.value)

    }

    const handleUnitChange = (event) => {

        setUnits(event.target.value)
    }

    const handleSetChange = (event) => {

        setSetId(event.target.value)

        fetchAllQuestionNumber(event.target.value)
    }

    const handleSubjectChange = (event) => {

        setSubject(event.target.value)
        fetchAllUnits(event.target.value)
        fetchAllSets(event.target.value)
    }

    const fetchAllSubjects=async(sem)=>{
      var result=await postData("subject/displaysubject",{courseid:courses,semesters:sem})
      setListSubjects(result.result)

    }


    const fillSubjects = () => {

        return (listSubjects.map((item) => {
            return (<MenuItem value={item.subjectid}>{item.subjectname} [{item.subjecttype}]</MenuItem>)
        }))
    }

    const fillCourses = () => {

        return (listCourses.map((item) => {
            return (<MenuItem value={item.courseid}>{item.coursename}</MenuItem>)
        }))
    }

    const fillSemester = () => {

        var x = []

        for (var i = 1; i <= totalSemester; i++) { x.push(i) }

        return (x.map((item) => {
            return (<MenuItem value={item}>{item}</MenuItem>)
        }))
    }

    const fetchAllSemester=async(courseid)=>{
      var body={courseid:courseid}
      var result=await postData("courses/displayallsemesters",body)
      setTotalSemester(result.result[0].semesters)
      
    }
    const handleSemesterChange = (event) => {

        setSemester(event.target.value)

        fetchAllSubjects(event.target.value)
    }


    const fetchAllCourses=async(departmentid)=>{
      var result=await postData("courses/displaycourses",{departmentid:departmentid})
      setListCourses(result.result)

    }

    const fetchAllUnits = async (subject) => {

        var result = await postData('questions/fetchallunits', { subjectid: subject })
        setListUnits(result.result)
    }

    const fillUnits = () => {

        return (listUnits.map((item) => {
            return (<MenuItem value={item.unitid}>{item.title}</MenuItem>)
        }))
    }

    const fetchAllSets = async (subject) => {

        var result = await postData('questions/fetchallsets', { subjectid: subject })
        setListSets(result.result)
    }

    const fillSets = () => {

        return (listSets.map((item) => {
            return (<MenuItem value={item.setid}>{item.setno}</MenuItem>)
        }))
    }

    const fetchAllQuestionNumber = async (setId) => {

        var result = await postData('questions/generatequestionnumber', { setid: setId })
        setQuestionNumber(result.result)
    }

    const handleQuestionImageChange = (event) => {
        if (event.target.files.length) {
            setQuestionImage({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption1ImageChange = (event) => {
        if (event.target.files.length) {
            setoption1Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption2ImageChange = (event) => {
        if (event.target.files.length) {
            setoption2Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption3ImageChange = (event) => {
        if (event.target.files.length) {
            setoption3Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }

    const handleOption4ImageChange = (event) => {
        if (event.target.files.length) {
            setoption4Image({ byte: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
        }
    }





    useEffect(function () {

        var data = JSON.parse(localStorage.getItem("SES_FACULTY"))
        setFaculty(data)

        fetchAllCourses(data.department)


    }, [])

    const handleSubmit = async () => {

    
      var formData = new FormData()

      formData.append('facultyid',faculty.facultyid)
      formData.append('departmentid',faculty.department)
      
      formData.append('courseid',courses)
      formData.append('semester',semester)
      formData.append('subjectid',subject)
      formData.append('setid',setId)
      formData.append('unitid',unit)
      formData.append('questionnumber',questionNumber)
      formData.append('question',question)
      
      formData.append('questionimage',questionImage.byte)
      
      formData.append('option1',option1)
      formData.append('option2',option2)
      formData.append('option3',option3)
      formData.append('option4',option4)

      formData.append('correctanswer',correctAnswer)

      formData.append('image1',option1Image.byte)
      formData.append('image2',option2Image.byte)
      formData.append('image3',option3Image.byte)
      formData.append('image4',option4Image.byte)
      


      

      var result = await postDataAndImage("questions/addquestion", formData)
      if (result.result)
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Question Has Been Submitted Successfully !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'success',
              width:'600',
              height:'400',
            })
            clearData()
      }
      else
      {
          Swal.fire({
              title: 'LEARNING MANAGEMENT SYSTEM',
              text: 'Failed To Submit Question In The Database !',
              imageUrl: '/lms.png',
              imageWidth: 300,
              imageHeight: 100,
              icon: 'error',
              width:'600',
              height:'400',

          })

      }

     }

     const clearData = () => {
        
      setQuestionNumber('')
      setQuestion('')
      setOption1('')
      setOption2('')
      setOption3('')
      setOption4('')
      setCorrectAnswer('')
      setQuestionImage({ byte: '', file: '/questionimage.png' })
      setoption1Image({ byte: '', file: '/questionicon.png' })
      setoption2Image({ byte: '', file: '/questionicon.png' })
      setoption3Image({ byte: '', file: '/questionicon.png' })
      setoption4Image({ byte: '', file: '/questionicon.png' })
      fetchAllQuestionNumber(setId)

  }




    return(
        <div className={classes.bg}>
        <div className={classes.root}>
            <div style={{flexDirection:'column'}}>
                <div className={classes.divv}>
                <div style={{display:'flex',marginLeft:200,alignItems:'center',color:"#2b6777",fontFamily:"serif",fontSize:25,fontWeight:'bold',letterSpacing:1}}>
                        <img src="/questions.png" style={{padding:10,width:70,height:70}} />
                        QUESTIONS
                        <div style={{paddingLeft:120}}>
                        <IconButton onClick={()=>props.setView()} fullWidth style={{fontWeight:'bolder',fontFamily:"Monaco",color:"#2b6777"}}><i style={{marginRight:5}} class="fas fa-list"></i>List</IconButton>

                        </div>
                    </div>
                </div>
                <div className={classes.subdiv}>
                  <Grid container spacing={2}>
                  <Grid item xs={6}>
                        <CssTextField variant='outlined' aria-readonly fullWidth label='Faculty Id' value={faculty.facultyid} />
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField variant='outlined' aria-readonly value={faculty.departmentname} fullWidth label='Department' onChange={(event) => setDepartmentId(event.target.value)} />
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl  variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label1">Courses</InputLabel>
                            <Select
                                labelId="demo-simple-select-label1"
                                id="demo-simple-select"
                                value={courses}
                                label="Courses"
                                onChange={handleCoursesChange}
                            >
                                {fillCourses()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl  variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label2">Semester</InputLabel>
                            <Select
                                labelId="demo-simple-select-label2"
                                id="demo-simple-select"
                                value={semester}
                                label="Semester"
                                onChange={handleSemesterChange}
                            >
                                {fillSemester()}

                            </Select>
                        </FormControl>
                    </Grid>


                    <Grid item xs={4} >
                        <FormControl  variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label4">Subjects</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={subject}
                                label="Subject"
                                onChange={handleSubjectChange}
                            >
                                {fillSubjects()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl  variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label4">Units</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={unit}
                                label="Units"
                                onChange={handleUnitChange}
                            >
                                {fillUnits()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} >
                        <FormControl  variant="filled" fullWidth>
                            <InputLabel id="demo-simple-select-label4">Set Number</InputLabel>
                            <Select
                                labelId="demo-simple-select-label4"
                                id="demo-simple-select"
                                value={setId}
                                label="Set Number"
                                onChange={handleSetChange}
                            >
                                {fillSets()}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4}>
                        <CssTextField variant='outlined' value={questionNumber} aria-readonly fullWidth label='Question Number' onChange={(event) => setQuestionNumber(event.target.value)} />
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField style={{marginTop:9}} variant='outlined' value={question} aria-readonly fullWidth label='Question' onChange={(event) => setQuestion(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file">

                            <input onChange={(event) => handleQuestionImageChange(event)}  accept="image/*" className={classes.inputstyle} id="contained-button-file" multiple type="file" />

                            <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                                Upload Question Image
                            </Button>
                        </label>
                   
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={questionImage.file}
                            sx={{ width: 70, height: 70 , marginRight:10 , marginLeft:10 }}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField style={{marginTop:9}} variant='outlined' value={option1} aria-readonly fullWidth label='Option 1' onChange={(event) => setOption1(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file1">

                            <input onChange={(event) => handleOption1ImageChange(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file1" multiple type="file" />

                            <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                                Upload Option 1 Image
                            </Button>
                        </label>
                    
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option1Image.file}
                            sx={{ width: 70, height: 70 , marginRight:10 , marginLeft:10}}

                        />
                    </Grid>


                    <Grid item xs={6}>
                        <CssTextField style={{marginTop:9}} variant='outlined' value={option2} aria-readonly fullWidth label='Option 2' onChange={(event) => setOption2(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file2">

                            <input onChange={(event) => handleOption2ImageChange(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file2" multiple type="file" />

                            <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                                Upload Option 2 Image
                            </Button>
                        </label>
                    
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option2Image.file}
                            sx={{ width: 70, height: 70 , marginRight:10 , marginLeft:10}}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField style={{marginTop:9}} variant='outlined' value={option3} aria-readonly fullWidth label='Option 3' onChange={(event) => setOption3(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file3">

                            <input onChange={(event) => handleOption3ImageChange(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file3" multiple type="file" />

                            <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                                Upload Option 3 Image
                            </Button>
                        </label>
                    
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option3Image.file}
                            sx={{ width: 70, height: 70, marginRight:10 , marginLeft:10 }}

                        />
                    </Grid>

                    <Grid item xs={6}>
                        <CssTextField style={{marginTop:9}} variant='outlined' value={option4} aria-readonly fullWidth label='Option 4' onChange={(event) => setOption4(event.target.value)} />
                    </Grid>

                    <Grid item xs={6} sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <label htmlFor="contained-button-file4">

                            <input onChange={(event) => handleOption4ImageChange(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file4" multiple type="file" />

                            <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} component="span">
                                Upload Option 4 Image
                            </Button>
                        </label>
                   
                        <Avatar
                            alt="Upload Image"
                            variant="square"
                            src={option4Image.file}
                            sx={{ width: 70, height: 70 , marginRight:10 , marginLeft:10}}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <CssTextField variant='outlined' value={correctAnswer} aria-readonly fullWidth label='Correct Answer' onChange={(event) => setCorrectAnswer(event.target.value)} />
                    </Grid>

                    <Grid item xs={6}>
                        <Button variant="contained" style={{backgroundColor:'#52ab98',fontFamily:"Monaco",color:"#fff"}} onClick={() => handleSubmit()} fullWidth component="span">
                            Save Details
                        </Button>
                    </Grid>

                    <Grid item xs={6}>
                        <Button onClick={() => window.location.reload(false)} variant="contained" type="reset" fullWidth component="span" color="error">
                            Reset All
                        </Button>
                    </Grid>




                  </Grid>
                
                </div>
                </div>
            </div>
        </div>
    
    )
}