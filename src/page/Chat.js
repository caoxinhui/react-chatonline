import React from "react";
function Chat() {
  return (
    <div>
      <div class="chat-room">
        <div class="welcome">
          <div class="room-action">
            <div class="room-name">Hello | 对对对</div>
            <div class="button">
              <button>登出</button>
            </div>
          </div>
        </div>
        <div class="room-status">在线人数: 1, 在线列表: 对对对</div>
        <div>
          <div class="messages">
            <div class="one-message system-message">
              ddd 进入了聊天室 <span class="time">&nbsp;21:10</span>
            </div>
            <div class="me one-message">
              <p class="time">
                <span>ddd </span> 21:10
              </p>
              <div class="message-content">ddd</div>
            </div>
            <div class="one-message system-message">
              ddd 进入了聊天室 <span class="time">&nbsp;21:10</span>
            </div>
            <div class="other one-message">
              <p class="time">
                <span>ddd</span> 21:10
              </p>
              <div class="message-content">aaaaaa</div>
            </div>
          </div>
          <div class="bottom-area">
            <div class="input-box">
              <div class="input">
                <input
                  type="text"
                  maxlength="140"
                  placeholder="按回车提交"
                  value=""
                />
              </div>
              <div class="button">
                <button type="button">提交</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Chat;
