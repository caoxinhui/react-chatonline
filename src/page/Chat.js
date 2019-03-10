import React, { Component } from "react";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.generateTime = this.generateTime.bind(this);
    this.getOnlineList = this.getOnlineList.bind(this);
    this.handleSubmitChat = this.handleSubmitChat.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = {
      onlineUser: [],
      onlineCount: "",
      onlineUserNames: "",
      msgType: "",
      messages: [],
      sendMessage: ""
    };
  }
  componentDidMount() {
    this.getOnlineList();
    this.ready();
  }
  ready() {
    let { socket } = this.props;
    let { messages } = this.state;
    socket.on("sendChatMessage", obj => {
      let message = {
        msgType: "chat",
        username: obj.username,
        uid: obj.uid,
        time: obj.time,
        sendMessage: obj.sendMessage
      };
      messages.push(message);
      this.setState({ messages: messages });
    });
    socket.on("logout", obj => {
      let message = {
        msgType: "logout",
        username: obj.user.username,
        uid: obj.user.uid
      };
      messages.push(message);
      this.setState({
        messages: messages,
        onlineUser: obj.onlineUser,
        onlineCount: obj.onlineCount
      });
    });
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
    let { onlineUserNames, onlineCount, messages } = this.state;
    socket.on("login", obj => {
      onlineCount = obj.onlineCount;
      onlineUserNames = Object.values(obj.onlineUser).join(",");
      this.setState({
        onlineCount: onlineCount,
        onlineUserNames: onlineUserNames,
        username: obj.username
      });
      let message = {
        msgType: "login",
        username: obj.username,
        time: obj.time
      };
      messages.push(message);
      this.setState({ messages: messages });
    });
  }
  setMessage(value) {
    let { username, uid } = this.props;
    this.setState({ sendMessage: value, username: username, uid: uid });
  }
  handleSubmitChat() {
    let { socket, username, uid, time } = this.props;
    let { sendMessage } = this.state;
    socket.emit("sendChatMessage", {
      sendMessage: sendMessage,
      username: username,
      uid: uid,
      time: time
    });
    document.getElementById("inputText").value = "";
  }
  handleLogout() {
    let { socket, username, uid } = this.props;
    socket.emit("logout", {
      username: username,
      uid: uid
    });
    window.location.reload()
  }
  render() {
    const { username, uid } = this.props;
    const { onlineCount, onlineUserNames, messages } = this.state;
    const time = this.generateTime();
    return (
      <div>
        <div className="chat-room">
          <div className="welcome">
            <div className="room-action">
              <div className="room-name">
                {username}
                ，欢迎进入群聊哦~
              </div>
              <div className="button" onClick={this.handleLogout}>
                <button>退出群聊</button>
              </div>
            </div>
          </div>
          <div className="room-status">
            在线人数: {onlineCount}, 在线列表: {onlineUserNames}
          </div>
          <div>
            <Messages messages={messages} uid={uid} time={time} />
            <div className="bottom-area">
              <div className="input-box">
                <div className="input">
                  <input
                    type="text"
                    maxlength="140"
                    placeholder=""
                    onChange={e => this.setMessage(e.target.value)}
                    id="inputText"
                  />
                </div>
                <div className="button">
                  <button type="button" onClick={this.handleSubmitChat}>
                    提交
                  </button>
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

const Messages = props => {
  let { messages, uid, time } = props;
  return (
    <div className="messages">
      {messages.map((message, index) => {
        return (
          <Message
            key={index}
            msgType={message.msgType}
            isMe={uid === message.uid}
            username={message.username}
            time={time}
            message={message.sendMessage}
          />
        );
      })}
    </div>
  );
};
const Message = props => {
  if (props.msgType === "login" || props.msgType === "logout") {
    return (
      <div className="one-message system-message">
        {props.username}{" "}
        {props.msgType === "login" ? "加入了群聊" : "退出了群聊"}
        <span className="time">&nbsp; {props.time}</span>
      </div>
    );
  } else {
    return (
      <div className={props.isMe ? "me one-message" : "other one-message"}>
        <p className="time">
          <span>{props.username} </span> {props.time}
        </p>
        <div className="message-content">{props.message}</div>
      </div>
    );
  }
};
