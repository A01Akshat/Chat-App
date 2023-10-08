import {auth,provider} from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from 'universal-cookie';

const cookies=new Cookies() //keeps user data



export const Auth=(props)=>
{
    const {setisauth}=props;

   const signinwithgoogle=async()=>{
    try
    {
    const result=await signInWithPopup(auth,provider); //to enable a popup during signin
    console.log(result);
    cookies.set("auth-token",result.user.refreshToken); //keeps u signed in even if u refresh
    setisauth(true);//to transition from sign in pop up to room name component automatically 
}

    catch(err)
    {
    console.log(err);
    } 
   };




    return <div className="auth">
        <p>
            Sign in with google to continue
        </p>
        <button onClick={signinwithgoogle}>
            Sign in with Google
        </button>
    </div>
}