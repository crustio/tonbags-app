import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={'https://mini-app.crust.network/tonconnect-manifest.json'}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
