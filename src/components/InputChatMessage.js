import { Context } from '../context'
import React, { useContext, useState } from 'react'
const InputChatMessage = () => {
  const { state } = useContext(Context)
  const { socket, username, uid } = state
  const [sendMessage, updateMessage] = useState('')
  const handleSubmitChat = () => {
    socket.emit('sendMessage', { username: username, sendMessage: sendMessage, uid })
  }
  return (
    <div className="bottom-area">
      <div className="input-box">
        <div className="input">
          <input
            type="text"
            maxlength="140"
            value={sendMessage}
            onChange={e => updateMessage(e.target.value)}
          />
        </div>
        <div className="button">
          <button type="button" onClick={handleSubmitChat}>
            发送
          </button>
        </div>
      </div>
    </div>
  )
}
export default InputChatMessage