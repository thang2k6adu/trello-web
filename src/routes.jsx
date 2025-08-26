import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Board = lazy(() => import('~/pages/Boards/_id'))
const LoginPage = lazy(() => import('~/pages/Auth/LoginPage'))
const RegisterPage = lazy(() => import('~/pages/Auth/RegisterPage'))
// const TrelloSideBar = lazy(() => import('~/pages/HomePage/index'))
const TrelloSideBar = lazy(() => import('~/pages/HomePage/layout/Layout'))

export const isAuthenticated = () => Boolean(localStorage.getItem('token'))

export const Protected = ({ children }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  return children
}

export const PublicOnly = ({ children }) => {
  if (isAuthenticated()) return <Navigate to="/boards" replace />
  return children
}

export const routes = [
  {
    path: '/',
    element: isAuthenticated() ? <Navigate to="/boards" replace /> : <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicOnly>
        <LoginPage />
      </PublicOnly>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnly>
        <RegisterPage />
      </PublicOnly>
    ),
  },
  {
    path: '/boards',
    element: (
      <Protected>
        <Board />
      </Protected>
    ),
  },
  {
    path: '/boards/:boardId',
    element: (
      <Protected>
        <Board />
      </Protected>
    ),
  },
  {
    path: '/homePage/',
    element: (
      <Protected>
        <TrelloSideBar />
      </Protected>
    ),
  },
]
