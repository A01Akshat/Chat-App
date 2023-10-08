import { useEffect, useState } from "react";
import {addDoc, collection,onSnapshot,serverTimestamp,query,where, orderBy} from 'firebase/firestore';
import { auth,db } from "../firebase-config";
import '../styles/Chat.css';
export const Chat=(props)=>{
    const{room}=props;

    const [newmessage,setnewmessage]=useState("");
    const [messages,setmessages]=useState([]);

    const messageRef=collection(db,"messages");
    useEffect(()=>{
        const querymsg=query(messageRef,where("room","==",room),orderBy("createdAt"));
        const unsuscribe=onSnapshot(querymsg,(snapshot)=>{
            let messages=[];
        snapshot.forEach((doc)=>{
        messages.push({...doc.data(),id:doc.id});
        });
        setmessages(messages);
        });
        return ()=>unsuscribe(); //to clean up the use effect
    },[]);

   const handlesubmit=async(e)=>{
    e.preventDefault();
    if(newmessage==="")return;

    await addDoc(messageRef,{
        text:newmessage,
        createdAt:serverTimestamp(),
        user:auth.currentUser.displayName,
        room,
    });
    setnewmessage("");

};



    return (
    <div className="chat-app">
    <div className="header"><h1>
        Welcome to: {room}
    </h1></div>

    <div className="messages">{messages.map((message)=>
    <div className="message" key={message.id}>
    
    <span className="user">{message.user}</span>
    {message.text}
    


    </div>
    )}</div>

    <form onSubmit={handlesubmit} className="new-message-form">
        <input className="new-message-input" placeholder="Type your message..."
        onChange={(e)=>setnewmessage(e.target.value)}
        value={newmessage}
        />  
        <button type="submit" className="send-button">Send</button>


    </form>    
    </div>
    )
}