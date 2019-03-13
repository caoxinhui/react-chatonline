import React from 'react'
import ReactDOM from 'react-dom'
import App from './page/App'
import { ContextProvider } from '../src/context'
ReactDOM.render(<ContextProvider><App/></ContextProvider>, document.getElementById('app'));