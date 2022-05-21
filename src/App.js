import {Routes, Route} from "react-router-dom";
import {React} from 'react';
import Login from "@views/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element= {<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
