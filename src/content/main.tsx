import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const shadowContainer = document.createElement("div");
shadowContainer.setAttribute("id", "shadow")
const body = document.body;
document.insertBefore(shadowContainer, document.body);
const shadow = shadowContainer.attachShadow({ mode: 'open' })

if (!import.meta.env.DEV) {
  const root = document.createElement("div");
  root.setAttribute("id", "root");
  shadow.appendChild(root);
}

ReactDOM.createRoot(shadow.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
