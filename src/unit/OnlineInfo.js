import { Context } from '../context'
import React, { useContext } from 'react'
const OnlineInfo = () => {
  const { state } = useContext(Context);
  const { onlineCount, onlineUser } = state;
  const onlineUserNames = Object.values(onlineUser).join("、");
  return (
    <div className="room-status">
      在线人数: {onlineCount}, 在线列表: {onlineUserNames}
    </div>
  );
};
export default OnlineInfo