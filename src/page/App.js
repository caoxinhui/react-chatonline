import React, { Component } from "react";
import Chat from "./Chat";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { uid: "", socket: io(), username: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.geterateUid = this.generateUid.bind(this);
  }
  componentDidMount() {
    // this.ready()
  }
  ready(){
    let { socket,uid } = this.state
    socket.on('logout',obj=>{
      let message= {
        msgType: "logout",
        username: obj.user.username,
        uid: obj.user.uid,
      }
      if(message.uid === uid) {
        this.setState({uid:null})
        console.log(uid)
      }
    })
  }
  generateUid() {
    return new Date().getTime() + "" + Math.floor(Math.random() * 999 + 1);
  }
  setUserName(value) {
    this.setState({ name: value });
  }
  handleSubmit() {
    const { name, socket } = this.state;
    const uid = this.geterateUid();
    const username = !!name ? name : `游客${uid}`;
    this.setState({ uid: uid, username: username });
    socket.emit("login", { uid: uid, username: username });
  }
  render() {
    const { uid, username,socket } = this.state;
    console.log(uid)
    return !!this.state.uid ? (
      <Chat uid={uid} username={username} socket={socket}/>
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
