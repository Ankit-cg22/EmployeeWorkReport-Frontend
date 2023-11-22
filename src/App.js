import logo from './logo.svg';
import './App.css';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Home from './components/Home';
import WorkReportForm from './components/WorkReportForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route exact path="/auth" Component={AuthForm}/>
          <Route exact path="/form/:formId" Component={WorkReportForm}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
