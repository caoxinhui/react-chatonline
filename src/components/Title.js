import { Context } from '../context'
import React, { useContext } from 'react'
const Title = () => {
  const { state } = useContext(Context);
  const { username, socket, uid } = state;
  const handleLogout = () => {
    socket.emit("logout", { username, uid });
    window.location.reload();
  };
  return (
    <div className="room-action">
      <div className="room-name">
        {username}
        ，欢迎进入群聊
      </div>
      <div className="button" onClick={handleLogout}>
        <button>退出群聊</button>
      </div>
    </div>
  );
};
export default Title