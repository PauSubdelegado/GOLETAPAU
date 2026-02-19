import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';



// CSS global opcional

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
