import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import '../styles/Chat.css';
import { Link } from "react-router-dom";

export const Chat = ({ room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMsg = query(messageRef, where("room", "==", room), orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMsg, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    if (auth.currentUser) {
      await addDoc(messageRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        user: auth.currentUser.displayName,
        room,
      });
      setNewMessage("");
    } else {
      alert("Please Sign in");
      console.error("User not authenticated");
    }
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div className="message" key={message.id}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="user">{message.user}:</span>
              <span>{new Date().toLocaleString()}</span>
            </div>
            <span style={{ fontSize: "13px" }}>{message.text}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="new-message-form">
        <input 
          className="new-message-input" 
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />  
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};
