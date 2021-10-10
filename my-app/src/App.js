// import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
// ES6 import or TypeScript
import io  from "socket.io-client";
import {nanoid}  from "nanoid"
import Chat from './Chat';
const socket = io.connect("http://localhost:3001")   
function App() {
  const [username,setUsername] = useState("")
  const[room,setRoom] = useState("")
  const[showChat,setShowChat] = useState(false)
  const joinRoom = ()=>{
    if(username!=="" && room!==""){
      socket.emit("join_room",room)
      setShowChat(true)
    }
  }
  return (
    

    <div className="App">
      {!showChat ? (
              <div>
                <h1>Chat App</h1>
                <input type="text"
                  onChange={(event)=>{
                  setUsername(event.target.value)
                }} 
                /> 
                <input type="text"
                onChange={(event)=>{
                  setRoom(event.target.value)
                }} 
                />
                <input type="button" onClick={joinRoom} value="Add Room" />
              </div>

              
      ):
      (
        <Chat socket={socket} username={username} room={room} />
      )

        
       
     
      }
       
       
 
      
    </div>
    
  );
}

export default App;
