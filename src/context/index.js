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
    switch (action.type) {
        case 'userLogin':
            return {
                ...state,
                uid: action.payload.uid,
                username: action.payload.username,
            }
        case 'login':
            return {
                ...state, 
                onlineUser: action.payload.onlineUser,
                onlineCount: action.payload.onlineCount,
                messages: state.messages.concat(action.payload.msg)
            }
        case 'sendMessage':
            return {
                ...state, 
                username: action.payload.username,
                messages: state.messages.concat(action.payload.msg)
            }
        case 'logout':
            return {
                ...state, 
                onlineUser: action.payload.onlineUser,
                onlineCount: action.payload.onlineCount,
                logoutUser: action.payload.user
            }
        default:
            throw new Error()
    }
}
const Context = createContext()
const ContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{state, dispatch}}>{props.children}</Context.Provider>
} 
export { Context, ContextProvider } 