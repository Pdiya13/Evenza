import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Grab the root element
const rootElement = document.getElementById('root')

// Create the root and render
const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
