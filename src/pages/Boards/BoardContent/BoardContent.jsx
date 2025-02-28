import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976d2'),
        height: (theme) => theme.trelloCustom.boardContentHeight,
        width: '100%',
        padding: '10px 0',
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
