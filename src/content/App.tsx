import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { notification } from 'antd';
import reactLogo from './assets/react.svg'
import './App.css'

type Tab = {
  id: string;
  url?: string;
}

type Response = {
  kw: string;
}

type IActiveInfo = {
  tabId: number[]
}

function App() {
  useEffect(() => {
    chrome.runtime?.onMessage.addListener((message) => {
      console.log("message", message);
      const { linkUrl } = message?.info || {}
      notification.open({
        key: 'updatable',
        message: <QRCodeSVG value={linkUrl || ''} />,
        description: '',
        duration: null
      });
    })
  }, [])

  return (
    <div className="App">
    </div>
  )
}

export default App
