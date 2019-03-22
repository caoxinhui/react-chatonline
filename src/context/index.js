import React, {
    createContext,
    useReducer,
} from 'react'
const initialState = {
    socket: io(),
    username: '',
    uid: '',
    messages: [],
    onlineUser: '',
    onlineCount: 0
}
const reducer = (state, action) => {
    const payload = action.payload
    switch (action.type) {
        case 'userLogin':
            return {
                ...state,
                uid: payload.uid,
                username: payload.username,
            }
        case 'login':
            return {
                ...state, 
                onlineUser: payload.onlineUser,
                onlineCount: payload.onlineCount,
                messages: state.messages.concat(payload.msg)
            }
        case 'sendMessage':
            return {
                ...state, 
                messages: state.messages.concat(payload.msg)
            }
        case 'logout':
            return {
                ...state, 
                onlineUser: payload.onlineUser,
                onlineCount: payload.onlineCount,
                messages: state.messages.concat(payload.msg)
            }
        default:
            return state
    }
}
const Context = createContext()
const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{state, dispatch}}>{props.children}</Context.Provider>
} 
export { Context, ContextProvider } 