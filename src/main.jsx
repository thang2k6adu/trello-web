// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'

// Cấu hình react-toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// MUI dialog =))
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider defaultOptions={{
      allowClose: false,
      confirmationButtonProps: { sx: { color: 'white', bgcolor: '#ff4500' } },
      buttonOrder: ['confirm', 'cancel'],
    }}>
      <CssBaseline />
      <App />
      <ToastContainer />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
)
