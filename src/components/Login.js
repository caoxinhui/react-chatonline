import React, { useState, useContext } from "react";
import { Context } from '../context'
import { generateUid } from '../unit/util'
const Login = () => {
    const { state, dispatch } = useContext(Context)
    const { socket } = state
    const [inputValue, setInputValue] = useState('')
    const handleSubmit = () => {
      const uid = generateUid()
      const username = !!inputValue ? inputValue : `游客${uid}`
      socket.emit('login', { uid: uid, username: username })
      const msg = {
        msgType: "login",
        username: username,
      }
      dispatch({type:'userLogin', payload: {
        uid: uid,
        username: username,
        msg: msg
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
  
  export default Login