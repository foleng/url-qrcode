import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import App from './App'
import './index.css'
import 'antd/dist/antd.css';


ConfigProvider.config({
  prefixCls: 'url-qrcode', // 4.13.0+
  iconPrefixCls: 'anticon', // 4.17.0+
});

// const shadowContainer = document.createElement("div");
// shadowContainer.setAttribute("id", "shadow")
// document.body.insertAdjacentElement("afterend", shadowContainer);
// const shadow = shadowContainer.attachShadow({ mode: 'open' })

if (!import.meta.env.DEV) {
  const root = document.createElement("div");
  root.setAttribute("id", "content_root");
  document.body.appendChild(root);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider prefixCls="url-qrcode">
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
