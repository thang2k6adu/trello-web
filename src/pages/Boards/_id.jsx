import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sort'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { moveCardBetweenDifferentColumnAPI } from '~/apis'
import { delteColumnDetailsAPI } from '~/apis'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    // Tạm thời fix cứng boardId
    const boardId = '6820b46f776dc4a9a7cbfa31'
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        // Sắp xếp thứ tự các column ở đây luôn trước khi đưa dữ liệu xuống bên dưới
        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

        board.columns.forEach((column) => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          } else {
            // Sắp xếp thứ tự card luôn trước khi đẩy xuống component con
            column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
          }
        })
        setBoard(board)
      })
      .catch((error) => {
        console.error('Error fetching board details:', error)
      })
  }, [])

  // Function này có nhiệm vụ gọi API và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    })

    toast.success('Create new column successfully!')

    // Khi tạo mới column thì nó chưa có card, cần xử lí vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    // Front-end tự làm đúng lại state data board thay vì gọi lại api fetchBoardDetailsAPI
    // Lưu ý: cách làm này tùy thuộc vào đặc thù dự án, có nơi trả về toàn bộ Board đầy đủ dù đây là column
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    })

    toast.success('Create new card successfully!')

    // Cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === createdCard.columnId)
    if (columnToUpdate) {
      // Nếu column có placeholder-card thì thay thế nó bằng card mới
      if (columnToUpdate.cards.some((c) => c.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      } else {
        // Nếu column có data rồi thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }

  // Function này có nhiệm vụ là gọi API và xử lý khi kéo thả Column xong
  // Chỉ cần gọi API cập nhật mảng columnOrderIds của Board chứa nó
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API để cập nhật lại
    // Không cần async await vì không có dữ liệu trả về
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Khi di chuyển card trong cùng một column
  // Chỉ cần gọi API để cập nhật mảng cardOrderIds
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Update chuẩn dữ liệu cho state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find((column) => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Gọi API để update column
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Di chuyeern card sang Column khác:
  // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (bản chất là xóa id của card ra khỏi mảng)
  // B2: Cập nhật mảng cardOrderIds của Column tiếp theo (bản chất là thêm id của card mới vào)
  // B3: Cập nhật lại trường columnId của card đã kéo
  // => Làm một API support riêng
  const moveCardBetweenDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // Gọi API xử lý phía BE
    let prevCardOrderIds = dndOrderedColumns.find((c) => c._id === prevColumnId)?.cardOrderIds
    // Xử lý vấn đề placeholder-card khi kéo card cuối cùng ra khỏi column
    if (prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    moveCardBetweenDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)?.cardOrderIds,
    })
  }

  // Xử lý xóa một column và card bên trong nó
  const deleteColumnDetails = (columnId) => {
    // Update chuẩn state board
    // Về bản chất, React không nhận ra thay đổi nếu như gán thẳng vào biến nên ta phải clone nó ra một biến mới
    // Nếu setState thì nó có thể nhận ra và render mỗi khi thay đổi
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter((c) => c !== columnId)
    setBoard(newBoard)

    // Gọi API xử lí phía BE
    delteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult || 'Delete column sucessfully')
    })
  }

  if (!board)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ paddingLeft: '8px' }}>Loading...</Typography>
      </Box>
    )

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardBetweenDifferentColumn={moveCardBetweenDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
