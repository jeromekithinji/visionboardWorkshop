import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ViewSubmissionsPage } from './pages/view-submissions-page.jsx'

const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isSubmissionsView = normalizedPath === '/view/submissions'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isSubmissionsView ? <ViewSubmissionsPage /> : <App />}
  </StrictMode>,
)
