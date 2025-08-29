import axios from 'axios'

const API_URL = import.meta.env.BUILD_MODE === 'production' ? 'https://condemned-jeanie-thang2k6adu-87c8a0dd.koyeb.app/v1/boards' : 'http://localhost:3000/v1/boards'
// Config axios: gắn token từ localStorage
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Thêm interceptor gắn token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Service gọi API
const boardService = {
  createBoard: async (data) => {
    const res = await instance.post('/', data)
    return res.data
  },

  getBoards: async () => {
    const res = await instance.get('/')
    return res.data
  },
}

export default boardService
