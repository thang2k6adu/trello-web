import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { deepOrange, teal, cyan, orange } from '@mui/material/colors'

// Create a theme instance.
const theme = extendTheme({
  trelloCustom: {
    appBarHeight: '58px',
    boardBarHeight: '60px',
  },
  colorSchemes: {
    light: {},
    dark: {},
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '5px',
            // display: 'none'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde1',
            borderRadius: '8px',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
            borderRadius: '8px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          // '&:hover': {
          //   borderWidth: '1px'
          // },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': {
            borderWidth: '0.5px !important',
          },
          '&:hover fieldset': {
            borderWidth: '1px !important',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important',
          },
        },
      },
    },
  },
})

export default theme
