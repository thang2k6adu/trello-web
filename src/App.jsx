import { Routes, Route, Navigate } from 'react-router-dom'
import Board from '~/pages/Boards/_id'
import LoginPage from '~/pages/Auth/LoginPage'
import RegisterPage from '~/pages/Auth/RegisterPage'
import { useEffect, useState } from 'react'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Public Route component (only accessible when not logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/boards" replace />
  }
  return children
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token')
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div>Loading...</div> // You can replace this with a proper loading component
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected routes */}
      <Route
        path="/boards"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />
      <Route
        path="/boards/:boardId"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />

      {/* Redirect root to boards if logged in, otherwise to login */}
      <Route
        path="/"
        element={
          localStorage.getItem('token') ? (
            <Navigate to="/boards" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  )
}

export default App
