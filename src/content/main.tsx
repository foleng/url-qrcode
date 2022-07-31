import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


if (!import.meta.env.DEV) {
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body.appendChild(root)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
