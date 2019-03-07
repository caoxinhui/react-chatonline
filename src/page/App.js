import React, { Component } from "react";
import Chat from "./Chat";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { uid: "", socket: io(), username: "", inputValue: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateUid = this.generateUid.bind(this);
  }
  generateUid() {
    return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 1);
  }
  setUserName(value) {
    this.setState({ inputValue: value });
  }
  handleSubmit() {
    const { inputValue, socket } = this.state;
    const uid = this.generateUid();
    const username = !!inputValue ? inputValue : `游客${uid}`;
    this.setState({ uid: uid, username: username });
    socket.emit("login", { uid: uid, username: username });
  }
  render() {
    const { uid, username, socket, inputValue } = this.state;
    return !!uid ? (
      <Chat uid={uid} username={username} socket={socket} />
    ) : (
      <div>
        <div class="login-box">
          <h2>登 陆</h2>
          <div class="input">
            <input
              type="text"
              placeholder="请输入用户名"
              value={inputValue}
              onChange={e => this.setUserName(e.target.value)}
            />
          </div>
          <div class="submit">
            <button type="button" onClick={this.handleSubmit}>
              提交
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
