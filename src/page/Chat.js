import React, { Component } from "react";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.generateTime = this.generateTime.bind(this);
    this.getOnlineList = this.getOnlineList.bind(this)
    this.state = { onlineUser: [], onlineCount: '', onlineUserNames: '' };
  }
  componentDidMount(){
    this.getOnlineList()
  }
  generateTime() {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    hour = hour === 0 ? "00" : hour;
    minute = minute < 10 ? "0" + minute : minute;
    return hour + ":" + minute;
  }
  getOnlineList() {
    let { socket } = this.props;
    let { onlineUserNames, onlineCount } = this.state;
    socket.on("login", (obj) => {
      onlineCount = obj.onlineCount;
      onlineUserNames = Object.values(obj.onlineUser).join(",");
      this.setState({
        onlineCount: onlineCount,
        onlineUserNames: onlineUserNames
      });
    });
  }
  render() {
    const { username } = this.props;
    const { onlineCount, onlineUserNames } = this.state
    const time = this.generateTime();
    return (
      <div>
        <div class="chat-room">
          <div class="welcome">
            <div class="room-action">
              <div class="room-name">
                {username}
                ，欢迎进入群聊哦~{" "}
              </div>
              <div class="button">
                <button>登出</button>
              </div>
            </div>
          </div>
          <div class="room-status">在线人数: {onlineCount}, 在线列表: {onlineUserNames}</div>
          <div>
            <div class="messages">
              <div class="one-message system-message">
                {username} 进入了聊天室 <span class="time">&nbsp; {time}</span>
              </div>
              {/* <div class="me one-message">
                <p class="time">
                  <span>ddd </span> 21:10
                </p>
                <div class="message-content">ddd</div>
              </div> */}
              {/* <div class="one-message system-message">
                ddd 进入了聊天室 <span class="time">&nbsp;21:10</span>
              </div>
              <div class="other one-message">
                <p class="time">
                  <span>ddd</span> 21:10
                </p>
                <div class="message-content">aaaaaa</div>
              </div> */}
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
}
export default Chat;
