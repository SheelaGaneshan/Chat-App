import React, { useEffect } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
import { useState } from 'react';

const Chat = ({socket, userName, room}) => {

  const [userMessage, setUserMessage] = useState(" ")
  const [mesList, setMesList] = useState([])

  const sendMes = async () =>{
    if(userMessage !== ''){
      const mesData = {
          room: room,
          author: userName,
          message: userMessage,
          time: new Date(Date.now()).getHours() + ":" + 
          new Date(Date.now()).getMinutes()
      };

      await socket.emit("send_message", mesData);
      setMesList((list) => [...list, mesData]);
      setUserMessage("");
    }
  };

  useEffect(()=>{
      socket.on("receive_message", (data)=>{
        setMesList((list)=>[...list, data]);
      });
  }, [socket]);

  return (
    <div className='chat-window'>

      <div className='chat-header'>
        <p>Live Chat Room</p>
      </div>

      <div className='chat-body'>
      <ScrollToBottom className="message-container" >
        {mesList.map((messageContent)=>{
          return(
            <div className='message' 
            id={userName === messageContent.author ? "you" : "other"}>
              <div> 
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>

                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                
              </div>
            </div>
            );
        })}
          </ScrollToBottom>
      </div>

      <div className='chat-footer'>
        <input type='text' placeholder='hello...' 
        onChange={(e)=>{setUserMessage(e.target.value)
        }}
        onKeyPress={(event)=>{
          event.key === "Enter" && sendMes();
        }}/>

        <button onClick={sendMes}> &#9658;</button>
      </div>
    
    </div>
  )
}

export default Chat