import { Context } from "../context";
import React, { useContext } from "react";
import generateTime from './util'
const Message = props => {
  const time = generateTime();
  const { state } = useContext(Context);
  const MyUid = state.uid;
  const { username, msgType, message, uid } = props.message;
  const isMe = MyUid === uid;
  if (msgType === "login" || msgType === "logout") {
    return (
      <div className="one-message system-message">
        {username} {msgType === "login" ? "加入了群聊" : "退出了群聊"}
        <span className="time">&nbsp; {time}</span>
      </div>
    );
  } else {
    return (
      <div className={isMe ? "me one-message" : "other one-message"}>
        <p className="time">
          <span>{username} </span> {time}
        </p>
        <div className="message-content">{message}</div>
      </div>
    );
  }
};
export default Message