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
    onlineUserCount: 0
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {...state, ...action.payload}
        case '':
            return {}
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