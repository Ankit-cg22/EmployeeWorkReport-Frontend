import logo from './logo.svg';
import './App.css';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import WorkReportForm from './components/WorkReportForm';
import Navbar from './components/Navbar';
import AddTeamMember from './components/AddTeamMember';
import RemoveTeamMember from './components/RemoveTeamMember';
import PromoteTeamMember from './components/PromoteTeamMember';
import GenerateReport from './components/GenerateReport';

function App() {
  return (
    <div className="">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route exact path="/auth" Component={AuthForm}/>
          <Route exact path="/form/:formId" Component={WorkReportForm}/>
          <Route exact path="/addTeamMember" Component={AddTeamMember}/>
          <Route exact path="/removeTeamMember" Component={RemoveTeamMember}/>
          <Route exact path="/promoteTeamMember" Component={PromoteTeamMember}/>
          <Route exact path="/report" Component={GenerateReport}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
