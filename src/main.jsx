import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SongContext from './context/SongContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SongContext>
      <App />
    </SongContext>
  </StrictMode>,
)
