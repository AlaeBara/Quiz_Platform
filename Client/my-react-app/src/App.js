import Home from "./Home"
import Login from "./components/Login"
import Score from './components/Score'
import YourScor from './components/YourScor'
import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home_admin from "./components/Admin/Home_admin"
import AddQuiz from "./components/Admin/AddQuiz"
import ShowResult from "./components/Admin/ShowResult"


function App() {
  

  
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/score" element={<Score/> } />
          <Route path="/Votre_Scores" element={<YourScor/> } />
          {/* admin */}
          <Route path="/admin_home" element={<Home_admin/>}/>
          <Route path="/addQuiz" element={<AddQuiz/>}/>
          <Route path="/result" element={<ShowResult/>}/>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
