import './App.css';
import { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Comp/Chat';

const socket = io.connect('http://localhost:3800');


function App() {
    const [userName, setUserName] = useState(" ")
    const [room, setRoom] = useState(" ")
    const [showChat, setShowChat] = useState(false)

    const joinRoom = () => {
        if(userName !== "" && room !== ""){
          socket.emit("join_room", room)
          setShowChat(true);
        }
    };

  return (
    <div className="App">

      {!showChat ? (

      <div className='joinChatContainer'>
      
          <h3>Join the chat...</h3>

          <input type="text" placeholder="chris.." 
            onChange={(e)=>{setUserName(e.target.value)}}/>

          <input type="text" placeholder="Chat ID"
            onChange={(e)=>{setRoom(e.target.value)}}/>

          <button onClick={joinRoom}>Join a room</button>
      </div>
        )
        : (
      <Chat socket={socket} userName={userName} room={room}/>
      )};
      </div>

  );
}

export default App;
