import {Routes, Route} from "react-router-dom";
import {React} from 'react';
import Login from "@views/Login";
import SignUp from "@views/SignUp";
import Authorization from "./views/Authorization";
import Home from "./views/Home";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element= {<Login/>}/>
        <Route path="/signup" element= {<SignUp/>}/>
        <Route element={<Authorization/>}>
          <Route path="/" element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
