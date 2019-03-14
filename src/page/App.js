import Chat from "../components/Chat";
import Login from '../components/Login'
// js文件里面用了return都需要 引入 React
import React, { useContext } from "react";
import { Context } from '../context'
const App = () => {
  const { state } = useContext(Context)
  const { uid } = state
  return uid ? <Chat /> : <Login />
};
export default App;

