import './index.css'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import "react-tooltip/dist/react-tooltip.css"
import { Toaster } from 'sonner'
import App from './App'
import { InitToolTip } from './utils/tooltip'




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={'https://mini-app.crust.network/tonconnect-manifest.json'}>
      <InitToolTip />
      <App />
      <Toaster position={'top-center'} />
    </TonConnectUIProvider>
  </React.StrictMode>,
)
