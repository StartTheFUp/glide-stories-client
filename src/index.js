import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { fetchInitialState } from './store.js'

fetchInitialState()

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
