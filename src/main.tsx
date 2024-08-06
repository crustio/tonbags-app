import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import App from './App'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={'https://mini-app.crust.network/tonconnect-manifest.json'}>
      <App />
      <Toaster position={'top-center'} />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
