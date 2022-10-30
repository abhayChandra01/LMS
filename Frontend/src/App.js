import Department from './Components/Admin/Department';
import Faculty from './Components/Admin/Faculty';
import DisplayAllDepartments from './Components/Admin/DisplayAllDepartments';
import DisplayAllFaculties from './Components/Admin/DisplayAllFaculties';
import Courses from './Components/Admin/Courses';
import Subjects from './Components/Admin/Subjects';
import DisplayAllCourses from './Components/Admin/DisplayAllCourses';
import DisplayAllSubjects from './Components/Admin/DisplayAllSubjects';
import Student from './Components/Admin/Student';
import DisplayAllStudents from './Components/Admin/DisplayAllStudents';
import Units from './Components/Admin/Units';
import DisplayAllUnits from './Components/Admin/DisplayAllUnits';
import {Routes, BrowserRouter as Router, Route} from "react-router-dom";
import AdminLogin from './Components/Admin/AdminLogin';
import Dashboard from './Components/Admin/Dashboard';
import FacultyLogin from './Components/Admin/FacultyLogin';
import FacultyDashboard from './Components/Admin/FacultyDashboard';
import CreateSet from './Components/Admin/CreateSet';
import Questions from './Components/Admin/Questions';
import OnlineTest from './Components/ExamManagement/OnlineTest';
import DisplayQuestion from './Components/ExamManagement/DisplayQuestion';

function App(props) {
  return (
    <div>
      <Router>
          <Routes>
              <Route element={<Department/>} path={"/department"} history={props.history} />
              <Route element={<DisplayAllDepartments/>} path={"/displayalldepartment"} history={props.history} />
              <Route element={<Faculty/>} path={"/faculty"} history={props.history} />
              <Route element={<DisplayAllFaculties/>} path={"/displayallfaculties"} history={props.history} />
              <Route element={<Courses/>} path={"/courses"} history={props.history} />
              <Route element={<Subjects/>} path={"/subjects"} history={props.history} />
              <Route element={<DisplayAllCourses/>} path={"/displayallcourses"} history={props.history} />
              <Route element={<DisplayAllSubjects/>} path={"/displayallsubjects"} history={props.history} />
              <Route element={<Student/>} path={"/student"} history={props.history} />
              <Route element={<DisplayAllStudents/>} path={"/displayallstudents"} history={props.history} />
              <Route element={<Units/>} path={"/units"} history={props.history} />
              <Route element={<DisplayAllUnits/>} path={"/displayallunits"} history={props.history} />
              <Route element={<CreateSet/>} path={"/createset"} history={props.history} />
              <Route element={<AdminLogin/>} path={"/adminlogin"} history={props.history} />
              <Route element={<Dashboard/>} path={"/dashboard"} history={props.history} />
              <Route element={<FacultyLogin/>} path={"/facultylogin"} history={props.history} />
              <Route element={<FacultyDashboard/>} path={"/facultydashboard"} history={props.history} />
              <Route element={<Questions/>} path={"/questions"} history={props.history} />
              <Route element={<OnlineTest/>} path={"/onlinetest"} history={props.history} />
              <Route element={<DisplayQuestion/>} path={"/displayquestion"} history={props.history} />


          </Routes>
  
      </Router>
      
    
    </div>
  );
}

export default App;
