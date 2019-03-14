import { Context } from "../context";
import React, { useContext } from "react";
import Message from './Message'
const Messages = () => {
  const { state } = useContext(Context);
  const { messages } = state;
  return (
    <div className="messages">
      {messages.map((message, index) => {
        return <Message key={index} message={message} />;
      })}
    </div>
  );
};
export default Messages

