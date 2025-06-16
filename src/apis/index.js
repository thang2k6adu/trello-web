import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// chỉ request và lấy data từ response luôn
// Vì ở frontend không cần catch lỗi nhiều thế làm gì
// Gây dư thừa code và catch lỗi quá nhiều
// Giải pháp clean code đó là catch lỗi tập trung tại một nơi bằng cách
// Tận dụng một thứ cực kì mạnh mẽ của axios đó là Interceptor
// Interceptor là một hàm được gọi trước khi request được gửi đi
// Hiểu đơn giản là đánh chặn vào giữa request và response để xử lí logic ta muốn

const API_URL = API_ROOT || 'http://localhost:3000/v1'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Board API
export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await api.get(`/boards/${boardId}`)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

export const updateBoardDetailsAPI = async (boardId, updateData) => {
  const response = await api.put(`/boards/${boardId}`, updateData)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

export const moveCardBetweenDifferentColumnAPI = async (updateData) => {
  const response = await api.put('/boards/supports/moving_card', updateData)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

// Column API
export const createNewColumnAPI = async (newColumnData) => {
  const response = await api.post('/columns', newColumnData)
  return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
  const response = await api.put(`/columns/${columnId}`, updateData)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

export const delteColumnDetailsAPI = async (columnId) => {
  const response = await api.delete(`/columns/${columnId}`)
  // Lưu ý: axios trả về kết quả qua data
  return response.data
}

// Card API
export const createNewCardAPI = async (newCardData) => {
  const response = await api.post('/cards', newCardData)
  return response.data
}

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials)
      const { token, refreshToken, ...userData } = response.data.result

      // Store tokens
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)

      return userData
    } catch (error) {
      throw error.response?.data?.message || 'Login failed'
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData)
      return response.data.result
    } catch (error) {
      throw error.response?.data?.message || 'Registration failed'
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
  },
}

export default api
