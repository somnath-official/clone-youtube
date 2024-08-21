import { useAuth } from './hooks/useAuth'
import { Routes } from './routes'

function App() {
  const { isLoadingAuth } = useAuth()

  return (
    isLoadingAuth ? 'Loading...' : <Routes />
  )
}

export default App
