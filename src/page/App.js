import Chat from "../components/Chat";
// js文件里面用了return都需要 引入 React
import React, { useState, useContext } from "react";
import { Context } from '../context'
const App = () => {
  const { state } = useContext(Context)
  const { uid } = state
  return uid ? <Chat /> : <Login />
};
export default App;

const generateUid = () => {
  return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 1);
}
const Login = () => {
  const { state, dispatch } = useContext(Context)
  const { socket } = state
  const [inputValue, setInputValue] = useState('')
  const handleSubmit = () => {
    const uid = generateUid()
    const username = !!inputValue ? inputValue : `游客${uid}`
    socket.emit('login', { uid: uid, username: username })
    // 更新保存在context中的uid
    dispatch({type:'login', payload: {
      uid: uid,
      username: username,
    }})
  }
  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
      handleSubmit()
    }
    return
  }
  return (
    <div>
      <div class="login-box">
        <h2>登 陆</h2>
        <div class="input">
          <input
            type="text"
            placeholder="请输入用户名"
            value={inputValue}
            onChange={(e) => 
              setInputValue(e.target.value)
            }
            onKeyPress={handleKeyPress}
          />
        </div>
        <div class="submit">
          <button type="button" onClick={handleSubmit}>
            提交
          </button>
        </div>
      </div>
    </div>
  );
};
