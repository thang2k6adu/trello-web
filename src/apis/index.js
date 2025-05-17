import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// chỉ request và lấy data từ response luôn
// Vì ở frontend không cần catch lỗi nhiều thế làm gì
// Gây dư thừa code và catch lỗi quá nhiều
// Giải pháp clean code đó là catch lỗi tập trung tại một nơi bằng cách
// Tận dụng một thứ cực kì mạnh mẽ của axios đó là Interceptor
// Interceptor là một hàm được gọi trước khi request được gửi đi
// Hiểu đơn giản là đánh chặn vào giữa request và response để xử lí logic ta muốn


// Board API
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

// Column API
export const createNewColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

// Card API
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}


