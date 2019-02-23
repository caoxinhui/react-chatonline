import React, { Component } from "react";
import Login from "./Login";
import Chat from "./Chat";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { uid: "", socket: io(), username:'' };
    this.handleClick = this.handleClick.bind(this);
    this.geterateUid = this.generateUid.bind(this);
  }
  generateUid() {
    return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 1);
  }
  setUserName(value) {
    this.setState({ name: value });
  }
  handleClick() {
    const { name } = this.state;
    const uid = this.geterateUid();
    let username = !!name ? name : `游客${uid}`;
    this.setState({ uid: uid, username: username });
  }
  render() {
    const { uid,username } = this.state;
    return this.state.uid ? (
      <Chat uid={uid} username={username}/>
    ) : (
      <div>
        <div class="login-box">
          <h2>登 陆</h2>
          <div class="input">
            <input
              type="text"
              placeholder="请输入用户名"
              onChange={e => this.setUserName(e.target.value)}
            />
          </div>
          <div class="submit">
            <button type="button" onClick={this.handleClick}>
              提交
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
