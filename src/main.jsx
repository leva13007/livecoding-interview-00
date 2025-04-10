import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Keys } from './Keys.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Keys />
  </StrictMode>,
)
