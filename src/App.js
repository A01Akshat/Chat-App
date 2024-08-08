// import React from "react";
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Routes } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import { Auth } from "./components/Auth";
// import Use from "./Use";
// import { Chat } from "./components/Chat";
// const App=()=>{
//   return(<>
//  <Router>
//     {/* <Navbar/> */}
//     <Routes>
  
//     <Route path='/login' element={<Auth/>} />
//     <Route path='/' element={<Use/>} />
//     <Route path='/chat' element={<Chat/>} />

    
//     </Routes>
//     </Router>
//   </>)
// }

// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Auth } from "./components/Auth";
import Use from "./Use";
import { Chat } from "./components/Chat";
import Navbar from "./components/Navbar";
import { auth } from "./firebase-config";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path='/login' element={<Auth setIsAuth={setUser} />} />
        <Route path='/' element={<Use user={user} />} />
        <Route path='/chat' element={<Chat room="" />} />
      </Routes>
    </Router>
  );
}

export default App;

