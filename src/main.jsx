import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignLab from './DesignLab.jsx'
import FreelanceSite from './FreelanceSite.jsx'

const params = new URLSearchParams(window.location.search)
const isLab  = params.has('lab')
const isHire = params.has('hire')

const Root = isLab ? <DesignLab /> : isHire ? <FreelanceSite /> : <App />

createRoot(document.getElementById('root')).render(
  <StrictMode>{Root}</StrictMode>,
)
