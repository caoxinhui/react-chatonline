import React from 'react'
function Chat(){
    return <div>
    <div class="chat-room">
        <div class="welcome">
            <div class="room-action">
                <div class="room-name">Hello | 对对对</div>
                <div class="button"><button>登出</button></div>
            </div>
        </div>
        <div class="room-status">在线人数: 1, 在线列表: 对对对</div>
        <div>
            <div class="messages">
                <div class="one-message system-message">对对对 <span class="time">&nbsp;10:08</span></div>
            </div>
            <div class="bottom-area">
                <div class="input-box">
                    <div class="input"><input type="text" maxlength="140" placeholder="按回车提交" value=""/></div>
                    <div class="button"><button type="button">提交</button></div>
                </div>
            </div>
        </div>
    </div>
    </div>
}
export default Chat