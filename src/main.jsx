// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import AppProviders from '~/components/AppProviders.jsx'
import ErrorBoundary from '~/components/ErrorBoundary.jsx'
import LoadingScreen from '~/components/LoadingScreen.jsx'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProviders>
    <ErrorBoundary fallback={<LoadingScreen />}>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </ErrorBoundary>
    <ToastContainer />
  </AppProviders>
)
