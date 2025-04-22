import { useState } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './routes/AppRoutes'

function App() {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      >
        <AppRoutes />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
