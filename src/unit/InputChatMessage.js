import { Context } from '../context'
import React, { useContext, useState, useEffect } from 'react'
const InputChatMessage = () => {
  const { state } = useContext(Context)
  const { socket, username, uid } = state
  const [sendMessage, updateMessage] = useState('')
  useEffect(() => {
    window.scrollTo(0,0)
  })
  const handleSubmitChat = () => {
    // 适配移动端不兼容问题。提交按钮的时候自动滚动到头部
    // window.scrollTo(0,0)
    if(sendMessage.trim().length === 0) {
      alert('输入的内容不能为空')
      return
    }
    socket.emit('sendMessage', { username: username, sendMessage: sendMessage, uid })
    updateMessage('')
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