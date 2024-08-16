import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import AuthProvider from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
