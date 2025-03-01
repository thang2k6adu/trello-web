import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

function BoardContent({ board }) {
  const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495E' : '#1976d2',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        width: '100%',
        padding: '10px 0',
      }}
    >
      <ListColumns columns={orderedColumns}/>
    </Box>
  )
}

export default BoardContent
