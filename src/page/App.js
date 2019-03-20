import Chat from "../components/Chat";
import Login from '../components/Login'
import React, { useContext } from "react";
import { Context } from '../context'
const App = () => {
  const { state } = useContext(Context)
  const { uid } = state
  return uid ? <Chat /> : <Login />
};
export default App;

