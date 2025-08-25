import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const LoadingScreen = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )
}

export default LoadingScreen


