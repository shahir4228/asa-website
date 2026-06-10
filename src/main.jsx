import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignLab from './DesignLab.jsx'

const isLab = new URLSearchParams(window.location.search).has('lab')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isLab ? <DesignLab /> : <App />}
  </StrictMode>,
)
