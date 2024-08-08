import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StatusUpdate from './Context Api/StatusUpdate.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StatusUpdate>
        <App />
      </StatusUpdate>
    </BrowserRouter>
  </React.StrictMode>,
)
