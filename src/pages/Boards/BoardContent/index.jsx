import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495E' : '#1976d2',
        height: (theme) =>
          `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent
