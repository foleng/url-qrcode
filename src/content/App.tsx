import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react';
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
  const [tab, setTab] = useState<Tab>()

  async function moveToFirstPosition(activeInfo: chrome.tabs.TabActiveInfo) {
    try {
      await chrome.tabs.move(activeInfo.tabId, { index: 0 });
      const res = await chrome.tabs.query({ currentWindow: true })
      console.log('Success.', res);
      return res;
    } catch (error) {
      if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
        setTimeout(() => moveToFirstPosition(activeInfo), 50);
      } else {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    // chrome.tabs.onActivated.addListener(moveToFirstPosition);
  }, [])


  return (
    <div className="App" >
      <QRCodeSVG value={tab?.url || ''} />
    </div>
  )
}

export default App
