import React, { useState, useContext } from "react";
import { Context } from '../context'
import Title from '../unit/Title'
import OnlineInfo from '../unit/OnlineInfo'
import InputChatMessage from '../unit/InputChatMessage'
import Messages from '../unit/Messages'
const Chat = () => {
  const { state, dispatch } = useContext(Context)
  const [init, setInit] = useState(false)
  const { socket } = state
  const updateLogin = (obj, msgType) => {
    // 信息列表，维护一个type和必要的信息
    const msg = {
      msgType: msgType,
      username: obj.username, 
    }
    dispatch({
      type: msgType,
      payload: {
        onlineCount: obj.onlineCount,
        onlineUser: obj.onlineUser,
        msg: msg
      }
    })
  }
  const updateMsg = (obj) => {
    const msg = {
      msgType: 'sendMessage',
      username: obj.username,
      message: obj.sendMessage,
      uid: obj.uid
    }
    dispatch({
      type:'sendMessage',
      payload:{
        username: obj.username,
        msg: msg
      }
    })
  }
  const ready = () => {
    setInit(true)
    socket.on('login',(obj) => {
      updateLogin(obj, 'login')
    })
    socket.on('sendMessage',(obj) => {
      updateMsg(obj)
    })
    socket.on('logout', (obj) => {
      updateLogin(obj, 'logout')
    })
  }
  if(!init) {
    ready()
  }
  return (
    <div>
      <div className="chat-room">
        <div className="welcome">
          <Title />
        </div>
          <OnlineInfo />
        <div>
          <Messages />
          <InputChatMessage />
        </div>
      </div>
    </div>
  );
};
export default Chat;


