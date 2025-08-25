import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme.js'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'

const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            confirmationButtonProps: { sx: { color: 'white', bgcolor: '#ff4500' } },
            buttonOrder: ['confirm', 'cancel'],
          }}
        >
          <CssBaseline />
          {children}
        </ConfirmProvider>
      </CssVarsProvider>
    </BrowserRouter>
  )
}

export default AppProviders


