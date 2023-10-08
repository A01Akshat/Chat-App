import react, { useState,useRef } from "react";
import { Auth } from "./components/Auth";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {Chat} from "./components/Chat";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
import Nav from "./Nav";
import './Style.css';
const cookies=new Cookies();



const App=()=>{

const [isAuth,setisauth]=useState(cookies.get("auth-token"));
const [room,setroom]=useState(null);
const roominput=useRef(null);

const signout=async()=>{
  await signOut(auth);
  cookies.remove("auth-token");
  setisauth(false);
  setroom(null);
};

if(!isAuth)
{

  return(
  <div>
    <Auth setisauth={setisauth}/>
  </div>
  )
}
return( 
<>
  <Nav/>
  {room?<div><Chat room={room}/></div>:<div >
  <label className="room-name">Enter room name:</label>
  <br/>
  <input ref={roominput} className="input" placeholder="Room name:"/>  {/*used ref to preevent changing of other things like what happens when we use event.target.value...we dont want want real time changes but changes when button is clicked */}
  <br/>
  <button onClick={()=>setroom(roominput.current.value)} className="enter-btn">Enter chat:</button>
  
  </div>}

  <div >
    <button onClick={signout} className="sign-out">Sign Out</button>
  </div>

</>
);
}
export default App;