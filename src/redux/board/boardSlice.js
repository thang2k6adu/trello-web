import { createSlice } from '@reduxjs/toolkit'
import boardService from '~/apis/boardService'
import { toast } from 'react-toastify'

const initialState = {
  boards: [],
  loading: false,
  error: null,
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true
      state.error = null
    },
    getBoardsSuccess: (state, action) => {
      state.loading = false
      state.boards = action.payload
    },
    createBoardSuccess: (state, action) => {
      state.loading = false
      state.boards.push(action.payload)
    },
    hasError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { startLoading, getBoardsSuccess, createBoardSuccess, hasError } = boardSlice.actions

// Async thunk
export const fetchBoards = () => async (dispatch) => {
  dispatch(startLoading())
  try {
    const data = await boardService.getBoards()
    dispatch(getBoardsSuccess(data))
  } catch (error) {
    dispatch(hasError(error.message))
    toast.error(error.message)
  }
}

export const addBoard = (newBoard) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const data = await boardService.createBoard(newBoard)
    dispatch(createBoardSuccess(data))
    toast.success('Tạo board thành công!')
  } catch (error) {
    dispatch(hasError(error.message))
    toast.error('Tạo board thất bại!')
  }
}

export default boardSlice.reducer
