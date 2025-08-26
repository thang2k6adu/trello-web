export const selectBoards = (state) => state.board

export const selectBoardById = (state, boardId) =>
  state.board.boards.find((b) => b._id === boardId)

export const selectLoading = (state) => state.board.loading

export const selectError = (state) => state.board.error

export const selectCurrentBoard = (state) => {
  const { boards, currentBoardId } = state.board
  return boards.find((b) => b._id === currentBoardId) || null
}
