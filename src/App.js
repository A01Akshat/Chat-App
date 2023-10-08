import react, { useState,useRef } from "react";
import { Auth } from "./components/Auth";
import { useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";
import {Chat} from "./components/Chat";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
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
  {room?<div><Chat room={room}/></div>:<div>
  <label>Enter room name:</label>
   <input ref={roominput}/>  {/*used ref to preevent changing of other things like what happens when we use event.target.value...we dont want want real time changes but changes when button is clicked */}
  <button onClick={()=>setroom(roominput.current.value)}>Enter chat:</button>
  
  </div>}

  <div className="sign-out">
    <button onClick={signout}>Sign Out</button>
  </div>

</>
);
}
export default App;